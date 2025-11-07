import axios from 'axios';
import React, { useState } from 'react';
import Footer from '../../pages/About/Footer';
import { NavLink } from 'react-router-dom';
import pinkback from '../../assets/banner/pink-back.jpg';


const Credit = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    pan: '',
    dob: '',
    city: '',
    pincode: '',
    net_month_income: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [showForm, setShowForm] = useState(true);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let newValue = value;
    if (type === "number") {
      newValue = value === "" ? "" : Number(value);
    }
    setFormData({
      ...formData,
      [name]: newValue
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.full_name.trim()) newErrors.full_name = 'Full name is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone number must be 10 digits';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.pan.trim()) newErrors.pan = 'PAN number is required';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Pincode must be 6 digits';
    if (!formData.net_month_income) newErrors.net_month_income = 'Net monthly income is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      setApiError(null);

      axios.post("http://127.0.0.1:8000/customers/with-eligible-banks", formData, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      })
        .then((res) => {
          setApiResponse(res.data);
          setShowForm(false);
          setIsLoading(false);
        })
        .catch((err) => {
          setApiError(err.response?.data?.message || 'An error occurred while processing your request');
          setIsLoading(false);
        });
    }
  };

  const resetForm = () => {
    setShowForm(true);
    setApiResponse(null);
    setApiError(null);
    setFormData({
      full_name: '',
      phone: '',
      email: '',
      pan: '',
      dob: '',
      city: '',
      pincode: '',
      net_month_income: '',
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen mt-10 bg-gray-50">
      {/* Hero Section */}
      <div
        className="flex flex-col justify-center items-center w-full text-white bg-no-repeat bg-cover bg-center h-48 sm:h-64 md:h-80 lg:h-[400px]"
        // style={{
        //   backgroundImage: "url('https://www.indusind.com/iblogs/wp-content/uploads/01_CC_Banner-Image.jpg')",
        // }}
         style={{
        backgroundImage: `url(${pinkback})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '400px',
      }}
      >
        <div className="text-center m-4">
          <h2 className="font-bold text-3xl">Apply Now</h2>
          <p>Fill out the form below to secure your loan application.</p>
          <p>
            <NavLink
              to="/"
              className="text-red-800 hover:underline hover:text-red-600"
            >
              Home
            </NavLink>
            <span> </span>
            <span>Business Loan</span>
          </p>
        </div>
      </div>

      {/* Loader */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-lg font-medium text-gray-700">Processing your application...</p>
          </div>
        </div>
      )}

      {/* Success Response */}
      {apiResponse && !showForm && (
        <div className="container max-w-6xl mx-auto py-5 px-4">
          <div className="bg-white border my-10 border-gray-300 rounded-lg shadow-lg p-6 md:p-8">
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-green-600 mb-2">Application Successful!</h2>
              <p className="text-gray-600">{apiResponse.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {apiError && (
        <div className="container max-w-4xl mx-auto py-5 px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-red-800">Application Error</h3>
                <p className="text-red-700">{apiError}</p>
              </div>
            </div>
            <button
              onClick={() => setApiError(null)}
              className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      {/* Form Section */}
      {showForm && (
        <div className="container max-w-4xl mx-auto py-5 px-4">
          <div className="bg-white border my-10 border-gray-300 rounded-lg shadow-md p-4 md:p-8">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    id="name"
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none transition ${errors.full_name ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {errors.full_name && <p className="mt-1 text-sm text-red-600">{errors.full_name}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    maxLength="10"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none transition ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none transition ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                {/* PAN */}
                <div>
                  <label htmlFor="pan" className="block text-sm font-medium text-gray-700 mb-1">
                    PAN Number
                  </label>
                  <input
                    type="text"
                    name="pan"
                    id="pan"
                    value={formData.pan}
                    onChange={handleChange}
                    placeholder="Enter PAN Number"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none transition ${errors.pan ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {errors.pan && <p className="mt-1 text-sm text-red-600">{errors.pan}</p>}
                </div>

                {/* DOB */}
                <div>
                  <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    id="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none transition ${errors.dob ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {errors.dob && <p className="mt-1 text-sm text-red-600">{errors.dob}</p>}
                </div>

                {/* Net Monthly Income */}
                <div>
                  <label htmlFor="net_month_income" className="block text-sm font-medium text-gray-700 mb-1">
                    Net Monthly Income
                  </label>
                  <input
                    type="number"
                    name="net_month_income"
                    id="net_month_income"
                    value={formData.net_month_income}
                    onChange={handleChange}
                    placeholder="Enter net monthly income"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none transition ${errors.net_month_income ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {errors.net_month_income && <p className="mt-1 text-sm text-red-600">{errors.net_month_income}</p>}
                </div>

                {/* City */}
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    Current City of Residence
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none transition ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                </div>

                {/* Pincode */}
                <div>
                  <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    id="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Enter pincode"
                    maxLength="6"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none transition ${errors.pincode ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {errors.pincode && <p className="mt-1 text-sm text-red-600">{errors.pincode}</p>}
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full bg-red-800 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
                >
                  Submit
                </button>
              </div>

              {/* Terms */}
              <div className="mt-2 text-center text-sm">
                <a href="#" className="text-gray-500 hover:text-red-600">Terms and Conditions</a>
                <span className="mx-2 text-gray-300">|</span>
                <a href="#" className="text-gray-500 hover:text-red-600">Privacy Policy</a>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Credit;
