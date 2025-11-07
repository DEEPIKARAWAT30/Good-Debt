import React from "react";
import { motion } from "framer-motion";
import Cube from "../pages/Cube/Cube";

function Partner({ scrollToProducts }) {
  return (
    <div className="w-full h-full pb-30 bg-[rgb(242,242,242)] py-10 mt-5 px-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
        {/* Left Section */}
        <div className="flex flex-col lg:pl-35 mt-5 justify-center text-start lg:text-left">
          <h1 className="text-xl sm:text-4xl md:text-4xl lg:text-4xl text-gray-900 mb-4 leading-snug font-bold">
            Your Trusted Partner for Financial Solutions
          </h1>
          <p className="text-gray-700 mb-6 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
            Good Debt is your go-to platform for all your financial needs,
            offering a wide range of services including loans, credit cards,
            and more. We are committed to providing you with the best
            financial solutions tailored to your needs.
          </p>

          {/* Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <motion.button
              onClick={scrollToProducts}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-red-900 text-white px-6 py-3 rounded-md hover:bg-red-500 transition"
            >
              Get Instant Loan
            </motion.button>
          </div>
        </div>

        {/* Right Section (Cube) */}
        <div className="flex justify-center items-center mt-10 lg:mt-0">
          <Cube />
        </div>
      </div>
    </div>
  );
}

export default Partner;
