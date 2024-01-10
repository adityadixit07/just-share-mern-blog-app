import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../utils/API";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/reducers/alertsSlice";
import { FaEdit } from "react-icons/fa";

const SinglePost = () => {
  const [post, setPost] = useState({});
  const { postId } = useParams();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState({}); // State to hold edited post data

  const fetchPost = async () => {
    dispatch(showLoading());
    try {
      const response = await API.get(`/post/get-post-by-id/${postId}`);
      // if (response?.status === 200) {
      //   toast.success(response?.data?.message);
      // }
      const { data } = response.data;
      setPost(data);
      setEditedPost(data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    dispatch(showLoading());
    try {
      const response = await API.put(`/post/update-post/${postId}`, editedPost);
      console.log(response?.status);
      toast.success(response?.data?.message);
      setIsEditing(false);
      fetchPost();
      dispatch(hideLoading());
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      dispatch(hideLoading());
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPost({ ...editedPost, [name]: value });
  };

  return (
      <div className="container mx-auto mt-[8rem] ">
      <div className="max-w-screen-md mx-auto bg-white rounded-lg overflow-hidden shadow-md">
        <div className="p-4">
          <div className="flex justify-between">
            <h1 className="text-2xl font-semibold mb-2">
              {isEditing ? (
                <input
                  type="text"
                  name="title"
                  placeholder="Enter title"
                  value={editedPost.title || ""}
                  className={`border rounded-md w-full resize-none p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    isEditing ? "border-blue-400" : ""
                  }`}
                  onChange={handleInputChange}
                />
              ) : (
                post?.title
              )}
            </h1>
            {!isEditing && (
              <FaEdit
                className="ml-2 inline-block text-blue-500 cursor-pointer hover:text-blue-700"
                onClick={handleEdit}
              />
            )}
          </div>

          <p className="text-sm text-gray-500 mb-2">
            Created:{" "}
            {new Date(post?.createdAt).toLocaleString().toLocaleUpperCase()}
          </p>
          <img
            src={post?.imageUrl}
            alt="post image"
            className="w-full h-[300px] rounded-md object-contain"
          />
          <p className="text-base mt-4">
            {isEditing ? (
              <textarea
                name="description"
                value={editedPost.description || ""}
                onChange={handleInputChange}
                placeholder="Update your description.........."
                // className="border rounded-md h-40 w-full resize-none p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                className={`border rounded-md h-40 w-full resize-none p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  isEditing ? "border-blue-400" : ""
                }`}
              />
            ) : (
              post?.description
            )}
          </p>
          {isEditing && (
            <button
              onClick={handleSave}
              className="block mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 text-center"
            >
              Save
            </button>
          )}
          <Link
            to="/"
            className="block mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 text-center"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
