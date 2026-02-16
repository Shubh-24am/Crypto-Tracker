import React from "react";
import Card from "./Card";

const Cards = ({ apiData, checker }) => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 py-6 mx-auto container">
      {apiData.map((element, index) => (
        <Card
          item={checker === "top10" ? element.item : element}
          key={checker === "top10" ? element.item.id : element.id}
          checker={checker}
        />
      ))}
    </div>
  );
};

export default Cards;
