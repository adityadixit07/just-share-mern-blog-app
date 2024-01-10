import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/API";
import { toast } from "react-hot-toast";

// export const registerUser = createAsyncThunk(
//   "/register",
//   async ({ name, email, password }, { rejectWithValue }) => {
//     try {
//       const response = await API.post("/user/register", {
//         name,
//         email,
//         password,
//       });
//       const { data } = response;
//       if (data?.success) {
//         localStorage.setItem("token", data.token);
//         toast.success(data?.message);
//       }
//       console.log(data?.data);
//       return data;
//     } catch (error) {
//       if (error.response && error.response.data.message) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );

export const registerUser = createAsyncThunk(
  "/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await API.post("/user/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set content type to multipart/form-data for file upload
        },
      });

      const { data } = response;
      if (data?.success) {
        localStorage.setItem("token", data.token);
        toast.success(data?.message);
      }
      // console.log(data?.data);
      return data;
    } catch (error) {
      if (error?.response && error?.response?.data?.message) {
        toast.error(error.response.data.message)
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "/auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await API.post("/user/login", { email, password });
      const { data } = response;
      if (data?.success) {
        localStorage.setItem("token", data?.token);
        // console.log(data?.token);
        toast.success(data?.message);
      }
      // console.log(data.data);
      return data;
    } catch (error) {
      if (error?.response && error?.response?.data?.message) {
        console.log("Response error:", error?.response);
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data?.message);
      } else {
        console.log("General error:", error?.message);
        toast.error(error?.message);
        return rejectWithValue(error?.message);
      }
    }
  }
);

export const getOtherUserdetail = createAsyncThunk(
  "/",
  async (token, { rejectWithValue }) => {
    try {
      const response = await API.get("/user/get-other-user-details", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response?.data?.data, "this is user action");
      return response?.data;
    } catch (error) {
      if (error?.response && error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
        return rejectWithValue(error?.response?.data?.message);
      } else {
        toast.error(error?.message);
        return rejectWithValue(error?.message);
      }
    }
  }
);
