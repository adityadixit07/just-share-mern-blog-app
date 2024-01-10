import express from "express";
import {
  changePassword,
  followUser,
  forgetPassword,
  getAllUser,
  getOtherUserDetail,
  getOtherUserPost,
  getUserById,
  getUserProfile,
  loginUser,
  registerUser,
  unfollowUser,
  updateProfile,
} from "../controllers/authController.js";
import Authenticate from "../Authenticate.js";
import singleUpload from "../midddlewares/singleUpload.js";

const router = express.Router();

router.route("/register").post(singleUpload, registerUser);
router.route("/login").post(loginUser);
router.route("/get-user-info-by-id").get(Authenticate, getUserById);
router.route("/update-profile").put(Authenticate, updateProfile);
router.route("/get-all-users").get(getAllUser);
router.route("/change-password").put(Authenticate, changePassword);
// router.route("/forget-password").post(forgetPassword);

router.route("/follow/:id").post(Authenticate, followUser);
router.route("/unfollow/:id").post(Authenticate, unfollowUser);
router.route("/get-other-user-details").get(getOtherUserDetail);
router.route("/other-user-posts/:id").get(Authenticate, getOtherUserPost);

router.route("/profile/:userId").get(getUserProfile);

export const userRouter = router;
