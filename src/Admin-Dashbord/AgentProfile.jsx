// AgentProfile.jsx
import React, { useState, useEffect } from "react";
import { Mail, Phone, Key, LogOut, ArrowUpRight } from "lucide-react";

function AgentProfile() {
  const themeColor = "#9e1e27";
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [responseIsSuccess, setResponseIsSuccess] = useState(false);

  // Prefill old password with actual password (admin123)
  const [oldPassword, setOldPassword] = useState("admin123");
  const [newPassword, setNewPassword] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  // Replace with your actual logged-in admin ID
  const adminId = 1;

  const stats = [
    { label: "Customers", value: "24", color: "#17a2b8" },
    { label: "Leads", value: "12", color: themeColor },
    { label: "Requests", value: "8", color: "#ffc107", textColor: "#000" },
    { label: "Rating", value: "4.8", color: "#28a745" },
  ];

  // Auto-hide success message after 3s
  useEffect(() => {
    if (responseIsSuccess) {
      const t = setTimeout(() => {
        setResponseMsg("");
        setResponseIsSuccess(false);
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [responseIsSuccess]);

  // Change Password Handler
  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      setResponseMsg("Please fill all fields!");
      setResponseIsSuccess(false);
      return;
    }

    setLoading(true);
    setResponseMsg("");
    setResponseIsSuccess(false);

    try {
      const res = await fetch(
        `https://bank-project-1-x3bi.onrender.com/v1/api/admin/update/${adminId}/`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            old_password: oldPassword,
            new_password: newPassword,
          }),
        }
      );

      let data = {};
      const text = await res.text();
      if (text) {
        try {
          data = JSON.parse(text);
        } catch {
          console.warn("Response is not JSON");
        }
      }

      if (res.ok) {
        setResponseMsg(data.message || "Password updated successfully ✅");
        setResponseIsSuccess(true);
        setOldPassword("");
        setNewPassword("");
        setShowPasswordForm(false);
      } else {
        const serverMsg = data.message || "Old password incorrect!";
        setResponseMsg(serverMsg);
        setResponseIsSuccess(false);
      }
    } catch (error) {
      console.error(error);
      setResponseMsg("Something went wrong! Check network or server.");
      setResponseIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 max-w-5xl mx-auto">
      {/* Profile Card */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="flex flex-col md:flex-row items-center p-6 bg-gray-50">
          <img
            src="https://static.vecteezy.com/system/resources/previews/029/156/453/non_2x/admin-business-icon-businessman-business-people-male-avatar-profile-pictures-man-in-suit-for-your-web-site-design-logo-app-ui-solid-style-illustration-design-on-white-background-eps-10-vector.jpg"
            alt="Admin Avatar"
            className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 object-cover"
            style={{ borderColor: themeColor }}
          />
          <div className="mt-4 md:mt-0 md:ml-6 flex-1">
            <h2 className="text-2xl font-semibold text-gray-800">Admin</h2>
            <span
              className="inline-block mt-2 text-sm font-medium px-3 py-1 rounded-full text-white"
              style={{ backgroundColor: "green" }}
            >
              Active
            </span>

            <div className="mt-4 flex flex-col md:flex-row md:space-x-6 text-gray-700 text-sm">
              <div className="flex items-center gap-1">
                <Mail size={16} /> admin@example.com
              </div>
              <div className="flex items-center gap-1 mt-2 md:mt-0">
                <Phone size={16} /> +91 98765 43210
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        {/* <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-200">
          <div>
            <strong>Joining Date:</strong> 2022-05-10
          </div>
          <div>
            <strong>Total Customers:</strong>{" "}
            <span className="bg-cyan-500 text-white px-2 py-1 rounded-full">24</span>
          </div>
          <div>
            <strong>Leads Assigned:</strong>{" "}
            <span className="px-2 py-1 rounded-full text-white" style={{ backgroundColor: themeColor }}>
              12
            </span>
          </div>
          <div>
            <strong>Requests Handled:</strong>{" "}
            <span className="bg-yellow-400 text-black px-2 py-1 rounded-full">8</span>
          </div>
          <div className="flex items-center gap-1">
            <strong>Performance:</strong>{" "}
            <ArrowUpRight className="text-green-600" />{" "}
            <span className="text-green-600 font-medium">Excellent</span>
          </div>
          <div>
            <strong>Location:</strong> Mumbai, India
          </div>
        </div> */}

        {/* About Section */}
        {/* <div className="p-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">About Me</h3>
          <p className="text-gray-600 text-sm">
            Experienced agent with a proven track record in customer
            management, lead conversion, and performance excellence. Skilled in
            communication, problem solving, and creating lasting client
            relationships.
          </p>
        </div> */}

        {/* Change Password Section */}
        <div className="p-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Change Password</h3>

          {!showPasswordForm ? (
            <button
              onClick={() => setShowPasswordForm(true)}
              className="flex items-center justify-center gap-2 px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-700 hover:text-white transition"
            >
              <Key size={16} /> Change Password
            </button>
          ) : (
            <div className="flex flex-col gap-3 max-w-sm">
              <input
                type="password"
                placeholder="Enter Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="border rounded-md px-3 py-2"
                autoComplete="current-password"
              />
              <input
                type="password"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border rounded-md px-3 py-2"
                autoComplete="new-password"
              />
              <button
                onClick={handleChangePassword}
                disabled={loading}
                className="flex items-center justify-center gap-2 px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-700 hover:text-white transition"
              >
                {loading ? (
                  <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                ) : (
                  <Key size={16} />
                )}
                {loading ? "Processing..." : "Confirm Change"}
              </button>
            </div>
          )}

          {responseMsg && (
            <div
              className={`mt-3 text-sm font-medium text-center ${responseIsSuccess ? "text-green-700" : "text-red-600"
                }`}
            >
              {responseMsg}
            </div>
          )}
        </div>

        {/* Logout */}
        {/* <div className="p-6 border-t border-gray-200">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-md text-red-600 border-red-600 hover:bg-red-600 hover:text-white transition">
            <LogOut size={16} /> Logout
          </button>
        </div> */}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center justify-center hover:scale-105 transition-transform"
          >
            <div className="text-xl font-bold mb-2" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="text-gray-500 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AgentProfile;
