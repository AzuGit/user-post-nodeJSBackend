import { Router } from "express";
import {
  createPost,
  deletePost,
  readAllPosts,
  updatePost,
} from "../controllers/post.controller.js";

const router = Router();

router.post("/create", createPost);
router.patch("/update/:id", updatePost);
router.delete("/delete/:id", deletePost);
router.get("/all", readAllPosts);

export default router;
