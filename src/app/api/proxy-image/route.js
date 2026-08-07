import {
  cleanPath,
  decodeGithubPathQuery,
  getAssetsGithubBranch,
  getAssetsGithubOwner,
  getAssetsGithubRepo,
  getOctokit,
  isGithubAssetsConfigured,
} from "@/lib/github-assets";

export const runtime = "nodejs";

/** @param {string} filename */
function getContentType(filename) {
  const ext = filename.split(".").pop()?.toLowerCase();
  const mimeTypes = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    svg: "image/svg+xml",
    avif: "image/avif",
  };
  return mimeTypes[ext] || "application/octet-stream";
}

/** @param {import("next/server").NextRequest} request */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const pathParam = searchParams.get("path") || searchParams.get("url");
    if (!pathParam) {
      return Response.json({ error: "Path or URL parameter is required" }, { status: 400 });
    }

    let cleanPathValue = decodeGithubPathQuery(pathParam);
    if (/^https?:\/\//i.test(cleanPathValue)) {
      const urlMatch = cleanPathValue.match(/raw\.githubusercontent\.com\/[^/]+\/[^/]+\/[^/]+\/(.+)$/i);
      if (urlMatch?.[1]) {
        cleanPathValue = decodeGithubPathQuery(urlMatch[1]);
      } else {
        return Response.json({ error: "Invalid URL" }, { status: 400 });
      }
    }

    const normalizedPath = cleanPath(cleanPathValue);
    if (!isGithubAssetsConfigured()) {
      return Response.json({ error: "GITHUB_TOKEN / ASSETS_GITHUB_* are not configured" }, { status: 500 });
    }

    const owner = getAssetsGithubOwner();
    const repo = getAssetsGithubRepo();
    const branch = getAssetsGithubBranch();
    const octokit = getOctokit();

    const { data } = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
      owner,
      repo,
      path: normalizedPath,
      ref: branch,
    });

    if (Array.isArray(data) || data.type !== "file") {
      return Response.json({ error: "Path is not a file" }, { status: 400 });
    }

    let content = null;
    if (typeof data.content === "string" && data.content.length > 0 && data.encoding === "base64") {
      content = Buffer.from(data.content, "base64");
    } else if (typeof data.download_url === "string" && data.download_url) {
      const rawRes = await fetch(data.download_url, { cache: "no-store" });
      if (!rawRes.ok) {
        return Response.json({ error: "Unable to download file" }, { status: 502 });
      }
      content = Buffer.from(await rawRes.arrayBuffer());
    } else {
      return Response.json({ error: "Unable to read file content" }, { status: 502 });
    }

    return new Response(content, {
      status: 200,
      headers: {
        "Content-Type": getContentType(data.name),
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    if (/** @type {{ status?: number }} */ (error).status === 404) {
      return Response.json({ error: "File not found" }, { status: 404 });
    }
    const status = /** @type {{ status?: number }} */ (error).status || 500;
    return Response.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status },
    );
  }
}
