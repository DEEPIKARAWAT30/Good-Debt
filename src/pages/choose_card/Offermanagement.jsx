import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function OfferManagement() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);

  const fetchOffers = async () => {
    try {
      const response = await axios.get(
        "https://bank-project-1-x3bi.onrender.com/v1/api/managed-cards/"
      );
      setOffers(response.data);
      localStorage.setItem("offers", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching offers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Try to load from cache first
    const cached = localStorage.getItem("offers");
    if (cached) {
      setOffers(JSON.parse(cached));
      setLoading(false);
    } else {
      fetchOffers();
    }
  }, []);

  useEffect(() => {
    if (sliderRef.current)
      sliderRef.current.style.animationPlayState = "running";
  }, [offers]);

  const handleMouseEnter = () => {
    if (sliderRef.current)
      sliderRef.current.style.animationPlayState = "paused";
  };

  const handleMouseLeave = () => {
    if (sliderRef.current)
      sliderRef.current.style.animationPlayState = "running";
  };

  // Show loading placeholder before data appears
  if (loading)
    return (
      <div
        className="w-full py-16 flex justify-center items-center"
        style={{
          background: "linear-gradient(135deg, #fbeaea 0%, #f5dede 100%)",
        }}
      >
        <p className="text-[#88060f] text-lg animate-pulse font-medium">
          Loading offers...
        </p>
      </div>
    );

  if (!offers || offers.length === 0) return null;

  return (
    <div
      className="w-full py-12 mt-16"
      style={{
        background: "linear-gradient(135deg, #fbeaea 0%, #f5dede 100%)",
        boxShadow:
          "inset 0 2px 6px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h2 className="text-3xl font-bold mb-10 text-center text-[#88060f]">
        Exclusive Offers
      </h2>

      <div className="relative w-full overflow-hidden">
        <div
          ref={sliderRef}
          className="flex animate-slide"
          style={{ width: `${offers.length * 32}rem` }}
        >
          {[...offers, ...offers].map((offer, index) => (
            <div
              key={index}
              onClick={() => window.open(offer.url, "_blank")}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="offer-card flex-shrink-0 w-64 mx-4 bg-white rounded-xl cursor-pointer transition-all"
            >
              <img
                loading="lazy"
                src={offer.image_url || offer.image}
                alt={offer.title}
                className="w-full h-36 object-contain p-4 rounded-t-xl"
              />
              <div className="p-3 text-center">
                <h3 className="text-md font-semibold text-gray-800 hover:text-[#9e1e27] transition-colors">
                  {offer.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes slide {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-slide {
            display: flex;
            animation: slide 25s linear infinite;
          }
          .offer-card {
            transition: transform 160ms ease;
            will-change: transform;
          }
          .offer-card:hover {
            transform: scale(1.04);
            z-index: 10;
          }
        `}
      </style>
    </div>
  );
}
