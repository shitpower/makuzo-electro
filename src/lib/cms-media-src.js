/**
 * Client-safe CMS media URL helpers (no Octokit).
 * Keep this module free of server-only / Node deps so SiteImage stays light.
 */

/** @param {string} raw */
export function decodeGithubPathQuery(raw) {
  let s = String(raw).trim();
  for (let i = 0; i < 4; i++) {
    if (!/%[0-9A-Fa-f]{2}/i.test(s)) break;
    try {
      const next = decodeURIComponent(s);
      if (next === s) break;
      s = next;
    } catch {
      break;
    }
  }
  return s;
}

/** @param {string | undefined | null} p @returns {string} */
export function cleanPath(p) {
  if (!p) return "";
  const norm = String(p)
    .replace(/^(\.\/)+/, "")
    .replace(/\/+$/, "");
  if (norm.includes("..") || norm.startsWith("/")) {
    throw new Error("Invalid path");
  }
  return norm === "." ? "" : norm;
}

/** @param {string} repoPath */
export function buildProxyImageUrl(repoPath) {
  const clean = cleanPath(repoPath);
  if (!clean) return "";
  return `/api/proxy-image?path=${encodeURIComponent(clean)}`;
}

/** @param {string | null | undefined} url */
export function normalizeCmsMediaSrc(url) {
  if (url == null || typeof url !== "string") return "";
  const s = url.trim();
  if (!s) return "";
  if (s.startsWith("/api/proxy-image")) return s;
  if (s.startsWith("data:") || s.startsWith("blob:")) return s;

  const rawMatch = s.match(/^https?:\/\/raw\.githubusercontent\.com\/[^/]+\/[^/]+\/[^/]+\/(.+)$/i);
  if (rawMatch?.[1]) {
    try {
      return buildProxyImageUrl(decodeGithubPathQuery(rawMatch[1]));
    } catch {
      return s;
    }
  }

  if (!/^https?:\/\//i.test(s) && !s.startsWith("/")) {
    try {
      return buildProxyImageUrl(s);
    } catch {
      return s;
    }
  }

  if (s === "/img/MainImg.png") return "/img/MainImg.webp";
  if (
    s === "/img/Logo_Makuzo.png" ||
    s === "/img/Logo_Makuzo.webp" ||
    s === "/img/Makuzo-logo.webp"
  ) {
    return "/img/logo-on-light.webp";
  }

  return s;
}
