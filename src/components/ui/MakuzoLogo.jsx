import Image from "next/image";
import clsx from "clsx";

const LOGOS = {
  default: {
    src: "/img/Makuzo-logo.webp",
    width: 560,
    height: 373,
  },
  second: {
    src: "/img/Makuzo-logo-second.webp",
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
      sizes="(max-width: 768px) 120px, 140px"
      className={clsx("h-auto w-auto object-contain", className)}
    />
  );
}
