import React, { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/API";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");

  const handleResetPassword = async () => {
    try {
      const response = await API.put(`/user/reset-password/${token}`, {
        newPassword,
      });

      if (response?.data?.success) {
        toast.success(
          "Password reset successfully. You can now log in with your new password."
        );
      } else {
        toast.error(
          response?.data?.message || "Password reset failed. Please try again."
        );
      }
    } catch (error) {
      // console.error("An error occurred while resetting password:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="mt-[2rem] min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
        <div className="mb-8">
          <img
            src="https://img.freepik.com/premium-vector/forgot-password-concept-isolated-white_263070-194.jpg"
            alt="Forgot Password"
            className="w-full h-[30vh] object-contain rounded-md"
          />
        </div>
        <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-xl mb-6">
          Reset Your Password
        </h2>
        <form className="space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              onClick={handleResetPassword}
              className="bg-green-500 text-white p-2 rounded-md cursor-pointer w-full"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
