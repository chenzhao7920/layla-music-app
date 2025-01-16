// src/components/Header.js
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state.auth?.user);

  return (
    <div
      className="w-full p-8 text-white relative"
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(49, 49, 47, 0.75),
            rgba(49, 49, 47, 0.8)
          ),
          url("https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80")
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "200px",
      }}
    >
      <div className="relative z-10">
        <div className="absolute flex flex-row-reverse inset-0">
          <div>
            {user ? (
              <Link
                //onClick={handleSignOut}
                className="px-2 py-1 rounded text-white bg-yellow-600 hover:bg-yellow-700 transition"
              >
                Sign Out
              </Link>
            ) : (
              <Link
                //onClick={handleSignIn}
                className="px-2 py-1 rounded text-white bg-blue-600 hover:bg-blue-800 transition"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
        <h1 className="text-5xl font-bold leading-tight">Layla Music Search</h1>
        <p className="text-2xl font-light mt-4 max-w-2xl">
          Discover a song you will love
        </p>
      </div>
    </div>
  );
};

export default Header;
