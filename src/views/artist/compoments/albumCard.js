import React from "react";
import { useQuery } from "@tanstack/react-query";
import FavoriteButton from "../../../components/favoriateButton";
import { getReleaseDetails } from "../../../api/discogsApi";
const AlbumCard = ({ releaseId, delay }) => {
  const delayedGetReleaseDetails = async () => {
    await delay();
    return getReleaseDetails(releaseId);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["release_details", releaseId],
    queryFn: () => delayedGetReleaseDetails(releaseId),
    retry: 5,
  });
  if (isLoading) return <>loading...</>;
  if (error) return <></>;
  return (
    <div className="w-full sm:w-[336px] overflow-hidden bg-white rounded shadow-lg">
      <img
        className="object-cover w-full h-64"
        src={data?.images?.[0]?.uri}
        alt={data?.title}
      />
      <div className="p-4">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">{data?.title}</h2>
          <FavoriteButton type="album" id={data?.master_id} />
        </div>
        <p className="mt-2 text-sm text-gray-600">{data?.artists?.[0]?.name}</p>
        <p className="mt-2 text-xs text-gray-500">{data?.released_formatted}</p>
        <p className="mt-4 text-sm text-gray-700 space-y-2 max-h-32 overflow-y-auto">
          {data?.notes}
        </p>
      </div>
    </div>
  );
};
export default AlbumCard;
