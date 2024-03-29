import express from "express";
import {
  changePassword,
  deleteAccount,
  followUser,
  forgotPassword,
  getAllUser,
  getFollowers,
  getFollowings,
  getOtherUserDetail,
  getOtherUserPost,
  getUserById,
  getUserProfile,
  loginUser,
  registerUser,
  resetPassoword,
  unfollowUser,
  updateAvatar,
  updateProfile,
  verifyResetToken,
} from "../controllers/authController.js";
import Authenticate from "../Authenticate.js";
import singleUpload from "../midddlewares/singleUpload.js";

const router = express.Router();

router.route("/register").post(singleUpload, registerUser);
router.route("/login").post(loginUser);
// update avatar
router.route("/update-avatar").put(Authenticate, singleUpload, updateAvatar);
// delete the account of the user
router.route("/delete-account/:userId").delete(Authenticate, deleteAccount);

router.route("/get-user-info-by-id").get(Authenticate, getUserById);
router.route("/update-profile").put(Authenticate, updateProfile);
router.route("/get-all-users").get(getAllUser);
router.route("/change-password").put(Authenticate, changePassword);

router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").put(resetPassoword);
router.route("/verify-reset-token/:token").put(verifyResetToken);

router.route("/follow/:id").post(Authenticate, followUser);
router.route("/unfollow/:id").post(Authenticate, unfollowUser);
router.route("/get-other-user-details").get(getOtherUserDetail);
router.route("/other-user-posts/:id").get(Authenticate, getOtherUserPost);

router.route("/profile/:userId").get(getUserProfile);

// get following and followes list
router.route("/followings/:userId").get(Authenticate, getFollowings);
router.route("/followers/:userId").get(Authenticate, getFollowers);

export const userRouter = router;
