import { useState } from "react";
import {
  Home,
  Box,
  Users,
  User,
  CreditCard,
  Calculator,
  Megaphone, 
  CalendarCheck,
  Mail,
  LogOut,
  Settings,
  DollarSign,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function CheckEligibility() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
 
      {/* Main Content */}
      <main className="flex-1 p-4 overflow-y-auto">
        {/* Header */}
        

        {/* Eligibility Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Credit Card */}
          <div className="bg-white shadow border border-blue-200 p-6 rounded-md text-center">
            <CreditCard className="w-12 h-12 text-blue-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-blue-600">
              Credit Card Eligibility
            </h3>
            <p className="text-gray-600 mb-4">
              Check if you qualify for a credit card based on your financial profile.
            </p>
            <NavLink to={"/admin/credit-card-eligibility"}>
            <a
              href="/admin/credit-card-eligibility"
              className="inline-block px-4 py-2 border border-blue-500 text-blue-600 rounded-md hover:bg-blue-50"
            >
              Check Now
            </a>
            </NavLink>
          </div>

          {/* Personal Loan */}
          <div className="bg-white shadow border border-green-200 p-6 rounded-md text-center">
            <DollarSign className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-green-600">
              Personal Loan Eligibility
            </h3>
            <p className="text-gray-600 mb-4">
              Find out if you're eligible for a personal loan with competitive rates.
            </p>
            <NavLink to={"/admin/personal-loan-eligibility"}>
              <a
                href="/admin/personal-loan-eligibility"
                className="inline-block px-4 py-2 border border-green-500 text-green-600 rounded-md hover:bg-green-50"
              >
                Check Now
              </a>
            </NavLink>
          </div>
        </div>
      </main>
    </div>
  );
}
