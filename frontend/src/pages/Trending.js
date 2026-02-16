import { useState, useEffect } from "react";
import Cards from "../components/Cards";
import DummyUi from "../components/DummyUi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Trending() {
  const [data, setData] = useState([]);

  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user === "") {
      navigate("/login");
      return;
    }

    const url = `${process.env.REACT_APP_CRYPTO_API_URL || "https://api.coingecko.com/api/v3"}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
      });
  }, [user, navigate]);

  if (data.length === 0) {
    return <DummyUi />;
  } else {
    return (
      <div className="w-full min-h-screen bg-gray-50 py-8">
        <h1 className="text-2xl sm:text-4xl font-bold text-center mb-8">Trending Cryptocurrencies</h1>
        <Cards apiData={data} />
      </div>
    );
  }
}

export default Trending;
