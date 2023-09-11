import React from "react";
import { Link } from "react-router-dom";
import PageNotFound from "../assests/pagenotfound.png";

export const NotFound = () => {
  return (
    <div className="page-not-found-container flex flex-col items-center justify-center">
      <img src={PageNotFound} alt="Page not found" />
      <Link to="/">
        <button className="page-not-found-btn flex items-center justify-center px-4 py-3 rounded-lg bg-inherit text-white border-base cursor-pointer">
          <span className="page-not-found-icon material-symbols-outlined">
            arrow_back
          </span>
          Go back to notes
        </button>
      </Link>
    </div>
  );
};
