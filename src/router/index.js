import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "../views/signin";
import SignUp from "../views/signup";
import ProtectedLayout from "../components/protextedLayout";

const Home = lazy(() => import("../views/home"));
const Album = lazy(() => import("../views/album"));
const Artist = lazy(() => import("../views/artist"));

const routes = () => {
  return (
    <Routes>
      {/* Public routes - no Suspense needed */}
      <Route path="/auth/signin" element={<SignIn />} />
      <Route path="/auth/signup" element={<SignUp />} />

      {/* Protected routes with Suspense */}
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/artist/:artist_id/:name" element={<Artist />} />
        <Route path="/album/:album_id/:title" element={<Album />} />
      </Route>
    </Routes>
  );
};
export default routes;
