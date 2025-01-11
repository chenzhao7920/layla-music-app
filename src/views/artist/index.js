import React from "react";
import { useParams } from "react-router-dom";

const Artist = () => {
  const { artist_id, name } = useParams();
  return (
    <>
      <div className="flex items-center gap-4">
        <a href="/" className="hover:underline max-sm:px-4">
          Homepage
        </a>
        {" / "}
        <h1 className="py-4 text-[32px] font-bold">
          {name}-{artist_id}
        </h1>
      </div>
    </>
  );
};

export default Artist;
