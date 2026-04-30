const ASSETS_BASE_URL = "https://bracco4x4.com/pruebaFtp";

export function getAssetUrl(path: string | null) {
  if (!path) {
    return null;
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${ASSETS_BASE_URL}${path}`;
}

export function isValidExternalUrl(url: string | null) {
  if (!url) {
    return false;
  }

  return url.startsWith("http://") || url.startsWith("https://");
}