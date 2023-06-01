import express from "express";
import { addStory, getStories, getStory, deleteStory, updateStory, getFollowedStories, getHeartedStories } from "../controllers/story.js";

const router = express.Router();

router.get("/", getStories);
router.get("/:id", getStory);
router.get("/followed/:id", getFollowedStories);
router.get("/heart/:id", getHeartedStories);
router.post("/", addStory);
router.delete("/:id", deleteStory);
router.put("/:id", updateStory);

export default router;
