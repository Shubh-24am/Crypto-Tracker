import express from "express";
import { getWatchlist, addCoin, removeCoin } from "../controllers/watchlistController.js";

const router = express.Router();

router.get("/:userId", getWatchlist);
router.post("/add", addCoin);
router.post("/remove", removeCoin);

export default router;