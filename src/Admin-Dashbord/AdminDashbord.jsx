import React, { useState, useEffect } from "react";
import { Users, UserCheck, CreditCard, Gift, Box } from "lucide-react";
import axios from "axios";

const BASE_URL = "https://bank-project-1-x3bi.onrender.com/v1/api/admin-dashboard/";

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axios.get(BASE_URL);
        setDashboardData(response.data.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return <div className="p-4 text-center text-gray-700">Loading dashboard...</div>;
  }

  const { totals, recent_customers, recent_interests, recent_products } = dashboardData;

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-100 min-h-screen">
      {/* Dashboard Header */}
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800">Admin Dashboard</h2>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Banks"
          value={totals?.banks || 0}
          icon={<CreditCard className="w-6 h-6 text-blue-600" />}
        />
        <DashboardCard
          title="Total Products"
          value={totals?.personal_loans || 0}
          icon={<Box className="w-6 h-6 text-green-600" />}
        />
        <DashboardCard
          title="Interested Users"
          value={totals?.interested_users || 0}
          icon={<UserCheck className="w-6 h-6 text-cyan-600" />}
        />
        <DashboardCard
          title="Eligibility Checks"
          value={totals?.eligibility_checks || 0}
          icon={<CreditCard className="w-6 h-6 text-yellow-500" />}
        />
        <DashboardCard
          title="Offers"
          value={totals?.offers || 0}
          icon={<Gift className="w-6 h-6 text-pink-500" />}
        />
      </div>

      {/* Smaller Vertical Notification Cards */}
      <div className="mt-8 space-y-6">
        {/* Recent Customers */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="flex items-center font-semibold text-base text-gray-800 mb-3">
            <span className="text-yellow-500 mr-2">🔔</span> Recent Customers
          </h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            {recent_customers.map((customer) => (
              <li
                key={customer.id}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-50 p-2 rounded-md hover:bg-gray-100 transition"
              >
                <span>
                  🧑 <strong>{customer.full_name}</strong> ({customer.email})
                </span>
                <a
                  href={`/admin/customers/${customer.id}`}
                  className="text-blue-600 hover:underline mt-1 sm:mt-0"
                >
                  View
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Interests */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="flex items-center font-semibold text-base text-gray-800 mb-3">
            <span className="text-green-500 mr-2">📌</span> Recent Interests
          </h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            {recent_interests.map((interest) => (
              <li
                key={interest.id}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-50 p-2 rounded-md hover:bg-gray-100 transition"
              >
                <span>
                  <strong>{interest.customer_name}</strong> →{" "}
                  <strong>{interest.product_name}</strong>
                </span>
                <a
                  href={`/admin/interests/${interest.id}`}
                  className="text-blue-600 hover:underline mt-1 sm:mt-0"
                >
                  View
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Products */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="flex items-center font-semibold text-base text-gray-800 mb-3">
            <span className="text-purple-500 mr-2">🛍️</span> Recent Products
          </h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            {recent_products.map((product) => (
              <li
                key={product.id}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-50 p-2 rounded-md hover:bg-gray-100 transition"
              >
                <span>
                  <strong>{product.product_title}</strong> by{" "}
                  <strong>{product.bank_name}</strong>
                </span>
                <a
                  href={`/admin/products/${product.id}`}
                  className="text-blue-600 hover:underline mt-1 sm:mt-0"
                >
                  View
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex flex-col items-center justify-center hover:shadow-xl hover:scale-105 transition-transform duration-300">
      <div className="flex justify-center items-center mb-3 bg-gray-100 p-3 rounded-full">
        {icon}
      </div>
      <h6 className="text-gray-500 text-sm mb-1">{title}</h6>
      <h4 className="text-xl md:text-2xl font-semibold text-gray-800 text-center">{value}</h4>
    </div>
  );
}
