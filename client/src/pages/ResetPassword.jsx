import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/API";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const { token } = useParams();
  console.log(token, "token");
  const [newPassword, setNewPassword] = useState("");

    useEffect(() => {
      // Verify the token on component mount
      const verifyToken = async () => {
        try {
          const response = await API.get(`/user/verify-reset-token/${token}`);
          // Handle the response accordingly
          if (response.data.success) {
            // Token is valid, user can reset the password
          } else {
            // Token is invalid or expired, show an error message
            toast.error("Invalid or expired token. Please request a new one.");
          }
        } catch (error) {
          // Handle errors
          console.error(error);
          toast.error("An error occurred. Please try again.");
        }
      };

      verifyToken();
    }, [token]);

  const handleResetPassword = async () => {
    // Implement the logic to reset the password
    try {
      const response = await API.put(`/user/reset-password/${token}`, {
        newPassword,
      });
      // Handle the response accordingly
      if (response.data.success) {
        toast.success(
          "Password reset successfully. You can now log in with your new password."
        );
        // Redirect the user to the login page or any other desired page
      } else {
        toast.error(
          response.data.message || "Password reset failed. Please try again."
        );
      }
    } catch (error) {
      // Handle errors
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="mt-[10rem]" >
      <h2>Reset Your Password</h2>
      <label>New Password:</label>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleResetPassword}>Reset Password</button>
    </div>
  );
};

export default ResetPassword;
