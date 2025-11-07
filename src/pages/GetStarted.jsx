// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { FaUserPlus, FaWallet, FaChartLine } from "react-icons/fa";
 

// const GetStarted = () => {
//   const navigate = useNavigate();

//   const steps = [
//     { 
//       step: "01", 
//       title: "Sign Up & Set Goals", 
//       desc: "Create your free account and tell us your financial goals.", 
//       icon: <FaUserPlus />, 
//       route: "/Create" 
//     },
//     { 
//       step: "02", 
//       title: "Add Debts & Income", 
//       desc: "Easily add your debts, loans, and income sources.", 
//       icon: <FaWallet />, 
//       route: "/add-debts" 
//     },
//     { 
//       step: "03", 
//       title: "Get Your Plan", 
//       desc: "Receive a customized repayment and growth strategy.", 
//       icon: <FaChartLine />, 
//       route: "/get-plan" 
//     },
//   ];

//   return (
//     <section className="min-h-screen bg-white flex flex-col items-center px-6 sm:px-12 py-12">
//       {/* Heading */}
//       <div className="text-center max-w-3xl">
//         <h1 className="text-4xl sm:text-5xl font-bold text-[#c10007] mb-4">
//           Start Your Journey to Smarter Debt Management
//         </h1>
//         <p className="text-gray-600 text-lg mb-6">
//           Track, plan, and turn debt into a tool for financial growth with your personalized roadmap.
//         </p>
//       </div>

//       {/* Steps Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl">
//         {steps.map((item, index) => (
//           <div
//             key={index}
//             onClick={() => navigate(item.route)}
//             className="cursor-pointer bg-gradient-to-br from-[#ffe5e5] to-white rounded-3xl p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
//           >
//             <div className="flex justify-center mb-4 text-[#c10007] text-5xl transition-transform duration-300 hover:scale-110">
//               {item.icon}
//             </div>
//             <span className="text-5xl font-extrabold text-[#c10007]">{item.step}</span>
//             <h3 className="text-2xl font-semibold mt-4 text-gray-800">{item.title}</h3>
//             <p className="text-gray-600 mt-2">{item.desc}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default GetStarted;
