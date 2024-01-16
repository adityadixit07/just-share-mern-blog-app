import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

const SchedulingForm = () => {
  const [content, setContent] = useState("");
  const [publishAt, setPublishAt] = useState(new Date());

  const handlePublish = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/schedulePost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          publishAt,
        }),
      });
      const {data}=response;
      if (dat?.status===200) {
        toast.success("Post scheduled successfully!");
      } else {
        toast.error("Failed to schedule post. Please try again.");
      }
    } catch (error) {
      console.error("Error scheduling post:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Schedule a Post</h2>
      <form onSubmit={handlePublish} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Content:
            <textarea
              className="mt-1 p-2 block w-full rounded-md border-gray-300"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Publish At:
            <DatePicker
              selected={publishAt}
              onChange={(date) => setPublishAt(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              minDate={new Date()}
              dateFormat="MMMM d, yyyy h:mm aa"
              className="mt-1 p-2 block w-full rounded-md border-gray-300"
            />
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Schedule Post
        </button>
      </form>
    </div>
  );
};

export default SchedulingForm;
