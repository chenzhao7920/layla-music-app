import React, { Suspense, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { restoreSession } from "../redux/reducers/authReducer";
const ProtectedLayout = React.memo(() => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("layla_access_token");
      setIsAuthorized(!!token);
      if (token) {
        dispatch(restoreSession());
      }
      setIsLoading(false);
    };
    checkAuth();
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!isAuthorized) {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Outlet />
    </Suspense>
  );
});

export default ProtectedLayout;
