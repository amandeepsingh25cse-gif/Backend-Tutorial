import { Router } from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import { createPost, getPosts, updatePost, deletePost } from "../controllers/post.controller.js";

const router = Router();

router.use(verifyToken);

router.route("/").post(createPost).get(getPosts);
router.route("/:id").put(updatePost).delete(deletePost);

export default router;