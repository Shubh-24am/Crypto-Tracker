import React, { useEffect } from "react";

import Cards from "../components/Cards";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Watchlist = () => {
  const user = useSelector((store) => store.user);
  const watchlistData = useSelector((store) => store.watchlist);
  var navigate = useNavigate();

  useEffect(() => {
    if (!user || user === "") {
      navigate("/login");
    }
  }, [user, navigate]);

  return watchlistData.length === 0 ? (
    <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-600">No coins in watchlist</h2>
        <p className="text-gray-500 mt-4">Add coins to your watchlist to see them here</p>
      </div>
    </div>
  ) : (
    <div className="w-full min-h-screen bg-gray-50 py-8">
      <h1 className="text-2xl sm:text-4xl font-bold text-center mb-8">My Watchlist</h1>
      <Cards apiData={watchlistData} />
    </div>
  );
};

export default Watchlist;
