import { generateToken } from "../generateToken.js";
import { catchAsyncError } from "../midddlewares/catchAsyncError.js";
import ErrorHandler from "../midddlewares/errorHandler.js";
import { PostModel } from "../models/postSchema/PostModel.js";
import { UserModel } from "../models/userSchema/userModel.js";
import bcrypt from "bcrypt";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary";

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
    return next(new ErrorHandler("Password Mismatch", 400, false));
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
  // const file=req.file;
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
export const forgetPassword = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("User does not exist", 400, false));
  }
  const resetToken = await user.generatePasswordResetToken();
  await user.save();
  const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
  const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Password Recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    return next(new ErrorHandler(error.message, 500, false));
  }
});

// export const getSinglePost = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await UserModel.findOne({ email });
//     const post = user.posts[0];
//     console.log(post._id + "adads");
//     if (post) {
//       const findPost = await PostModel.findOne({ _id: post._id });
//       return res.status(200).json({
//         message: "found",
//         data: findPost,
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "server error on getting single post",
//     });
//   }
// };

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
