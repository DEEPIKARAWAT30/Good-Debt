import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://bank-project-1-x3bi.onrender.com/v1/api/customer-interests/";

const InterestedUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1); // current page
  const [totalPages, setTotalPages] = useState(1); // total available pages (optional)

  // Fetch users with pagination
  const fetchUsers = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}?page=${pageNumber}`);
      // adjust if your API returns structure differently
      setUsers(response.data.data || []);
      if (response.data.totalPages) {
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error("Error fetching interested users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
  }, [isModalOpen]);

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  return (
    <div className="p-4 sm:p-8 bg-white min-h-screen relative">
      <h1 className="text-3xl font-bold mb-6 text-[#800000]">
        Interested Users in Banks
      </h1>

      {loading ? (
        <p className="text-gray-600">Loading users...</p>
      ) : users.length === 0 ? (
        <p className="text-gray-600">No users found.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg shadow-md">
              <thead className="bg-[#f3e5e5]">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">#</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Full Name</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Bank</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Product</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Created At</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => {
                  const details = user.customer_details || {};
                  return (
                    <tr key={user.id || index} className="hover:bg-[#ffeaea] transition-colors">
                      <td className="px-4 py-2 border-b border-gray-200">
                        {(page - 1) * 10 + (index + 1)}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-200">{details.full_name}</td>
                      <td className="px-4 py-2 border-b border-gray-200">{user.bank_name}</td>
                      <td className="px-4 py-2 border-b border-gray-200">
                        {user.product_title || "N/A"}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-200">{user.created_at}</td>
                      <td className="px-4 py-2 border-b border-gray-200">
                        <button
                          className="bg-[#800000] text-white px-3 py-1 rounded hover:bg-[#a00000] transition"
                          onClick={() => openModal(user)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-6 gap-4">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className={`px-4 py-2 rounded text-white ${
                page === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-[#800000] hover:bg-[#a00000]"
              }`}
            >
              Previous
            </button>

            <span className="text-gray-700 font-medium">
              Page {page}
            </span>

            <button
              onClick={handleNextPage}
              className="px-4 py-2 rounded text-white bg-[#800000] hover:bg-[#a00000]"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Modal */}
      {isModalOpen && selectedUser && (
        <div className="absolute inset-0 flex justify-center items-start pt-12 z-40">
          <div className="absolute inset-0 bg-black/10" onClick={closeModal}></div>
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-5xl z-50 overflow-auto max-h-[80vh]">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-[#800000]">Customer Details</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold transition-colors"
              >
                ×
              </button>
            </div>

            <div className="p-4">
              {/* Personal Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h3 className="text-lg font-semibold text-[#800000] mb-3">Personal Information</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {[
                    ["Full Name", selectedUser.customer_details?.full_name],
                    ["Email", selectedUser.customer_details?.email],
                    ["Phone", selectedUser.customer_details?.phone],
                    ["Date of Birth", selectedUser.customer_details?.dob],
                    ["PAN", selectedUser.customer_details?.pan],
                    ["City", selectedUser.customer_details?.city],
                  ].map(([label, value], idx) => (
                    <div key={idx}>
                      <label className="text-xs font-semibold text-gray-600">{label}</label>
                      <p className="text-sm text-gray-800">{value || "N/A"}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Employment Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h3 className="text-lg font-semibold text-[#800000] mb-3">Employment Information</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {[
                    ["Employment Type", selectedUser.customer_details?.employment_type],
                    ["Designation", selectedUser.customer_details?.designation],
                    ["Salary", selectedUser.customer_details?.salary],
                    ["Annual Income", selectedUser.customer_details?.annualIncome],
                    ["Pincode", selectedUser.customer_details?.pincode],
                    ["Existing Loan", selectedUser.customer_details?.existing_loan],
                  ].map(([label, value], idx) => (
                    <div key={idx}>
                      <label className="text-xs font-semibold text-gray-600">{label}</label>
                      <p className="text-sm text-gray-800">{value || "N/A"}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interest Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-[#800000] mb-3">Interest Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    ["Bank Name", selectedUser.bank_name],
                    ["Product", selectedUser.product_title],
                    ["Created At", selectedUser.created_at],
                  ].map(([label, value], idx) => (
                    <div key={idx}>
                      <label className="text-xs font-semibold text-gray-600">{label}</label>
                      <p className="text-sm text-gray-800">{value || "N/A"}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end p-4 border-t border-gray-200">
              <button
                onClick={closeModal}
                className="bg-[#800000] text-white px-6 py-2 rounded hover:bg-[#a00000] transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterestedUsers;
