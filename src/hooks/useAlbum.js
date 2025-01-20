/**
 * Hook to getAlbum data
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
