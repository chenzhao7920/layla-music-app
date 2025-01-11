import React from "react";
import { useParams } from "react-router-dom";
import { getArtistReleases } from "../../api/discogsApi";
import AlbumCard from "./compoments/albumCard";
import { useQuery } from "@tanstack/react-query";
const Artist = () => {
  const { artist_id, name } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["artist_releases", artist_id],
    queryFn: () => getArtistReleases(artist_id),
  });

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
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
        {!isLoading &&
          (data?.releases || [])?.map((item, idx) => {
            return (
              <AlbumCard
                releaseId={item.id}
                key={item.id}
                delay={() => delay(idx * 50)}
              />
            );
          })}
      </div>
    </>
  );
};

export default Artist;
