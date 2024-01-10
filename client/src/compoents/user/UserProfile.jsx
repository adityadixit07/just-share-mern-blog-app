import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import API from "../../utils/API";
import { useEffect, useState } from "react";
import { hideLoading, showLoading } from "../../redux/reducers/alertsSlice";
import { Link, useNavigate } from "react-router-dom";
import { RiDeleteBinLine, RiEdit2Fill } from "react-icons/ri";
import { getOtherUserdetail } from "../../redux/actions/userAction";
import {
  updatePostLength,
  updateUserProfile,
} from "../../redux/reducers/userReducer";

const UserProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const [userPosts, setUserPosts] = useState([]);
  const dispatch = useDispatch();

  const [showEditModal, setShowEditModal] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");

  // get all posts
  const getAllPosts = async () => {
    dispatch(showLoading());
    try {
      const response = await API.get(`/post/get-all-posts/${user?._id}`);
      if (response?.status === 200) {
        // toast.success(response?.data?.message);
        setUserPosts(response.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      dispatch(hideLoading());
    }
  };

  const navigate = useNavigate();
  const navigateToPost = (postId) => {
    navigate(`/user/post/${postId}`);
  };

  // delete post
  const handleDeletePost = async (e, postId) => {
    e.preventDefault();
    dispatch(showLoading());
    try {
      const response = await API.delete(`/post/delete-post/${postId}`);
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        getAllPosts();
        dispatch(updatePostLength());
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      dispatch(hideLoading());
    }
  };

  // update user profile
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    dispatch(showLoading());
    try {
      const response = await API.put(`/user/update-profile`, {
        name: updatedName,
        email: updatedEmail,
      });
      console.log("name and email hai bro");
      // console.log(response?.data);
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        setUpdatedEmail(response?.data?.email);
        setUpdatedName(response?.data?.name);
        dispatch(
          updateUserProfile({
            name: updatedName,
            email: updatedEmail,
          })
        );
        setShowEditModal(false);
        getAllPosts();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getAllPosts();
  }, [user]);

  return (
    <div className="container mx-auto p-8 mt-14">
      {/* user info section */}
      <div className="flex flex-col md:flex-row items-center mb-8">
        {/* avatar */}

        <div className="md:w-3/4 md:pl-8 flex  justify-center gap-12 flex-wrap">
          {/* user avatar */}
          <div className="mb-2 md:mb-0">
            <img
              src={user?.avatar?.url}
              alt="User Avatar"
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
          {/* user name  */}
          <div>
            <div className="flex gap-5">
              <h2 className="text-3xl font-semibold text-gray-800">
                {user?.name}
              </h2>
              <button
                onClick={() => setShowEditModal(true)}
                className="bg-blue-500 text-sm font-semibold text-white px-3 py-2 rounded-md hover:bg-blue-600 transition duration-300 "
              >
                Edit Profile
              </button>
            </div>
            {/* detail */}
            <div className="flex mt-4">
              <div className="mr-8">
                <p className="text-lg font-semibold">
                  {user?.followers.length}
                </p>
                <p className="text-sm text-gray-600 font-semibold hover:text-gray-800">
                  Followers
                </p>
              </div>

              <div className="mr-8">
                <p className="text-lg font-semibold">
                  {user?.following.length}
                </p>
                <p className="text-sm text-gray-600 font-semibold hover:text-gray-800">
                  Following
                </p>
              </div>
              <div>
                <p className="text-lg font-semibold">{user?.posts.length}</p>
                <p className="text-sm text-gray-600 font-semibold hover:text-gray-800">
                  Posts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* user posts */}

      {userPosts?.data?.length === 0 && (
        <div className="flex items-center justify-center">
          <h1 className="text-3xl font-bold text-gray-400">No post found !</h1>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {userPosts?.data?.map((post) => (
          <div key={post._id} className="relative h-full max-w-[300px]">
            <button
              onClick={(e) => handleDeletePost(e, post._id)}
              className="absolute top-0 right-0 mt-2 mr-3 text-red-500 hover:text-red-700"
            >
              <RiDeleteBinLine size={20} />
            </button>
            <div
              onClick={() => navigateToPost(post._id)}
              className="cursor-pointer border p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 h-full flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold mb-3 h-14 overflow-hidden">
                  {post.title}
                </h3>
                <hr />
                <p className="mt-2 h-20 overflow-hidden">
                  {post.description.length > 40
                    ? `${post.description.substring(0, 40)}...`
                    : post.description}
                </p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span>
                  <img
                    src={post?.imageUrl}
                    alt="post"
                    className="w-full h-32  object-cover"
                  />
                </span>
              </div>
              <span className="text-sm text-gray-500 mt-4">
                {new Date(post.createdAt).toLocaleString().toLocaleUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-md">
            <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
            <input
              type="text"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              placeholder="New Name"
              className="border rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              value={updatedEmail}
              onChange={(e) => setUpdatedEmail(e.target.value)}
              placeholder="New Email"
              className="border rounded-md ml-2 px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {/* update profile */}

            <div className="ml-2">
              <button
                onClick={handleProfileUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 mr-4"
              >
                Save
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
