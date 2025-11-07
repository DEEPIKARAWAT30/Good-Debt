// import React from "react";

// const EligibleBanks = ({ apiResponse, onApplyAnother }) => {
//   if (!apiResponse) return null;

//   return (
//     <div className="container max-w-6xl mx-auto py-5 px-4">
//       <div className="bg-white border my-10 border-gray-300 rounded-lg shadow-lg p-6 md:p-8">

//         {/* Success Header */}
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold text-green-600 mb-2">Application Successful!</h2>
//           <p className="text-gray-600">{apiResponse.message}</p>
//         </div>

//         {/* Customer Info */}
//         <div className="mb-8">
//           <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Customer Information</h3>
//           <p><strong>Name:</strong> {apiResponse.customer.full_name}</p>
//           <p><strong>Email:</strong> {apiResponse.customer.email}</p>
//           <p><strong>Phone:</strong> {apiResponse.customer.phone}</p>
//         </div>

//         {/* Eligible Banks */}
//         <div className="mb-8">
//           <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Eligible Banks & Loan Offers</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {apiResponse.eligible_banks.map((bank, index) => (
//               <div key={index} className="border border-gray-200 rounded-lg p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
//                 <h4 className="text-lg font-bold text-gray-800">{bank.bank_name}</h4>
//                 <p>Interest: {bank.interest_rate}%</p>
//                 <p>Max Loan: ₹{bank.max_loan_amount}</p>
//                 <p>Min Salary: ₹{bank.min_salary_required}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <button
//             onClick={onApplyAnother}
//             className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition duration-200"
//           >
//             Apply for Another Loan
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EligibleBanks;
