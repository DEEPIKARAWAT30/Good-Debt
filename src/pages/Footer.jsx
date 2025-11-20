import React from 'react';
import { Link } from 'react-router-dom';
import {
  FacebookFilled,
  TwitterSquareFilled,
  LinkedinFilled,
  InstagramFilled,
} from '@ant-design/icons';
import FOOTER_LOGO from "../assets/logo/logos-dark-transparent.jpeg";

const Footer = () => {
  return (
    <footer className="bg-[#9E1E27]! text-white pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:mx-10 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">

          {/* Logo & About */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <Link to="/">
              <img
                loading="lazy"
                src={FOOTER_LOGO}
                className="mb-4 w-32"
                alt="Good Debt Logo"
              />
            </Link>
            <p className="text-justify max-w-sm">
              At Good Debt, we help you manage your financial future with tailored credit card and loan solutions. Trusted by thousands for quick and secure services.
            </p>
          </div>

          {/* Services */}
          <div className='lg:ml-20'>
            <h5 className="mb-3  font-semibold text-lg">Services</h5>
            <ul className="space-y-2">
              <li>
                <Link to="/buisness-loan-eligibility" className="text-white/90 text-sm hover:text-white">Buisness Loan</Link>
              </li>
              <li>
                <Link to="/loan-eligibility" className="text-white/90 text-sm hover:text-white">Personal Loan</Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="mb-3 font-semibold text-lg">Quick Links</h5>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-white/90 hover:text-white">Home</Link></li>
              {/* <li><Link to="/about" className="text-white/90 hover:text-white">About Us</Link></li> */}
              {/* <li><Link to="/faqs" className="text-white/90 hover:text-white">FAQs</Link></li> */}
              <li><Link to="/contact" className="text-white/90 hover:text-white">Contact</Link></li>
              {/* <li><Link to="/become-a-partner" className="text-white/90 hover:text-white">Become a Partner</Link></li> */}
              {/* <li><Link to="/privacy" className="text-white/90 hover:text-white">Privacy Policy</Link></li> */}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h5 className="mb-3 font-semibold text-lg">Contact & Social</h5>
            <p className="text-sm">
              Email: <a href="mailto:support@gooddebt.in" className="text-white/90 hover:text-white">support@gooddebt.in</a>
            </p>
            <p className="text-sm">Phone: +91 98765 43210</p>
            <div className="flex flex-wrap gap-4 mt-3 text-2xl">
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
          <small>© {new Date().getFullYear()} Good Debt. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
