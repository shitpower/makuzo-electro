import { SITE_LOCATION } from "@/lib/site-location";

const DEFAULT_MAP = {
  placeName: "Makuzo",
  latitude: SITE_LOCATION.latitude,
  longitude: SITE_LOCATION.longitude,
  zoom: 16,
};

/**
 * Parse lat/lng (and optional place name / zoom) from a map URL (OSM or similar).
 * @param {string} url
 * @returns {{ latitude?: number; longitude?: number; placeName?: string; zoom?: number } | null}
 */
export function parseMapUrl(url) {
  if (!url || typeof url !== "string") return null;

  const trimmed = url.trim();
  if (!trimmed) return null;

  try {
    const parsed = new URL(trimmed);
    const combined = `${parsed.pathname}${parsed.search}${parsed.hash}`;

    const atMatch = combined.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)(?:,(\d+(?:\.\d+)?)z)?/);
    if (atMatch) {
      return {
        latitude: Number(atMatch[1]),
        longitude: Number(atMatch[2]),
        zoom: atMatch[3] ? Math.round(Number(atMatch[3])) : undefined,
      };
    }

    const hashMap = parsed.hash.match(/#map=(\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)/);
    if (hashMap) {
      return {
        zoom: Math.round(Number(hashMap[1])),
        latitude: Number(hashMap[2]),
        longitude: Number(hashMap[3]),
      };
    }

    const mlat = parsed.searchParams.get("mlat");
    const mlon = parsed.searchParams.get("mlon");
    if (mlat && mlon) {
      const latitude = Number(mlat);
      const longitude = Number(mlon);
      if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
        return { latitude, longitude };
      }
    }

    const q = parsed.searchParams.get("q");
    if (q) {
      const decoded = decodeURIComponent(q.replace(/\+/g, " "));
      const coordOnly = decoded.match(/^(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)$/);
      if (coordOnly) {
        return {
          latitude: Number(coordOnly[1]),
          longitude: Number(coordOnly[2]),
        };
      }

      const placeAt = decoded.match(/^(.+?)@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)$/);
      if (placeAt) {
        return {
          placeName: placeAt[1].trim(),
          latitude: Number(placeAt[2]),
          longitude: Number(placeAt[3]),
        };
      }

      return { placeName: decoded.trim() };
    }

    const ll = parsed.searchParams.get("ll") || parsed.searchParams.get("sll");
    if (ll) {
      const [lat, lng] = ll.split(",").map(Number);
      if (Number.isFinite(lat) && Number.isFinite(lng)) {
        return { latitude: lat, longitude: lng };
      }
    }
  } catch {
    return null;
  }

  return null;
}

/**
 * @param {Record<string, unknown> | null | undefined} map
 */
export function resolveMapConfig(map) {
  const source = map && typeof map === "object" ? map : {};
  const latitude = Number(source.latitude);
  const longitude = Number(source.longitude);
  const zoom = Number(source.zoom);

  return {
    placeName: String(source.placeName || source.place || DEFAULT_MAP.placeName).trim(),
    latitude: Number.isFinite(latitude) ? latitude : DEFAULT_MAP.latitude,
    longitude: Number.isFinite(longitude) ? longitude : DEFAULT_MAP.longitude,
    zoom: Number.isFinite(zoom) && zoom > 0 ? Math.round(zoom) : DEFAULT_MAP.zoom,
  };
}

/**
 * @param {Record<string, unknown> | null | undefined} map
 */
export function getOsmEmbedUrl(map) {
  const config = resolveMapConfig(map);
  const delta = Math.max(0.002, 0.018 * Math.pow(2, 14 - config.zoom));
  const minLng = config.longitude - delta;
  const maxLng = config.longitude + delta;
  const minLat = config.latitude - delta;
  const maxLat = config.latitude + delta;
  const marker = `${config.latitude},${config.longitude}`;

  return `https://www.openstreetmap.org/export/embed.html?bbox=${minLng}%2C${minLat}%2C${maxLng}%2C${maxLat}&layer=mapnik&marker=${marker}`;
}

/**
 * @param {Record<string, unknown> | null | undefined} map
 */
export function getOsmOpenUrl(map) {
  const config = resolveMapConfig(map);
  return `https://www.openstreetmap.org/?mlat=${config.latitude}&mlon=${config.longitude}#map=${config.zoom}/${config.latitude}/${config.longitude}`;
}

/**
 * @param {Record<string, unknown> | null | undefined} map
 */
export function getOsmDirectionsUrl(map) {
  const config = resolveMapConfig(map);
  return `https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=%3B${config.latitude}%2C${config.longitude}`;
}

export { DEFAULT_MAP };
