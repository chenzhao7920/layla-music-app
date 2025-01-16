import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const Home = lazy(() => import("../views/home"));
const Album = lazy(() => import("../views/album"));
const Artist = lazy(() => import("../views/artist"));
const SignIn = lazy(() => import("../views/signin"));
const ProtectedLayout = () => {
  const { user, loading } = useSelector((state) => state.auth);
  if (loading) {
    return <div>Loading...</div>;
  }
  return user ? <Outlet /> : <Navigate to="/auth/signin" replace />;
};
const routes = () => {
  return (
    <>
      <Suspense>
        <Routes>
          {/* Public route */}
          <Route path="/auth/signin" element={<SignIn />} />
          {/* Protected routes */}
          <Route path={"/"} element={<ProtectedLayout />}>
            <Route path={"/"} element={<Home />} />
            <Route path={"/artist/:artist_id/:name"} element={<Artist />} />
            <Route path={"/album/:album_id/:title"} element={<Album />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};
export default routes;
