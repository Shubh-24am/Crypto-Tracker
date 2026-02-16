import React from "react";
import { MdOutlineStarRate } from "react-icons/md";
import { FaArrowTrendDown } from "react-icons/fa6";
import { FaArrowTrendUp } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { handleAddcoin, handleremovecoin } from "../store/watchlistSlice";
import { MdOutlineStar } from "react-icons/md";
const Card = ({ item, checker }) => {
  const watchlistData = useSelector(function (store) {
    return store.watchlist;
  });
  const isPresent = (element, array) =>
    array.some((obj) => JSON.stringify(obj) === JSON.stringify(element));

  const starRenderingLogic = isPresent(item, watchlistData);

  const dispatch = useDispatch();

  function addCoin() {
    dispatch(handleAddcoin(item));
  }

  function removeCoin() {
    dispatch(handleremovecoin(item));
  }

  const imageSrc = item.image || item.thumb || item.small;
  const symbolText = item.symbol ? item.symbol.toUpperCase() : "N/A";
  const priceValue = item.current_price ?? item.data?.price;
  const volumeValue = item.total_volume ?? item.data?.total_volume;
  const marketCapValue = item.market_cap ?? item.data?.market_cap;
  const changeValue =
    item.price_change_24h ?? item.data?.price_change_percentage_24h?.usd;
  const trendValue =
    item.ath_change_percentage ?? item.data?.price_change_percentage_24h?.usd;
  const showChangeBadge = typeof item.price_change_24h === "number";

  return (
    <div className="w-full bg-white border border-gray-200 shadow-md rounded-lg p-4 flex flex-col hover:shadow-lg transition-shadow">
      <div className="flex gap-3 items-center mb-4">
        <abbr className="w-16 h-16 flex-shrink-0" title="Click here to know more.">
          <Link to={`/coin/${item.id}`}>
            <img
              src={checker === "top10" ? item.thumb : imageSrc}
              alt="Crypto symbol"
              className="w-full h-full object-contain"
            />
          </Link>
        </abbr>
        <div className="flex flex-col flex-grow">
          <h2 className="text-lg font-bold truncate">{item.name}</h2>
          <h2 className="text-sm font-semibold text-gray-500 uppercase">{symbolText}</h2>
        </div>
        <button
          onClick={!starRenderingLogic ? addCoin : removeCoin}
          className="flex-shrink-0 text-2xl cursor-pointer hover:scale-110 transition"
        >
          {!starRenderingLogic ? (
            <MdOutlineStarRate className="text-gray-400" />
          ) : (
            <MdOutlineStar className="text-yellow-400" />
          )}
        </button>
      </div>

      <div className="flex items-center gap-3 mb-3">
        {checker !== "top10" && showChangeBadge && (
          <span className="px-3 py-1 text-sm font-semibold bg-green-100 text-green-700 rounded-full">
            &#x24;{changeValue?.toFixed(2) || "N/A"}
          </span>
        )}
        <div className={`p-2 rounded-full ${(checker === "top10"
            ? item.data?.price_change_percentage_24h?.usd
            : trendValue) > 0
            ? "bg-green-100"
            : "bg-red-100"
          }`}>
          {checker === "top10" ? (
            item.data?.price_change_percentage_24h?.usd > 0 ? (
              <FaArrowTrendUp className="text-green-600" />
            ) : (
              <FaArrowTrendDown className="text-red-600" />
            )
          ) : trendValue > 0 ? (
            <FaArrowTrendUp className="text-green-600" />
          ) : (
            <FaArrowTrendDown className="text-red-600" />
          )}
        </div>
      </div>

      <h3 className="text-2xl font-bold text-blue-600 mb-3">
        &#x24;{checker === "top10"
          ? item.data?.price?.toFixed(2)
          : priceValue?.toFixed(2) || "N/A"}
      </h3>

      <div className="text-sm text-gray-600 space-y-1 flex-grow">
        <div className="flex justify-between">
          <span>Volume:</span>
          <span className="font-semibold">{checker === "top10" ? item.data?.total_volume : volumeValue}</span>
        </div>
        <div className="flex justify-between">
          <span>Market Cap:</span>
          <span className="font-semibold">{checker === "top10" ? item.data?.market_cap : marketCapValue}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
