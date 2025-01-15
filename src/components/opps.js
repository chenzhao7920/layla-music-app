import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
const OPPS = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const refreshPage = () => {
    navigate(location); // Refresh the current route
  };
  return (
    <div>
      <h2>Oops! Unable to load data.</h2>
      <p>Something went wrong. Please try again.</p>
      <button
        className="px-2 rounded-md bg-blue-200 hover:bg-blue-300 transition-colors"
        onClick={refreshPage}
      >
        Retry
      </button>
    </div>
  );
};
export default OPPS;
