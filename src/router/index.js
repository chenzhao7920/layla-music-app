import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
const Home = lazy(() => import("../views/home"));
const Album = lazy(() => import("../views/album"));
const Artist = lazy(() => import("../views/artist"));
const routes = () => {
  return (
    <>
      <Suspense>
        <Routes>
          <Route path={"/"}>
            <Route index element={<Home />}></Route>
            <Route path={"/artist/:artist_id/:name"} element={<Artist />} />
            <Route path={"/album/:album_id/:title"} element={<Album />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};
export default routes;
