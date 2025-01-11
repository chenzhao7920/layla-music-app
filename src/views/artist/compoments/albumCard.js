import React from "react";

const AlbumCard = ({ data }) => {
  return (
    <div className="w-full sm:w-[336px] overflow-hidden bg-white rounded shadow-lg">
      <img
        className="object-cover w-full h-64"
        src={data.images?.[0]?.uri}
        alt={data.title}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{data?.title}</h2>
        <p className="mt-2 text-sm text-gray-600">{data?.artists?.[0]?.name}</p>
        <p className="mt-2 text-xs text-gray-500">{data.released_formatted}</p>
        <p className="mt-4 text-sm text-gray-700">{data?.notes}</p>
        <a
          href={data?.uri}
          className="inline-block mt-4 text-sm text-blue-600 hover:text-blue-800"
          target="_blank"
          rel="noopener noreferrer"
        >
          View More
        </a>
      </div>
    </div>
  );
};
export default AlbumCard;
