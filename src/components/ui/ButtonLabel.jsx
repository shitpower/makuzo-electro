import { FiArrowRight } from "react-icons/fi";
import clsx from "clsx";

const ARROW_SUFFIX = /\s*→\s*$/;

export function normalizeButtonText(text) {
  return String(text ?? "").replace(ARROW_SUFFIX, "").trim();
}

export function buttonTextHasArrow(text) {
  return ARROW_SUFFIX.test(String(text ?? ""));
}

export function ButtonLabel({ children, arrow = false, className }) {
  const text = normalizeButtonText(children);
  const showArrow = arrow || buttonTextHasArrow(children);

  if (!showArrow) {
    return className ? <span className={className}>{text}</span> : text;
  }

  return (
    <>
      <span className={clsx("leading-none", className)}>{text}</span>
      <FiArrowRight className="btn-arrow" strokeWidth={2.25} aria-hidden />
    </>
  );
}
