import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const token = searchParams.get("token");
    if (!token) {
      setError("Invalid or missing token.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/auth/reset-password", {
        token,
        newPassword: password,
      });

      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 3000); // Redirect to login after 3 seconds
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again later.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 font-outfit">
      <div className="p-8 bg-white rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          Reset Your Password
        </h2>
        {success ? (
          <p className="text-green-600 text-center">
            Your password has been reset successfully! Redirecting to login...
          </p>
        ) : (
          <form onSubmit={handleResetPassword}>
            {error && <p className="text-red-600 text-center mb-4">{error}</p>}
            <label className="block text-gray-600 mb-2" htmlFor="password">
              New Password
            </label>
            <input
              className="w-full p-3 border rounded-lg mb-4"
              type="password"
              id="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label
              className="block text-gray-600 mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              className="w-full p-3 border rounded-lg mb-4"
              type="password"
              id="confirmPassword"
              placeholder="Re-enter new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              className="w-full bg-[#F24822] text-white p-2 rounded-lg hover:bg-[#d0371d]"
              type="submit"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
