import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import API from "../../utils/API";
import { hideLoading, showLoading } from "../../redux/reducers/alertsSlice";
import { fetchFollowersList, fetchFollowingList } from "../../utils/helperAPI";
import Modal from "../../utils/Modal";

const SeeProfile = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();

  const getUser = async () => {
    dispatch(showLoading());
    try {
      const response = await API.get(`/user/profile/${userId}`);
      const { data } = response;
      if (data?.success) {
        setUser(data?.data);
      }
    } catch (error) {
      toast.error("User not found");
    } finally {
      dispatch(hideLoading());
    }
  };
  const getPosts = async () => {
    dispatch(showLoading());
    try {
      const response = await API.get(`/post/user-posts/${userId}`);
      const { data } = response;
      //   console.log(data?.data);
      if (data?.success) {
        setPosts(data?.data);
      }
    } catch (error) {
      toast.error("User not found");
    } finally {
      dispatch(hideLoading());
    }
  };
  // console.log(posts, "post");

  const navigate = useNavigate();
  const naviagteToPost = (postId) => {
    navigate(`/user/profile/post/${postId}`);
  };

  const [showFollowerModal, setShowFollowerModal] = useState(false);
  const [followers, setFollowers] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [following, setFollowing] = useState(false);
  const handleOpenFollowerModal = async () => {
    dispatch(showLoading());
    try {
      const res = await fetchFollowersList(userId);
      // console.log(res, "followers list");
      setFollowers(res);
      setShowFollowerModal(true);
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
  const handleCloseModalFollower = () => {
    setShowFollowerModal(false);
  };

  const handleOpenFollowingModal = async () => {
    dispatch(showLoading());
    try {
      const res = await fetchFollowingList(userId);
      // console.log(res, "following list");
      setFollowing(res);
      setShowFollowingModal(true);
    } catch (error) {
      toast.error(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
  const handleCloseModalFollowing = () => {
    setShowFollowingModal(false);
  };

  useEffect(() => {
    getUser();
    getPosts();
  }, [userId]);

  return (
    <div className="flex flex-col items-center mt-20">
      {user && (
        <div className="flex flex-col items-center gap-4">
          <img
            src={user?.avatar?.url}
            alt=""
            className="h-20 w-20 rounded-full object-contain"
          />
          <h2 className="text-xl font-semibold">{user?.name}</h2>
          <div className="flex justify-center gap-4">
            <div
              className="flex justify-center items-center flex-col cursor-pointer"
              onClick={handleOpenFollowerModal}
            >
              <p className="font-semibold">Followers</p>
              <p>{user?.followers.length}</p>
            </div>
            <div
              className="flex justify-center items-center flex-col cursor-pointer"
              onClick={handleOpenFollowingModal}
            >
              <p className="font-semibold">Following</p>
              <p>{user?.following.length}</p>
            </div>
            <div className="flex justify-center items-center flex-col">
              <p className="font-semibold">Posts</p>
              <p>{user?.posts.length}</p>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-[1400px] mt-0 mx-4 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
          {posts?.map((post, index) => (
            <div
              key={index}
              className="max-w-[300px] border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease-in-out"
            >
              <img
                src={post?.imageUrl}
                alt=""
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h1 className="text-lg font-semibold mb-2">{post?.title}</h1>
                <p className="text-sm text-gray-600">
                  {post?.description.length > 100
                    ? `${post?.description.substring(0, 100)}...`
                    : `${post?.description}`}
                </p>
                <button
                  className="mt-2 py-1 px-3 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 transition duration-300"
                  onClick={() => naviagteToPost(post?._id)}
                >
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* followers list modal */}
      {isAuthenticated && showFollowerModal && (
        <Modal
          title={"Followers"}
          data={followers}
          onClose={handleCloseModalFollower}
        />
      )}
      {/* folllowing list modal */}
      {isAuthenticated && showFollowingModal && (
        <Modal
          title={"Following"}
          data={following}
          onClose={handleCloseModalFollowing}
        />
      )}
    </div>
  );
};

export default SeeProfile;
