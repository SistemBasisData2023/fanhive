import express from "express";
import { addHeart, deleteHeart, getHearts } from "../controllers/heart.js";

const router = express.Router();

router.get("/:sid", getHearts);
router.post("/:sid", addHeart);
router.delete("/:sid", deleteHeart);

export default router;
