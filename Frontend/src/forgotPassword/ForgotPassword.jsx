import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/forgot-password",
        { email }
      );
      setSuccess(response.data.message || "Password reset email sent!");
      setLoading(false);

      // Redirect to reset password page after a short delay
      setTimeout(() => {
        navigate("/reset-password");
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          Forgot Password
        </h2>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 text-red-600 bg-red-100 p-3 rounded">
            {error}
          </div>
        )}

        {/* Success Alert */}
        {success && (
          <div className="mb-4 text-green-600 bg-green-100 p-3 rounded">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label className="block text-gray-600 mb-2" htmlFor="email">
            Enter your email address
          </label>
          <input
            className="w-full p-3 border rounded-lg mb-4"
            type="email"
            id="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            className={`w-full p-2 rounded-lg text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#F24822] hover:bg-[#d0371d]"
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
