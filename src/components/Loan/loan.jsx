import axios from 'axios';
import React, { useState } from 'react';
import Footer from '../../pages/About/Footer';
import { NavLink } from 'react-router-dom';
import pinkback from '../../assets/banner/pink-back.jpg';

const Loan = () => {
  const BASE_URL = 'https://bank-project-1-x3bi.onrender.com';
  const [formData, setFormData] = useState({

    full_name: '',
    phone: '',
    email: '',
    pan: '',
    dob: '',
    employment_type: '',
    salary: '',
    departmentName: '',
    designationName: '',
    companyName: '',
    designation: 'developer',
    city: '',
    pincode: '',
    // existing_loan: ''
  });

  const [errors, setErrors] = useState({});
  const [employment_type, setEmployment_type] = useState('');
  const [showExistingLoanFields, setShowExistingLoanFields] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [submittedInterests, setSubmittedInterests] = useState([]); // track (bankId-productId)
  const [modal, setModal] = useState({ open: false, title: '', message: '' });
  const [loadingInterest, setLoadingInterest] = useState(null); // track which bank is loading

  const openModal = (message, title = '') => setModal({ open: true, title, message });
  const closeModal = () => setModal((prev) => ({ ...prev, open: false }));

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

  const handleEmployment_typeChange = (e) => {
    const value = e.target.value;
    setEmployment_type(value);
    setFormData({
      ...formData,
      employment_type: value
    });
  };

  const handleExistingLoanChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      // existing_loan: value
    });
    setShowExistingLoanFields(value === 'yes');
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
    if (!formData.employment_type) newErrors.employment_type = 'Employment type is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Pincode must be 6 digits';
    
    // Salary validation for all employment types
    if (!formData.salary) newErrors.salary = 'Monthly income/salary is required';
    else if (formData.salary <= 0) newErrors.salary = 'Monthly income/salary must be greater than 0';
    
    // if (!formData.existing_loan) newErrors.existing_loan = 'Please select an option';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      setApiError(null);
      
      axios.post("https://bank-project-1-x3bi.onrender.com/v1/api/customer/create-or-eligible/", formData, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      })
        .then((res) => {
          console.log(res)
          setApiResponse(res.data);
          setShowForm(false);
          setIsLoading(false);
        })
        .catch((err) => {
          setApiError(err.response?.data?.message || 'An error occurred while processing your request');
          setIsLoading(false);
          console.log(err)
        });
    }
  };

  const handleInterested = async (bank) => {
    try {
      if (!apiResponse?.customer) {
        openModal('Please submit the application first.', 'Notice');
        return;
      }
      const key = `${bank?.bank_id}-${bank?.product_id}`;
      if (submittedInterests.includes(key)) {
        openModal('You already interested for this product.', 'Notice');
        return;
      }
      
      setLoadingInterest(key); // Start loading
      
      const payload = {
        customer: apiResponse?.customer?.id,
        bank: bank?.bank_id,
        product: bank?.product_id,
      };
      await axios.post(`${BASE_URL}/v1/api/customer-interests/`, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      openModal('Your interest has been submitted. Our team will contact you soon.', 'Success');
      setSubmittedInterests((prev) => [...prev, key]);
    } catch (error) {
      console.error('Failed to submit interest:', error?.response?.data || error?.message || error);
      const status = error?.response?.status;
      const message = error?.response?.data?.message || '';
      const isDuplicate = status === 409 || /already/i.test(message) || /duplicate/i.test(message) || /exists/i.test(message);
      if (isDuplicate) {
        const key = `${bank?.bank_id}-${bank?.product_id}`;
        setSubmittedInterests((prev) => (prev.includes(key) ? prev : [...prev, key]));
        openModal('You already interested for this product.', 'Notice');
        return;
      }
      openModal(message || 'Failed to submit interest. Please try again.', 'Error');
    } finally {
      setLoadingInterest(null); // Stop loading
    }
  };

  const resetForm = () => {
    setShowForm(true);
    setApiResponse(null);
    setApiError(null);
    setSubmittedInterests([]);
    setFormData({
      full_name: '',
      phone: '',
      email: '',
      pan: '',
      dob: '',
      employment_type: '',
      salary: '',
      departmentName: '',
      designationName: '',
      companyName: '',
      designation: 'developer',
      city: '',
      pincode: '',
      // existing_loan: ''
    });
    setEmployment_type('');
    setShowExistingLoanFields(false);
    setErrors({});
  };


  return (
    <div className="min-h-screen mt-10  bg-gray-50">
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
        className="text-red-700 hover:underline hover:text-red-800"
      >
        Home
      </NavLink>
      <span> </span>
      <span>Personal Loan</span>
    </p>
  </div>
</div>


      {/* Loader */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-800"></div>
            <p className="mt-4 text-lg font-medium text-gray-700">Processing your application...</p>
          </div>
        </div>
      )}

      {modal.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={closeModal}>
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {modal.title && <h3 className="text-xl font-bold mb-3 text-gray-900">{modal.title}</h3>}
            <p className="text-gray-700 text-base">{modal.message}</p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="px-6 py-2.5 bg-red-800 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-200 shadow-md hover:shadow-lg"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Response Card */}
      {apiResponse && !showForm && (
        <div className="container max-w-6xl mx-auto py-5 px-4">
          <div className="bg-white border my-10 border-gray-300 rounded-lg shadow-lg p-6 md:p-8">
            {/* Success Header */}
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-green-600 mb-2">Application Successful!</h2>
              <p className="text-gray-600">{apiResponse.message}</p>
            </div>

            {/* Customer Details */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Customer Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="font-semibold text-gray-800">{apiResponse.customer.full_name}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-gray-800">{apiResponse.customer.email}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-semibold text-gray-800">{apiResponse.customer.phone}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">PAN</p>
                  <p className="font-semibold text-gray-800">{apiResponse.customer.pan || formData.pan}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Date of Birth</p>
                  <p className="font-semibold text-gray-800">{apiResponse.customer.dob || formData.dob}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Age</p>
                  <p className="font-semibold text-gray-800">{apiResponse.customer.age} years</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Employment Type</p>
                  <p className="font-semibold text-gray-800">{apiResponse.customer.employment_type || formData.employment_type}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Net Monthly Salary</p>
                  <p className="font-semibold text-gray-800">₹{(apiResponse.customer.net_monthly_salary ?? apiResponse.customer.salary ?? formData.salary)?.toLocaleString?.() || (apiResponse.customer.net_monthly_salary ?? apiResponse.customer.salary ?? formData.salary)}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">City</p>
                  <p className="font-semibold text-gray-800">{apiResponse.customer.city || formData.city}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Pincode</p>
                  <p className="font-semibold text-gray-800">{apiResponse.customer.pincode || formData.pincode}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Department Name</p>
                  <p className="font-semibold text-gray-800">{apiResponse.customer.departmentName || formData.departmentName || '-'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Designation</p>
                  <p className="font-semibold text-gray-800">{apiResponse.customer.designationName || formData.designationName || '-'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Company</p>
                  <p className="font-semibold text-gray-800">{apiResponse.customer.companyName || formData.companyName || '-'}</p>
                </div>
              </div>
            </div>

            {/* Eligible Banks */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Eligible Banks & Loan Offers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {apiResponse.eligible_banks.map((bank, index) => {
                  const interestKey = `${bank.bank_id}-${bank.product_id}`;
                  const alreadyInterested = submittedInterests.includes(interestKey);
                  const isLoading = loadingInterest === interestKey;
                  return (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-50 to-indigo-50">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-red-800">{bank.bank_name}</h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Loan Amount</span>
                        <span className="font-semibold text-green-600">
                          {bank?.loan_amount_range ? (
                            `₹${Number(bank.loan_amount_range.min || 0).toLocaleString()} - ₹${Number(bank.loan_amount_range.max || 0).toLocaleString()}`
                          ) : (
                            bank?.estimated_max_loan ? `Up to ₹${Number(bank.estimated_max_loan).toLocaleString()}` : '-'
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rate of Interest</span>
                        <span className="font-semibold">{bank.roi_range || (bank.interest_rate ? `${bank.interest_rate}%` : '-')}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleInterested(bank)} 
                      disabled={alreadyInterested || isLoading} 
                      className={`w-full mt-4 flex items-center justify-center gap-2 ${alreadyInterested || isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-800 hover:bg-red-700'} text-white font-medium py-2 px-4 rounded-lg transition duration-200`}
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Processing...</span>
                        </>
                      ) : alreadyInterested ? 'Already Interested' : 'Interested'}
                    </button>
                    {/* <button className="w-full mt-4 bg-red-800 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200">
                      Apply Now
                    </button> */}
                  </div>
                );})}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetForm}
                className="px-6 py-3 bg-red-800 hover:bg-red-600 text-white font-medium rounded-lg transition duration-200"
              >
                Apply for Another Loan
              </button>
              {/* <button className="px -6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition duration-200">
                Download Application
              </button> */}
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
                {errors.full_name && <p className="mt-1 text-sm text-red-800">{errors.full_name}</p>}
              </div>

              {/* Phone Number */}
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

              {/* Email Address */}
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

              {/* PAN Number */}
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

              {/* Date of Birth */}
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

              {/* Employment Type */}
              <div>
                <label htmlFor="employment_type" className="block text-sm font-medium text-gray-700 mb-1">
                  Employment Type
                </label>
                <select
                  name="employment_type"
                  id="employment_type"
                  value={formData.employment_type}
                  onChange={handleEmployment_typeChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none transition ${errors.employment_type ? 'border-red-500' : 'border-gray-300'}`}
                  required
                >
                  <option value="" disabled>Choose...</option>
                  <option value="Private Employee">Private Employee</option>
                  <option value="Government">Government</option>
                  <option value="Self Employed Professional">Self Employed Professional</option>
                  <option value="Self Employed">Self Employed</option>
                </select>
                {errors.employment_type && <p className="mt-1 text-sm text-red-600">{errors.employment_type}</p>}
              </div>

              {/* Conditional Fields Based on Employment Type */}
              {(employment_type === 'Self Employed Professional' || employment_type === 'Self Employed') && (
                <div>
                  <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
                    Net Monthly Salary
                  </label>
                  <input
                    type="number"
                    name="salary"
                    id="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    placeholder="Enter monthly salary in INR"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none transition ${errors.salary ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {errors.salary && <p className="mt-1 text-sm text-red-600">{errors.salary}</p>}
                </div>
              )}

              {(employment_type === 'Private Employee' || employment_type === 'Government') && (
                <>
                  <div>
                    <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
                      Net Monthly Salary
                    </label>
                    <input
                      type="number"
                      name="salary"
                      id="salary"
                      value={formData.salary}
                      onChange={handleChange}
                      placeholder="Enter monthly salary in INR"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none transition ${errors.salary ? 'border-red-500' : 'border-gray-300'}`}
                      required
                    />
                    {errors.salary && <p className="mt-1 text-sm text-red-600">{errors.salary}</p>}
                  </div>

                  <div>
                    <label htmlFor="departmentName" className="block text-sm font-medium text-gray-700 mb-1">
                      Department Name
                    </label>
                    <input
                      type="text"
                      name="departmentName"
                      id="departmentName"
                      value={formData.departmentName}
                      onChange={handleChange}
                      placeholder="Enter department name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none transition"
                    />
                  </div>

                  <div>
                    <label htmlFor="designationName" className="block text-sm font-medium text-gray-700 mb-1">
                      Designation
                    </label>
                    <input
                      type="text"
                      name="designationName"
                      id="designationName"
                      value={formData.designationName}
                      onChange={handleChange}
                      placeholder="Enter designation"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none transition"
                    />
                  </div>

                  {employment_type === 'Private Employee' && (
                    <div>
                      <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        id="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Enter company name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none transition"
                      />
                    </div>
                  )}
                </>
              )}

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

              {/* Existing Loan */}
              {/* <div>
                <label htmlFor="existing_loan" className="block text-sm font-medium text-gray-700 mb-1">
                  Do You Hold an Existing Loan?
                </label>
                <select
                  name="existing_loan"
                  id="existing_loan"
                  value={formData.existing_loan}
                  onChange={handleExistingLoanChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${errors.existing_loan ? 'border-red-500' : 'border-gray-300'}`}
                  required
                >
                  <option value="" disabled>Select an option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {errors.existing_loan && <p className="mt-1 text-sm text-red-600">{errors.existing_loan}</p>}
              </div> */}

              {/* Additional fields shown only if "Yes" is selected */}
              {showExistingLoanFields && (
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-red-700">
                      <a href="your-loan-info.html">Next for testing</a>
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              {/* <NavLink to="/registration-success"> */}
              <button
                type="submit"
                className="w-full bg-red-800 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
              >
                Submit
              </button>
              {/* </NavLink> */}
            </div>
            {/* Terms and Conditions */}
            <div className="mt-2 text-center text-sm">
              <a href="#" className="text-gray-500 hover:text-red-800">Terms and Conditions</a>
              <span className="mx-2 text-gray-300">|</span>
              <a href="#" className="text-gray-500 hover:text-red-800">Privacy Policy</a>
            </div>
          </form>
        </div>
      </div>
      )}

      <Footer />
    </div>
  );
};

export default Loan;
