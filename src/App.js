import Routes from "./router";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/header";
function App() {
  return (
    <BrowserRouter>
      <div className="flex justify-center w-screen min-h-screen">
        <div className="w-full max-w-[1024px]">
          {/* Header */}
          <Header />
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
