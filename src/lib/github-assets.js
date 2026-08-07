/**
 * GitHub Contents API helpers for private asset repo (Octokit).
 */
import { Octokit } from "octokit";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

/** @type {Octokit | null} */
let octokitSingleton = null;

export function getAssetsGithubOwner() {
  return process.env.ASSETS_GITHUB_OWNER || process.env.GITHUB_OWNER || "";
}

export function getAssetsGithubRepo() {
  return process.env.ASSETS_GITHUB_REPO || process.env.GITHUB_REPO || "";
}

export function getAssetsGithubBranch() {
  return process.env.ASSETS_GITHUB_BRANCH || process.env.GITHUB_BRANCH || "main";
}

export function isGithubAssetsConfigured() {
  return Boolean(GITHUB_TOKEN && getAssetsGithubOwner() && getAssetsGithubRepo());
}

/** @returns {string} */
export function getAssetsMediaUploadPrefix() {
  const raw = process.env.ASSETS_MEDIA_UPLOAD_PREFIX || "images";
  try {
    const p = cleanPath(raw);
    return p || "images";
  } catch {
    return "images";
  }
}

/** @returns {Octokit} */
export function getOctokit() {
  if (!octokitSingleton) {
    if (!GITHUB_TOKEN) {
      throw new Error("GITHUB_TOKEN is required");
    }
    octokitSingleton = new Octokit({ auth: GITHUB_TOKEN });
  }
  return octokitSingleton;
}

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
  if (s === "/img/Logo_Makuzo.png") return "/img/Logo_Makuzo.webp";

  return s;
}

export const GITHUB_CONTENTS_MAX_BYTES = 100 * 1024 * 1024;

/** @param {string} repoRelativePath @param {Buffer} buffer @param {string} message */
export async function putFileContentsToAssetsRepo(repoRelativePath, buffer, message) {
  const clean = cleanPath(repoRelativePath);
  if (!clean) throw new Error("Invalid path");
  if (!Buffer.isBuffer(buffer)) {
    throw new Error("Invalid buffer");
  }
  if (buffer.length > GITHUB_CONTENTS_MAX_BYTES) {
    throw new Error(`File too large for GitHub Contents API (max ${GITHUB_CONTENTS_MAX_BYTES} bytes)`);
  }

  const owner = getAssetsGithubOwner();
  const repo = getAssetsGithubRepo();
  const branch = getAssetsGithubBranch();
  const octokit = getOctokit();
  const content = buffer.toString("base64");

  try {
    const { data: existing } = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
      owner,
      repo,
      path: clean,
      ref: branch,
    });
    if (Array.isArray(existing) || existing.type !== "file" || !existing.sha) {
      throw new Error("Path exists but is not a file");
    }
    await octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
      owner,
      repo,
      path: clean,
      message,
      content,
      sha: existing.sha,
      branch,
    });
  } catch (err) {
    if (/** @type {{ status?: number }} */ (err).status === 404) {
      await octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
        owner,
        repo,
        path: clean,
        message,
        content,
        branch,
      });
    } else {
      throw err;
    }
  }
}

/** @param {string} repoRelativePath @param {string} message */
export async function deleteFileFromAssetsRepo(repoRelativePath, message) {
  const clean = cleanPath(repoRelativePath);
  if (!clean) throw new Error("Invalid path");

  const owner = getAssetsGithubOwner();
  const repo = getAssetsGithubRepo();
  const branch = getAssetsGithubBranch();
  const octokit = getOctokit();

  const { data: existing } = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
    owner,
    repo,
    path: clean,
    ref: branch,
  });

  if (Array.isArray(existing) || existing.type !== "file" || !existing.sha) {
    throw new Error("Path is not a file");
  }

  await octokit.request("DELETE /repos/{owner}/{repo}/contents/{path}", {
    owner,
    repo,
    path: clean,
    message,
    sha: existing.sha,
    branch,
  });
}
