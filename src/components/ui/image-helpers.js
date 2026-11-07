// image-helpers
export const IMAGE_LOAD_MODE = { OPTIMIZED: "optimized", ORIGINAL: "original", FALLBACK: "fallback" };

export const nextImageLoadMode = (mode) => {
  if (mode === IMAGE_LOAD_MODE.OPTIMIZED) return IMAGE_LOAD_MODE.ORIGINAL;
  return IMAGE_LOAD_MODE.FALLBACK;
};

export const parseWixMediaUrl = (url) => {
  if (!url) return null;
  if (url.includes("media.db.com") || url.includes("wixstatic.com")) {
    return { mediaId: url, baseUrl: url, type: "image" };
  }
  return null;
};

export const getOriginalImageUrl = (src, parsed) => src;

export const DEFAULT_TRANSFORM_WIDTH = 800;

export const buildTransformUrl = (parsed, options) => {
  return parsed?.baseUrl || parsed?.mediaId || "";
};

export const buildSrcSet = (parsed, options) => {
  return undefined;
};

export const splitImageProps = (props) => {
  const { className, style, ...rest } = props;
  return {
    wrapperProps: {},
    imageProps: rest,
  };
};

export const getImagePreviewClassName = (className, wrapperClassName, fallback) => {
  return className || fallback || "";
};
