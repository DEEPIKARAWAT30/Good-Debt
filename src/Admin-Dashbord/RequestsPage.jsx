import React, { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import axios from "axios";

const BASE_URL = "https://good-debt.onrender.com/api/enquiry/";
const BANK_INTEREST_URL = "https://good-debt.onrender.com/api/bank-interest/";

function RequestsPage() {
  const [requestsData, setRequestsData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [bankModalData, setBankModalData] = useState([]);
  const [showBankModal, setShowBankModal] = useState(false);

  // Convert Date to Indian Standard Time
  const convertToIST = (dateString) => {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  // Fetch Bank List Modal
  const openBankModal = async (enquiryId) => {
    try {
      const res = await axios.get(`${BANK_INTEREST_URL}?enquiry_id=${enquiryId}`);
      setBankModalData(res.data?.data || []);
      setShowBankModal(true);
    } catch (error) {
      console.error("Bank fetch error:", error);
      setBankModalData([]);
      setShowBankModal(true);
    }
  };

  // Fetch Enquiries
  const fetchRequests = async (url = BASE_URL) => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(url);

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
              date: convertToIST(dateField),
            };
          })
        : [];

      setRequestsData(customers);
      setNextPage(response.data.next);
      setPrevPage(response.data.previous);
    } catch (err) {
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
      req.id?.toString().includes(search) ||
      req.status?.toLowerCase().includes(search.toLowerCase())
  );

  const capitalizeWords = (text) => {
    return text
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getStatusStyle = (loanFor) => {
    const cleanValue = loanFor.trim().toUpperCase();
    const formattedText = capitalizeWords(loanFor);

    switch (cleanValue) {
      case "PL":
        return {
          text: "Personal Loan",
          class: "font-bold text-[#1e9e27]",
        };

      case "BL":
        return {
          text: "Business Loan",
          class: "font-bold text-[#9e1e27]",
        };

      default:
        return {
          text: formattedText,
          class: "font-bold text-gray-700",
        };
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
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9e1e27]"
          />
        </div>
      </div>

      {loading && <p className="text-gray-700">Loading requests...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-md relative z-0">
        <table className="w-full min-w-[900px] bg-white border-collapse">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr className="text-left text-gray-600 uppercase text-sm">

              {/* NEW SERIAL NUMBER COLUMN */}
              <th className="px-6 py-3 border-b">S.No</th>

              <th className="px-6 py-3 border-b">Full Name</th>
              <th className="px-6 py-3 border-b">Email</th>
              <th className="px-6 py-3 border-b">Phone</th>
              <th className="px-6 py-3 border-b">Employment Type</th>
              <th className="px-6 py-3 border-b">Loan</th>
              <th className="px-6 py-3 border-b">Interested Banks</th>
              <th className="px-6 py-3 border-b">Date</th>
              <th className="px-6 py-3 border-b text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredRequests.map((req, index) => (
              <tr
                key={req.id || req.email}
                className="border-b hover:bg-gray-50 transition"
              >

                {/* SERIAL NUMBER */}
                <td className="px-6 py-4 font-medium text-gray-800">
                  {index + 1}
                </td>

                <td className="px-6 py-4 font-medium text-gray-800">
                  {req.full_name}
                </td>
                <td className="px-6 py-4">{req.email_address}</td>
                <td className="px-6 py-4">{req.phone_number}</td>
                <td className="px-6 py-4">{req.employee_type}</td>

                <td className="px-6 py-4">
                  {(() => {
                    const loan = getStatusStyle(req.loan_for);
                    return (
                      <span
                        className={`inline-flex items-center justify-center px-4 py-2 rounded-full text-sm ${loan.class}`}
                      >
                        {loan.text}
                      </span>
                    );
                  })()}
                </td>

                {/* NEW BUTTON */}
                <td className="px-6 py-4">
                  <button
                    onClick={() => openBankModal(req.id)}
                    className=" cursor-pointer px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                    type="button"
                  >
                     
                    View Banks
                  </button>
                </td>

                <td className="px-6 py-4">{req.date}</td>

                <td className="px-6 py-4 text-center flex justify-center">
                  <button
                    className=" cursor-pointer p-2 rounded-md bg-gray-100 hover:bg-gray-200"
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
          className={`px-4 py-2 rounded-md border ${
            prevPage ? "bg-white hover:bg-gray-100" : "bg-gray-100 cursor-pointer"
          }`}
        >
          Previous
        </button>

        <span className="text-gray-700 text-sm">Page {currentPage}</span>

        <button
          onClick={handleNext}
          disabled={!nextPage || loading}
          className={`px-4 py-2 rounded-md border ${
            nextPage ? "bg-white hover:bg-gray-100" : "bg-gray-100  cursor-pointer"
          }`}
        >
          Next
        </button>
      </div>

      {/* USER MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 px-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-[90%] md:max-w-4xl mx-auto p-6 overflow-auto max-h-[80vh] relative">
            <button
              className=" cursor-pointer absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg font-bold"
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
                    <strong>{key.replace(/_/g, " ").toUpperCase()}:</strong>{" "}
                    {value || "N/A"}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* BANK MODAL */}
      {showBankModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-auto p-6 relative overflow-hidden">
            <button
              onClick={() => setShowBankModal(false)}
              className=" cursor-pointer absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl font-bold"
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900">
              Interested Banks
            </h2>

            {bankModalData.length === 0 ? (
              <p className="text-center text-gray-600 py-4">
                No banks found for this enquiry.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                    <tr>
                      <th className="px-4 py-3 border-b">Bank Name</th>
                      <th className="px-4 py-3 border-b">City</th>
                      <th className="px-4 py-3 border-b">State</th>
                      <th className="px-4 py-3 border-b">Loan Type</th>
                      <th className="px-4 py-3 border-b">Processed By</th>
                      <th className="px-4 py-3 border-b">Visit</th>
                    </tr>
                  </thead>

                  <tbody className="text-gray-700 text-sm">
                    {bankModalData.map((bank, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3 border-b font-medium">
                          {bank.bank_name}
                        </td>

                        <td className="px-4 py-3 border-b">{bank.city || "Unknown"}</td>

                        <td className="px-4 py-3 border-b">{bank.state || "Unknown"}</td>

                        <td className="px-4 py-3 border-b">
                          <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-semibold">
                            {bank.loan_types}
                          </span>
                        </td>

                        <td className="px-4 py-3 border-b font-medium">
                          {bank.process_by || "N/A"}
                        </td>

                        <td className="px-4 py-3 border-b">
                          <a
                            href={bank.bank_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 font-medium hover:underline"
                          >
                            Open →
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default RequestsPage;
