import React, { useState } from "react";
import toast from "react-hot-toast";
import API from "../../utils/API";
import { hideLoading, showLoading } from "../../redux/reducers/alertsSlice";
import { useDispatch } from "react-redux";

const SchedulePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const dispatch = useDispatch();

  const handleSchedulePost = async () => {
    dispatch(showLoading());
    try {
      const response = await API.post("/post/schedule-post", {
        title,
        description,
        scheduleDate,
        scheduleTime,
      });
      const { data } = response;
      console.log(data)
      if (data?.success) {
        toast.success(data?.message);
        setTitle("");
        setDescription("");
        setScheduleDate("");
        setScheduleTime("");
        setImageUrl("");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    } finally {
      dispatch(hideLoading());
    }
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
        <label>Image Url</label>
        <input
          type="text"
          name="imaegUrl"
          value={imageUrl}
          placeholder="Enter image url"
          onChange={(e) => setImageUrl(e.target.value)}
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
