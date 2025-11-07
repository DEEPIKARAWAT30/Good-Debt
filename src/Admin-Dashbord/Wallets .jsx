import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function Wallets() {
  const chartRef = useRef(null); // canvas ref
  const chartInstanceRef = useRef(null); // chart instance ref

  useEffect(() => {
    if (!chartRef.current) return; // check if canvas exists

    const ctx = chartRef.current.getContext("2d");

    // Destroy previous chart if exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [
          {
            label: "Earnings (₹)",
            data: [7000, 8500, 9000, 11000, 12500],
            borderColor: "#198754",
            backgroundColor: "rgba(25,135,84,0.1)",
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: "#198754",
          },
        ],
      },
      options: {
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: { beginAtZero: true },
        },
      },
    });

    // Cleanup on unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
  
      {/* Commission Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white shadow rounded-lg p-4">
          <h5 className="font-semibold mb-2 flex items-center">
            <i className="fa fa-wallet text-yellow-500 me-2"></i> Total Commission
          </h5>
          <div className="text-2xl font-bold text-green-600 mb-2">₹12,500</div>
          <span className="text-sm text-gray-500">This Month</span>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h5 className="font-semibold mb-2">Commission by Product</h5>
          <ul>
            <li className="flex justify-between">Credit Cards <span>₹7,000 (56%)</span></li>
            <li className="flex justify-between">Loans <span>₹4,000 (32%)</span></li>
            <li className="flex justify-between">Other Services <span>₹1,500 (12%)</span></li>
          </ul>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h5 className="font-semibold mb-2">Commission Milestones</h5>
          <ul className="list-disc list-inside">
            <li>₹10,000 milestone reached</li>
            <li>Top 10% of agents</li>
            <li>Fastest payout this month</li>
          </ul>
        </div>
      </div>

      {/* Earnings Trend Chart */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h5 className="font-semibold mb-2">Earnings Trend</h5>
        <canvas ref={chartRef} height="80"></canvas>
      </div>

      {/* Content below chart */}
      <div className="md:grid md:grid-cols-2 gap-4">

     {/* Loan Commission */}
<div className="bg-white shadow rounded-lg p-4 mb-6">
  <h5 className="font-semibold mb-3">Loan Commission</h5>
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">User</th>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Commission %</th>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        <tr>
          <td className="px-4 py-2">Ravi Kumar</td>
          <td className="px-4 py-2">2.5%</td>
          <td className="px-4 py-2 text-green-600 font-semibold">Approved</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

{/* Credit Card Commission */}
<div className="bg-white shadow rounded-lg p-4 mb-6">
  <h5 className="font-semibold mb-3">Credit Card Commission</h5>
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">User</th>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Amount (₹)</th>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        <tr>
          <td className="px-4 py-2">Priya Singh</td>
          <td className="px-4 py-2">900</td>
          <td className="px-4 py-2 text-yellow-600 font-semibold">Pending</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
      </div>
      <div className="md:grid md:grid-cols-2 gap-4">


{/* Other Commission Details */}
<div className="bg-white shadow rounded-lg p-4 mb-6">
  <h5 className="font-semibold mb-3">Other Commission Details</h5>
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">User</th>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Commission %</th>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Amount (₹)</th>
          <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        <tr>
          <td className="px-4 py-2">Ajay Mehta</td>
          <td className="px-4 py-2">3.0%</td>
          <td className="px-4 py-2">300</td>
          <td className="px-4 py-2 text-red-600 font-semibold">Rejected</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

{/* Transaction History */}
<div className="bg-white shadow rounded-lg p-4 mb-6">
  <h5 className="font-semibold mb-3">Transaction History</h5>
  <ul className="divide-y divide-gray-200">
    <li className="flex justify-between py-2">27 May 2025 <span className="text-green-600 font-bold">+₹500</span></li>
    <li className="flex justify-between py-2">25 May 2025 <span className="text-green-600 font-bold">+₹900</span></li>
    <li className="flex justify-between py-2">20 May 2025 <span className="text-red-600 font-bold">-₹200</span></li>
    <li className="flex justify-between py-2">15 May 2025 <span className="text-green-600 font-bold">+₹300</span></li>
  </ul>
</div>

      </div>
{/* Revenue Insights */}
<div className="bg-white shadow rounded-lg p-4 mb-6">
  <h5 className="font-semibold mb-3">Revenue Insights</h5>
  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
    <div className="bg-gray-50 p-3 rounded shadow text-center">
      <div className="text-sm text-gray-600">Highest earning day</div>
      <div className="font-bold text-green-600">25 May 2025</div>
    </div>
    <div className="bg-gray-50 p-3 rounded shadow text-center">
      <div className="text-sm text-gray-600">Lowest earning day</div>
      <div className="font-bold text-red-600">20 May 2025</div>
    </div>
    <div className="bg-gray-50 p-3 rounded shadow text-center">
      <div className="text-sm text-gray-600">Average commission rate</div>
      <div className="font-bold">2.4%</div>
    </div>
    <div className="bg-gray-50 p-3 rounded shadow text-center">
      <div className="text-sm text-gray-600">Growth vs last month</div>
      <div className="font-bold text-green-600">+8%</div>
    </div>
    <div className="bg-gray-50 p-3 rounded shadow text-center">
      <div className="text-sm text-gray-600">Active users</div>
      <div className="font-bold">18</div>
    </div>
    <div className="bg-gray-50 p-3 rounded shadow text-center">
      <div className="text-sm text-gray-600">Total payouts</div>
      <div className="font-bold text-green-600">₹12,500</div>
    </div>
  </div>
</div>


    </div>
  );
}

export default Wallets;
