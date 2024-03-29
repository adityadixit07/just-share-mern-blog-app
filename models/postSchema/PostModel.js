import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please enter title"],
    },
    description: {
      type: String,
      required: [true, "Please enter description"],
    },
    imageUrl: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVO0mln2BFp7E2nA3-m1jb_z1Ttko5OAw-VXE1AHmB_A&s",
    },
    scheduledDate: {
      type: Date,
      default: Date.now,
    },
    scheduledTime: {
      type: String,
      default: Date.now,
    },
    published: {
      type: Boolean,
      default: false,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const PostModel = mongoose.model("Post", postSchema);
