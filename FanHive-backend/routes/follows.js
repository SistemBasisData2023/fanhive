import express from "express";
import {
  getFollows,
  addFollows,
  deleteFollows,
} from "../controllers/follow.js";

const router = express.Router();

router.get("/:username", getFollows);
router.post("/:username", addFollows);
router.delete("/:username", deleteFollows);

export default router;
