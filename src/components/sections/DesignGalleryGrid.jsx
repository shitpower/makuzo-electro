"use client";

import { useState } from "react";

import { DesignGalleryLightbox } from "@/components/sections/DesignGalleryLightbox";
import { SiteImage } from "@/components/ui/SiteImage";

export function DesignGalleryGrid({ images, locale, alt = "", columns = "full" }) {
  const [index, setIndex] = useState(null);

  if (!images?.length) return null;

  const gridClass =
    columns === "preview"
      ? "grid grid-cols-2 gap-3 sm:grid-cols-3"
      : "grid grid-cols-2 gap-3 md:grid-cols-3";

  return (
    <>
      <div className={gridClass}>
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setIndex(i)}
            className="focus-ring group relative h-[150px] w-full overflow-hidden rounded-[2px] bg-[var(--mist)] sm:h-[190px] md:h-[220px]"
          >
            <SiteImage
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition duration-300 group-hover:scale-[1.03]"
            />
            <span className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/15" />
          </button>
        ))}
      </div>

      <DesignGalleryLightbox
        images={images}
        index={index}
        onClose={() => setIndex(null)}
        onChange={setIndex}
        locale={locale}
        alt={alt}
      />
    </>
  );
}
