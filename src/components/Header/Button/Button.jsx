import React, { useState } from "react";
import EnquiryCard from "../Button/EnquiryCard";

function Button() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Apply Now Button */}
      <div>
        <button
          className="bg-red-700 rounded-sm p-1.5 text-white font-bold"
          onClick={() => setIsOpen(true)}
        >
          Apply Now
        </button>
      </div>

      {/* Enquiry Card Modal */}
      {isOpen && <EnquiryCard onClose={() => setIsOpen(false)} />}
    </>
  );
}

export default Button;
