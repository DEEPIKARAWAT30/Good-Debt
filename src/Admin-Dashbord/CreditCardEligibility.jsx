import React, { useState } from "react";

function CreditCardEligibility() {
  const [employmentType, setEmploymentType] = useState("");
  const [existingLoan, setExistingLoan] = useState("no");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      {/* Title */}
      <h2 className="text-2xl font-bold text-blue-600 mb-6 flex items-center gap-2">
        <i className="fa-solid fa-money-check-dollar"></i>
        Credit Card Eligibility
      </h2>

      {/* Form Card */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 md:p-8">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-gray-700 mb-1">Mobile Number</label>
            <input
              type="tel"
              maxLength="10"
              placeholder="Enter mobile number"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-gray-700 mb-1">Date of Birth</label>
            <input
              type="date"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Employment Type */}
          <div>
            <label className="block text-gray-700 mb-1">Employment Type</label>
            <select
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value)}
              required
            >
              <option value="">Choose...</option>
              <option value="private-employee">Private Employee</option>
              <option value="government">Government</option>
              <option value="self-employed-professional">
                Self Employed Professional
              </option>
              <option value="self-employed">Self Employed</option>
            </select>
          </div>

          {/* Salary / Yearly Income */}
          <div>
            <label className="block text-gray-700 mb-1">
              {employmentType === "self-employed" ||
              employmentType === "self-employed-professional"
                ? "Yearly Income"
                : "Net Monthly Salary"}
            </label>
            <input
              type="number"
              placeholder={
                employmentType === "self-employed" ||
                employmentType === "self-employed-professional"
                  ? "Enter yearly income in INR"
                  : "Enter salary in INR"
              }
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-gray-700 mb-1">
              Current City of Residence
            </label>
            <input
              type="text"
              placeholder="Enter city"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Pincode */}
          <div>
            <label className="block text-gray-700 mb-1">Current Pincode</label>
            <input
              type="text"
              maxLength="6"
              placeholder="Enter pincode"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Existing Loan */}
          <div>
            <label className="block text-gray-700 mb-1">
              Do You Hold an Existing Loan?
            </label>
            <select
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              value={existingLoan}
              onChange={(e) => setExistingLoan(e.target.value)}
              required
            >
              <option value="">Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Conditional Credit Card Details */}
          {existingLoan === "yes" && (
            <>
              <div>
                <label className="block text-gray-700 mb-1">
                  Credit Card Limit
                </label>
                <input
                  type="text"
                  placeholder="Enter your card limit"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">
                  Card Tenure (How long have you held the card?)
                </label>
                <input
                  type="text"
                  placeholder="e.g., 2 years, 6 months"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </>
          )}
        </form>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>

        {/* Footer Links */}
        <div className="mt-3 text-center text-sm text-gray-500">
          <a href="#" className="hover:underline">
            Terms and Conditions
          </a>{" "}
          |{" "}
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
}

export default CreditCardEligibility;
