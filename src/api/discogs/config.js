export const DISCOGS_API_CONFIG = {
  baseURL: "https://api.discogs.com",
  key: process.env.REACT_APP_DISCOGS_API_KEY,
  secret: process.env.REACT_APP_DISCOGS_API_SECRET,
};
export const DEFAULT_HEADERS = {
  Authorization: `Discogs key=${DISCOGS_API_CONFIG.key}, secret=${DISCOGS_API_CONFIG.secret}`,
};
