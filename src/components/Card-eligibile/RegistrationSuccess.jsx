import React from "react";
import { NavLink } from "react-router-dom";

const RegistrationSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-50">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-4">Registration Successful!</h1>
        <p className="text-gray-700 mb-6">Your loan application has been submitted successfully.</p>
        <NavLink
          to="/"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition"
        >
          Go to Home
        </NavLink>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
