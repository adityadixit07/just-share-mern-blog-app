import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import dbConnect from "./dbConnect.js";
import { userRouter } from "./routes/userRoutes.js";
import { postRouter } from "./routes/postRoutes.js";
import errorMiddleware from "./errorMiddleware.js";
import cloudinary from "cloudinary";
import cron from "node-cron";
import path from "path";
import { fileURLToPath } from "url";
import { PostModel } from "./models/postSchema/PostModel.js";
import { receiveMessageRouter } from "./routes/receiveMessageRoute.js";

dotenv.config();

const app = express();
dbConnect();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

app.use(express.json()); // to parse the body of the request
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*", credentials: true }));
app.use(morgan("dev"));

// routes
app.use("/api/user", userRouter);

app.use("/api/post", postRouter);

app.use("/api/contact", receiveMessageRouter);

// schedule posts every minute cron job
cron.schedule("* * * * *", async () => {
  // Check and publish scheduled posts every minute
  const postsToPublish = await PostModel.find({
    scheduledAt: { $lte: new Date() },
    published: false,
  });

  postsToPublish.forEach(async (post) => {
    post.published = true;
    await post.save();
    console.log(`Post ${post._id} published.`);
  });
});

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("./client/dist"));
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const staticPath = path.join(__dirname, "./client/dist");
app.use(express.static(staticPath));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/dist/index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(errorMiddleware);
