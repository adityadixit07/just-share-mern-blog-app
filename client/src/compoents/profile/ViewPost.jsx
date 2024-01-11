import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { hideLoading, showLoading } from "../../redux/reducers/alertsSlice";
import toast from "react-hot-toast";
import API from "../../utils/API";

const ViewPost = () => {
  const [post, setPost] = useState();
  const { postId } = useParams();
  const dispatch = useDispatch();

  const getPost = async () => {
    dispatch(showLoading());
    try {
      const response = await API.get(`/post/user-post/${postId}`);
      const { data } = response.data;
      setPost(data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getPost();
  }, [postId]);

  return (
    <div className="container mx-auto my-8 mt-[6rem]">
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
        </div>
      )}
    </div>
  );
};

export default ViewPost;
