import { catchAsyncError } from "../midddlewares/catchAsyncError.js";
import ErrorHandler from "../midddlewares/errorHandler.js";
import { CommentModel } from "../models/postSchema/CommentModel.js";
import { PostModel } from "../models/postSchema/PostModel.js";
import { UserModel } from "../models/userSchema/UserModel.js";
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
        from: "users",
        localField: "userId", // Field in the posts collection
        foreignField: "_id", // Field in the users collection
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

// like the post
export const likePost = catchAsyncError(async (req, res, next) => {
  const post = await PostModel.findById({ _id: req.params.postId });
  if (!post) {
    return next(new ErrorHandler("Post not found", 404, false));
  }
  // check if user already liked the post
  const isLiked = post.likes.includes(req.body.userId);
  if (isLiked) {
    return next(new ErrorHandler("You already liked this post", 400, false));
  }
  // now check kya user dislike kiya hai
  const isDisliked = post.dislikes.includes(req.body.userId);
  if (isDisliked) {
    await post.updateOne({ $pull: { dislikes: req.body.userId } });
  }
  // now like the post
  await post.updateOne({ $push: { likes: req.body.userId } });
  await post.save();
  res.status(200).json({ success: true, message: "Post liked successfully" });
});

//dislike the post
export const dislikePost = catchAsyncError(async (req, res, next) => {
  const post = await PostModel.findById({ _id: req.params.postId });
  if (!post) {
    return next(new ErrorHandler("Post not found", 404, false));
  }
  // check if user already liked the post or not done anyting yet
  const isLiked = post.likes.includes(req.body.userId);
  if (isLiked) {
    await post.updateOne({ $pull: { likes: req.body.userId } });
  }
  //agar user dilike kar chuka hai toh fir se dislike na kare
  const isDisliked = post.dislikes.includes(req.body.userId);
  if (isDisliked) {
    return next(new ErrorHandler("You already disliked this post", 400, false));
  }
  // now dislike the post
  await post.updateOne({ $push: { dislikes: req.body.userId } });
  await post.save();
  res
    .status(200)
    .json({ success: true, message: "Post disliked successfully" });
});

// add a comment feature on a post
export const addComment = catchAsyncError(async (req, res, next) => {
  const post = await PostModel.findById(req.params.postId);
  if (!post) {
    return next(new ErrorHandler("Post not found", 404, false));
  }
  const { text } = req.body;
  const userInfo = await UserModel.findById(req.body.userId).select(
    "avatar name"
  );
  const userName = userInfo.name;
  const userAvatar = userInfo.avatar.url;
  const comment = await CommentModel.create({
    text,
    userId: req.body.userId,
    userAvatar,
    userName,
  });
  await comment.save();
  post.comments.push(comment._id);
  await post.save();
  res.status(201).json({
    success: true,
    message: "Comment added successfully",
    data: comment,
  });
});

// fetch comment of a post
export const fetchCommentsOfAPost = catchAsyncError(async (req, res, next) => {
  const post = await PostModel.findById(req.params.postId);
  if (!post) {
    return next(new ErrorHandler("Post not found", 404, false));
  }
  const comments = await CommentModel.find({ _id: post.comments }).sort({
    createdAt: -1,
  });
  if (!comments) {
    return next(new ErrorHandler("No comment found", 404, false));
  }
  res.status(200).json({
    success: true,
    message: "Comment fetched successfully",
    data: comments,
  });
});

// schedule the post
export const schedulePost = catchAsyncError(async (req, res, next) => {
  const { title, description, imageUrl, scheduledDate, scheduledTime } =
    req.body;
  if (!title || !description || !imageUrl || !scheduledDate || !scheduledTime) {
    return next(new ErrorHandler("Please fill all the fields", 400, false));
  }
  const scheduledPost = await PostModel.create({
    title,
    description,
    imageUrl,
    scheduledDate,
    scheduledTime,
    userId: req.body.userId,
  });
  await scheduledPost.save();
  res.status(201).json({
    success: true,
    message: "Post scheduled successfully and will be published soon",
    data: scheduledPost,
  });
});

