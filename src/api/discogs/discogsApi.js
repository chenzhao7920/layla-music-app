/**
 * Discogs API Client and Utility Functions
 *
 * This module provides utility functions for interacting with the Discogs API.
 * It includes methods for searching releases, fetching artist releases, retrieving
 * release details, and getting master release information.
 */
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

export const getMaster = async (masterid) => {
  const response = await discogsClient.get(`/masters/${masterid}`);
  return response.data;
};
