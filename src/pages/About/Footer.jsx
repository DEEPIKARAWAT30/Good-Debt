import React from 'react';
import { Link } from 'react-router-dom';
import {
  FacebookFilled,
  TwitterSquareFilled,
  LinkedinFilled,
  InstagramFilled,
} from '@ant-design/icons';
import FOOTER_LOGO from "../../assets/logo/logos-dark-transparent.png";

const Footer = () => {
  return (
<footer className="bg-[#343a40] text-white pt-8 pb-4">
  <div className="max-w-7xl mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {/* Logo & About */}
      <div className="md:col-span-3 items-center justify-center lg:items-start lg:justify-start lg:col-span-2 flex flex-col space-y-4">
        <Link to="/">
          <img
            loading="lazy"
            src={FOOTER_LOGO}
            className="w-36  md:w-40"
            alt="Good Debt Logo"
          />
        </Link>
        <p className="text-sm max-w-md">
          At Good Debt, we help you manage your financial future with tailored credit card and loan solutions. Trusted by thousands for quick and secure services.
        </p>
      </div>

      {/* Services */}
      <div>
        <h5 className="mb-2 font-semibold text-lg">Services</h5>
        <ul className="space-y-1">
          <li>
            <Link to="/" className="text-white/90 text-sm hover:text-white">Credit Card</Link>
          </li>
          <li>
            <Link to="/loan-services" className="text-white/90 text-sm hover:text-white">Loan Services</Link>
          </li>
        </ul>
      </div>

      {/* Quick Links */}
      <div>
        <h5 className="mb-2 font-semibold text-lg">Quick Links</h5>
        <ul className="text-sm space-y-1">
          <li><Link to="/" className="text-white/90 hover:text-white">Home</Link></li>
          <li><Link to="/about" className="text-white/90 hover:text-white">About Us</Link></li>
          <li><Link to="/faqs" className="text-white/90 hover:text-white">FAQs</Link></li>
          <li><Link to="/contact" className="text-white/90 hover:text-white">Contact</Link></li>
          <li><Link to="/become-a-partner" className="text-white/90 hover:text-white">Become a Partner</Link></li>
          <li><Link to="/privacy" className="text-white/90 hover:text-white">Privacy Policy</Link></li>
        </ul>
      </div>

      {/* Contact & Social */}
      <div>
        <h5 className="mb-3 font-semibold text-lg">Contact & Social</h5>
        <p className="text-sm mb-1">
          Email: <a href="mailto:support@gooddebt.in" className="text-white/90 hover:text-white">support@gooddebt.in</a>
        </p>
        <p className="text-sm mb-3">Phone: +91 98765 43210</p>
        <div className="flex gap-4 text-2xl">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200" aria-label="Facebook">
            <FacebookFilled />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400" aria-label="Twitter">
            <TwitterSquareFilled />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300" aria-label="LinkedIn">
            <LinkedinFilled />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-300" aria-label="Instagram">
            <InstagramFilled />
          </a>
        </div>
      </div>
    </div>

    {/* Divider */}
    <hr className="border-white/30 my-6" />

    {/* Bottom */}
    <div className="text-center text-white/80 text-sm">
      © {new Date().getFullYear()} Good Debt. All rights reserved.
    </div>
  </div>
</footer>

  );
};

export default Footer;
