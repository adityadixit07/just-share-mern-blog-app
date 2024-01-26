import express from "express";
import {
  addComment,
  createPost,
  deletePost,
  dislikePost,
  fetchCommentsOfAPost,
  getAllPost,
  getRandomPost,
  getSinglePostInfo,
  getUserPost,
  likePost,
  schedulePost,
  searchPostByTitle,
  updatePost,
} from "../controllers/postController.js";
import Authenticate from "../Authenticate.js";

const router = express.Router();

router.route("/create-post").post(Authenticate, createPost);
router.route("/update-post/:id").put(Authenticate, updatePost);
router.route("/delete-post/:id").delete(Authenticate, deletePost);
router.route("/get-all-posts/:id").get(Authenticate, getAllPost);
router.route("/get-post-by-id/:id").get(Authenticate, getSinglePostInfo);

// to see the post of a general user
router.route("/user-post/:id").get(getSinglePostInfo);

// get random posts
router.route("/random").get(getRandomPost);
// view post of a user
router.route("/user-posts/:userId").get(getUserPost);

// like post
router.route("/like-post/:postId").put(Authenticate, likePost);
// dislikepost
router.route("/dislike-post/:postId").put(Authenticate, dislikePost);
// add comment on post
router.route("/comment/:postId").post(Authenticate, addComment);
// fetch comment of a post
router.route("/fetch-comments/:postId").get(fetchCommentsOfAPost);

// schedule post route
router.route("/schedule-post").post(Authenticate, schedulePost);

// seach post by title
router.route("/search-post/:title").get(searchPostByTitle);

export const postRouter = router;
