import React from "react";
import { useParams } from "react-router-dom";
import { getArtistReleases, getReleaseDetails } from "../../api/discogsApi";
import AlbumCard from "./compoments/albumCard";
import { useQuery, useQueries } from "@tanstack/react-query";
const Artist = () => {
  const { artist_id, name } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["artist_releases", artist_id],
    queryFn: () => getArtistReleases(artist_id),
  });

  const artistReleasesDetailQueries = useQueries({
    queries: (data?.releases || []).map((item) => ({
      queryKey: ["release_details", item.id],
      queryFn: () => getReleaseDetails(item.id),
      enabled: !!data, // Only fetch artist data if release data is available
    })),
  });
  const isLoadingArtistReleases = artistReleasesDetailQueries.some(
    (query) => query.isLoading
  );
  const detailedReleases = (data?.releases || []).reduce(
    (acc, release, index) => {
      const details = artistReleasesDetailQueries[index]?.data;
      acc = [...acc, { ...release, details }];
      return acc;
    },
    []
  );
  if (isLoading) return <p>loading ...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <div className="flex items-center gap-4">
        <a href="/" className="hover:underline max-sm:px-4">
          Homepage
        </a>
        {" / "}
        <h1 className="py-4 text-[32px] font-bold">{name}</h1>
      </div>
      <div className="flex flex-wrap gap-2 max-sm:px-4">
        {!isLoadingArtistReleases &&
          detailedReleases?.map((item) => {
            return (
              <AlbumCard
                data={item?.details}
                key={item.id}
                isLoading={isLoading}
              />
            );
          })}
      </div>
    </>
  );
};

export default Artist;
