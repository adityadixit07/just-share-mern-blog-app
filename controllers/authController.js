import { generateToken } from "../generateToken.js";
import { catchAsyncError } from "../midddlewares/catchAsyncError.js";
import ErrorHandler from "../midddlewares/errorHandler.js";
import { PostModel } from "../models/postSchema/PostModel.js";
import { UserModel } from "../models/userSchema/UserModel.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary";
import sendMail from "../utils/sendMail.js";

export const registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new ErrorHandler("Please enter all fields", 400, false));
  }
  const file = req.file;
  if (!file) {
    return next(new ErrorHandler("Please Upload Avatar", 400, false));
  }
  if (!name || !email || !password) {
    return next(new ErrorHandler("Please enter all fields", 400, false));
  }
  const userExists = await UserModel.findOne({ email });
  if (userExists) {
    // res.status(400).json({ success: false, message: "User already exists" });
    return next(new ErrorHandler("User already exists", 400, false));
  }

  const fileUri = getDataUri(file);
  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
  // console.log(mycloud.public_id,"public id");

  // hashed password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await UserModel.create({
    name,
    email,
    password: hashedPassword,
    avatar: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });
  await user.save();
  const token = generateToken({ id: user._id });
  res.cookie("token", token, { httpOnly: true });
  res.status(201).json({
    success: true,
    message: `Hi ${name}, your account created successfully`,
    data: user,
    token: token,
  });
});

export const loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    // res.status(400).json({ success: false, message: "User does not exist" });
    return next(new ErrorHandler("User does not exist", 400, false));
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    // res.status(400).json({ success: false, message: "Password Mismatch" });
    return next(new ErrorHandler("Invalid credentials", 400, false));
  }
  // console.log(user._id);
  const token = generateToken({ id: user._id });
  res.cookie("token", token, { httpOnly: true });
  // console.log(token);
  res.status(200).json({
    success: true,
    data: user,
    message: `${user.name} login successfully`,
    token: token,
  });
});

// update name, email, password of the logged in user
export const updateProfile = catchAsyncError(async (req, res, next) => {
  const { name, email } = req.body;
  if (name && name.length < 3) {
    return next(new ErrorHandler("Name must be at least 3 characters", 400));
  }
  if (email && email.length < 6 && !email.includes("@")) {
    return next(new ErrorHandler("Email must be at least 6 characters", 400));
  }
  const user = await UserModel.findOne({ _id: req.body.userId });
  if (!user) {
    return next(new ErrorHandler("User not found", 404, false));
  }
  if (name) {
    user.name = name;
  }
  if (email) {
    user.email = email;
  }
  // if(file){
  //   const fileUri = getDataUri(file);
  //   const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
  //   // destroy the previous image
  //   await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  //   user.avatar = {
  //     public_id: mycloud.public_id,
  //     url: mycloud.secure_url,
  //   };
  // }

  await user.save();
  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: user,
  });
});

// get user info byid
export const getUserById = catchAsyncError(async (req, res, next) => {
  const user = await UserModel.findOne({ _id: req.body.userId });
  if (!user) {
    return next(new ErrorHandler("User not found", 404, false));
  }
  res.status(200).json({
    success: true,
    message: "User found successfully",
    data: user,
  });
});

export const getAllUser = catchAsyncError(async (req, res, next) => {
  if (req.body.userId === null) {
    const users = await UserModel.find({}).select(
      "name followers following posts avatar"
    );
    res.status(200).json({
      success: true,
      data: users,
      message: "All users",
    });
  } else {
    const userId = req.body.userId;
    // if (!userId) {
    //   return next(new ErrorHandler("User not found", 404, false));
    // }
    const users = await UserModel.find({
      _id: { $ne: req.body.userId },
    }).select("name followers following posts avatar");
    res.status(200).json({
      success: true,
      message: "All users",
      data: users,
    });
  }
});

// follow user
export const followUser = catchAsyncError(async (req, res, next) => {
  const user = await UserModel.findOne({ _id: req.body.userId }); //logged in user
  if (!user) {
    return next(new ErrorHandler("User does not exist", 400, false));
  }
  // console.log(String(user._id));
  const userToFollowId = req.params.id; //id of the user to follow
  // console.log(userToFollowId);
  if (userToFollowId === String(user._id)) {
    return next(new ErrorHandler("You can't follow yourself", 400, false));
  } else {
    const userToFollow = await UserModel.findOne({ _id: userToFollowId });
    if (!userToFollow) {
      return next(new ErrorHandler("User does not exist", 400, false));
    }
    const isAlreadyFollowing = user.following.includes(userToFollowId);
    if (isAlreadyFollowing) {
      return next(
        new ErrorHandler("You are already following this user", 400, false)
      );
    }
    await user.following.push(userToFollowId);
    await userToFollow.followers.push(user._id);
    await user.save();
    await userToFollow.save();
    res.status(200).json({
      success: true,
      message: "Followed ✅",
      data: user,
    });
  }
});

// unfollow user
export const unfollowUser = catchAsyncError(async (req, res, next) => {
  const user = await UserModel.findOne({ _id: req.body.userId });
  const userToUnfollowId = req.params.id;
  if (userToUnfollowId === String(user._id)) {
    return next(new ErrorHandler("You can't unfollow yourself", 400, false));
  }
  const userToUnfollow = await UserModel.findOne({ _id: userToUnfollowId });
  if (!userToUnfollow) {
    return next(new ErrorHandler("User does not exist", 400, false));
  }
  const isAlreadyFollowing = user.following.includes(userToUnfollowId);
  if (!isAlreadyFollowing) {
    return next(
      new ErrorHandler("You are not following this user", 400, false)
    );
  }

  await user.following.pull(userToUnfollowId);
  await userToUnfollow.followers.pull(user._id);
  await user.save();
  await userToUnfollow.save();
  res.status(200).json({
    success: true,
    message: "Unfollowed ✅",
    data: user,
  });
});

// get followers list

// when user click on other user's profile, it will show all the posts of that user and the user's info
export const getOtherUserDetail = catchAsyncError(async (req, res, next) => {
  // show all users profile except the logged in user
  if (req.body.userId === null) {
    // return all user
    const otherUsers = await UserModel.find({}).select(
      "name followers following posts"
    );
    res.status(200).json({
      success: true,
      data: otherUsers,
      message: "All users",
    });
  } else {
    // const userId = req.body.userId;
    // console.log(userId)
    const otherUsers = await UserModel.find({
      _id: { $ne: req.body.userId },
    }).select("name followers following posts");
    res.status(200).json({
      success: true,
      message: "All users",
      data: otherUsers,
    });
  }
});

// show other user post when user click on other user's profile post tab
export const getOtherUserPost = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });
  const userId = req.params.id;
  if (!user) {
    return next(new ErrorHandler("User does not exist", 400, false));
  }
  if (userId) {
    const userToFind = await UserModel.findOne({ _id: userId });
    if (!userToFind) {
      return next(new ErrorHandler("User does not exist", 400, false));
    }
    const userPosts = userToFind.posts;
    // get the post of details
    const posts = [];
    for (let i = 0; i < userPosts.length; i++) {
      const post = await PostModel.findOne({ _id: userPosts[i]._id });
      posts.push(post);
    }
    res.status(200).json({
      success: true,
      message: "user found",
      data: posts.length === 0 ? "No post !" : posts,
    });
  }
});

export const logoutUser = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("User does not exist", 400, false));
  }
  // clear cookie
  res.cookie("token", "", { expires: new Date(0) });
  // reset token
  user.token = "";
  await user.save();
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

// change password
export const changePassword = catchAsyncError(async (req, res, next) => {
  const { email, password, newPassword } = req.body;
  const user = await UserModel.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("User does not exist", 400, false));
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return next(new ErrorHandler("Incorect old Password", 400, false));
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});

// send password reset link when user forget the password
export const forgotPassword = catchAsyncError(async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return next(new ErrorHandler("User not found", 404, false));
    }
    const resetToken = await user.generatePasswordResetToken();
    await user.save();
    // reset password link
    const resetPasswordLink = `${process.env.RESET_PASSWORD_CLIENT_URL}/reset-password/${resetToken}`;
    console.log(resetPasswordLink, "reset link");
    await sendMail({
      recipientEmail: user.email,
      recipientName: user.name,
      resetPasswordLink,
    });
    return res.status(200).json({
      success: true,
      message: "Reset password email sent",
      data: user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500, false));
  }
});

// reset password
export const resetPassoword = catchAsyncError(async (req, res, next) => {
  try {
    const { password } = req.body;
    const token = req.params.token;
    const user = await UserModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorHandler("Invalid or expired token", 400, false));
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500, false));
  }
});

// verify reset token
export const verifyResetToken = catchAsyncError(async (req, res, next) => {
  const token = req.params.token;
  const user = await UserModel.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ErrorHandler("Invalid or expired token", 400, false));
  }
  res.status(200).json({ success: true, message: "Token verified" });
});

export const getUserProfile = catchAsyncError(async (req, res, next) => {
  const { userId } = req.params;
  // console.log(userId);
  if (!userId) {
    return next(new ErrorHandler("Please enter id", 400, false));
  }
  const user = await UserModel.findOne({ _id: userId });
  res.status(200).json({
    success: true,
    message: "profile found",
    data: user,
  });
});

// update avatar of the logged in user
export const updateAvatar = catchAsyncError(async (req, res, next) => {
  const user = await UserModel.findOne({ _id: req.body.userId });
  console.log(req.body.userId, "asdfasf");
  if (!user) {
    return next(new ErrorHandler("User not found", 404, false));
  }
  const file = req.file;
  const fileUri = getDataUri(file);
  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
  // console.log(mycloud.public_id,"public id");

  // destroy the previous image
  await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  user.avatar = {
    public_id: mycloud.public_id,
    url: mycloud.secure_url,
  };
  await user.save();
  res.status(200).json({
    success: true,
    message: "Avatar updated successfully",
    data: user,
  });
});

// get following list
export const getFollowings = catchAsyncError(async (req, res, next) => {
  const { userId } = req.params;
  // console.log(userId);
  if (req.body.userId === null) {
    return next(new ErrorHandler("Please login first", 400, false));
  }
  const followingList = await UserModel.findOne({
    _id: userId,
  }).select("following");
  const EachFollowingDetail = [];
  for (let i = 0; i < followingList.following.length; i++) {
    const follower = await UserModel.findOne({
      _id: followingList.following[i],
    });
    // ab har ek follower ka name avatar aur id extract karna hai
    EachFollowingDetail.push({
      name: follower.name,
      avatar: follower.avatar.url,
      _id: follower._id,
    });
  }

  res.status(200).json({
    success: true,
    message: "Followings",
    data: EachFollowingDetail,
  });
});

export const getFollowers = catchAsyncError(async (req, res, next) => {
  const { userId } = req.params;
  // console.log(userId);
  if (req.body.UserId === null) {
    return next(new ErrorHandler("Please login first", 400, false));
  }
  const followersList = await UserModel.findOne({
    _id: userId,
  }).select("followers");
  const EachFollowersDetail = [];
  for (let i = 0; i < followersList.followers.length; i++) {
    const follower = await UserModel.findOne({
      _id: followersList.followers[i],
    });
    // ab har ek follower ka name avatar aur id extract karna hai
    EachFollowersDetail.push({
      name: follower.name,
      avatar: follower.avatar.url,
      _id: follower._id,
    });
  }
  res.status(200).json({
    success: true,
    message: "Followers",
    data: EachFollowersDetail,
  });
});

// send email

// delete the account
export const deleteAccount = catchAsyncError(async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ _id: req.body.userId });
    if (!user) {
      return next(new ErrorHandler("User not found", 404, false));
    }

    // Delete related posts
    await PostModel.deleteOne({ userId: user._id });

    // Remove the user from others' followers and following lists
    await UserModel.updateMany(
      { $or: [{ followers: user._id }, { following: user._id }] },
      { $pull: { followers: user._id, following: user._id } }
    );

    // Delete the user
    await UserModel.deleteOne({ _id: user._id });

    return res.status(200).json({
      success: true,
      message: "Your account deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});
