import express from "express";
import { getStories, getStory } from "../controllers/story.js";

const router = express.Router();

router.get("/", getStories);
router.get("/:id", getStory);

export default router;
