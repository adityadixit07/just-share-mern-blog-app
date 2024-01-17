import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { hideLoading, showLoading } from "../../redux/reducers/alertsSlice";
import toast from "react-hot-toast";
import {
  AiOutlineLike,
  AiFillLike,
  AiFillDislike,
  AiOutlineDislike,
} from "react-icons/ai";
import API from "../../utils/API";

const ViewPost = () => {
  const { user } = useSelector((state) => state.auth);
  const [post, setPost] = useState();
  const { postId } = useParams();
  const dispatch = useDispatch();

  const getPost = async () => {
    dispatch(showLoading());
    try {
      const response = await API.get(`/post/user-post/${postId}`);
      // console.log(response.data);
      const { data } = response.data;
      setPost(data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      dispatch(hideLoading());
    }
  };

  const handleLike = async () => {
    try {
      const response = await API.put(`/post/like-post/${postId}`);
      if (response?.status === 200) {
        setPost((prev) => ({
          ...prev,
          likes: [...prev.likes, user?._id],
          dislikes: prev.dislikes.filter((id) => id !== user?._id), // Remove from dislikes
        }));
        toast.success("You liked the post!");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleDislike = async () => {
    try {
      const response = await API.put(`/post/dislike-post/${postId}`);
      if (response?.status === 200) {
        setPost((prev) => ({
          ...prev,
          dislikes: [...prev.dislikes, user?._id],
          likes: prev.likes.filter((id) => id !== user?._id), // Remove from likes
        }));
        toast.success("You disliked the post!");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getPost();
  }, [postId]);

  return (
    <div className="container mx-auto my-8 mt-[6rem] px-4">
      {post?.length === 0 && (
        <h1 className="text-2xl text-red-500">Post not found</h1>
      )}
      {post && (
        <div className="max-w-2xl mx-auto">
          <Link
            to={`/`}
            className="text-blue-500 font-semibold hover:underline mb-4 block"
          >
            &larr; Go back
          </Link>
          <h1 className="text-4xl font-bold mb-4">{post?.title}</h1>
          <img
            className="w-full h-auto rounded-lg mb-4"
            src={post?.imageUrl}
            alt=""
          />
          <p className="text-gray-700">{post?.description}</p>

          <div className="flex items-center mt-4">
            <button onClick={handleLike} className="mr-2">
              {post?.likes.includes(user?._id) ? (
                <AiFillLike />
              ) : (
                <AiOutlineLike />
              )}
              {post?.likes.length} Likes
            </button>
            <button onClick={handleDislike}>
              {post?.dislikes.includes(user?._id) ? (
                <AiFillDislike />
              ) : (
                <AiOutlineDislike />
              )}
              {post?.dislikes.length} Dislikes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPost;
