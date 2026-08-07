/**
 * GitHub Contents API helpers for private asset repo (Octokit) — server only.
 */
import "server-only";

import { Octokit } from "octokit";

import {
  buildProxyImageUrl,
  cleanPath,
  decodeGithubPathQuery,
  normalizeCmsMediaSrc,
} from "@/lib/cms-media-src";

export { buildProxyImageUrl, cleanPath, decodeGithubPathQuery, normalizeCmsMediaSrc };

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
