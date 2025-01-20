import React from "react";
import FavoriteButton from "../../components/favoriateButton";
import { Link } from "react-router-dom";
import { useAlbum } from "../../hooks/useAlbum";
const Album = () => {
  const { data, isLoading, error } = useAlbum();

  if (error) return <p>Error: {error.message}</p>;
  return (
    !isLoading && (
      <>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:underline max-sm:px-4">
              Homepage
            </Link>
            {" / "}
            <h1 className="py-4 text-[32px] font-bold">{data?.title}</h1>
          </div>
          <div className="flex-end">
            <FavoriteButton type="album" id={data?.id} />
          </div>
        </div>
        <div className="flex w-full gap-8 p-10 overflow-hidden rounded-lg sm:justify-between max-sm:flex-col ">
          <img
            className="object-cover w-full h-64"
            src={data?.images?.[0]?.uri}
            alt={data?.title}
          />

          <div className="flex flex-col w-full gap-2">
            <h3 className="font-semibold text-[24px] max-sm:text-center">
              {data?.title}
            </h3>
            <p>
              <span className="font-medium">Artists</span>:{" "}
              {data?.artists?.length > 0
                ? data?.artists.map((a, idx) => (
                    <Link
                      key={idx}
                      to={"/artist/" + a.id + "/" + a.name}
                      className="underline"
                    >
                      {a.name}
                      {/* Add a comma unless it's the last artist */}
                      {idx < data?.artists.length - 1 && ", "}{" "}
                    </Link>
                  ))
                : "-"}
            </p>
            <p>
              <span className="font-medium">Styles</span>:{" "}
              {data?.styles?.join(", ")}
            </p>
            <p>
              <span className="font-medium">Genre</span>:{" "}
              {data?.genres?.join(", ")}
            </p>
            <p>
              <span className="font-medium">Year</span>: {data?.year}
            </p>
            <p>
              <span className="font-medium">Lowest Price</span>:{" "}
              {data?.lowest_price}
            </p>
          </div>
        </div>
        <div className="flex flex-col w-full gap-4 ">
          <h3 className="font-semibold text-[24px] max-sm:text-center">
            Tracklist
          </h3>
          {data?.tracklist?.map((item, idx) => (
            <div
              key={idx}
              className="flex w-full p-3 square-sm justify-between bg-slate-100 gap-4"
            >
              <p>
                {item.position} / {item.title}
              </p>
              <p>{item.duration}</p>
            </div>
          ))}
        </div>
      </>
    )
  );
};

export default Album;
