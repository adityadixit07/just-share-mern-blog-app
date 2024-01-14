import schedule from "node-schedule";
import moment from "moment";
import { PostModel } from "../models/postSchema/PostModel";

const schedulePost = () => {
  schedule.scheduleJob("*/1 * * * *", async () => {
    try {
      const now = moment();
      const scheduledPosts = await PostModel.find({
        scheduledDate: { $lte: now.toDate() },
        isPublished: false, // Add this condition to avoid republishing
      });

      scheduledPosts.forEach(async (post) => {
        // Your logic to publish the post goes here
        console.log(`Publishing scheduled post: ${post.title}`);
        post.isPublished = true; // Mark the post as published
        await post.save();
      });
    } catch (error) {
      console.error("Error processing scheduled posts:", error);
    }
  });
};

export default schedulePost;
