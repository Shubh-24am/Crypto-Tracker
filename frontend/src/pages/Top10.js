import React, { useEffect, useState } from "react";
import Cards from "../components/Cards";
import DummyUi from "../components/DummyUi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Top10 = () => {
  const [data, setData] = useState([]);

  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user === "") {
      navigate("/login");
    } else {
      const url = `${process.env.REACT_APP_CRYPTO_API_URL || "https://api.coingecko.com/api/v3"}/search/trending/`;
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setData(data);
        })
        .catch((error) => {
        });
    }
  }, [user, navigate]);

  return data.length === 0 ? (
    <DummyUi />
  ) : (
    <div className="w-full min-h-screen bg-gray-50 py-8">
      <h1 className="text-2xl sm:text-4xl font-bold text-center mb-8">Top 10 Trending Coins</h1>
      <Cards apiData={data.coins} checker={"top10"} />
    </div>
  );
};

export default Top10;
