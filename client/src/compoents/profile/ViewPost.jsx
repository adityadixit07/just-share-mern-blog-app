// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useParams } from "react-router-dom";
// import { hideLoading, showLoading } from "../../redux/reducers/alertsSlice";
// import toast from "react-hot-toast";
// import {
//   AiOutlineLike,
//   AiFillLike,
//   AiFillDislike,
//   AiOutlineDislike,
// } from "react-icons/ai";
// import API from "../../utils/API";

// const ViewPost = () => {
//   const { user } = useSelector((state) => state.auth);
//   const [post, setPost] = useState();
//   const [commentText, setCommentText] = useState(""); // Comment text
//   const { postId } = useParams();
//   const dispatch = useDispatch();

//   const getPost = async () => {
//     dispatch(showLoading());
//     try {
//       const response = await API.get(`/post/user-post/${postId}`);
//       // console.log(response.data);
//       const { data } = response.data;
//       setPost(data);
//     } catch (error) {
//       toast.error(error?.response?.data?.message);
//     } finally {
//       dispatch(hideLoading());
//     }
//   };

//   const handleLike = async () => {
//     try {
//       const response = await API.put(`/post/like-post/${postId}`);
//       if (response?.status === 200) {
//         setPost((prev) => ({
//           ...prev,
//           likes: [...prev.likes, user?._id],
//           dislikes: prev.dislikes.filter((id) => id !== user?._id), // Remove from dislikes
//         }));
//         toast.success("You liked the post!");
//       }
//     } catch (error) {
//       toast.error(error?.response?.data?.message);
//     }
//   };

//   const handleDislike = async () => {
//     try {
//       const response = await API.put(`/post/dislike-post/${postId}`);
//       if (response?.status === 200) {
//         setPost((prev) => ({
//           ...prev,
//           dislikes: [...prev.dislikes, user?._id],
//           likes: prev.likes.filter((id) => id !== user?._id), // Remove from likes
//         }));
//         toast.success("You disliked the post!");
//       }
//     } catch (error) {
//       toast.error(error?.response?.data?.message);
//     }
//   };

//   // comment on post
//   const handleComment = async () => {
//     try {
//       const response = await API.post(`/post/comment/${postId}`, {
//         text: commentText,
//         userId: user?._id,
//       });
//       const { data } = response.data;
//       // console.log(data);
//       if (response?.status === 201) {
//         setPost((prev) => ({
//           ...prev,
//           comments: [...prev.comments, data],
//         }));
//         setCommentText("");
//         toast.success("Comment added successfully!");
//       }
//     } catch (error) {
//       toast.error(error?.response?.data?.message);
//     }
//   };

//   const fetchComments=async()=>{
//     try {
//       const response=await API.get(`/post/fetch-comments/${postId}`);
//       console.log(response?.data);
//     } catch (error) {
//       toast.error("Unable to load the comments")
//     }
//   }

//   useEffect(() => {
//     getPost();
//     fetchComments();
//   }, [postId]);

//   return (
//     <div className="container mx-auto my-8 mt-[6rem] px-4">
//       {post?.length === 0 && (
//         <h1 className="text-2xl text-red-500">Post not found</h1>
//       )}
//       {post && (
//         <div className="max-w-2xl mx-auto">
//           <Link
//             to={`/`}
//             className="text-blue-500 font-semibold hover:underline mb-4 block"
//           >
//             &larr; Go back
//           </Link>
//           <h1 className="text-4xl font-bold mb-4">{post?.title}</h1>
//           <img
//             className="w-full h-auto rounded-lg mb-4"
//             src={post?.imageUrl}
//             alt=""
//           />
//           <p className="text-gray-700">{post?.description}</p>

//           <div className="flex items-center mt-4">
//             <button onClick={handleLike} className="mr-2">
//               {post?.likes.includes(user?._id) ? (
//                 <AiFillLike />
//               ) : (
//                 <AiOutlineLike />
//               )}
//               {post?.likes.length} Likes
//             </button>
//             <button onClick={handleDislike}>
//               {post?.dislikes.includes(user?._id) ? (
//                 <AiFillDislike />
//               ) : (
//                 <AiOutlineDislike />
//               )}
//               {post?.dislikes.length} Dislikes
//             </button>
//           </div>

//           {/* comment */}
//           <div className="mt-4">
//             <textarea
//               value={commentText}
//               onChange={(e) => setCommentText(e.target.value)}
//               placeholder="Add a comment..."
//               className="w-full h-20 p-2 border rounded"
//             ></textarea>
//             <button
//               onClick={handleComment}
//               className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
//             >
//               Add Comment
//             </button>
//           </div>

//           <div className="mt-4">
//             <h2 className="text-xl font-bold mb-2">Comments</h2>
//             {post?.comments?.map((comment) => (
//               <div
//                 key={comment?._id}
//                 className="flex items-center gap-2 bg-gray-100 p-2 rounded"
//               >
//                 <img
//                   className="w-8 h-8 rounded-full"
//                   src={comment?.userId?.avatar.url}
//                   alt=""
//                 />

//                 <div>
//                   <p className="font-semibold">{comment?.userId?.name}</p>
//                   <p>{comment?.text}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewPost;

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
  const [commentText, setCommentText] = useState(""); // Comment text
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

  const handleLike = async () => {
    try {
      const response = await API.put(`/post/like-post/${postId}`);
      if (response?.status === 200) {
        setPost((prev) => ({
          ...prev,
          likes: [...prev.likes, user?._id],
          dislikes: prev.dislikes.filter((id) => id !== user?._id),
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
          likes: prev.likes.filter((id) => id !== user?._id),
        }));
        toast.success("You disliked the post!");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  // comment on post
  const handleComment = async () => {
    try {
      const response = await API.post(`/post/comment/${postId}`, {
        text: commentText,
        userId: user?._id,
      });

      if (response?.status === 201) {
        const newComment = response.data.data;
        setPost((prev) => ({
          ...prev,
          comments: [...prev.comments, newComment],
        }));
        setCommentText("");
        toast.success("Comment added successfully!");

        // Fetch all comments including the new comment
        fetchComments();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await API.get(`/post/fetch-comments/${postId}`);
      const { data } = response.data;

      setPost((prev) => ({
        ...prev,
        comments: data,
      }));
    } catch (error) {
      toast.error("Unable to load the comments");
    }
  };

  useEffect(() => {
    getPost();
    fetchComments();
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

          {/* comment */}
          <div className="mt-4">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="w-full h-20 p-2 border rounded"
            ></textarea>
            <button
              onClick={handleComment}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add Comment
            </button>
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Comments</h2>
            {post?.comments?.map((comment) => (
              <div
                key={comment?._id}
                className="flex items-center gap-2 bg-gray-100 p-2 rounded"
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src={comment?.userAvatar}
                  alt=""
                />
                <div>
                  <p>{comment?.userName}</p>
                  <p>{comment?.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPost;
