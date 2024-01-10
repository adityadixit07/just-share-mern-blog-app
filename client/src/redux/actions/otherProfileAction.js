import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/API";
import toast from "react-hot-toast";

export const getAllUsers = createAsyncThunk(
  "/other-user-detail",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/user/get-all-users");
      const { data } = response;
      return data;
    } catch (error) {
      if (error?.response && error?.response?.data?.message) {
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getRandomPosts = createAsyncThunk(
  "/post/random",
  async ({ offset = 0, limit = 10 }, { rejectWithValue }) => {
    try {
      const response = await API.get(
        `/post/random?offset=${offset}&limit=${limit}`
      );
      const { data } = response;
      return data;
    } catch (error) {
      if (error?.response && error?.response?.data?.message) {
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
