import { Outlet, NavLink } from "react-router-dom";
import {
  Home,
  Users,
  Box,
  CreditCard,
  CalendarDays,
  Megaphone,
  Gift,
  MailOpen,
  User,
  IndianRupee,
  LogOut,
  ChevronDown,
  BadgePercent,
} from "lucide-react";
import logo from "../../assets/logo/logos-dark-transparent.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Layout() {
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = (menu) => setOpenMenu(openMenu === menu ? null : menu);
  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 text-white bg-[#343a40] shadow-md px-2 py-6 fixed top-0 left-0 h-screen">
        <div className="mb-6 text-center">
          <NavLink to="/admin/dashboard">
            <img src={logo} alt="Logo" className="w-40 h-12 mx-auto" />
          </NavLink>
        </div>

        <nav className="space-y-1 text-sm">
          <SidebarLink to="/admin/dashboard" icon={<Home />} text="Dashboard" />
          <SidebarLink to="/admin/dashboard/banks" icon={<CreditCard />} text="Banks" />
          <SidebarLink to="/admin/dashboard/add-product" icon={<Box />} text="Loan PL" />
          <SidebarLink to="/admin/dashboard/management" icon={<BadgePercent />} text="Manage Offers" />
          <SidebarLink to="/admin/dashboard/requests" icon={<MailOpen />} text="Enquiries" />
          <SidebarLink to="/admin/dashboard/intrested" icon={<Users />} text="Interested Users" />

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 w-full rounded hover:bg-gray-500 text-white mt-4"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-60 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center shadow-md rounded-md px-2 py-3 bg-white fixed top-0 left-60 right-0 z-10">
          <h2 className="text-2xl font-bold">Welcome!</h2>
          <div className="flex items-center gap-3">
            {/* <NavLink to="/admin/dashboard/wallets" className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-50 border border-orange-400 shadow">
                <IndianRupee className="w-5 h-5 text-orange-500" />
              </span>
              <span className="text-green-600 font-bold text-lg">20</span>
            </NavLink> */}
            <NavLink
              to="/admin/dashboard/profile"
              className="px-3 py-1 border rounded-md text-blue-600 hover:bg-blue-50"
            >
              <User className="w-4 h-4 inline mr-1" /> My Account
            </NavLink>
          </div>
        </div>

        {/* Scrollable content below header */}
        <div className="flex-1 overflow-auto pt-10 p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

/* Sidebar link component */
function SidebarLink({ to, icon, text }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-3 py-2 rounded-md ${isActive
          ? "bg-gray-700 text-white font-medium"
          : "hover:bg-gray-500 text-white"
        }`
      }
    >
      <span className="w-5 h-5 mr-2">{icon}</span>
      {text}
    </NavLink>
  );
}

/* Sidebar dropdown component */
function SidebarDropdown({ label, icon, isOpen, onClick, links }) {
  return (
    <div>
      <button
        onClick={onClick}
        className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-gray-500 text-white"
      >
        <div className="flex items-center">
          <span className="w-5 h-5 mr-2">{icon}</span>
          {label}
        </div>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="ml-8 mt-1 space-y-1">
          {links.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.to}
              className={({ isActive }) =>
                `block px-2 py-1 rounded-md text-sm ${isActive
                  ? "bg-gray-700 text-white"
                  : "hover:bg-gray-600 text-gray-200"
                }`
              }
            >
              {link.text}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}
