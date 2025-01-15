import noCoverImg from "../../../statics/images/no_cover_img.png";
import FavoriteButton from "../../../components/favoriateButton";
import MuiLink from "../../../components/muiLink";
const HomeAlbumCard = ({ album, artists }) => {
  return (
    <div
      key={album.id}
      className="flex w-full gap-8 p-10 overflow-hidden bg-white rounded-lg sm:justify-between max-sm:flex-col drop-shadow-lg"
    >
      <img
        alt="cover_img"
        className="w-40 h-40 rounded-full animate-spin-slow max-sm:self-center"
        src={!!album.cover_image ? album.cover_image : noCoverImg}
      ></img>
      <div className="flex flex-col w-full gap-2">
        <a
          href={"/album/" + album?.id + "/" + album?.title}
          className="underline"
        >
          <h3 className="font-semibold text-[24px] max-sm:text-center">
            {album.title}
          </h3>
        </a>
        <div className="flex gap-2 max-sm:self-center">
          <div className="flex flex-col overflow-hidden rounded-t-md">
            <div className="flex items-center justify-center px-2 text-white bg-black">
              Have
            </div>
            <div className="flex items-center justify-center px-2 border">
              {album.community?.have}
            </div>
          </div>
          <div className="flex flex-col overflow-hidden rounded-t-md">
            <div className="flex items-center justify-center px-2 text-white bg-black">
              Want
            </div>
            <div className="flex items-center justify-center px-2 border">
              {album.community?.want}
            </div>
          </div>
        </div>
        <p>
          <span className="font-medium">Artists</span>:{" "}
          {artists?.length > 0
            ? artists.map((a, index) => (
                <a
                  key={index}
                  href={"/artist/" + a.id + "/" + a.name}
                  className="underline"
                >
                  {a.name}
                  {/* Add a comma unless it's the last artist */}
                  {index < artists.length - 1 && ", "}{" "}
                </a>
              ))
            : "-"}
        </p>
        <p>
          <span className="font-medium">Format</span>:{" "}
          {album.format?.join(", ")}
        </p>
        <p>
          <span className="font-medium">Genre</span>: {album.genre?.join(", ")}
        </p>
        <p>
          <span className="font-medium">Country</span>: {album.country}
        </p>
        <p>
          <span className="font-medium">Year</span>: {album.year}
        </p>
      </div>
      <div className="flex items-center">
        <FavoriteButton type="album" id={album.id} />
        <MuiLink url={"/album/" + album?.id + "/" + album?.title} />
      </div>
    </div>
  );
};
export default HomeAlbumCard;
