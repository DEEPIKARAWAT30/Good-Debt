import React from 'react';
import fast from '../../assets/why_choose/fast.png';
import satisfaction from '../../assets/why_choose/satisfaction.png';
import safe from '../../assets/why_choose/safe-secure.png';
import personalized from '../../assets/why_choose/personalized.png';
import trust from '../../assets/why_choose/trust.png';
import support from '../../assets/why_choose/support.png';
import interest from '../../assets/why_choose/interest.png';
import user from '../../assets/why_choose/user-friendly.png';

const card = [
  {
    src: fast,
    title: "Fast Disbursal",
    description: "Our team helps customers make informed and confident loan decisions.",
    bg: "#fffaf0"
  },
  {
    src: safe,
    title: "Safe & Secure",
    description: "Applying for loans and credit cards through Good Debt is full% safe and secure.",
    bg: "#effef3"
  },
  {
    src: personalized,
    title: "Personalised",
    description: "We curate the best available offers from  banks, NBFCs & financial institutions",
    bg: "#f0f8ff"
  },
  {
    src: interest,
    title: "Lowest Interest Rates",
    description: "Benefit from the lowest interest rates, ensuring affordable repayments and reduced financial burden.",
    bg: "#fff5f5"
  },
  {
    src: user,
    title: "User-Friendly Experience",
    description: "Our platform offers an intuitive interface, making loan applications hassle-free and simple for all users..",
    bg: "#fff0f5"
  },
  {
    src: satisfaction,
    title: "Customer Satisfaction",
    description: "We prioritize client satisfaction above all else, ensuring quality and reliability.",
    bg: "#f0ffff"
  },
  {
    src: trust,
    title: "Trusted Service",
    description: "Building trust with our clients is our core of this value and long-term commitment.",
    bg: "#fffff0"
  },
  {
    src: support,
    title: "Excellent Support",
    description: "Providing quick, reliable assistance to make your loan journey smooth and hassle-free.",
    bg: "#fff0e5"
  }
];

function Feature() {
  return (
    <>
      <style>{`
        @keyframes slideDown {
          0% {
            transform: translateY(-250px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes slideUp {
          0% {
            transform: translateY(250px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideDown {
          animation: slideDown 1s ease forwards;
        }
        .animate-slideUp {
          animation: slideUp 1s ease forwards;
        }
      `}</style>

      <div className="w-full h-full grid  p-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {card.map((item, index) => {
          const animationClass = index % 2 === 0 ? "animate-slideDown" : "animate-slideUp";
          return (
            <div
              key={index}
              className={`flex flex-col items-center   justify-between p-6 rounded-2xl shadow-md border border-gray-200 ${animationClass}`}
              style={{ backgroundColor: item.bg }}
            >
              {/* Image Section */}
              <div className="flex    items-center justify-center mb-4">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-16 h-16 md:w-20 md:h-15 object-contain"
                />
              </div>

              {/* Text Section */}
              <div className="text-start   h-20">
                <h1 className="text-lg text-center font-bold mb-1">{item.title}</h1>
                <p className="text-sm   text-justify break-words [text-left:inter-word] [text-align-last:center] [hyphens:auto] text-gray-600">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Feature;
