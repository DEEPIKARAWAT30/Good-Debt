import React from "react";

//  Import logos (your same import list)
import axis from "../assets/banks/axis_bank.avif";
import hdfc from "../assets/banks/hdfc.avif";
import indusind from "../assets/banks/INDUSIND BANK.png";
import yes from "../assets/banks/yes.avif";
import idfc from "../assets/banks/IDFC FIRST BANK.png";
import hsbc from "../assets/HSBC.avif";
import amex from "../assets/american_express.avif";
import aditya from "../assets/banks/ADITYA BIRLA.png";
import bajaj from "../assets/banks/BAJAJ FINSERV.jpeg";
import bandhan from "../assets/banks/Bandhan Bank.jpeg";
import chola from "../assets/banks/Chola-PROD.png";
import cradit from "../assets/banks/CREDIT SAISION.png";
import finable from "../assets/banks/FINABLE FINANCE.png";
import hero from "../assets/banks/HERO FINCORP.png";
import incread from "../assets/banks/INCRED FINANCE.png";
import muthoot from "../assets/banks/MUTHOOT FINANCE.png";
import paysense from "../assets/banks/PAYSENSE.jpeg";
import piramal from "../assets/banks/PIRAMAL CAPITAL.jpeg";
import tata from "../assets/banks/TATA CAPITAL PL.jpeg";


const collabData = [
  { src: axis, alt: "Axis Bank" },
  { src: hdfc, alt: "HDFC Bank" },
  { src: indusind, alt: "IndusInd Bank" },
  { src: yes, alt: "Yes Bank" },
  { src: idfc, alt: "IDFC First Bank" },
  { src: hsbc, alt: "HSBC Bank" },
  { src: amex, alt: "American Express" },
  { src: aditya, alt: "Aditya Birla" },
  { src: bajaj, alt: "Bajaj Finserv" },
  { src: bandhan, alt: "Bandhan Bank" },
  { src: chola, alt: "Chola" },
  { src: cradit, alt: "Credit Saison" },
  { src: finable, alt: "Finable Finance" },
  { src: hero, alt: "Hero Fincorp" },
  { src: incread, alt: "Incred Finance" },
  { src: muthoot, alt: "Muthoot Finance" },
  { src: paysense, alt: "Paysense" },
  { src: piramal, alt: "Piramal Capital" },
  { src: tata, alt: "Tata Capital" },
];

const Collab = () => {
  return (
    <section className="bg-gray-100 py-7">
      <h4 className="text-center text-2xl font-semibold mb-6">Our Partners</h4>

      <div
        className="overflow-hidden relative  mx-4 sm:mx-10 md:mx-40 mb-5 bg-white p-4 sm:p-6 rounded-md"
        role="region"
        aria-label="Partners logos scrolling horizontally"
      >
        <div
          className="flex animate-scroll space-x-6"
          onMouseEnter={(e) =>
            (e.currentTarget.style.animationPlayState = "paused")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.animationPlayState = "running")
          }
        >
          {[...collabData, ...collabData].map((partner, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center  bg-gray-50 
              min-w-[120px] sm:min-w-[140px] md:min-w-[160px] 
              h-[70px] sm:h-[80px] md:h-[90px] 
              border border-gray-300  rounded-lg"
            >
              <img
                loading="lazy"
                src={partner.src}
                alt={partner.alt}
                className="w-24 sm:w-28 bg-white rounded-md h-[75px] md:w-32  object-contain px-2"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Animation style */}
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          display: flex;
          animation: scroll 15s linear infinite;
          will-change: transform;
        }
      `}</style>
    </section>
  );
};

export default Collab;
