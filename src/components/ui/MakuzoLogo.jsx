import Image from "next/image";
import clsx from "clsx";

/** Wordmark aspect ≈ 560×178 — transparent variants for light/dark surfaces. */
const LOGOS = {
  default: {
    src: "/img/logo-on-light.webp",
    width: 560,
    height: 178,
  },
  second: {
    src: "/img/logo-on-dark.webp",
    width: 560,
    height: 178,
  },
};

export function MakuzoLogo({ className, priority = false, variant = "default" }) {
  const logo = LOGOS[variant] ?? LOGOS.default;

  return (
    <Image
      src={logo.src}
      alt="Makuzo"
      width={logo.width}
      height={logo.height}
      priority={priority}
      sizes="(max-width: 640px) 160px, (max-width: 768px) 200px, 280px"
      className={clsx("w-auto object-contain", className)}
    />
  );
}
