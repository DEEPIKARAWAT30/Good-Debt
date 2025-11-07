import React from "react";
import { motion } from "framer-motion";
import dicount from "../../assets/Dis-cradit/discount-bag.gif"; // Loan
// import credit from "../../assets/Dis-cradit/credit-card.gif";  // Credit Card
import { NavLink } from "react-router-dom";

function Products() {
  return (
    <div className="w-full bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl text-justify   md:text-4xl font-bold text-gray-900 mb-12  md:text-left leading-snug">
          Bringing you the Best Products <br className="hidden md:block" />
          from Top Banks & Financial Institutions
        </h2>

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* buisness loan */}
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="shadow-md hover:shadow-2xl rounded-2xl p-6 bg-white flex flex-col justify-between relative h-full max-w-md mx-auto md:mx-0 transition transform hover:-translate-y-1">
              
              {/* Title + Text */}
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                  Buisness Loan
                </h3>
                <p className="text-gray-600  text-sm md:text-sm mt-4 mb-5">
                 Fuel your business growth effortlessly with our flexible business loan solutions
                </p>
              </div>

              {/* Button */}
              <div className="mt-auto">
                <NavLink to="/buisness-loan-eligibility">
                  <button className="bg-red-700 text-white px-5 py-2 rounded-lg hover:bg-red-800 transition w-full md:w-auto text-sm md:text-base">
                    Check Eligibility
                  </button>
                </NavLink>
              </div>

              {/* Icon */}
              <div className="absolute top-0 right-6">
                <img
                  src={dicount}
                  alt="Buisness Loan"
                  className="w-12 h-12 md:w-18 md:h-18 object-contain"
                />
              </div>
            </div>
          </motion.div>

          {/* Personal Loan */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            <div className="shadow-md hover:shadow-2xl rounded-2xl p-6 bg-white flex flex-col justify-between relative  max-w-md mx-auto md:mx-0  transition transform hover:-translate-y-1">
              
              {/* Title + Text */}
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                  Personal Loan
                </h3>
                <p className="text-gray-600 text-sm md:text-sm mt-6 mb-5">
                  Achieve your dreams easily with our versatile personal loan options.
                </p>
              </div>

              {/* Button */}
              <div className="mt-auto">
                <NavLink to="/loan-eligibility">
                  <button className="bg-red-700 text-white px-5 py-2 rounded-lg hover:bg-red-800 transition w-full md:w-auto text-sm md:text-base">
                    Check Eligibility
                  </button>
                </NavLink>
              </div>

              {/* Icon */}
              <div className="absolute top-0 right-6">
                <img
                  src={dicount}
                  alt="Personal Loan"
                  className="w-12 h-12 md:w-18 md:h-18 object-contain"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

export default Products;
