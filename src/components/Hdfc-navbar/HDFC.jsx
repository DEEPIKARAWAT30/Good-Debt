import React from 'react';
import Footer from '../../pages/About/Footer';

const HDFC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto mt-10 md:mt-20 px-4 md:px-0 py-6 md:py-8">
        <h4 className="text-center mb-6 text-2xl sm:text-3xl md:text-4xl font-bold">
          Swiggy HDFC Bank Credit Card
        </h4>
        <div className="flex flex-col md:flex-row items-center">
          {/* Text Section */}
          <div className="w-full md:w-1/2 lg:ml-20 mb-6 md:mb-0 md:pr-6">
            <p className="text-justify text-sm sm:text-base md:text-md leading-relaxed">
              Swiggy HDFC credit card is a co-branded credit card issued by HDFC Bank in partnership with Swiggy.
              The card offers a range of benefits and rewards, especially for those who frequently use Swiggy for
              food delivery. With this card, you can earn cashback on Swiggy orders, dining, and other categories.
              Additionally, the card provides welcome benefits, fuel surcharge waiver, and more. The annual fee
              for the card is Rs. 500, which is waived off on spending Rs. 2,00,000 in a year.
            </p>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              loading="lazy"
              src="https://storage.googleapis.com/a1aa/image/X9lRSZF1WOO_uoIZ51P6bUWHX09m2jnzkpCI-Xf5AkY.jpg"
              alt="Swiggy HDFC Bank Credit Card"
              className="h-48 sm:h-56 md:h-60 w-full md:w-90 rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container w-full px-2 md:px-0 space-y-6">
        {/* Key Highlights Card */}
        <div className="bg-white mx-2 md:mx-10 border border-gray-400 rounded-lg shadow-md p-4 md:p-6 overflow-x-auto">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Key Highlights of Swiggy HDFC Bank Credit Card</h2>
          <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
            <tbody className="divide-y divide-gray-200">
              <tr>
                <th className="px-4 py-3 bg-gray-50 text-left font-medium text-gray-700">Joining Fee</th>
                <td className="px-4 py-3">Rs. 500 + applicable charges</td>
              </tr>
              <tr>
                <th className="px-4 py-3 bg-gray-50 text-left font-medium text-gray-700">Renewal Fee</th>
                <td className="px-4 py-3">Rs. 500 + applicable charges</td>
              </tr>
              <tr>
                <th className="px-4 py-3 bg-gray-50 text-left font-medium text-gray-700">Cashback</th>
                <td className="px-4 py-3">10% on Swiggy, 5% on online spending across other HDFC & 1% on other categories</td>
              </tr>
              <tr>
                <th className="px-4 py-3 bg-gray-50 text-left font-medium text-gray-700">Welcome Benefits</th>
                <td className="px-4 py-3">Complimentary Swiggy One membership for 3 months on card activation</td>
              </tr>
              <tr>
                <th className="px-4 py-3 bg-gray-50 text-left font-medium text-gray-700">Fuel Surcharge Waiver</th>
                <td className="px-4 py-3">1% waiver on fuel transactions</td>
              </tr>
              <tr>
                <th className="px-4 py-3 bg-gray-50 text-left font-medium text-gray-700">EMI</th>
                <td className="px-4 py-3">6-24 months for selected items & categories</td>
              </tr>
              <tr>
                <th className="px-4 py-3 bg-gray-50 text-left font-medium text-gray-700">Net Monthly Income</th>
                <td className="px-4 py-3">Above Rs. 25,000 for salaried & Rs. 6 Lakhs p.a. for self-employed</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Table of Contents Card */}
        <div className="bg-white mx-2 md:mx-10 border border-gray-400 rounded-lg shadow-md p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            Key Highlights of Swiggy HDFC Bank Credit Card <span className="text-green-500">[hide]</span>
          </h2>
          <ul className="divide-y divide-gray-200 text-sm sm:text-base">
            <li className="py-2"><a href="#" className="text-blue-600 hover:underline">Features & Benefits of HDFC Swiggy Credit Card</a></li>
            <li className="py-2"><a href="#" className="text-blue-600 hover:underline">HDFC Swiggy Credit Card Fees and Charges</a></li>
            <li className="py-2"><a href="#" className="text-blue-600 hover:underline">HDFC Swiggy Credit Card Eligibility Criteria</a></li>
            <li className="py-2"><a href="#" className="text-blue-600 hover:underline">HDFC Swiggy Credit Card Reward Points</a></li>
            <li className="py-2"><a href="#" className="text-blue-600 hover:underline">How to Apply for HDFC Swiggy Credit Card?</a></li>
            <li className="py-2"><a href="#" className="text-blue-600 hover:underline">FAQs</a></li>
          </ul>
        </div>

        {/* Features & Benefits Card */}
        <div className="bg-white mx-2 md:mx-10 border border-gray-400 rounded-lg shadow-md p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Features & Benefits of HDFC Swiggy Credit Card</h2>
          <ul className="divide-y divide-gray-200 text-sm sm:text-base">
            <li className="py-2">HDFC Swiggy Credit Card offers the following features and benefits:</li>
            <li className="py-2 font-medium">Welcome Benefits</li>
            <li className="py-2">Complimentary Swiggy One membership for 3 months.</li>
            <li className="py-2">10% cashback on Swiggy orders and additional 5% cashback on top brands like Zomato, BigBasket, and more.</li>
            <li className="py-2 font-medium">Cashback</li>
            <li className="py-2">10% cashback on Swiggy orders, 5% cashback on online spending across other HDFC & 1% on other categories.</li>
            <li className="py-2 font-medium">Fuel Surcharge Waiver</li>
            <li className="py-2">1% waiver on fuel transactions.</li>
            <li className="py-2 font-medium">EMI</li>
            <li className="py-2">6-24 months for selected items & categories.</li>
            <li className="py-2 font-medium">Net Monthly Income</li>
            <li className="py-2">Above Rs. 25,000 for salaried & Rs. 6 Lakhs p.a. for self-employed.</li>
            <li className="py-2 font-medium">Other Benefits</li>
            <li className="py-2">Access to exclusive dining, travel, and entertainment offers.</li>
            <li className="py-2">Zero liability on lost card.</li>
            <li className="py-2">Instant loan facility.</li>
            <li className="py-2">Reward points on every transaction.</li>
            <li className="py-2">Easy EMI conversion on high-value purchases.</li>
            <li className="py-2">24x7 customer support.</li>
          </ul>
        </div>

        {/* Other Benefits Card */}
        <div className="bg-white mx-2 md:mx-10 border border-gray-400 rounded-lg shadow-md p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Other Benefits</h2>
          <ul className="space-y-2 text-sm sm:text-base">
            <li className="text-gray-700 border-b border-gray-300 pb-2">Zero Lost card liability in the unfortunate event of losing your Swiggy HDFC Bank Credit Card. Report the loss immediately to HDFC Bank so that all future transactions will be blocked.</li>
            <li className="text-gray-700 border-b border-gray-300 pb-2">5% cashback on Swiggy spends capped at Rs. 500 of cashback.</li>
            <li className="text-gray-700 border-b border-gray-300 pb-2">Reward points on all other transactions.</li>
            <li className="text-gray-700 border-b border-gray-300 pb-2">This card is valid for commercial payments, allowed for a maximum of Rs. 2,00,000 for a single transaction.</li>
            <li className="text-gray-700 border-b border-gray-300 pb-2">Balance Transfer on EMI allows you to transfer the outstanding balance from other credit cards to your Swiggy HDFC Bank Credit Card at a lower rate of interest.</li>
            <li className="text-gray-700">Fuel surcharge waiver across all petrol pumps in India for fuel purchases between Rs. 400 - Rs. 5000.</li>
          </ul>
        </div>

        {/* Joining & Annual Fees */}
        <div className="bg-white mx-2 md:mx-10 border border-gray-400 rounded-lg shadow-md p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Joining & Annual Fees</h2>
          <ul className="space-y-2 text-sm sm:text-base">
            <li className="text-gray-700 border-b border-gray-300 pb-2">Joining Fee: Rs. 500 + applicable taxes.</li>
            <li className="text-gray-700">Annual Fee: Rs. 500 + applicable charges. The annual fee is waived off if the annual spends are more than Rs. 1,00,000.</li>
          </ul>
        </div>

        {/* Linking Instructions */}
        <div className="bg-white mx-2 md:mx-10 border border-gray-400 rounded-lg shadow-md p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">How to Link Swiggy HDFC Bank Credit Card on the Swiggy App?</h2>
          <p className="mb-4 text-gray-700 text-sm sm:text-base">
            If you have applied for the Swiggy HDFC Bank Credit Card through HDFC Bank's portal, you need to link your card on the Swiggy app to start availing exclusive discounts and benefits for being a Swiggy member.
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-sm sm:text-base">
            <li className="text-gray-700 border-b border-gray-300 pb-2">To link the HDFC Bank Swiggy Credit Card to the Swiggy app, you need to have both Swiggy app and the HDFC Bank app installed on your phone.</li>
            <li className="text-gray-700 border-b border-gray-300 pb-2">Open the Swiggy app and go to the 'Account' section.</li>
            <li className="text-gray-700 border-b border-gray-300 pb-2">Click on 'Link HDFC Bank Credit Card'.</li>
            <li className="text-gray-700 border-b border-gray-300 pb-2">Enter the card number and the last 4 digits of the card to the screen of the 'Credit Card' page. Click on 'Link Your Card' to complete the process.</li>
            <li className="text-gray-700 border-b border-gray-300 pb-2">Once the card is linked, you will be able to see the available offers banner during the checkout application.</li>
            <li className="text-gray-700">Enter the number and enter the authentication received OTP to complete the linking of the card.</li>
          </ol>
        </div>

        {/* Fee & Charges */}
        <div className="bg-white mx-2 md:mx-10 border border-gray-400 rounded-lg shadow-md p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Swiggy HDFC Bank Credit Card Fee & Charges</h2>
          <ul className="space-y-2 text-sm sm:text-base">
            <li className="text-gray-700 border-b border-gray-300 pb-2">Joining Fee: Rs. 500 + applicable charges.</li>
            <li className="text-gray-700 border-b border-gray-300 pb-2">Annual Fee: Rs. 500 + applicable charges.</li>
            <li className="text-gray-700 border-b border-gray-300 pb-2">Foreign currency markup fee: 3.5% of the transaction value.</li>
            <li className="text-gray-700 border-b border-gray-300 pb-2">Cash advance fee: 2.5% of the transaction amount (minimum Rs. 500).</li>
            <li className="text-gray-700 border-b border-gray-300 pb-2">Charges on revolving credit: 3.49% p.m. (41.88% p.a. depending on the outstanding balance).</li>
            <li className="text-gray-700 border-b border-gray-300 pb-2">Overlimit fee: 2.5% of the overlimit amount (minimum Rs. 500).</li>
            <li className="text-gray-700 border-b border-gray-300 pb-2">Late payment charges: Rs. 100 to Rs. 1300 depending on the outstanding balance.</li>
            <li className="text-gray-700 border-b border-gray-300 pb-2">Cash processing fee: Rs. 100 per transaction + applicable taxes.</li>
            <li className="text-gray-700 border-b border-gray-300 pb-2">Balance transfer processing fee: 1% of the transfer amount (minimum Rs. 100, whichever is higher).</li>
            <li className="text-gray-700 border-b border-gray-300 pb-2">Returned cheque fee: Rs. 450 per returned cheque.</li>
            <li className="text-gray-700 border-b border-gray-300 pb-2">Duplicate statement fee: Rs. 100 per statement.</li>
            <li className="text-gray-700 border-b border-gray-300 pb-2">Card replacement fee: Rs. 100 per card.</li>
            <li className="text-gray-700 border-b border-gray-300 pb-2">Railway ticket booking surcharge: 1.8% of the transaction amount.</li>
            <li className="text-gray-700 border-b border-gray-300 pb-2">Fuel surcharge waiver: 1% of the transaction amount (minimum Rs. 400, maximum Rs. 5000).</li>
            <li className="text-gray-700">Dynamic currency conversion markup fee: 3.5% of the transaction amount.</li>
          </ul>
        </div>

        {/* Eligibility */}
        <div className="bg-white mx-2 md:mx-10 border border-gray-400 rounded-lg shadow-md p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Swiggy HDFC Bank Credit Card Eligibility</h2>
          <ul className="space-y-2 text-sm sm:text-base">
            <li className="text-gray-700 border-b border-gray-300 pb-2">Resident Indian National.</li>
            <li className="text-gray-700 border-b border-gray-300 pb-2">Age: Minimum 21 years and maximum 60 years.</li>
            <li className="text-gray-700 border-b border-gray-300 pb-2">Net Annual Income: Minimum Rs. 5,00,000.</li>
            <li className="text-gray-700 border-b border-gray-300 pb-2">Resident Indian National.</li>
            <li className="text-gray-700">Home: Income Tax Returns of the financial year, 6 months bank statements.</li>
          </ul>
        </div>

        {/* Application Instructions Card */}
        <div className="bg-white mx-2 md:mx-10 border border-gray-400 rounded-lg shadow-md mb-10 p-4 md:p-6">
          <h2 className="text-xl  font-semibold mb-4">How to Apply for a Swiggy HDFC Bank Credit Card?</h2>
          <p className="mb-4   text-gray-700">
            You can apply for Swiggy HDFC Bank Credit Card online or offline. Applying online is easy through the official website of HDFC Bank. Below are the steps to apply for the credit card:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li className="text-gray-700  border-b border-gray-300">Visit the official website of HDFC Bank.</li>
            <li className="text-gray-700  border-b border-gray-300">Click on the 'Credit Cards' section.</li>
            <li className="text-gray-700  border-b border-gray-300">Select 'Swiggy HDFC Bank Credit Card' from the list of available credit cards.</li>
            <li className="text-gray-700  border-b border-gray-300">Click on 'Apply Now' and fill in the required details.</li>
            <li className="text-gray-700">Submit the required documents for completing the application.</li>
          </ol>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HDFC;