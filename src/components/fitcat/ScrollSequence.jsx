import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDownRight, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";
import useReducedMotion from "@/lib/useReducedMotion";
import { business } from "@/config/fitcat";

/**
 * Full-screen, scroll-controlled cinematic sequence.
 * ------------------------------------------------------------------
 * The stage fills the viewport (100svh, video object-cover) and is `sticky`
 * inside a tall track, so the film stays pinned while the visitor scrolls and
 * the track's progress drives `video.currentTime`. Normal browser scrolling
 * only — nothing is hijacked, so the film stops where the visitor stops and
 * reverses on the way back up.
 *
 * Progress 0 → 0.88 covers the clip; the last 12% holds the final frame before
 * the next section arrives.
 */
const HOLD_END = 0.88;
const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

function Caption({ chapter, active, className }) {
  return (
    <div
      className={cn(
        "flex flex-col justify-end transition-all duration-500 ease-out",
        active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
        className
      )}
      aria-hidden={!active}
    >
      {chapter.kind === "label" && (
        <p className="fc-label text-[11px] text-primary">{chapter.text}</p>
      )}
      {chapter.kind === "title" && (
        <h2 className="fc-display mt-2 text-[7.4vw] leading-[0.95] text-linen sm:text-[34px] lg:text-[42px]">
          {chapter.text}
        </h2>
      )}
      {chapter.kind === "body" && (
        <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-linen/75">
          {chapter.text}
        </p>
      )}
    </div>
  );
}

export default function ScrollSequence({
  videoSrc,
  poster,
  frames = [],
  chapters = [],
  trackClassName = "h-[380vh]",
}) {
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const smoothRef = useRef(0);
  const chapterRef = useRef(-1);
  const frameRef = useRef(-1);

  const reduced = useReducedMotion();
  const useFrames = frames.length > 0;
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const isPlayingRef = useRef(false);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlayingRef.current) {
      video.pause();
      isPlayingRef.current = false;
      setIsPlaying(false);
    } else {
      video.play().then(() => {
        isPlayingRef.current = true;
        setIsPlaying(true);
      }).catch(() => {});
    }
  }, []);
  const staticMode = reduced || failed;
  const frameKey = frames.join("|");

  // --- video readiness -----------------------------------------------------
  // Readiness only drives the loading veil; it never gates the scroll loop, so
  // a missed browser event can never leave the film frozen.
  useEffect(() => {
    if (useFrames) return;
    const video = videoRef.current;
    if (!video) return;

    let settled = false;
    let interval = 0;
    const markReady = () => {
      if (settled) return;
      settled = true;
      setReady(true);
      if (interval) window.clearInterval(interval);
    };
    const onFail = () => setFailed(true);

    video.addEventListener("loadeddata", markReady);
    video.addEventListener("canplay", markReady);
    video.addEventListener("error", onFail);
    interval = window.setInterval(() => {
      if (video.readyState >= 2) markReady();
    }, 150);
    if (video.readyState >= 2) markReady();

    return () => {
      window.clearInterval(interval);
      video.removeEventListener("loadeddata", markReady);
      video.removeEventListener("canplay", markReady);
      video.removeEventListener("error", onFail);
    };
  }, [useFrames]);

  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pw = Math.max(1, Math.round(canvas.clientWidth * dpr));
    const ph = Math.max(1, Math.round(canvas.clientHeight * dpr));
    if (canvas.width !== pw || canvas.height !== ph) {
      canvas.width = pw;
      canvas.height = ph;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const scale = Math.max(pw / img.width, ph / img.height);
    const dw = img.width * scale;
    const dh = img.height * scale;
    ctx.clearRect(0, 0, pw, ph);
    ctx.drawImage(img, (pw - dw) / 2, (ph - dh) / 2, dw, dh);
  }, []);

  // --- progressive frame preload (first frames first) ----------------------
  useEffect(() => {
    if (!useFrames) return;
    let cancelled = false;
    imagesRef.current = [];
    (async () => {
      for (let i = 0; i < frames.length; i += 1) {
        if (cancelled) return;
        const img = new Image();
        img.decoding = "async";
        img.src = frames[i];
        try {
          await img.decode();
        } catch {
          // a missing frame is skipped; the nearest loaded one stays on screen
        }
        if (cancelled) return;
        imagesRef.current[i] = img;
        if (i === 0) {
          setReady(true);
          drawFrame(0);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useFrames, frameKey, drawFrame]);

  // --- scroll → frame loop -------------------------------------------------
  useEffect(() => {
    if (staticMode) return;
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;

    let raf = 0;
    let visible = false;
    let primed = false;

    const apply = (progress) => {
      stage.style.setProperty("--p", progress.toFixed(4));
      const media = clamp01(progress / HOLD_END);

      if (useFrames) {
        const index = Math.min(frames.length - 1, Math.round(media * (frames.length - 1)));
        if (index !== frameRef.current) {
          frameRef.current = index;
          drawFrame(index);
        }
      } else {
        const video = videoRef.current;
        // One seek at a time, and no micro-seeks: keeps mid-range phones smooth.
        if (video && video.duration && !video.seeking && video.readyState >= 2 && !isPlayingRef.current) {
          const time = media * Math.max(0, video.duration - 0.05);
          if (Math.abs(video.currentTime - time) > 1 / 40) video.currentTime = time;
        }
      }

      const next = progress < 0.34 ? 0 : progress < 0.68 ? 1 : 2;
      if (next !== chapterRef.current) {
        chapterRef.current = next;
        setActive(next);
      }
    };

    const tick = () => {
      raf = 0;
      const rect = track.getBoundingClientRect();
      const travel = rect.height - stage.offsetHeight;
      const target = travel > 0 ? clamp01(-rect.top / travel) : 0;
      if (!primed) {
        smoothRef.current = target;
        primed = true;
      }
      let progress = smoothRef.current + (target - smoothRef.current) * 0.2;
      if (Math.abs(target - progress) < 0.0009) progress = target;
      smoothRef.current = progress;
      apply(progress);
      if (visible) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        cancelAnimationFrame(raf);
        if (visible) raf = requestAnimationFrame(tick);
      },
      { rootMargin: "20% 0px 20% 0px" }
    );
    io.observe(track);

    return () => {
      visible = false;
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [staticMode, useFrames, frameKey, drawFrame]);

  return (
    <div ref={trackRef} className={cn("relative bg-forest-deep", !staticMode && trackClassName)}>
      {/* opener — sits on the first frame, scrolls away with the page */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex h-[100svh] flex-col justify-center px-6 sm:px-10 lg:px-16 pt-16">
        <div className="pointer-events-auto max-w-2xl">
          <p className="font-mono text-[11px] sm:text-[13px] font-bold uppercase tracking-[0.28em] text-[#ff632b]">
            {business.brandLine || "LET'S MAKE MUMBAI FIT"}
          </p>
          <h1 className="font-display mt-3 text-[13.5vw] font-extrabold uppercase leading-[0.88] tracking-[-0.04em] text-white sm:text-[76px] lg:text-[88px] drop-shadow-md">
            GOOD FOOD.
            <span className="block text-[#ff632b]">FRESH START.</span>
          </h1>
          <p className="mt-5 max-w-md text-[16px] sm:text-[19px] leading-relaxed text-white/90 font-medium drop-shadow">
            Healthy bites, made fresh in {business.locality}.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#menu"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#ff632b] px-8 text-[15px] sm:text-[16px] font-bold text-white shadow-xl shadow-[#ff632b]/25 transition-all duration-300 hover:bg-[#e0501a] hover:scale-105 active:scale-95"
            >
              Order Now
              <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#mood-hero"
              className="inline-flex min-h-[52px] items-center justify-center rounded-full border-2 border-white/30 bg-black/25 px-8 text-[15px] sm:text-[16px] font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/15 hover:border-white active:scale-95"
            >
              Explore Menu
            </a>
          </div>
        </div>
      </div>

      {/* the film, full-bleed and pinned */}
      <div
        ref={stageRef}
        className="sticky top-0 isolate h-[100svh] w-full overflow-hidden bg-forest-deep"
      >
        {useFrames ? (
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        ) : (
          <video
            ref={videoRef}
            src={videoSrc}
            poster={poster || undefined}
            muted
            playsInline
            preload="auto"
            controls={reduced}
            className="absolute inset-0 h-full w-full object-cover scale-[1.08] origin-center"
          />
        )}

        {/* legibility scrims — top for the navbar, bottom for the captions */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-forest-deep/70 via-transparent to-forest-deep/85"
        />

        {!ready && !failed && !useFrames && (
          <div className="absolute inset-0 grid place-items-center">
            <span className="fc-label animate-pulse text-[10px] text-linen/70">
              Loading film
            </span>
          </div>
        )}
        {failed && (
          <div className="absolute inset-0 grid place-items-center px-8 text-center">
            <span className="fc-label text-[10px] leading-relaxed text-linen/80">
              Film unavailable here — the story still reads below
            </span>
          </div>
        )}

        {/* captions */}
        <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-7 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3">
            <span className="fc-label text-[9px] text-linen/60">Freshness</span>
            <button
              type="button"
              onClick={togglePlay}
              className="inline-flex items-center gap-1.5 rounded-full border border-linen/20 bg-forest-soft/70 px-3 py-1 text-[11px] font-medium text-linen backdrop-blur-sm transition-colors hover:border-linen/50 hover:bg-forest-soft"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-3 w-3 fill-current" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="h-3 w-3 fill-current" />
                  <span>Play Film</span>
                </>
              )}
            </button>
            <span className="h-px flex-1 bg-linen/20" />
            <span className="fc-label text-[9px] tabular-nums text-linen/60">
              {String(active + 1).padStart(2, "0")} / 0{chapters.length || 1}
            </span>
          </div>

          {staticMode ? (
            <div className="mt-4 space-y-3">
              {chapters.map((chapter, i) => (
                <Caption key={i} chapter={chapter} active className="relative" />
              ))}
            </div>
          ) : (
            <div className="relative mt-3 h-[104px] sm:h-[112px]">
              {chapters.map((chapter, i) => (
                <Caption key={i} chapter={chapter} active={i === active} className="absolute inset-0" />
              ))}
            </div>
          )}

          <div className="mt-3 h-[2px] w-full overflow-hidden bg-linen/20">
            <div
              className="h-full w-full origin-left bg-primary"
              style={{ transform: "scaleX(var(--p, 0))" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}