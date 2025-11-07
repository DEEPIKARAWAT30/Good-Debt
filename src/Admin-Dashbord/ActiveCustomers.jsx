import React from "react";
import { Eye, Edit, Trash2, Plus } from "lucide-react";

const ActiveCustomers = () => {
  const customers = [
    {
      id: 1,
      photo: "https://randomuser.me/api/portraits/men/45.jpg",
      name: "Ajay Kumar",
      location: "Satna, MP",
      phone: "+91 99887 66554",
      loanType: "Home Loan",
      emiDate: "2022-08-15",
      type: "Self",
      team: "Self",
      status: "Active",
    },
    {
      id: 2,
      photo: "https://randomuser.me/api/portraits/women/65.jpg",
      name: "Sunita Verma",
      location: "Bhiwadi",
      phone: "+91 98765 12345",
      loanType: "Car Loan",
      emiDate: "2023-01-10",
      type: "Team",
      team: "Team Name",
      status: "Inactive",
    },
    {
      id: 3,
      photo: "https://randomuser.me/api/portraits/women/65.jpg",
      name: "Sunita Verma",
      location: "Bhiwadi",
      phone: "+91 98765 12345",
      loanType: "Car Loan",
      emiDate: "2023-01-10",
      type: "Team",
      team: "Team Name",
      status: "Inactive",
    },
  ];

  return (
    <div className="p-6">
      {/* Header */}
    

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
  <div className="flex  justify-between px-5 bg-gray-200 py-1 items-center ">
        <h2 className="text-md font-bold text-gray-800">Active Customers</h2>
        <a
          href="/add-customer"
          className="flex items-center text-md  gap-2 bg-green-600 text-white px-2 py-1 rounded-lg shadow hover:bg-green-700 transition"
        >
          <Plus size={10} /> Add Customer
        </a>
      </div>
        <table className="w-full text-sm border-collapse">
            
          <thead className="bg-gradient-to-r  from-green-600 to-green-500 text-white">
            <tr>
              <th className="px-1 py-3 text-center">#</th>
              <th className="px-1 py-3 text-center">Photo</th>
              <th className="px-1 py-3 text-center">Name</th>
              <th className="px-1 py-3 text-center">Location</th>
              <th className="px-1 py-3 text-center">Phone</th>
              <th className="px-1 py-3 text-center">Loan Type</th>
              <th className="px-1 py-3 text-center">1st EMI Date</th>
              <th className="px-1 py-3 text-center">Type</th>
              <th className="px-1 py-3 text-center">Team/Partner</th>
              <th className="px-1 py-3 text-center">Status</th>
              <th className="px-1 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c, index) => (
              <tr
                key={c.id}
                className={`border-t hover:bg-gray-50 ${index % 2 === 0 ? "bg-gray-50/50" : "bg-white"
                  }`}
              >
                <td className="px-3 py-3">{c.id}</td>
                <td className="px-3 py-3">
                  <img
                    src={c.photo}
                    alt={c.name}
                    className="w-9 h-9 rounded-full border"
                  />
                </td>
                <td className="px-2 py-3 text-center text-sm">{c.name}</td>
                <td className="px-2 py-3 text-center">{c.location}</td>
                <td className="px-2 py-3 text-center">{c.phone}</td>
                <td className="px-2 py-3 text-center">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    {c.loanType}
                  </span>
                </td>
                <td className="px-1 py-3 text-center">{c.emiDate}</td>
                <td className="px-1 py-3 text-center">{c.type}</td>
                <td className="px-1 py-3 text-center">{c.team}</td>
                <td className="px-1 py-3">
                  <span
                    className={`px-2 py-1 text-center rounded-full text-xs font-semibold ${c.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="px-1 py-3 text-center">
                  <div className="flex justify-center gap-2">
                    <button className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100">
                      <Eye size={16} />
                    </button>
                    <button className="p-2 rounded-lg bg-yellow-50 text-yellow-600 hover:bg-yellow-100">
                      <Edit size={16} />
                    </button>
                    <button className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100">
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
  );
};

export default ActiveCustomers
;
