/**
 * Custom Hook: useAlbum
 *
 * This hook fetches album data from the API whenever the URL parameter `album_id` changes.
 * It uses React Query for data fetching and caching.
 */
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMaster } from "../api/discogs/discogsApi";
export const useAlbum = (props) => {
  const { album_id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["album", album_id],
    queryFn: () => getMaster(album_id),
  });
  return {
    data,
    isLoading,
    error,
  };
};
