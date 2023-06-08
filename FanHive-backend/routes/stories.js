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
  getTaggedStories,
  getFandomStories,
  getSearchedStories,
} from "../controllers/story.js";

const router = express.Router();

router.get("/", getStories);
router.get("/:id", getStory);
router.get("/profile/:username", getProfileStories);
router.get("/followed/:id", getFollowedStories);
router.get("/heart/:id", getHeartedStories);
router.get("/tags/:name", getTaggedStories);
router.get("/fandom/:name", getFandomStories);
router.get("/search/:title", getSearchedStories);
router.post("/", addStory);
router.delete("/:id", deleteStory);
router.put("/:id", updateStory);

router.post("/:id/ch", addChapter);
router.put("/:id/ch/:cid", updateChapter);

export default router;
