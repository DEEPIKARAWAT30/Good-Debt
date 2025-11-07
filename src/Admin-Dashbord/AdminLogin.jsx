import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "https://bank-project-1-x3bi.onrender.com/v1/api/admin/login/",
        {
          email,
          password,
        }
      );

      if (res.status === 200) {
        localStorage.setItem("adminLoggedIn", "true");
        navigate("/admin/dashboard");
      }
    } catch (err) {
      console.error(err);
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-md w-96 relative flex flex-col items-center"
      >
        {/* Profile Circle */}
        <div className="absolute -top-14 flex justify-center">
          <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-md bg-gray-200">
            <img
              src="https://static.vecteezy.com/system/resources/previews/029/156/453/non_2x/admin-business-icon-businessman-business-people-male-avatar-profile-pictures-man-in-suit-for-your-web-site-design-logo-app-ui-solid-style-illustration-design-on-white-background-eps-10-vector.jpg"
              alt="Admin Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Form Content */}
        <h2 className="text-2xl font-bold mb-6 mt-14 text-center">Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#9E1E27]"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded mb-6 focus:outline-none focus:ring-2 focus:ring-[#9E1E27]"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#9E1E27] text-white p-2 rounded hover:bg-red-700 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
