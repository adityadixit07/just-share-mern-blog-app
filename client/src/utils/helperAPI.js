import toast from "react-hot-toast";
import API from "./API";

export const followUser = async (followUserId) => {
  try {
    const response = await API.post(`/user/follow/${followUserId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { data } = response;
    if (data?.success) {
      toast.success(data?.message);
    }
    return data;
  } catch (error) {
    // console.log(error);
    toast.error(error?.response?.data?.message);
  }
};

export const unfollowFollowedUser = async (unfollowUserId) => {
  try {
    const response = await API.post(`/user/unfollow/${unfollowUserId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { data } = response;
    if (data?.success) {
      toast.success(data?.message);
    }
    return data;
  } catch (error) {
    // console.log(error);
    toast.error(error?.response?.data?.message);
  }
};
