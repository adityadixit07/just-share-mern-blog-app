import express from "express";
import {
  createPost,
  deletePost,
  getAllPost,
  getRandomPost,
  getSinglePostInfo,
  getUserPost,
  updatePost,
} from "../controllers/postController.js";
import Authenticate from "../Authenticate.js";

const router = express.Router();

router.route("/create-post").post(Authenticate, createPost);
router.route("/update-post/:id").put(Authenticate, updatePost);
router.route("/delete-post/:id").delete(Authenticate, deletePost);
router.route("/get-all-posts/:id").get(Authenticate, getAllPost);
router.route("/get-post-by-id/:id").get(Authenticate, getSinglePostInfo);


router.route('/user-posts/:userId').get(getUserPost);

// get random posts
router.route("/random").get(getRandomPost);

export const postRouter = router;
