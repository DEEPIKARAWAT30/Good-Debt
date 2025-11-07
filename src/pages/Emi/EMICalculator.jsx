import { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(200000);
  const [interestRate, setInterestRate] = useState(11.6);
  const [tenure, setTenure] = useState(6);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  
  // State for toggling chart elements
  const [showPrincipal, setShowPrincipal] = useState(true);
  const [showInterest, setShowInterest] = useState(true);
  const [showTotalPayment, setShowTotalPayment] = useState(false);

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, tenure]);

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 12 / 100; // Monthly interest rate
    const time = parseInt(tenure);
    
    if (principal > 0 && rate > 0 && time > 0) {
      const emiValue = principal * rate * Math.pow(1 + rate, time) / (Math.pow(1 + rate, time) - 1);
      const totalPaymentValue = emiValue * time;
      const totalInterestValue = totalPaymentValue - principal;
      
      setEmi(emiValue);
      setTotalInterest(totalInterestValue);
      setTotalPayment(totalPaymentValue);
    } else {
      setEmi(0);
      setTotalInterest(0);
      setTotalPayment(0);
    }
  };

  // Prepare chart data based on toggle states
  const chartData = {
    labels: [
      showPrincipal && 'Principal',
      showInterest && 'Interest',
      showTotalPayment && 'Total Payment'
    ].filter(Boolean),
    datasets: [
      {
        data: [
          showPrincipal ? loanAmount : 0,
          showInterest ? totalInterest : 0,
          showTotalPayment ? totalPayment : 0
        ].filter(value => value > 0),
        backgroundColor: [
          showPrincipal && '#3B82F6',
          showInterest && '#EF4444',
          showTotalPayment && '#10B981'
        ].filter(Boolean),
        hoverBackgroundColor: [
          showPrincipal && '#2563EB',
          showInterest && '#DC2626',
          showTotalPayment && '#059669'
        ].filter(Boolean),
        borderWidth: 1,
        borderColor: '#fff',
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 15,
          padding: 15,
          font: {
            size: 12
          }
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.raw;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${context.label}: ₹${value.toFixed(2)} (${percentage}%)`;
          }
        }
      }
    },
  };

  return (
    <div className="min-h-screen mt-8   py-8 px-4">
      <div className="max-w-6xl mx-auto border border-gray-200 bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 md:p-8">
          <h2 className="text-center text-3xl font-bold text-gray-800 mb-5 underline">EMI CALCULATOR </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Panel for Inputs */}
            <div className="md:col-span-1 space-y-6">
              <div>
                <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Amount (₹)
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2"
                  id="loanAmount"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(parseFloat(e.target.value) || 0)}
                />
                <input
                  type="range"
                  className="w-full form-range h-2"
                  min="100000"
                  max="5000000"
                  step="10000"
                  value={loanAmount}
                  id="loanAmountRange"
                  onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
                />
              </div>
              
              <div>
                <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700 mb-2">
                  Interest Rate (%)
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2"
                  id="interestRate"
                  value={interestRate}
                  step="0.1"
                  onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                />
                <input
                  type="range"
                  className="w-full form-range h-2"
                  min="5"
                  max="20"
                  step="0.1"
                  value={interestRate}
                  id="interestRateRange"
                  onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                />
              </div>
              
              <div>
                <label htmlFor="tenure" className="block text-sm font-medium text-gray-700 mb-2">
                  Tenure (Months)
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2"
                  id="tenure"
                  value={tenure}
                  onChange={(e) => setTenure(parseInt(e.target.value) || 0)}
                />
                <input
                  type="range"
                  className="w-full form-range h-2"
                  min="6"
                  max="240"
                  step="1"
                  value={tenure}
                  id="tenureRange"
                  onChange={(e) => setTenure(parseInt(e.target.value))}
                />
              </div>
              
              <hr className="my-4" />
              
              <div className=" p-4 bg-gray-50 rounded-lg">
                <h5 className="text-lg font-semibold text-gray-700">Your EMI is :-</h5>
                <h2 className="text-3xl font-semibold  mt-2">₹ {emi.toFixed(2)}</h2>
                <small className="text-gray-500">Per Month</small>
              </div>
            </div>

            {/* Middle Panel for Pie Chart */}
            <div className="md:col-span-1 flex flex-col items-center justify-start">
              <h4 className="text-xl font-semibold text-gray-700 mb-2">Payment Breakdown</h4>
              
          
              
              <div className="relative mt-4 w-74 h-74">
                <Pie data={chartData} options={chartOptions} />
              </div>
              
              {/* Total Payment Display */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg w-full">
                <h5 className="text-lg font-semibold text-gray-700 mb-2">Total Payment</h5>
                <h2 className="text-2xl font-bold text-green-600">₹ {totalPayment.toFixed(2)}</h2>
                <p className="text-sm text-gray-500 mt-1">Principal + Interest</p>
              </div>
            </div>

            {/* Right Panel for EMI Results */}
            <div className="md:col-span-1 flex flex-col justify-start">
              <hr className="my-4 md:hidden" />
              
              <div className="space-y-1 bg-gray-50 p-6 rounded-lg">
                <div className="flex justify-between items-center  border-b border-gray-200">
                  <span className="text-gray-700">Principal Amount</span>
                  <span className="font-semibold text-blue-600">₹ {loanAmount.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center  border-b border-gray-200">
                  <span className="text-gray-700">Interest Payable</span>
                  <span className="font-semibold text-red-600">₹ {totalInterest.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center  ">
                  <span className="text-gray-700">Total Payment</span>
                  <span className="font-semibold text-green-600">₹ {totalPayment.toFixed(2)}</span>
                </div>
                
                <hr className="my-2" />
                
                <div className="flex justify-between items-center ">
                  <span className="text-gray-700 font-medium">Your EMI Amount</span>
                  <span className="text-xl font-bold text-blue-600">₹ {emi.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EMICalculator;