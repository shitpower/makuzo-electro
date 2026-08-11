import Image from "next/image";
import clsx from "clsx";

import { normalizeCmsMediaSrc } from "@/lib/cms-media-src";

/**
 * Server-friendly next/image wrapper for CMS + static assets.
 * Local /api/media and /api/proxy-image are optimized via images.localPatterns.
 */
export function SiteImage({
  src,
  alt = "",
  className,
  fill,
  width,
  height,
  priority,
  sizes,
  unoptimized: unoptimizedProp,
  quality = 90,
}) {
  const normalized = normalizeCmsMediaSrc(src);
  if (!normalized) return null;

  const unoptimized = unoptimizedProp ?? false;

  if (fill) {
    return (
      <Image
        src={normalized}
        alt={alt}
        fill
        className={clsx("object-cover", className)}
        priority={priority}
        sizes={sizes || "(max-width: 1600px) 100vw, 1600px"}
        unoptimized={unoptimized}
        quality={quality}
      />
    );
  }

  return (
    <Image
      src={normalized}
      alt={alt}
      width={width || 800}
      height={height || 600}
      className={className}
      priority={priority}
      sizes={sizes}
      unoptimized={unoptimized}
      quality={quality}
    />
  );
}
