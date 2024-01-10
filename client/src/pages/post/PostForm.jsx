import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../../redux/reducers/alertsSlice";
import toast from "react-hot-toast";
import API from "../../utils/API";
import { addPostToUser } from "../../redux/reducers/userReducer";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(showLoading());
    try {
      const response = await API.post("/post/create-post", {
        title,
        description,
        imageUrl,
      });
      const { data } = response;
      console.log(data);
      console.log(data?.data?._id);
      dispatch(addPostToUser(data?.data?._id));
      if (data?.success) {
        setTitle("");
        setDescription("");
        setImageUrl("");
        toast.success(data?.message);
        navigate("/user");
      } else {
        toast.error(data?.message || "Something went wrong!");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      dispatch(hideLoading());
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-[12rem] p-6 bg-white rounded-md shadow-md ">
      <h2 className="text-2xl font-semibold mb-6">Post a Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {/* <input
            type="file"
            name="imageURL"
            value={formData.imageURL}
            placeholder="Image URL"
            onChange={handleChange}
            className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          /> */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
           Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
