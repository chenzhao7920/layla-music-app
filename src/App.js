import Routes from "./router";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <div className="flex justify-center w-screen min-h-screen">
        <div className="w-full max-w-[1024px]">
          <div className="w-full p-10 bg-[#31312f] text-white text-[40px] font-bold">
            Layla Assignment
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
