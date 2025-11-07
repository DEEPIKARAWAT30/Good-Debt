import React, { useState, useEffect, useRef } from "react";
import menuData from "../../pages/All JSON/Navbar-content.json";
import { IoCallSharp } from "react-icons/io5";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import logo from "../../assets/logo/logos-dark-transparent.png";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // enquiry modal

  return (
    <div className="flex flex-col lg:mt-13">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        {/* Top Bar */}
        <div className="w-full h-10 bg-[#f5f6f7] hidden md:flex">
          <div className="flex justify-between px-6 lg:px-20 items-center h-full w-full">
            <h1 className="text-sm text-[#9e1e27] ">Welcome to GOOD DEBT</h1>
            <span className="flex gap-3 items-center">
              <IoCallSharp className="text-[20px]" />
              <h1 className="text-[14px]">For help: +91 9876543210</h1>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <FaFacebook className="text-blue-600 text-[18px] hover:scale-110 transition" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <FaInstagram className="text-pink-500 text-[18px] hover:scale-110 transition" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <FaTwitter className="text-sky-500 text-[18px] hover:scale-110 transition" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <FaLinkedin className="text-blue-700 text-[18px] hover:scale-110 transition" />
              </a>
            </span>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="container grid grid-cols-3 bg-white mx-auto justify-between items-center px-6 py-1">
          {/* Logo */}
          <div className="md:h-14 sm:h-11 flex items-center col-span-1">
            <NavLink to={"/"}>
              <img src={logo} alt="Good Debt" className="md:h-16 sm:h-9" />
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex col-span-2 items-center justify-end text-base lg:text-lg font-medium space-x-6">
            {/* <NavLink to={"/About"}>
              <li><h1 className="menu-item">About</h1></li>
            </NavLink> */}

            {/* {menuData.map((menu, index) => (
              <NavItem key={index} item={menu} />
            ))} */}

            <NavLink to={"/Contact"}>
              <li><h1 className="menu-item">Contact</h1></li>
            </NavLink>

            {/* Apply Now (opens modal) */}
            <li>
              <button
                onClick={() => setIsOpen(true)}
                className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg shadow-md transition-all"
              >
                Apply Now
              </button>
            </li>
          </ul>

          {/* Mobile Toggle */}
          <div className="flex md:hidden items-center justify-end col-start-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-2xl"
            >
              {mobileOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white shadow-md px-6 sm:py-2 py-2 sm:space-y-2 text-sm">
            {/* <NavLink to={"/About"} onClick={() => setMobileOpen(false)}>
              <h1 className="cursor-pointer hover:text-red-600 py-1">About</h1>
            </NavLink> */}
            <NavLink to={"/Contact"} onClick={() => setMobileOpen(false)}>
              <h1 className="cursor-pointer hover:text-red-600 py-1">Contact</h1>
            </NavLink>
            {menuData.map((menu, index) => (
              <MobileNavItem
                key={index}
                item={menu}
                setMobileOpen={setMobileOpen}
              />
            ))}
            <button
              onClick={() => {
                setIsOpen(true);
                setMobileOpen(false);
              }}
              className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg shadow-md transition-all"
            >
              Apply Now
            </button>
          </div>
        )}
      </nav>

      {/* Page Content */}
      <Outlet />

      {/* Enquiry Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-6 relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Submit Your Enquiry
              </h2>
              <button
                className="text-gray-500 hover:text-gray-800 text-2xl"
                onClick={() => setIsOpen(false)}
              >
                &times;
              </button>
            </div>

            {/* Form */}
            <form className="space-y-4 text-sm font-normal">
              {/* Name */}
              <div>
                <label className="block text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 mb-1">Email ID</label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-700 mb-1">Description</label>
                <textarea
                  rows="4"
                  placeholder="Enter your message"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                ></textarea>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-red-700 hover:bg-red-800 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-all"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ------------------------------------
// Nav Item Components (kept same as yours)
// ------------------------------------
const generatePath = (item) => {
  if (item.path) return item.path;
  if (item.title.includes("EMI Calculator") || item.title.includes("EMI")) {
    const loanType = item.title
      .toLowerCase()
      .replace("emi calculator", "")
      .replace("emi", "")
      .trim()
      .replace(/\s+/g, "-");
    return loanType ? `/emi-calculator?type=${loanType}` : "/emi-calculator";
  }
  return `/${(item.id || item.title).toLowerCase().replace(/\s+/g, "-")}`;
};

function NavItem({ item }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleItemClick = () => {
    if (!item.sub) {
      navigate(generatePath(item));
      setOpen(false);
    }
  };

  return (
    <li className="relative" ref={ref}>
      {item.sub ? (
        <button
          onClick={() => setOpen(!open)}
          className="menu-item  font-semibold flex items-center"
        >
          {item.title}
          <span className="ml-1">▾</span>
        </button>
      ) : (
        <NavLink
          to={generatePath(item)}
          className={({ isActive }) =>
            `menu-item ${isActive ? "text-red-600 font-semibold" : ""}`
          }
          onClick={handleItemClick}
        >
          {item.title}
        </NavLink>
      )}

      {item.sub && open && (
        <ul className="absolute left-0 top-full items-start flex flex-col font-normal text-[16px] mt-1 bg-white shadow-lg rounded-md min-w-max z-50">
          {item.sub.map((subItem, index) => (
            <SubItem key={index} item={subItem} setParentOpen={setOpen} />
          ))}
        </ul>
      )}
    </li>
  );
}

function SubItem({ item, setParentOpen }) {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  return (
    <li
      className="relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {item.sub ? (
        <div className="px-4 py-2 font-normal text-[16px]   hover:bg-yellow-200 text-center cursor-pointer flex justify-between items-center ">
          {item.title}
          <span>{hover ? "▾" : "▸"}</span>
        </div>
      ) : (
        <NavLink
          to={generatePath(item)}
          className={({ isActive }) =>
            `block px-4 py-2 hover:bg-yellow-200 text-center ${
              isActive ? "bg-yellow-100 font-medium" : ""
            }`
          }
          onClick={() => setParentOpen(false)}
        >7
          {item.title}
        </NavLink>
      )}

      {item.sub && hover && (
        <ul className="absolute text-[16px] font-normal left-full top-0 bg-white shadow-lg rounded-md w-50 z-50">
          {item.sub.map((subSubItem, index) => (
            <li key={index}>
              <NavLink
                to={generatePath(subSubItem)}
                className={({ isActive }) =>
                  `block px-4 py-2 hover:bg-gray-100 ${
                    isActive ? "bg-gray-100 font-medium" : ""
                  }`
                }
                onClick={() => setParentOpen(false)}
              >
                {subSubItem.title}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function MobileNavItem({ item, setMobileOpen }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!item.sub) {
      navigate(generatePath(item));
      setMobileOpen(false);
    } else {
      setOpen(!open);
    }
  };

  return (
    <div className="flex flex-col">
      <div
        onClick={handleClick}
        className="flex justify-between font-normal  items-center cursor-pointer hover:text-red-600 py-2"
      >
        {item.title}
        {item.sub && <span>{open ? "▾" : "▸"}</span>}
      </div>
      {item.sub && open && (
        <div className="pl-4  border-l ml-2 space-y-2">
          {item.sub.map((subItem, index) => (
            <MobileSubItem
              key={index}
              item={subItem}
              setMobileOpen={setMobileOpen}
              level={1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function MobileSubItem({ item, setMobileOpen, level }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!item.sub) {
      navigate(generatePath(item));
      setMobileOpen(false);
    } else {
      setOpen(!open);
    }
  };

  return (
    <div className="flex flex-col">
      <div
        onClick={handleClick}
        className={`flex justify-between items-center cursor-pointer hover:text-red-600 py-1 pl-${
          level * 2
        }`}
      >
        {item.title}
        {item.sub && <span>{open ? "▾" : "▸"}</span>}
      </div>
      {item.sub && open && (
        <div className="pl-4 border-l ml-2 space-y-1">
          {item.sub.map((subSubItem, index) => (
            <div
              key={index}
              className={`cursor-pointer hover:text-red-600 py-1 pl-${
                (level + 1) * 2
              }`}
              onClick={() => {
                navigate(generatePath(subSubItem));
                setMobileOpen(false);
              }}
            >
              {subSubItem.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Navbar;
