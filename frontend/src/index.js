import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { cryptoStore } from "./store/cryptoStore";
import App from "./App";
import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import Trending from "./pages/Trending";
import Top10 from "./pages/Top10";
import CoinByIdData from "./pages/CoinByIdData";
import { NotFound } from "./pages/NotFound";
import "./index.css";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <Home /> },
        { path: "watchlist", element: <Watchlist /> },
        { path: "login", element: <Login /> },
        { path: "signin", element: <SignIn /> },
        { path: "trending", element: <Trending /> },
        { path: "top10", element: <Top10 /> },
        { path: "coin/:id", element: <CoinByIdData /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={cryptoStore}>
    <RouterProvider
      router={router}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    />
  </Provider>
);