import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Footer from "../../pages/About/Footer";
import pinkback from "../../assets/banner/pink-back.jpg";

// API constant (use exact URL requested)
const ENQUIRY_API_URL = "https://good-debt.onrender.com/api/enquiry/";

// Helpers ---------------
const safeToNumber = (v) => {
  if (v === "" || v === null || v === undefined) return v;
  const n = Number(v);
  return Number.isNaN(n) ? v : n;
};

const formatCurrency = (value) => {
  try {
    const num = Number(value);
    if (Number.isNaN(num)) return value;
    return `₹${num.toLocaleString("en-IN")}`;
  } catch (err) {
    return value;
  }
};

const safeGet = (obj, path, fallback = "-") => {
  try {
    return path.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), obj) ?? fallback;
  } catch {
    return fallback;
  }
};

// Component ----------------------------------------------------------------
export default function Credit() {
  // Use field names that match backend payload exactly
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    email_address: "",
    pan_number: "",
    date_of_birth: "",
    employee_type: "Salaried", // Salaried / Self-Employed
    current_city: "",
    current_pincode: "",
    loan_for: "businessLoan", // default as in your example
    net_income: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [interestModal, setInterestModal] = useState({ open: false, bank: null });

  const [modal, setModal] = useState({ open: false, title: "", message: "" });

  // Interest state for eligible banks list (post-submit)
  const [submittedInterests, setSubmittedInterests] = useState([]);
  const [loadingInterest, setLoadingInterest] = useState(null);

  // Generic field change handler — keys match backend names
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === "number" ? safeToNumber(value) : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Validation uses the same keys as formData
  const validateForm = () => {
    const newErrors = {};

    // full_name
    if (!formData.full_name || !formData.full_name.trim()) {
      newErrors.full_name = "Full name is required";
    }

    // phone_number (10 digits)
    if (!formData.phone_number) {
      newErrors.phone_number = "Phone number is required";
    } else if (!/^\d{10}$/.test(String(formData.phone_number).trim())) {
      newErrors.phone_number = "Phone number must be 10 digits";
    }

    // email_address
    if (!formData.email_address || !String(formData.email_address).trim()) {
      newErrors.email_address = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(String(formData.email_address))) {
      newErrors.email_address = "Email is invalid";
    }

    // pan_number (only required — no strict pattern enforced as requested)
    if (!formData.pan_number || !String(formData.pan_number).trim()) {
      newErrors.pan_number = "PAN is required";
    }

    // date_of_birth
    if (!formData.date_of_birth) {
      newErrors.date_of_birth = "Date of birth is required";
    }

    // current_city
    if (!formData.current_city || !String(formData.current_city).trim()) {
      newErrors.current_city = "City is required";
    }

    // current_pincode (6 digits)
    if (!formData.current_pincode || !String(formData.current_pincode).trim()) {
      newErrors.current_pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(String(formData.current_pincode).trim())) {
      newErrors.current_pincode = "Pincode must be 6 digits";
    }

    // net_income
    if (formData.net_income === "" || formData.net_income === null || formData.net_income === undefined) {
      newErrors.net_income = "Net monthly income is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Modal helpers
  const openModal = (title = "", message = "") => setModal({ open: true, title, message });
  const closeModal = () => setModal({ open: false, title: "", message: "" });

  // Submit handler — sends payload exactly as backend expects
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      openModal("Validation error", "Please fix the highlighted errors before submitting.");
      return;
    }

    setIsLoading(true);
    setApiError(null);

    // Create payload — our formData already uses backend keys
    const payload = {
      full_name: formData.full_name,
      phone_number: String(formData.phone_number).trim(),
      email_address: String(formData.email_address).trim(),
      pan_number: String(formData.pan_number).trim(),
      date_of_birth: formData.date_of_birth,
      employee_type: formData.employee_type,
      current_city: String(formData.current_city).trim(),
      current_pincode: String(formData.current_pincode).trim(),
      loan_for: formData.loan_for,
      net_income: String(formData.net_income),
    };

    try {
      const response = await axios.post(ENQUIRY_API_URL, payload, {
        headers: { "Content-Type": "application/json" },
        timeout: 20000,
      });

      setApiResponse(response.data);
      setShowForm(false);

      if (response.data?.message) {
        openModal("Application Submitted", response.data.message);
      }
    } catch (err) {
      const serverMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.response?.data?.detail ||
        err?.message ||
        "Something went wrong. Please try again.";

      setApiError(serverMessage);
      openModal("Submission Error", serverMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const openInterestModal = (bank) => {
    setInterestModal({ open: true, bank });
  };

  const closeInterestModal = () => {
    setInterestModal({ open: false, bank: null });
  };
  // Reset form to initial state so user can re-apply
  const resetForm = () => {
    setShowForm(true);
    setApiResponse(null);
    setApiError(null);
    setFormData({
      full_name: "",
      phone_number: "",
      email_address: "",
      pan_number: "",
      date_of_birth: "",
      employee_type: "Salaried",
      current_city: "",
      current_pincode: "",
      loan_for: "businessLoan",
      net_income: "",
    });
    setErrors({});
    setSubmittedInterests([]);
    setLoadingInterest(null);
    navigate('/');
  };

  // Handle "Interested" action for eligible banks
  const handleInterested = (bank) => {
    if (!bank) return;
    const interestKey = `${bank.bank_id}-${bank.product_id}`;
    if (submittedInterests.includes(interestKey)) return;

    setLoadingInterest(interestKey);
    setTimeout(() => {
      setSubmittedInterests((prev) => [...prev, interestKey]);
      setLoadingInterest(null);
      openModal("Interest Recorded", `Your interest for ${bank.bank_name} has been recorded. They will contact you soon.`);
    }, 900);
  };

  // Render -----------------------------------------------------------------
  return (
    <div className="min-h-screen mt-10 bg-gray-50">
      {/* Hero */}
      <div
        className="flex flex-col justify-center items-center w-full text-white bg-no-repeat bg-cover bg-center h-48 sm:h-64 md:h-80 lg:h-[400px]"
        style={{ backgroundImage: `url(${pinkback})`, backgroundSize: "cover", backgroundPosition: "center", height: "400px" }}
      >
        <div className="text-center m-4">
          <h2 className="font-bold text-3xl">Apply Now</h2>
          <p>Fill out the form below to secure your loan application.</p>
          <p>
            <NavLink to="/" className="text-red-800 hover:underline hover:text-red-600">
              Home
            </NavLink>
            <span> </span>
            <span>Business Loan</span>
          </p>
        </div>
      </div>

      {/* Global Loader */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600" />
            <p className="mt-4 text-lg font-medium text-gray-700">Processing your application...</p>
          </div>
        </div>
      )}

      {/* Modal */}
     {modal.open && (
  <div
    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    onClick={closeModal}
  >
    <div
      className="bg-white rounded-lg p-6 w-11/12 max-w-md shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      {modal.title && (
        <h3 className="text-xl font-bold mb-3 text-gray-900">{modal.title}</h3>
      )}

      <p className="text-gray-700 text-base">{modal.message}</p>

      {/* Buttons */}
      <div className="mt-6 flex justify-end gap-3">

        {/* Cancel Button */}
        <button
          onClick={closeModal}
          className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition duration-200"
        >
          Cancel
        </button>

        {/* OK Button */}
        <button
          onClick={closeModal}
          className="px-6 py-2.5 bg-red-800 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-200 shadow-md hover:shadow-lg"
        >
          OK
        </button>

      </div>
    </div>
  </div>
)}



     {interestModal.open && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md transform animate-slideUp">

      {/* Title */}
      <h3 className="text-2xl font-bold text-gray-800 text-center mb-3">
        Choose Your Preferred Option
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-center mb-6 leading-relaxed">
        You can continue with <span className="font-semibold">Good Debt</span> 
         for expert guidance, or directly visit the official bank website.  
        Select the option that suits you best.
      </p>

      {/* Buttons */}
      <div className="flex flex-col gap-4">

        {/* Good Debt Button */}
        <button
          onClick={() => {
            closeInterestModal();
            openModal(
              "Good Debt",
              "Thank you for your interest! Our Good Debt team will reach out shortly to guide you with the best loan options."
            );
          }}
          className="w-full py-3 px-4 rounded-xl bg-red-800 hover:bg-red-700 text-white font-medium shadow-lg transition-all"
        >
          Continue with Good Debt
        </button>

        {/* Bank Button */}
        <button
          onClick={() => {
            closeInterestModal();
            openModal(
              interestModal.bank.bank_name,
              <span>
                You are being redirected to the official page of{" "}
                <span className="font-semibold">{interestModal.bank.bank_name}</span>.
                <br />
                <a
                  href={interestModal.bank.bank_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline font-medium"
                >
                  Visit Bank Website
                </a>
              </span>
            );
          }}
          className="w-full py-3 px-4 rounded-xl bg-white hover:bg-red-900 hover:text-white text-black border-2 border-red-800 font-medium shadow-lg transition-all"
        >
          Visit Bank Website
        </button>

        {/* Cancel Button */}
        <button
          onClick={closeInterestModal}
          className="w-full py-3 px-4 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition-all"
        >
          Cancel
        </button>

      </div>
    </div>
  </div>
)}


      {/* Success / Application Result */}
      {apiResponse && !showForm && (
        <div className="container max-w-6xl mx-auto py-5 px-4">
          <div className="bg-white border my-10 border-gray-300 rounded-lg shadow-lg p-6 md:p-8">
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>

              <h2 className="text-3xl font-bold text-green-600 mb-2">Application Successful!</h2>
                     <p className="text-gray-600">Enquiry created successfully for <span className='font-bold'>Buisness Loan</span></p>
            </div>

            {/* Customer Details */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Customer Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="font-semibold text-gray-800">{safeGet(apiResponse, "customer.full_name", formData.full_name)}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-gray-800">{safeGet(apiResponse, "customer.email", formData.email_address)}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-semibold text-gray-800">{safeGet(apiResponse, "customer.phone", formData.phone_number)}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">PAN</p>
                  <p className="font-semibold text-gray-800">{safeGet(apiResponse, "customer.pan", formData.pan_number)}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Date of Birth</p>
                  <p className="font-semibold text-gray-800">{safeGet(apiResponse, "customer.dob", formData.date_of_birth)}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Employment Type</p>
                  <p className="font-semibold text-gray-800">{safeGet(apiResponse, "customer.employment_type", formData.employee_type)}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Net Monthly Salary</p>
                  <p className="font-semibold text-gray-800">
                    {(() => {
                      const salary = safeGet(apiResponse, "customer.net_monthly_salary", safeGet(apiResponse, "customer.salary", formData.net_income));
                      return salary === "-" || salary === undefined || salary === null || salary === ""
                        ? "-"
                        : formatCurrency(salary);
                    })()}
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">City</p>
                  <p className="font-semibold text-gray-800">{safeGet(apiResponse, "customer.city", formData.current_city)}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Pincode</p>
                  <p className="font-semibold text-gray-800">{safeGet(apiResponse, "customer.pincode", formData.current_pincode)}</p>
                </div>


              </div>
            </div>

            {/* Eligible Banks */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Eligible Banks & Loan Offers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.isArray(apiResponse?.related_bank_details) && apiResponse.related_bank_details.length > 0 ? (
                  apiResponse.related_bank_details.map((bank, index) => {
                    const showFullDetails = bank.city !== "Unknown" && bank.state !== "Unknown";

                    return (
                     <div
  key={index}
  className="border border-gray-200 rounded-lg p-4 sm:p-5 hover:shadow-md transition-shadow
             bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col justify-between
             min-h-[170px]"
>
  <div className="flex items-center justify-between mb-2 sm:mb-3">
    <h4 className="text-md sm:text-lg font-semibold text-red-800 truncate">
      {bank.bank_name}
    </h4>
    <span className="text-xs sm:text-sm text-gray-600">{bank.pincode}</span>
  </div>

  <button
    onClick={() => openInterestModal(bank)}
    className="w-md mt-3 py-2 text-sm sm:text-base bg-red-800 hover:bg-red-700 text-white font-medium rounded-lg transition duration-200"
  >
    Interested
  </button>



                        {/* {showFullDetails && (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Loan Amount</span>
                  <span className="font-semibold text-green-600">
                    {bank?.loan_amount_range ? (
                      `₹${Number(bank.loan_amount_range.min || 0).toLocaleString()} - ₹${Number(bank.loan_amount_range.max || 0).toLocaleString()}`
                    ) : bank?.estimated_max_loan ? (
                      `Up to ₹${Number(bank.estimated_max_loan).toLocaleString()}`
                    ) : (
                      "-"
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Rate of Interest</span>
                  <span className="font-semibold">{bank.roi_range || (bank.interest_rate ? `${bank.interest_rate}%` : "-")}</span>
                </div>

                {bank.product_name && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Product</span>
                    <span className="font-semibold">{bank.product_name}</span>
                  </div>
                )}
              </div>
            )} */}

                        {/* {showFullDetails && (
              <button
                onClick={() => handleInterested(bank)}
                disabled={submittedInterests.includes(`${bank.bank_id}-${bank.product_id}`)}
                className={`w-full mt-4 flex items-center justify-center gap-2 ${
                  submittedInterests.includes(`${bank.bank_id}-${bank.product_id}`)
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-800 hover:bg-red-700"
                } text-white font-medium py-2 px-4 rounded-lg transition duration-200`}
              >
                {submittedInterests.includes(`${bank.bank_id}-${bank.product_id}`) ? "Already Interested" : "Interested"}
              </button>
            )} */}
                      </div>
                    );
                  })
                ) : (
                  <div className="col-span-1 md:col-span-2 text-gray-600">No eligible banks to show.</div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={resetForm} className="px-6 py-3 bg-red-800 hover:bg-red-600 text-white font-medium rounded-lg transition duration-200">
                Apply for Another Loan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* API Error Display */}
      {apiError && (
        <div className="container max-w-4xl mx-auto py-5 px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>

              <div>
                <h3 className="text-lg font-semibold text-red-800">Application Error</h3>
                <p className="text-red-700">{apiError}</p>
              </div>
            </div>

            <button onClick={() => setApiError(null)} className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition duration-200">
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Form Section */}
      {showForm && (
        <div className="container max-w-4xl mx-auto py-5 px-4">
          <div className="bg-white border my-10 border-gray-300 rounded-lg shadow-md p-4 md:p-8">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="full_name"
                    id="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none transition ${errors.full_name ? "border-red-500" : "border-gray-300"}`}
                    required
                  />
                  {errors.full_name && <p className="mt-1 text-sm text-red-600">{errors.full_name}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone_number"
                    id="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    maxLength="10"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none transition ${errors.phone_number ? "border-red-500" : "border-gray-300"}`}
                    required
                  />
                  {errors.phone_number && <p className="mt-1 text-sm text-red-600">{errors.phone_number}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email_address" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email_address"
                    id="email_address"
                    value={formData.email_address}
                    onChange={handleChange}
                    placeholder="Enter email"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none transition ${errors.email_address ? "border-red-500" : "border-gray-300"}`}
                    required
                  />
                  {errors.email_address && <p className="mt-1 text-sm text-red-600">{errors.email_address}</p>}
                </div>

                {/* PAN */}
                <div>
                  <label htmlFor="pan_number" className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
                  <input
                    type="text"
                    name="pan_number"
                    id="pan_number"
                    value={formData.pan_number}
                    onChange={handleChange}
                    placeholder="Enter PAN Number"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none transition ${errors.pan_number ? "border-red-500" : "border-gray-300"}`}
                    required
                  />
                  {errors.pan_number && <p className="mt-1 text-sm text-red-600">{errors.pan_number}</p>}
                </div>

                {/* Date of Birth */}
                <div>
                  <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    name="date_of_birth"
                    id="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none transition ${errors.date_of_birth ? "border-red-500" : "border-gray-300"}`}
                    required
                  />
                  {errors.date_of_birth && <p className="mt-1 text-sm text-red-600">{errors.date_of_birth}</p>}
                </div>

                {/* Net Monthly Income */}
                <div>
                  <label htmlFor="net_income" className="block text-sm font-medium text-gray-700 mb-1">Net Monthly Income</label>
                  <input
                    type="number"
                    name="net_income"
                    id="net_income"
                    value={formData.net_income}
                    onChange={handleChange}
                    placeholder="Enter net monthly income"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none transition ${errors.net_income ? "border-red-500" : "border-gray-300"}`}
                    required
                  />
                  {errors.net_income && <p className="mt-1 text-sm text-red-600">{errors.net_income}</p>}
                </div>

                {/* Employee Type */}
                <div>
                  <label htmlFor="employee_type" className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
                  <select
                    name="employee_type"
                    id="employee_type"
                    value={formData.employee_type}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none transition"
                  >
                    <option value="Salaried">Salaried</option>
                    {/* <option value="Self-Employed">Self-Employed</option>
                    <option value="Other">Other</option> */}
                  </select>
                </div>

                {/* City */}
                <div>
                  <label htmlFor="current_city" className="block text-sm font-medium text-gray-700 mb-1">Current City of Residence</label>
                  <input
                    type="text"
                    name="current_city"
                    id="current_city"
                    value={formData.current_city}
                    onChange={handleChange}
                    placeholder="Enter city"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none transition ${errors.current_city ? "border-red-500" : "border-gray-300"}`}
                    required
                  />
                  {errors.current_city && <p className="mt-1 text-sm text-red-600">{errors.current_city}</p>}
                </div>

                {/* Pincode */}
                <div>
                  <label htmlFor="current_pincode" className="block text-sm font-medium text-gray-700 mb-1">Current Pincode</label>
                  <input
                    type="text"
                    name="current_pincode"
                    id="current_pincode"
                    value={formData.current_pincode}
                    onChange={handleChange}
                    placeholder="Enter pincode"
                    maxLength="6"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none transition ${errors.current_pincode ? "border-red-500" : "border-gray-300"}`}
                    required
                  />
                  {errors.current_pincode && <p className="mt-1 text-sm text-red-600">{errors.current_pincode}</p>}
                </div>

                {/* Loan For (hidden or selectable) */}
                {/* <div>
                  <label htmlFor="loan_for" className="block text-sm font-medium text-gray-700 mb-1">Loan Purpose</label>
                  <select
                    name="loan_for"
                    id="loan_for"
                    value={formData.loan_for}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none transition"
                  >
                    <option value="businessLoan">Business Loan</option>
                    <option value="personalLoan">Personal Loan</option>
                    <option value="homeLoan">Home Loan</option>
                  </select>
                </div> */}
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <button type="submit" className="w-full bg-red-800 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200">Submit</button>
              </div>

              {/* Terms */}
              <div className="mt-2 text-center text-sm">
                <a href="#" className="text-gray-500 hover:text-red-600">Terms and Conditions</a>
                <span className="mx-2 text-gray-300">|</span>
                <a href="#" className="text-gray-500 hover:text-red-600">Privacy Policy</a>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
