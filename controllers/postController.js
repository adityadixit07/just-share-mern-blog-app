import { catchAsyncError } from "../midddlewares/catchAsyncError.js";
import ErrorHandler from "../midddlewares/errorHandler.js";
import { PostModel } from "../models/postSchema/PostModel.js";
import { UserModel } from "../models/userSchema/userModel.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary";

export const createPost = catchAsyncError(async (req, res, next) => {
  const { title, description, imageUrl } = req.body;
  if (!title || !description || !imageUrl) {
    return next(new ErrorHandler("Please fill all the fields", 400, false));
  }
  const titleExist = await PostModel.findOne({ title });
  if (titleExist) {
    // res.status(400).json({ success: false, message: "Title already exist" });
    return next(
      new ErrorHandler("Title already exist, try another one", 400, false)
    );
  }
  const user = await UserModel.findById(req.body.userId);
  if (!user) {
    return next(new ErrorHandler("User not found", 400, false));
  }
  const post = await PostModel.create({
    title,
    description,
    imageUrl,
    userId: req.body.userId,
  });
  await post.save();

  user.posts.push(post._id);
  await user.save();
  res.status(201).json({
    success: true,
    message: "Post created successfully",
    data: post,
  });
});

// update post by id
export const updatePost = catchAsyncError(async (req, res, next) => {
  // try {
  const { title, description } = req.body;
  const post = await PostModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      title,
      description,
    },
    { new: true }
  );
  if (!post) {
    // res.status(400).json({ success: false, message: "Post not found" });
    return next(new ErrorHandler("Post not found", 400, false));
  }
  res.status(200).json({
    success: true,
    message: "Post updated successfully",
    data: post,
  });
});

// get all post of self only
export const getAllPost = catchAsyncError(async (req, res, next) => {
  // console.log(req.params.id + "params id");
  // console.log(req.user.id + "user id");
  if (req.params.id != req.body.userId) {
    return next(new ErrorHandler("Please Login", 401, false));
  }
  const posts = await PostModel.find({ userId: req.params.id });
  if (!posts) {
    return next(new ErrorHandler("No post found", 404, false));
  }
  res.status(200).json({
    status: true,
    message: "All post fetched successfully",
    data: posts,
  });
});

// delete  post by id
export const deletePost = catchAsyncError(async (req, res, next) => {
  const isPostExist = await PostModel.findOne({ _id: req.params.id });
  if (!isPostExist) {
    // res.status(400).json({ success: false, message: "Post not found" });
    return next(new ErrorHandler("Post not found", 400, false));
  }
  await PostModel.findByIdAndDelete({ _id: req.params.id });
  // update user post array
  const user = await UserModel.findById(req.body.userId);
  if (!user) {
    return next(new ErrorHandler("User not found", 400, false));
  }
  user.posts.pull(req.params.id);
  await user.save();

  res.status(200).json({
    success: true,
    message: "Post deleted successfully",
  });
});

export const getSinglePostInfo = catchAsyncError(async (req, res, next) => {
  const post = await PostModel.findById(req.params.id);
  if (!post) {
    return next(new ErrorHandler("No post found", 404, false));
  }
  res.status(200).json({
    status: true,
    message: "Post fetched successfully",
    data: post,
  });
});

// random post with limit when user is not logged in

export const getRandomPost = catchAsyncError(async (req, res, next) => {
  const { offset = 0, limit = 10 } = req.query;

  if (limit < 1) {
    return next(new ErrorHandler("Limit must be greater than 0", 400, false));
  }
  const randomPosts = await PostModel.aggregate([
    { $sample: { size: parseInt(limit) + parseInt(offset) } },
    { $skip: parseInt(offset) },
    {
      $lookup: {
        from: "users", // Replace with the name of your User collection
        localField: "userId",
        foreignField: "_id",
        as: "creatorInfo",
      },
    },
    {
      $addFields: {
        creatorName: { $arrayElemAt: ["$creatorInfo.name", 0] }, // Accessing the name from creatorInfo
        creatorAvatar: { $arrayElemAt: ["$creatorInfo.avatar", 0] },
      },
    },
    {
      $project: {
        creatorInfo: 0,
      },
    },
  ]);

  res.status(200).json({ success: true, data: randomPosts });
});

export const getUserPost = catchAsyncError(async (req, res, next) => {
  const { userId } = req.params; // Extracting userId from request parameters
console.log(userId);
  if (!userId) {
    return next(new ErrorHandler("User ID is missing", 400, false));
  }

  try {
    // Assuming PostModel contains the posts and userId is a field in each post
    const userPosts = await PostModel.find({ userId }); // Find posts based on userId

    if (!userPosts || userPosts.length === 0) {
      return next(new ErrorHandler("No posts found for this user", 404, false));
    }

    res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      data: userPosts,
    });
  } catch (error) {
    return next(new ErrorHandler("Error fetching user posts", 500, false));
  }
});
