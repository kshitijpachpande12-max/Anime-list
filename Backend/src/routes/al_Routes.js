import { Router } from "express";
import { Addtowatchlist, createRating, deleteRating, deletewatchlist, getAll, getById, modifyRating, searchAnime, watchlistanime } from "../controllers/functions.js";

const router = Router();

router.get("/",getAll);
router.get("/search/:title",searchAnime);
router.get("/watchlist",watchlistanime);
router.post("/watchlist",Addtowatchlist);
router.delete("/watchlist/:id",deletewatchlist);
router.get("/:id",getById);
router.post("/",createRating);
router.put("/:id",modifyRating);
router.delete("/:id",deleteRating);

export default router;