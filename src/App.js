import Routes from "./router";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <div className="flex justify-center w-screen min-h-screen">
        <div className="w-full max-w-[1024px]">
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
            <div className="absolute inset-0 bg-gradient-to-b from-[#31312f]/10 to-[#31312f]/30"></div>
            <div className="relative z-10">
              <h1 className="text-5xl font-bold leading-tight">Search Music</h1>
              <p className="text-2xl font-light mt-4 max-w-2xl">
                Discover a song you will love
              </p>
            </div>
          </div>
          {/* Main Content */}
          <main>
            <Routes />
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
