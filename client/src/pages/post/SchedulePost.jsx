import React, { useState } from "react";

const SchedulePost = () => {
  const [title, setTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");

  const handleSchedulePost = () => {
    // Implement your logic to schedule the post
    console.log("Post scheduled:", {
      postContent,
      scheduleDate,
      scheduleTime,
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md mt-[8rem]  mb-10">
      <h2 className="text-2xl font-bold mb-6">Schedule Post</h2>

      <div className="mb-4">
        <label
          htmlFor="postContent"
          className="block text-sm font-medium text-gray-600"
        >
          Title
        </label>
        <input
          type="text"
          name="title"
          placeholder="Write exciting title.."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-2 rounded-md w-full rounded-md px-4 py-2 focus:outline-none"
        />
        <label
          htmlFor="postContent"
          className="block text-sm font-medium text-gray-600"
        >
          Description
        </label>
        <textarea
          id="postContent"
          name="postContent"
          rows="4"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          className="mt-1 p-2 block w-full border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Write more about the topic...."
        ></textarea>
      </div>

      <div className="mb-4">
        <label
          htmlFor="scheduleDate"
          className="block text-sm font-medium text-gray-600"
        >
          Schedule Date
        </label>
        <input
          type="date"
          id="scheduleDate"
          name="scheduleDate"
          value={scheduleDate}
          onChange={(e) => setScheduleDate(e.target.value)}
          className="mt-1 p-2 block w-full border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="scheduleTime"
          className="block text-sm font-medium text-gray-600"
        >
          Schedule Time
        </label>
        <input
          type="time"
          id="scheduleTime"
          name="scheduleTime"
          value={scheduleTime}
          onChange={(e) => setScheduleTime(e.target.value)}
          className="mt-1 p-2 block w-full border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <button
        type="button"
        onClick={handleSchedulePost}
        className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-300"
      >
        Schedule Post
      </button>
    </div>
  );
};

export default SchedulePost;
