import React, { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import axios from "axios";

// const BASE_URL = "https://bank-project-1-x3bi.onrender.com/v1/api/get-all-eligiblity-checks/";
const BASE_URL = "https://good-debt.onrender.com/api/enquiry/";
function RequestsPage() {
  const [requestsData, setRequestsData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchRequests = async (url = BASE_URL) => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(url);
      console.log("API Response:", response.data);

      const customers = Array.isArray(response.data.data)
        ? response.data.data.map((customer) => {
            const dateField =
              customer.last_eligiblity_check ||
              customer.last_eligibility_check ||
              customer.created_at ||
              customer.date;

            return {
              ...customer,
              status: customer.eligibility_status || "In Review",
              date: dateField ? dateField.split("T")[0] : "Unknown",
            };
          })
        : [];

      setRequestsData(customers);
      setNextPage(response.data.next);
      setPrevPage(response.data.previous);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch customer data from API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests(BASE_URL);
  }, []);

  const handleNext = () => {
    if (nextPage) {
      fetchRequests(nextPage);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (prevPage) {
      fetchRequests(prevPage);
      setCurrentPage((prev) => Math.max(prev - 1, 1));
    }
  };

  const filteredRequests = requestsData.filter(
    (req) =>
      req.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      req.id?.toString().toLowerCase().includes(search.toLowerCase()) ||
      req.status?.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusStyle = (Loan) => {
    switch (Loan) {
      case "PL":
        return " text-[#1e9e27]";
      case " BL":
        return " text-[#9e1e27]";
      default:
        return "bg-[#9e1e27] text-white";
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto relative z-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">ENQUIRIES</h1>
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search requests..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9e1e27] focus:border-[#9e1e27]"
          />
        </div>
      </div>

      {loading && <p className="text-gray-700">Loading requests...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Table (no vertical scroll, full page height) */}
      <div className="overflow-x-auto rounded-xl shadow-md relative z-0">
        <table className="w-full min-w-[800px] bg-white border-collapse relative z-0">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr className="text-left text-gray-600 uppercase text-sm">
              <th className="px-6 py-3 border-b">Full Name</th>
              <th className="px-6 py-3 border-b">Email</th>
              <th className="px-6 py-3 border-b">Phone</th>
              <th className="px-6 py-3 border-b">Employment Type</th>
              <th className="px-6 py-3 border-b">Loan</th>
              <th className="px-6 py-3 border-b">Date</th>
              <th className="px-6 py-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((req) => (
              <tr key={req.id || req.email} className="border-b hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-800">{req.full_name}</td>
                <td className="px-6 py-4">{req.email_address}</td>
                <td className="px-6 py-4">{req.phone_number}</td>
                <td className="px-6 py-4">{req.employee_type}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center justify-center px-4 py-2 rounded-full text-sm ${getStatusStyle(
                      req.status
                    )}`}
                  >
                    {req.loan_for}
                  </span>
                </td>
                <td className="px-6 py-4">{req.created_at}</td>
                <td className="px-6 py-4 text-center flex justify-center">
                  <button
                    className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition"
                    onClick={() => setSelectedUser(req)}
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrev}
          disabled={!prevPage || loading}
          className={`px-4 py-2 rounded-md font-medium border ${
            prevPage ? "bg-white hover:bg-gray-100" : "bg-gray-100 cursor-not-allowed"
          }`}
        >
          Previous
        </button>

        <span className="text-gray-700 text-sm">Page {currentPage}</span>

        <button
          onClick={handleNext}
          disabled={!nextPage || loading}
          className={`px-4 py-2 rounded-md font-medium border ${
            nextPage ? "bg-white hover:bg-gray-100" : "bg-gray-100 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-[90%] md:max-w-4xl mx-auto p-6 overflow-auto max-h-[80vh] relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg font-bold"
              onClick={() => setSelectedUser(null)}
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">User Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
              {Object.entries(selectedUser).map(([key, value]) => {
                if (typeof value === "object" && value !== null) return null;
                return (
                  <div key={key}>
                    <strong>{key.replace(/_/g, " ").toUpperCase()}:</strong> {value || "N/A"}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RequestsPage;
