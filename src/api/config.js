export const DISCOGS_API_CONFIG = {
  baseURL: "https://api.discogs.com",
  key: "mMQvICmTYYOOZxfrWHCv",
  secret: "kVERgDgMHTUJPigbcICidiNQGVSqMHPn",
  userAgent: "MusicApp/1.0.0",
};
export const DEFAULT_HEADERS = {
  "User-Agent": DISCOGS_API_CONFIG.userAgent,
  Authorization: `Discogs key=${DISCOGS_API_CONFIG.key}, secret=${DISCOGS_API_CONFIG.secret}`,
};
