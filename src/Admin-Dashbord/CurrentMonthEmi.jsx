import React, { useState } from "react";
import { Eye, Edit, Trash2, Plus, CalendarDays, CreditCard, CheckCircle, XCircle } from "lucide-react";

const CurrentMonthEmi = () => {
  const [emiCustomers, setEmiCustomers] = useState([
    {
      id: 1,
      photo: "https://randomuser.me/api/portraits/men/51.jpg",
      name: "Ramesh Yadav",
      location: "Indore",
      phone: "+91 99887 66554",
      type: "Self",
      loanType: "Home Loan",
      emiAmount: "₹12,500",
      dueDate: "2025-05-30",
      status: "Paid",
    },
    {
      id: 2,
      photo: "https://randomuser.me/api/portraits/women/61.jpg",
      name: "Meena Joshi",
      location: "Bhopal, MP",
      phone: "+91 98765 12345",
      type: "Team",
      loanType: "Car Loan",
      emiAmount: "₹8,000",
      dueDate: "2025-05-28",
      status: "Unpaid",
    },
  ]);

  const getBadgeColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-[#9e1e27] text-white";
      case "Unpaid":
        return "bg-red-100 text-red-700";
      case "Self":
        return "bg-[#9e1e27] text-white";
      case "Team":
        return "bg-gray-200 text-gray-800";
      case "Home Loan":
        return "bg-gray-100 text-gray-800";
      case "Car Loan":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Heading */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-[#9e1e27]">Current Month EMI Customers</h2>
        <button className="flex items-center gap-2 bg-[#9e1e27] text-white px-4 py-2 rounded-md hover:bg-[#7a1620] transition">
          <Plus size={16} /> Add EMI
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-center">
            <thead className="bg-gray-100">
              <tr>
                {[
                  "#", "Photo", "Name", "Location", "Phone", "Type", "Loan Type",
                  "EMI Amount", "Due Date", "EMI Status", "Actions"
                ].map((head) => (
                  <th key={head} className="px-4 py-3 text-sm font-semibold text-gray-700">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {emiCustomers.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-4 py-2">{c.id}</td>
                  <td className="px-4 py-2">
                    <img src={c.photo} alt={c.name} className="w-10 h-10 rounded-full mx-auto" />
                  </td>
                  <td className="px-4 py-2">{c.name}</td>
                  <td className="px-4 py-2">{c.location}</td>
                  <td className="px-4 py-2">{c.phone}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(c.type)}`}>{c.type}</span>
                  </td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(c.loanType)}`}>{c.loanType}</span>
                  </td>
                  <td className="px-4 py-2 font-semibold">{c.emiAmount}</td>
                  <td className="px-4 py-2">{c.dueDate}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor(c.status)}`}>{c.status}</span>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex justify-center gap-2">
                      <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition text-[#9e1e27]">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition text-[#9e1e27]">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white shadow-md rounded-lg p-4 text-center hover:shadow-lg transition">
          <CreditCard className="mx-auto text-[#9e1e27] w-8 h-8 mb-2" />
          <div className="font-semibold">Total EMIs</div>
          <div className="text-xl font-bold">130</div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 text-center hover:shadow-lg transition">
          <CheckCircle className="mx-auto text-[#9e1e27] w-8 h-8 mb-2" />
          <div className="font-semibold">Paid</div>
          <div className="text-xl font-bold">110</div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 text-center hover:shadow-lg transition">
          <XCircle className="mx-auto text-[#9e1e27] w-8 h-8 mb-2" />
          <div className="font-semibold">Unpaid</div>
          <div className="text-xl font-bold">20</div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 text-center hover:shadow-lg transition">
          <CalendarDays className="mx-auto text-[#9e1e27] w-8 h-8 mb-2" />
          <div className="font-semibold">Due Today</div>
          <div className="text-xl font-bold">5</div>
        </div>
      </div>
    </div>
  );
};

export default CurrentMonthEmi;
