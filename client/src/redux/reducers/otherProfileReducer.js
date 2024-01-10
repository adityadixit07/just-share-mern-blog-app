import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers, getRandomPosts } from "../actions/otherProfileAction";

const initialState = {
  Users: [],
  error: null,
  randomPosts: [],
};

const otherProfileSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {
    clearAllUsers: (state) => {
      state.Users = null;
    },
    clearRandomPosts: (state) => {
      state.randomPosts = null;
    },
    updateFollowersList: (state, action) => {
      const { userIdToFollow, loggedInUserId } = action.payload;
      
      // Find the user being followed
      const userToFollowIndex = state.Users.findIndex(user => user._id === userIdToFollow);
      if (userToFollowIndex !== -1) {
        state.Users[userToFollowIndex].followers.push(loggedInUserId);
      }
    },
    unfollowUserofUserList: (state, action) => {
      const { unfollowedUserId, loggedInUserId } = action.payload;
    
      const userToUnfollow = state.Users.find((user) => user._id === unfollowedUserId);
      const loggedInUser = state.Users.find((user) => user._id === loggedInUserId);
    
      if (userToUnfollow) {
        userToUnfollow.followers = userToUnfollow.followers.filter(
          (followerId) => followerId !== loggedInUserId
        );
      }
    
      if (loggedInUser) {
        loggedInUser.following = loggedInUser.following.filter(
          (followedId) => followedId !== unfollowedUserId
        );
      }
    }
    
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      state.error = null;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.Users = action.payload.data;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.error = action.payload;
    });

    // fetch random posts
    builder.addCase(getRandomPosts.pending, (state) => {
      state.error = null;
    });
    builder.addCase(getRandomPosts.fulfilled, (state, action) => {
      state.randomPosts = action.payload.data;
    });
    builder.addCase(getRandomPosts.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const { clearAllUsers,updateFollowersList,unfollowUserofUserList } = otherProfileSlice.actions;
export default otherProfileSlice;
