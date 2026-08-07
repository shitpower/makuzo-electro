/**
 * Session options for Edge middleware (no server-only).
 */
import { AdminSessionConfigError, getAdminSessionOptions } from "@/lib/session-config";

export function getEdgeSessionOptions() {
  try {
    return getAdminSessionOptions();
  } catch (error) {
    if (error instanceof AdminSessionConfigError) {
      return null;
    }
    throw error;
  }
}
