import React, { useEffect, useState } from "react";

function Card() {
  const [eligibleBanks, setEligibleBanks] = useState([]);

  useEffect(() => {
    //  Call your restAPI endpoint
    fetch("http://127.0.0.1:8000/customers/with-eligi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        full_name: "Aman Sahu",
        email: "aman@example.com",
        phone: "9876543210",
        dob: "1998-08-29",
        pan: "ABCDE1234F",
        employment_type: "Private Employee",
        salary: 40000,
        city: "Raipur",
        pincode: "492001",
      }),
    })
      .then((res) => res.json())
      .then((data) => setEligibleBanks(data.eligible_banks || []))
      .catch((err) => console.error("Error fetching:", err));
  }, []);

  return (
    <div className="flex flex-wrap gap-6 justify-center mt-10">
      {eligibleBanks.length > 0 ? (
        eligibleBanks.map((bank, i) => (
          <div
            key={i}
            className="bg-linear-to-r from-purple-500 to-indigo-600 text-white rounded-2xl shadow-lg p-6 w-80 transform hover:scale-105 transition duration-300"
          >
            {/* Bank Name */}
            <h2 className="text-2xl font-bold mb-3">{bank.bank_name}</h2>

            {/* Interest Rate */}
            <div className="mb-2">
              <p className="text-sm opacity-80">Interest Rate</p>
              <p className="text-lg font-semibold">{bank.interest_rate}%</p>
            </div>

            {/* Min Salary */}
            <div className="mb-2">
              <p className="text-sm opacity-80">Min Salary Required</p>
              <p className="text-lg font-semibold">₹{bank.min_salary_required}</p>
            </div>

            {/* Job Type */}
            <div className="mb-2">
              <p className="text-sm opacity-80">Eligible Job Type</p>
              <p className="text-lg font-semibold">{bank.job_type}</p>
            </div>

            {/* Age Limit */}
            <div className="mb-2">
              <p className="text-sm opacity-80">Age Limit</p>
              <p className="text-lg font-semibold">
                {bank.min_age} - {bank.max_age} Years
              </p>
            </div>

            {/* Max Loan Amount */}
            <div className="mt-4">
              <p className="text-sm opacity-80">Max Loan Amount</p>
              <p className="text-xl font-bold text-yellow-300">
                ₹{bank.max_loan_amount}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600 text-lg">No eligible banks found</p>
      )}
    </div>
  );
}

export default Card;
