  // import React, { useEffect, useRef, useState } from "react";
  // import coin from "../../assets/About-Img/Coin.jpg";
  // import chart from "../../assets/About-Img/Chart.jpg";
  // import { FaCheckCircle } from "react-icons/fa";
  // import img from "../../assets/About-Img/Cafe.jpg";
  // import img1 from "../../assets/About-Img/student.jpg";
  // import img2 from "../../assets/About-Img/cafe 1.jpg";
  // import img3 from "../../assets/About-Img/cafe page.jpg";
  // import Footer from "../About/Footer";

  // const steps = [
  //   {
  //     title: "Step 1: Introduction",
  //     desc: "Learn about the basics of financial planning and how Good Debt can help you achieve your goals.",
  //     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShp4dkhZXFRvipkiHXgPC1S46XUVwLmKAkrfxCCXBif-fTrn0qxItd9P9lnCgvrmAKdlk&usqp=CAU",
  //   },
  //   {
  //     title: "Step 2: Credit Solutions",
  //     desc: "Discover flexible loan options for personal and business needs.",
  //     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJf6wJhYb_8sp1mdCK5DwkBUzx4eSHjTz-A-5n18Tw9L6wAuk8KuZb3TMilkbGRUMQRi0&usqp=CAU",
  //   },
  //   {
  //     title: "Step 3: Loan Services",
  //     desc: "Discover flexible loan options for personal and business needs.",
  //     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5dpWxZuuBXAl_-MFTb9k1VkuFImVdbj4CXww-UQshQMYWCR1ilqCQgmeiuGwClH5Ugw8&usqp=CAU",
  //   },
  //   {
  //     title: "Step 4: Financial Tools",
  //     desc: "Use our EMI calculators and other tools to plan your finances effectively.",
  //     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEyVwGDUnESTP9qj_qd9uB7FL8sPdDQYYvzBtssx65a51xjdUfs5A_GhrVG8ylk8K9tVU&usqp=CAU",
  //   },
  //   {
  //     title: "Step 5: Success Stories",
  //     desc: "Hear from our satisfied customers and their journey with Good Debt.",
  //     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO61QoZ7eaH-z4R_DbVqNRvpe2PBy4VDjuSv2TZgTwOBF3xrEDCdjLJ9Xbp3Pj2V4HgZU&usqp=CAU",
  //   },
  // ];

  // function About() {
  //   const timelineRef = useRef(null);
  //   const [lineHeight, setLineHeight] = useState(0);

  //   useEffect(() => {
  //     const handleScroll = () => {
  //       const el = timelineRef.current;
  //       if (!el) return;

  //       const rect = el.getBoundingClientRect();
  //       const windowHeight = window.innerHeight;

  //       const progress = Math.min(
  //         Math.max((windowHeight - rect.top) / rect.height, 0),
  //     1
  //       );

  //       setLineHeight(progress * 100);
  //     };

  //     window.addEventListener("scroll", handleScroll);
  //     handleScroll();
  //     return () => window.removeEventListener("scroll", handleScroll);
  //   }, []);

  //   return (
  //     <>
  //       {/* ===== About Section ===== */}
  //       <div className="w-full min-h-screen p-6 md:p-10 pt-32 lg:mt-30 sm:mt20 sm:items-center sm:justify-center bg-white flex flex-col gap-12">
  //         <div className="flex flex-col md:flex-row gap-8">
  //           {/* Left side images */}
  //           <div className="flex-1 flex flex-col items-end justify-end gap-6">
  //             <img src={coin} alt="Coin-Image" className="w-120 rounded shadow-md" />
  //             <img src={chart} alt="Chart-Image" className="w-120 rounded shadow-md" />
  //           </div>

  //           {/* Right side text */}
  //           <div className="flex-1 flex flex-col ml-5 justify-start text-left">
  //             <div className="pr-30">
  //             <h1 className="text-3xl text-blue-600 mb-4 font-bold">About Us</h1>
  //             <h2 className="text-2xl md:text-4xl font-bold text-[#343a40]">
  //               Empowering Your Financial Journey with Smart Credit & Loans.
  //             </h2>
  //             <p className="mt-6 text-gray-700 leading-relaxed">
  //               At Good Debt, we believe credit should be a stepping stone—not a burden.
  //               We offer fast, flexible loans and credit card solutions that help individuals
  //               and businesses grow with confidence, not stress.
  //             </p>

  //             </div>
  //             {/* Features */}
  //             <div className="space-y-3 mt-6 text-gray-800 font-medium">
  //               {[
  //                 "Flexible Personal & Business Loans",
  //                 "Rewarding Credit Card Programs",
  //                 "Fast Approval & Transparent Terms",
  //                 "Trusted by Millions Worldwide",
  //               ].map((text, i) => (
  //                 <div key={i} className="flex items-center gap-3">
  //                   <FaCheckCircle className="text-blue-500" size={18} />
  //                   <span>{text}</span>
  //                 </div>
  //               ))}
  //             </div>

  //             <button className="mt-6 bg-blue-500 w-40 text-white px-2 py-3 rounded shadow hover:bg-blue-700 transition">
  //               Discover More
  //             </button>

  //             {/* Gallery */}
  //             <div className="flex items-center gap-3 mt-6">
  //               {[img, img1, img2, img3].map((src, i) => (
  //                 <img
  //                   key={i}
  //                   src={src}
  //                   alt={`Gallery ${i}`}
  //                   className="w-12 h-12 md:w-14 md:h-14 object-cover rounded-full shadow-md"
  //                 />
  //               ))}
  //               <div className="text-sm ">
  //                 <span className="block">500+ Trusted Global</span>
  //                 <span className="block">Customers</span>
  //               </div>

  //             </div>
  //             <div className="flex  items-start gap-2 t mix-w-md text-center text-blue-600 font-semibold text-lg mt-6">
  //               <div className="w-35 h-30 bg-blue-500 flex flex-col justify-center items-center rounded-md text-white">
  //                 <h3>2K+</h3>
  //                 <p>
  //                   Loans
  //                   <br />
  //                   Approved
  //                 </p>
  //               </div>
  //               <div className="w-35 h-30 bg-black flex flex-col justify-center items-center rounded-md text-white">
  //                 <h3>5+</h3>
  //                 <p>
  //                   Years Of
  //                   <br />
  //                   Experience
  //                 </p>
  //               </div>
  //               <div className="w-35 h-30 bg-[#17a2b8] flex flex-col justify-center items-center rounded-md text-white">
  //                 <h3>15+</h3>
  //                 <p>
  //                   Finance
  //                   <br />
  //                   Experts
  //                 </p>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>

  //       {/* ===== Timeline ===== */}
  //       <div className="relative max-w-6xl mx-auto py-16 px-4">
  //         <div ref={timelineRef} className="relative">
  //           {/* Center Line */}
  //           <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-1 bg-gray-200 rounded h-full">
  //             <div
  //               className="absolute left-0 top-0 w-1 bg-blue-500 rounded transition-all duration-1500 ease-in-out"
  //               style={{ height: `${lineHeight}%` }}
  //             ></div> 
  //           </div>

  //           {/* Steps */}
  //           <div className="space-y-20 flex flex-col sm:items-center sm: justify-center">
  //             {steps.map((step, i) => (
  //               <div
  //                 key={i}
  //                 className={`grid grid-cols-1 md:grid-cols-3 gap-6 items-center`}
  //               >
  //                 {i % 2 === 0 ? (
  //                   <>
  //                     {/* Left text */}
  //                     <div className="order-2 md:order-1">
  //                       <h2 className="text-2xl font-bold text-blue-600">
  //                         {step.title}
  //                       </h2>
  //                       <p className="text-gray-600 mt-2">{step.desc}</p>
  //                     </div>
  //                     {/* Dot */}
  //                     <div className="order-1 md:order-2 flex justify-center relative">
  //                       <div className="w-6 h-6 border-4 border-blue-500 bg-white rounded-full z-10"></div>
  //                     </div>
  //                     {/* Image */}
  //                     <div className="order-3 flex items-center justify-center">
  //                       <img
  //                         src={step.img}
  //                         alt={step.title}
  //                         className="rounded-xl shadow-lg"
  //                       />
  //                     </div>
  //                   </>
  //                 ) : (
  //                   <>
  //                     <div className="order-2 md:order-3">
  //                       <h2 className="text-2xl font-bold text-blue-600">
  //                         {step.title}
  //                       </h2>
  //                       <p className="text-gray-600 mt-2">{step.desc}</p>
  //                     </div>
  //                     <div className="order-1 md:order-2 flex justify-center relative">
  //                       <div className="w-6 h-6 border-4 border-blue-500 bg-white rounded-full z-10"></div>
  //                     </div>
  //                     <div className="order-3 md:order-1">
  //                       <img
  //                         src={step.img}
  //                         alt={step.title}
  //                         className="rounded-xl shadow-lg"
  //                       />
  //                     </div>
  //                   </>
  //                 )}
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       </div>

  //       <Footer />
  //     </>
  //   );
  // }

  // export default About;
