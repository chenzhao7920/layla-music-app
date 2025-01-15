import React from "react";
import { getArtistReleases } from "../../api/discogsApi";
import AlbumCard from "./compoments/albumCard";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Oops from "../../components/opps";
const Artist = () => {
  const { artist_id, name } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["artist_releases", artist_id],
    queryFn: () => getArtistReleases(artist_id),
  });

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  if (error) return <Oops />;
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <a href="/" className="hover:underline max-sm:px-4">
            Homepage
          </a>
          {" / "}
          <h1 className="py-4 text-[32px] font-bold">{name}</h1>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-10 max-sm:px-4">
        {!isLoading &&
          (data?.releases || [])
            ?.filter((item) => !!item?.main_release)
            .map((item, idx) => {
              return (
                <AlbumCard
                  releaseId={item.main_release}
                  key={idx}
                  delay={() => delay(idx * 500)}
                />
              );
            })}
      </div>
    </>
  );
};

export default Artist;
