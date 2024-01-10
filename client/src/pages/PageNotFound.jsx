import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pb-32">
      <h1 className="text-6xl font-bold text-gray-800 mb-6">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-6 ml-3 text-center">
        Oops! Page not found.
      </h2>
      <p className="text-lg text-gray-500 mb-8 ml-2">
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>
      <Link
        to="/"
        className="px-4 py-3 rounded-md bg-indigo-600 text-white font-semibold text-sm transition duration-300 hover:bg-indigo-700 hover:shadow-lg"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default PageNotFound;
