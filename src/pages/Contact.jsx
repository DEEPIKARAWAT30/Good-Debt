import React from "react";
import Footer from '../pages/About/Footer';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

function Contact() {
  return (
   <div className="w-full">
  {/* Top Section */}
  <div className="text-center  mt-12 md:mt-15 h-50 w-full flex flex-col items-center justify-center px-4">
    <h3 className="text-red-800 text-3xl font-semibold">Contact Us</h3>
    <h2 className="text-3xl md:text-4xl font-semibold mt-3 max-w-xl mx-auto">
      Get In Touch With Us
    </h2>
    <p className="text-gray-600 mt-3 text-sm max-w-2xl mx-auto px-2">
      We are here to help you with your loan application. Please feel free to reach out to us at any time.
    </p>
  </div>

  {/* Middle Section */}
  <div className="grid md:grid-cols-2  gap-10  px-4 sm:px-6 md:px-20 w-full">
    <div className="flex flex-col items-center md:items-start justify-center mx-auto max-w-lg text-center md:text-left">
      <h3 className="text-5xl mb-4">How can we help?</h3>
      <p className="text-gray-600 mb-6">
        Our loan experts with decades of experience can help you with getting instant loans, credit cards, and insurance from our 100+ partner banks and NBFCs.
      </p>
    </div>
    <div className="flex  justify-center  items-center">
      <img
        src="https://cdn.mymoneymantra.com/icons/contact_us_Final_f9f48e797f_e8dce63ab2_4a8ddace4f.svg"
        alt="Contact Illustration"
        className=" object-cover w-full h-full"
      />
    </div>
  </div>

  {/* Contact + Form Section */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10  px-4 sm:px-6 md:px-20 w-full">
    {/* Contact Info */}
    <div className="space-y-4  mb-8 flex flex-col items-center md:items-start text-center md:text-left">
      <div>
        <h1 className="font-semibold text-2xl ml-11">Addresses</h1>
        <p className="flex items-center gap-2 justify-center md:justify-start">
          <span className="text-blue-600 text-2xl">📍</span>
          C21 Mall, 58, PU4, 5th floor, behind C21 mall, scheme no 54 Bhind, Indore, Madhya Pradesh 452010
        </p>
      </div>
      <div>
        <h1 className="font-semibold text-2xl ml-11">Mobile</h1>
        <p className="flex items-center gap-2 justify-center md:justify-start">
          <span className="text-blue-600 text-2xl">📞</span> +91 9876543210
        </p>
      </div>
      <div>
        <h1 className="text-2xl font-semibold ml-11">Email</h1>
        <p className="flex items-center gap-2 justify-center md:justify-start">
          <span className="text-blue-600 text-2xl">✉️</span> support@gooddebt.in
        </p>
      </div>
    </div>

    {/* Form */}
    <form className="grid  grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl mx-auto">
      <input type="text" placeholder="Your Name" className="border p-2 rounded" />
      <input type="email" placeholder="Your Email" className="border p-2 rounded" />
      <input type="text" placeholder="Your Phone" className="border p-2 rounded" />
      <input type="text" placeholder="Your Project" className="border p-2 rounded" />
      <input type="text" placeholder="Subject" className="border p-2 rounded col-span-2" />
      <textarea placeholder="Message" rows="4" className="border p-2 rounded col-span-2"></textarea>
      <button type="submit" className="bg-red-800 text-white py-2 rounded col-span-2 hover:bg-red-600">
        Send Message
      </button>
    </form>
  </div>

  {/* Bottom Google Map */}
  <div className="mt-10 px-4 sm:px-6 md:px-20 w-full max-w-7xl mx-auto">
    <iframe
      title="Google Map"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.2411689012026!2d75.87771607504886!3d22.610238679466732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd46a9e6ed7b%3A0x8cf4a7cdbf86aabb!2sC21%20Mall!5e0!3m2!1sen!2sin!4v1692873030245!5m2!1sen!2sin"
      width="100%"
      height="400"
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="rounded-md border-0"
    />
  </div>
  <div className="w-full h-20 text-2xl mt-2">
    <div className="flex justify-center items-center h-full">
      <a href="#" className="mx-2">
        <FaFacebook className="text-blue-600 hover:text-blue-800" />
      </a>
      <a href="#" className="mx-2">
        <FaInstagram className="text-pink-600 hover:text-pink-800" />
      </a>
      <a href="#" className="mx-2">
        <FaTwitter className="text-blue-400 hover:text-blue-600" />
      </a>
      <a href="#" className="mx-2">
        <FaLinkedin className="text-blue-700 hover:text-blue-900" />
      </a>
    </div>
  </div>
  <div className="">
  <Footer/>
  </div>
</div>

  );
}

export default Contact;
