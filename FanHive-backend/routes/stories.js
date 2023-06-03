import express from "express";
import {
  addStory,
  getStories,
  getStory,
  deleteStory,
  updateStory,
  getFollowedStories,
  getHeartedStories,
  addChapter,
  updateChapter,
  getProfileStories,
} from "../controllers/story.js";

const router = express.Router();

router.get("/", getStories);
router.get("/:id", getStory);
router.get("/profile/:username", getProfileStories);
router.get("/followed/:id", getFollowedStories);
router.get("/heart/:id", getHeartedStories);
router.post("/", addStory);
router.delete("/:id", deleteStory);
router.put("/:id", updateStory);

router.post("/:id/ch", addChapter);
router.put("/:id/ch/:cid", updateChapter);

export default router;
