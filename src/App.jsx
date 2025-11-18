import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Header/Home";
import Navbar from "./components/Header/Navbar";
import About from "./pages/About/About";
import Contact from "./pages/Contact";
import Loan from "./components/Loan/loan";
import EMICalculator from "./pages/Emi/EMICalculator";
import Credit from "./components/buisness/Credit";
import HDFC from "./components/Hdfc-navbar/HDFC";
import RegistrationSuccess from "./components/Card-eligibile/RegistrationSuccess";
// import GetStarted from "./pages/GetStarted";

// Admin Dashboard Components
import Layout from "./Admin-Dashbord/Layout/Layout";
import AdminDashboard from "./Admin-Dashbord/AdminDashbord";
import BankManagement from "./Admin-Dashbord/BankManagement";
import Product from "./Admin-Dashbord/Product";
import Agents from "./Admin-Dashbord/Agents";
import CheckEligibility from "./Admin-Dashbord/CheckEligibility";
import TotalCustomers from "./Admin-Dashbord/TotalCustomers";
import CreditCardEligibility from "./Admin-Dashbord/CreditCardEligibility";
import PersonalLoanEligibility from "./Admin-Dashbord/PersonalLoanEligibility";
import ActiveCustomers from "./Admin-Dashbord/ActiveCustomers";
import CurrentMonthEmi from "./Admin-Dashbord/CurrentMonthEmi";
import AgentProfile from "./Admin-Dashbord/AgentProfile";
import RequestsPage from "./Admin-Dashbord/RequestsPage";
import Wallets from "./Admin-Dashbord/Wallets ";
import ChangePassword from "./Admin-Dashbord/ChangePassword";
import AdminLogin from './Admin-Dashbord/AdminLogin';
import ProtectedRoute from "./Admin-Dashbord/ProtectedRoute";
import AddProduct from "./Admin-Dashbord/AddProduct";
import Management from "./Admin-Dashbord/Managemment";
import InterestedUsers from "./Admin-Dashbord/IntrestedUsers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website Routes */}
        <Route element={<Navbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/loan-eligibility" element={<Loan />} />
          <Route path="/emi-calculator" element={<EMICalculator />} />
          <Route path="/buisness-loan-eligibility" element={<Credit />} />
          <Route path="/hdfc-platinum-card" element={<HDFC />} />
          <Route path="/registration-success" element={<RegistrationSuccess />} />
          {/* <Route path="/get-started" element={<GetStarted />} /> */}
        </Route>

        {/* Admin Login - Public */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* Protected Admin Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* Nested Admin Routes */}
          <Route index element={<AdminDashboard />} />
          <Route path="banks" element={<BankManagement />} />
          <Route path="product/:id" element={<Product />} />
          {/* <Route path="add-product" element={<AddProduct />} /> */}
          <Route path="management" element={<Management />} />
           <Route path="intrested" element={<InterestedUsers />} />
          <Route path="agents" element={<Agents />} />
          <Route path="customers/check-eligibility" element={<CheckEligibility />} />
          <Route path="customers/total" element={<TotalCustomers />} />
          <Route path="customers/active" element={<ActiveCustomers />} />
          <Route path="credit-card-eligibility" element={<CreditCardEligibility />} />
          <Route path="personal-loan-eligibility" element={<PersonalLoanEligibility />} />
          <Route path="current-month-emi" element={<CurrentMonthEmi />} />
          <Route path="profile" element={<AgentProfile />} />
          <Route path="requests" element={<RequestsPage />} />
          <Route path="wallets" element={<Wallets />} />
          <Route path="settings/change-password" element={<ChangePassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
