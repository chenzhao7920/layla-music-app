export const DISCOGS_API_CONFIG = {
  baseURL: "https://api.discogs.com",
  key: "mMQvICmTYYOOZxfrWHCv",
  secret: "kVERgDgMHTUJPigbcICidiNQGVSqMHPn",
};
export const DEFAULT_HEADERS = {
  Authorization: `Discogs key=${DISCOGS_API_CONFIG.key}, secret=${DISCOGS_API_CONFIG.secret}`,
};
