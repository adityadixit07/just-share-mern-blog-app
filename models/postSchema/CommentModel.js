// commentModel.js
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    text: {
      type: String,
      required: [true, "Please enter a comment"],
    },
  },
  {
    timestamps: true,
  }
);

export const CommentModel = mongoose.model("Comment", commentSchema);
