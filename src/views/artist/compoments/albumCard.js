import React from "react";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import FavoriteButton from "../../../components/favoriateButton";
import { getReleaseDetails } from "../../../api/discogs/discogsApi";

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

  if (error) return <></>;

  return (
    <div className="w-full sm:w-[336px] overflow-hidden bg-white rounded shadow-lg">
      {isLoading ? (
        <>
          <Skeleton height={256} />
          <div className="p-4">
            <Skeleton height={24} width="70%" />
            <Skeleton height={20} width="50%" className="mt-2" />
            <Skeleton height={16} width="40%" className="mt-2" />
            <Skeleton height={80} className="mt-4" />
          </div>
        </>
      ) : (
        <>
          <img
            className="object-cover w-full h-64"
            src={data?.images?.[0]?.uri}
            alt={data?.title}
          />
          <div className="p-4">
            <div className="w-full flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {data?.title}
              </h2>
              <FavoriteButton type="album" id={data?.master_id} />
            </div>
            <p className="mt-2 text-sm text-gray-600">
              {data?.artists?.[0]?.name}
            </p>
            <p className="mt-2 text-xs text-gray-500">
              {data?.released_formatted}
            </p>
            <p className="mt-4 text-sm text-gray-700 space-y-2 max-h-32 overflow-y-auto">
              {data?.notes}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default AlbumCard;
