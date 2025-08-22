import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-5">
      <h1 className="text-6xl font-extrabold text-gray-900">404</h1>
      <p className="text-lg md:text-xl text-gray-600 mt-3">
        Oops! The page you are looking for does not exist.
      </p>
      <p className="text-sm text-gray-500 mt-2">
        It might have been moved, deleted, or the link may be broken.
      </p>

      <div className="mt-6">
        <Link
          to="/home"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 text-white text-sm hover:bg-gray-800 transition"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
