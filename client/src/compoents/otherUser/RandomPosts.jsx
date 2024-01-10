import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRandomPosts } from "../../redux/actions/otherProfileAction";
import { followUser, unfollowFollowedUser } from "../../utils/helperAPI";
import {
  unfollowUser,
  updateFollowing,
} from "../../redux/reducers/userReducer";
import toast from "react-hot-toast";
import {
  unfollowUserofUserList,
  updateFollowersList,
} from "../../redux/reducers/otherProfileReducer";
import { Link } from "react-router-dom";

const calculateDaysAgo = (createdAt) => {
  const today = new Date();
  const createdDate = new Date(createdAt);
  const differenceInTime = today.getTime() - createdDate.getTime();
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

  if (differenceInDays === 0) {
    return "Today";
  } else {
    return `${differenceInDays} days ago`;
  }
};

const RandomPosts = () => {
  const dispatch = useDispatch();
  const { randomPosts } = useSelector((state) => state.allUsers);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { user } = useSelector((state) => state.auth);

  const handleFollow = async (followUserId) => {
    try {
      const loggedInuserid = user?._id;
      if (loggedInuserid === followUserId) {
        toast.error("You can't follow yourself");
        return;
      }
      await followUser(followUserId);
      await dispatch(updateFollowing({ followedUserId: followUserId })); //user reducer
      await dispatch(
        updateFollowersList({
          userIdToFollow: followUserId,
          loggedInUserId: user?._id,
        })
      );
    } catch (error) {
      console.log("Error on following the account");
    }
  };
  const handleUnfollow = async (followUserId) => {
    await unfollowFollowedUser(followUserId);
    dispatch(unfollowUser({ unfollowedUserId: followUserId }));

    await dispatch(
      unfollowUserofUserList({
        unfollowedUserId: followUserId,
        loggedInUserId: user?._id,
      })
    );
  };

  const prevY = useRef(0);
  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting) {
          dispatch(
            getRandomPosts({ offset: randomPosts?.length || 0, limit: 10 })
          );
        }
        prevY.current = firstEntry.boundingClientRect.y;
      },
      { threshold: 0.5 }
    )
  );
  const bottomBoundaryRef = useRef(null);
  useEffect(() => {
    const currentObserver = observer.current;
    if (bottomBoundaryRef.current) {
      currentObserver.observe(bottomBoundaryRef.current);
    }

    return () => {
      if (bottomBoundaryRef.current) {
        currentObserver.unobserve(bottomBoundaryRef.current);
      }
    };
  }, [bottomBoundaryRef]);

  useEffect(() => {
    // Fetch initial posts when the component mounts
    if (!randomPosts?.length) {
      dispatch(getRandomPosts({ offset: 0, limit: 10 }));
    }
  }, [dispatch, randomPosts?.length]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollPosition(window.pageYOffset);
    });
    return () => window.removeEventListener("scroll", () => {});
  }, []);

  useEffect(() => {
    window.scrollTo(0, scrollPosition);
  }, [randomPosts, scrollPosition]);

  return (
    // <div className="flex flex-col items-center min-h-screen mx-4">
    //   <h1 className="text-3xl font-bold my-4">Explore Others</h1>
    //   <div className="w-full md:w-3/4 lg:w-2/3">
    //     {randomPosts?.map((post) => (
    //       <div key={post._id} className="border shadow-md rounded-md p-4 mb-4">
    //         <div className=" flex items-center mb-2 justify-between">
    //           <div className="flex items-center gap-4">
    //             <Link
    //               to={`/user/profile/${post?.userId}`}
    //               className="hover:underline hover:text-blue-700 flex items-center gap-5"
    //             >
    //               {/* Link around creatorName */}
    //               <img
    //                 src={post?.creatorAvatar?.url}
    //                 alt=""
    //                 className="w-10 h-10 rounded-full object-cover"
    //               />
    //               <h2 className="text-lg font-semibold mr-2">
    //                 {post?.creatorName}
    //               </h2>
    //             </Link>
    //           </div>
    //           <button
    //             onClick={() =>
    //               user?.following?.includes(post?.userId)
    //                 ? handleUnfollow(post?.userId)
    //                 : handleFollow(post?.userId)
    //             }
    //             className="px-3 py-1 bg-blue-500 text-white rounded-md font-semibold"
    //           >
    //             {user?.following?.includes(post?.userId)
    //               ? "Unfollow"
    //               : "Follow"}
    //           </button>
    //         </div>
    //         <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
    //         <img
    //           src={post.imageUrl}
    //           alt={post.title}
    //           className="w-full h-[500px] rounded-md object-contain"
    //         />
    //         <span className="text-gray-500 text-sm font-semibold">
    //           Posted {calculateDaysAgo(post?.createdAt)}
    //         </span>
    //       </div>
    //     ))}
    //     <div ref={bottomBoundaryRef}></div>
    //   </div>
    // </div>
    // <div className="min-h-screen mx-4">
    <div className="min-h-screen mx-auto px-4 sm:px-8 md:px-16 lg:px-20 xl:px-32">
      <h1 className="text-3xl font-bold my-4 text-center text-gray-600">
        Explore Amazing Content
      </h1>
      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
        {randomPosts?.map((post) => (
          <div key={post._id} className="border shadow-md rounded-md p-4">
            <div className="flex items-center mb-2 justify-between">
              <Link
                to={`/user/profile/${post?.userId}`}
                className="hover:underline hover:text-blue-700 flex items-center gap-3"
              >
                <img
                  src={post?.creatorAvatar?.url}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover"
                />
                <h2 className="text-lg font-semibold">{post?.creatorName}</h2>
              </Link>
              <button
                onClick={() =>
                  user?.following?.includes(post?.userId)
                    ? handleUnfollow(post?.userId)
                    : handleFollow(post?.userId)
                }
                className="px-3 py-1 bg-blue-500 text-white rounded-md font-semibold"
              >
                {user?.following?.includes(post?.userId)
                  ? "Unfollow"
                  : "Follow"}
              </button>
            </div>
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-48 md:h-56 lg:h-64 object-cover rounded-md"
            />
            <span className="text-gray-500 text-sm font-semibold block">
              Posted {calculateDaysAgo(post?.createdAt)}
            </span>
          </div>
        ))}
      </div>
      <div ref={bottomBoundaryRef}></div>
    </div>
  );
};

export default RandomPosts;
