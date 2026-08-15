import { Router } from "express";
import { createRating, deleteRating, getAll, getById, modifyRating, searchAnime } from "../controllers/functions.js";

const router = Router();

router.get("/",getAll);
router.get("/search/:title",searchAnime);
router.get("/:id",getById);
router.post("/",createRating);
router.put("/:id",modifyRating);
router.delete("/:id",deleteRating);

export default router;