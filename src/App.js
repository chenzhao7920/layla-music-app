import AlbumList from "./compoments/albumList";

function App() {
  return (
    <div className="flex justify-center w-screen min-h-screen">
      <div className="w-full max-w-[1024px]">
        <div className="w-full p-10 bg-[#31312f] text-white text-[40px] font-bold">
          Layla Assignment
        </div>
        <AlbumList />
      </div>
    </div>
  );
}

export default App;
