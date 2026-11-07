import { useState, useRef, useEffect } from "react";
import { ArrowRight, Volume2, VolumeX, Play, Pause } from "lucide-react";
import { assets, business } from "@/config/fitcat";

export default function VideoHeroSection({ onExploreMenu, onOrderNow }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {
      // Browser autoplay policy might require initial user interaction
      setIsPlaying(false);
    });
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen w-full overflow-hidden bg-[#0a1f18] text-white flex flex-col justify-between">
      {/* Background Video with subtle scale to crop corner watermark */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          src={assets.sequenceVideo}
          poster={assets.sequencePoster}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover scale-[1.08] origin-center filter brightness-[0.75] contrast-[1.05]"
        />
        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f18] via-black/35 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent pointer-events-none" />
      </div>

      {/* Top spacer to account for sticky header */}
      <div className="h-20 sm:h-24" />

      {/* Hero Content Overlay (Image 1 replica) */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16 my-auto py-12">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="font-mono text-[11px] sm:text-[13px] font-bold uppercase tracking-[0.28em] text-[#ff632b]">
              {business.brandLine || "LET'S MAKE MUMBAI FIT"}
            </span>
          </div>

          {/* Big Bold Headline */}
          <h1 className="font-display text-[14vw] sm:text-[76px] lg:text-[88px] font-extrabold uppercase leading-[0.88] tracking-[-0.04em] drop-shadow-lg text-white">
            Good Food.
            <br />
            <span className="text-[#ff632b]">Fresh</span>
            <br />
            <span className="text-[#ff632b]">Start.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-lg text-[16px] sm:text-[19px] leading-relaxed text-white/85 font-medium drop-shadow-md">
            Healthy bites, made fresh in Vikhroli East, Mumbai. Wholesome sandwiches, refreshing fruit bowls, chia puddings & more.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#menu"
              onClick={onOrderNow}
              className="inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full bg-[#ff632b] px-8 text-[15px] sm:text-[16px] font-bold text-white shadow-xl shadow-[#ff632b]/30 transition-all duration-300 hover:bg-[#e0501a] hover:scale-105 active:scale-95"
            >
              <span>Order Now</span>
              <ArrowRight className="h-4 w-4" />
            </a>

            <a
              href="#mood-hero"
              onClick={onExploreMenu}
              className="inline-flex min-h-[52px] items-center justify-center rounded-full border-2 border-white/40 bg-black/30 px-8 text-[15px] sm:text-[16px] font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/15 hover:border-white active:scale-95"
            >
              Explore Menu
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Scrubber Label & Media Controls */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16 pb-6 pt-4 flex items-center justify-between border-t border-white/10 text-white/70">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[#ff632b] animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#ff632b] font-semibold">
            01 / FRESHNESS
          </span>
          <span className="hidden sm:inline text-white/40 text-xs">·</span>
          <span className="hidden sm:inline text-xs text-white/60">FitCat Kitchen Live Reel</span>
        </div>

        {/* Video Audio & Playback Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            className="grid h-9 w-9 place-items-center rounded-full bg-black/40 border border-white/20 text-white/80 backdrop-blur-sm transition-all hover:bg-black/70 hover:text-white"
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause video" : "Play video"}
            className="grid h-9 w-9 place-items-center rounded-full bg-black/40 border border-white/20 text-white/80 backdrop-blur-sm transition-all hover:bg-black/70 hover:text-white"
          >
            {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current" />}
          </button>
        </div>
      </div>
    </section>
  );
}

