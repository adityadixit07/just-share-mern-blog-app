import { createSlice } from "@reduxjs/toolkit";
import {
  getOtherUserdetail,
  loginUser,
  registerUser,
} from "../actions/userAction";

const initialState = {
  user: null,
  loading: false,
  error: null,
  success: null,
  token: null,
  isAuthenticated: false,
  otherUserDetail: [],
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("token");
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.posts = [];
      state.otherUserDetail = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload.data;
    },
    setOtherUserDetail: (state, action) => {
      state.otherUserDetail = action.payload;
    },
    // Reducer to update following count
    updateFollowing: (state, action) => {
      const { followedUserId } = action.payload;
      // console.log(followedUserId);
      if (!state.user.following.includes(followedUserId)) {
        state.user.following.push(followedUserId);
      }
    },
    // reducer to update unfollow
    unfollowUser: (state, action) => {
      const { unfollowedUserId } = action.payload;
      console.log(unfollowedUserId);
      // remve the unfollowed user from the following list and update state
      state.user.following = state.user.following.filter(
        (followedId) => followedId !== unfollowedUserId
      );
    },

    // Reducer to add post to user
    addPostToUser: (state, action) => {
      const postId = action.payload;
      console.log(postId);
      if (state.user && state.user.posts) {
        state.user.posts.push(postId);
      }
    },
    // update post length
    updatePostLength: (state) => {
      if (state.user && state.user.posts) {
        state.user.posts.length--;
      }
    },
    // update user profile state
    updateUserProfile: (state, action) => {
      const { name, email } = action.payload;
      state.user = {
        ...state.user,
        name: name,
        email: email,
      };
      console.log(name, "name", email, "email");
    },
  },
  extraReducers: (builder) => {
    // register
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.isAuthenticated = false;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data;
      state.token = action.payload.token;
      state.success = action.payload.success;
      state.isAuthenticated = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    });

    // login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.isAuthenticated = false;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data;
      state.token = action.payload.token;
      state.success = action.payload.success;
      state.isAuthenticated = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    });

    // get other user details
    builder.addCase(getOtherUserdetail.pending, (state) => {
      state.loading = false;
    });
    builder.addCase(getOtherUserdetail.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.otherUserDetail = action.payload.data;
    });
    builder.addCase(getOtherUserdetail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(addPostToUser, (state, action) => {
      authSlice.caseReducers.addPostToUser(state, action); // Call the custom action when addPostToUser is dispatched
    });
  },
});

export const {
  logoutUser,
  clearError,
  setUser,
  updateFollowing,
  addPostToUser,
  updatePostLength,
  updateUserProfile,
  unfollowUser,
} = authSlice.actions;
export default authSlice;
