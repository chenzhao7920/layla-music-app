import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import SignIn from "../views/signin";
import SignUp from "../views/signup";
const Home = lazy(() => import("../views/home"));
const Album = lazy(() => import("../views/album"));
const Artist = lazy(() => import("../views/artist"));

const ProtectedLayout = () => {
  const { user, loading } = useSelector((state) => state.auth);
  if (loading) {
    return <div>Loading...</div>;
  }
  return user ? (
    <Suspense fallback={<div>Loading...</div>}>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to="/auth/signin" replace />
  );
};
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
