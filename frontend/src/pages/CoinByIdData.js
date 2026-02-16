import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CoinByIdData = () => {
  const { id } = useParams();

  useEffect(() => {
    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(`${process.env.REACT_APP_CRYPTO_API_URL || "https://api.coingecko.com/api/v3"}/coins/${id}`, options)
      .then((response) => response.json())
      .catch((err) => console.error(err));
  }, [id]);

  function increment() {
    // TODO: implement
  }

  return (
    <>
      <h1 className="text-[60px]">CoinByIdData</h1>
    </>
  );
};

export default CoinByIdData;
