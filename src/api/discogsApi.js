import axios from "axios";
import { DISCOGS_API_CONFIG, DEFAULT_HEADERS } from "./config";

const discogsClient = axios.create({
  baseURL: DISCOGS_API_CONFIG.baseURL,
  headers: DEFAULT_HEADERS,
});

export const searchReleases = async ({
  country,
  year,
  genre = "",
  page,
  rowsPerPage,
}) => {
  const params = new URLSearchParams({
    per_page: rowsPerPage,
    page,
  });
  if (genre) {
    params.append("genre", genre);
  }
  if (year) {
    params.append("year", year);
  }
  if (country) {
    params.append("country", country);
  }
  const response = await discogsClient.get(`/database/search?${params}`);
  return response.data;
};

export const getArtistReleases = async (artistId) => {
  const response = await discogsClient.get(`/artists/${artistId}/releases`);
  return response.data;
};

export const getReleaseDetails = async (releaseId) => {
  const response = await discogsClient.get(`/releases/${releaseId}`);
  return response.data;
};
