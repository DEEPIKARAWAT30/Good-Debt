import React, { useState, useEffect } from "react";
import { Search, Plus, Edit, Trash2, X } from "lucide-react";
import axios from "axios";

const BASE_URL = "https://bank-project-1-x3bi.onrender.com/v1/api";

function AddProduct({ currentBankId = null }) {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [banks, setBanks] = useState([]);
  const [form, setForm] = useState({
    product_title: "",
    min_loan_amount: "",
    max_loan_amount: "",
    min_tenure: "",
    max_tenure: "",
    min_roi: "",
    max_roi: "",
    bank: "",
    min_age: "",
    max_age: "",
    categories: {
      SUPER_CAT_A_COMPANY: "",
      CAT_A_COMPANY: "",
      CAT_B: "",
      CAT_C: "",
      GOVERNMENT: "",
      PROPRITORSHIP: "",
      LLP: "",
      UNLISTED: "",
      PARTNERSHIP: "",
    },
    foir_details: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/products/`);
      // Sort alphabetically by product_title
      const sortedProducts = res.data.sort((a, b) =>
        a.product_title.localeCompare(b.product_title)
      );
      setProducts(sortedProducts);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const fetchBanks = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/banks/`);
      // Alphabetical sorting by bank_name (case-insensitive)
      const sortedBanks = res.data.sort((a, b) =>
        a.bank_name.toLowerCase().localeCompare(b.bank_name.toLowerCase())
      );
      setBanks(sortedBanks);
    } catch (err) {
      console.error("Error fetching banks:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchBanks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keyMap = {
      PRODUCT_TITLE: "product_title",
      MIN_LOAN_AMOUNT: "min_loan_amount",
      MAX_LOAN_AMOUNT: "max_loan_amount",
      MIN_TENURE: "min_tenure",
      MAX_TENURE: "max_tenure",
      MIN_ROI: "min_roi",
      MAX_ROI: "max_roi",
      BANK: "bank",
      MIN_AGE: "min_age",
      MAX_AGE: "max_age",
      FOIR_DETAILS: "foir_details",
    };
    const targetKey = keyMap[name] || name;
    setForm({ ...form, [targetKey]: value });
  };

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      categories: {
        ...prev.categories,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form };

      // ----- SALARY FIX -----
      payload.salary_criteria = Object.entries(form.categories)
        .filter(([_, value]) => value)
        .map(([category_name, min_salary]) => ({
          product: editingProduct ? editingProduct.id : undefined,
          category_name: category_name.replace(/_/g, " "),
          min_salary: Number(min_salary),
        }));
      delete payload.categories;
      // ----------------------

      if (editingProduct) {
        await axios.put(`${BASE_URL}/products/${editingProduct.id}/`, payload);
        // Keep edited product in same position
        setProducts((prev) =>
          prev.map((p) => (p.id === editingProduct.id ? { ...p, ...payload } : p))
        );
      } else {
        const res = await axios.post(`${BASE_URL}/products/`, payload);
        setProducts((prev) =>
          [...prev, res.data].sort((a, b) => a.product_title.localeCompare(b.product_title))
        );
      }
      resetForm();
    } catch (err) {
      if (err.response && err.response.data) {
        setErrorMessage(err.response.data.message || "Something went wrong!");
      } else {
        setErrorMessage("Network error. Please try again.");
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${BASE_URL}/products/${id}/`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);

    const baseCategories = {
      SUPER_CAT_A_COMPANY: "",
      CAT_A_COMPANY: "",
      CAT_B: "",
      CAT_C: "",
      GOVERNMENT: "",
      PROPRITORSHIP: "",
      LLP: "",
      UNLISTED: "",
      PARTNERSHIP: "",
    };

    const categoriesFromSalary = (product.salary_criteria || []).reduce(
      (acc, item) => {
        const key = (item.category_name || "").replace(/\s/g, "_").toUpperCase();
        acc[key] = item.min_salary ?? "";
        return acc;
      },
      { ...baseCategories }
    );

    const categories =
      Array.isArray(product.salary_criteria) && product.salary_criteria.length > 0
        ? categoriesFromSalary
        : { ...baseCategories, ...(product.categories || {}) };

    setForm({
      product_title: product.product_title || "",
      min_loan_amount: product.min_loan_amount || "",
      max_loan_amount: product.max_loan_amount || "",
      min_tenure: product.min_tenure || "",
      max_tenure: product.max_tenure || "",
      min_roi: product.min_roi || "",
      max_roi: product.max_roi || "",
      bank: product.bank || "",
      min_age: product.min_age || "",
      max_age: product.max_age || "",
      categories,
      foir_details: product.foir_details || "",
    });

    setShowModal(true);
    setErrorMessage("");
  };

  const resetForm = () => {
    setForm({
      product_title: "",
      min_loan_amount: "",
      max_loan_amount: "",
      min_tenure: "",
      max_tenure: "",
      min_roi: "",
      max_roi: "",
      bank: "",
      min_age: "",
      max_age: "",
      categories: {
        SUPER_CAT_A_COMPANY: "",
        CAT_A_COMPANY: "",
        CAT_B: "",
        CAT_C: "",
        GOVERNMENT: "",
        PROPRITORSHIP: "",
        LLP: "",
        UNLISTED: "",
        PARTNERSHIP: "",
      },
      foir_details: "",
    });
    setEditingProduct(null);
    setShowModal(false);
    setErrorMessage("");
  };

  const filteredProducts = currentBankId
    ? products.filter((p) => Number(p.bank) === Number(currentBankId))
    : products;

  const searchedProducts = filteredProducts.filter((p) => {
    const bankName = banks.find((b) => b.id === Number(p.bank))?.bank_name || "";
    return bankName.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Products</h2>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-initial">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9e1e27] focus:border-[#9e1e27]"
            />
          </div>
          <button
            onClick={() => {
              setShowModal(true);
              setErrorMessage("");
            }}
            className="bg-[#9e1e27] hover:bg-[#7c1820] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
          >
            <Plus size={18} /> Add
          </button>
        </div>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchedProducts.length === 0 && <p>Loading Products......</p>}
        {searchedProducts.map((p) => (
          <div
            key={p.id}
            className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition border-t-4 border-[#9e1e27] relative"
          >
            <div className="absolute top-3 right-3 flex gap-2">
              <button
                onClick={() => handleEdit(p)}
                className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
              >
                <Edit size={16} />
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <h3 className="font-bold text-lg text-[#9e1e27]">
              {banks.find((b) => b.id === Number(p.bank))?.bank_name || "Unknown Bank"}
            </h3>
            <p className="text-gray-700 mt-2">{p.product_title}</p>
            <div className="mt-3 text-sm text-gray-600 space-y-1">
              <p>
                <strong>Loan:</strong> {p.min_loan_amount} - {p.max_loan_amount}
              </p>
              <p>
                <strong>Tenure:</strong> {p.min_tenure} - {p.max_tenure} months
              </p>
              <p>
                <strong>ROI:</strong> {p.min_roi}% - {p.max_roi}%
              </p>
              <p>
                <strong>FOIR:</strong> {p.foir_details}
              </p>
              <p>
                <strong>Age:</strong> {p.min_age} - {p.max_age}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="relative w-full max-w-2xl">
            {/* Floating Cross Button */}
            <button
              onClick={resetForm}
              className="absolute -top-5 -right-5 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 hover:shadow-xl transition z-50"
            >
              <X size={24} />
            </button>

            <div className="bg-white rounded-xl shadow-lg p-6 overflow-y-auto max-h-[90vh]">
              <h2 className="text-xl font-bold mb-4 text-[#9e1e27]">
                {editingProduct ? "Edit Product" : "Add Product"}
              </h2>

              {errorMessage && (
                <div className="mb-4 text-red-600 bg-red-100 p-2 rounded-md">{errorMessage}</div>
              )}

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Product & Bank */}
                <div>
                  <label className="block text-sm font-medium mb-1">Product Title</label>
                  <input
                    type="text"
                    name="product_title"
                    value={form.product_title}
                    onChange={handleChange}
                    placeholder="Product Title"
                    required
                    className="border p-2 rounded-lg w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Bank</label>
                  <select
                    name="bank"
                    value={form.bank}
                    onChange={handleChange}
                    required
                    className="border p-2 rounded-lg w-full"
                  >
                    <option value="">Select Bank</option>
                    {banks.map((bank) => (
                      <option key={bank.id} value={bank.id}>
                        {bank.bank_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Loan, Tenure, ROI, Age, FOIR Inputs */}
                <div>
                  <label className="block text-sm font-medium mb-1">Min Loan Amount</label>
                  <input
                    type="number"
                    name="min_loan_amount"
                    value={form.min_loan_amount}
                    onChange={handleChange}
                    placeholder="Min Loan Amount"
                    className="border p-2 rounded-lg w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Max Loan Amount</label>
                  <input
                    type="number"
                    name="max_loan_amount"
                    value={form.max_loan_amount}
                    onChange={handleChange}
                    placeholder="Max Loan Amount"
                    className="border p-2 rounded-lg w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Min Tenure (months)</label>
                  <input
                    type="number"
                    name="min_tenure"
                    value={form.min_tenure}
                    onChange={handleChange}
                    placeholder="Min Tenure"
                    className="border p-2 rounded-lg w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Max Tenure (months)</label>
                  <input
                    type="number"
                    name="max_tenure"
                    value={form.max_tenure}
                    onChange={handleChange}
                    placeholder="Max Tenure"
                    className="border p-2 rounded-lg w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Min ROI (%)</label>
                  <input
                    type="number"
                    name="min_roi"
                    value={form.min_roi}
                    onChange={handleChange}
                    placeholder="Min ROI"
                    className="border p-2 rounded-lg w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Max ROI (%)</label>
                  <input
                    type="number"
                    name="max_roi"
                    value={form.max_roi}
                    onChange={handleChange}
                    placeholder="Max ROI"
                    className="border p-2 rounded-lg w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Min Age</label>
                  <input
                    type="number"
                    name="min_age"
                    value={form.min_age}
                    onChange={handleChange}
                    placeholder="Min Age"
                    className="border p-2 rounded-lg w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Max Age</label>
                  <input
                    type="number"
                    name="max_age"
                    value={form.max_age}
                    onChange={handleChange}
                    placeholder="Max Age"
                    className="border p-2 rounded-lg w-full"
                  />
                </div>

                {/* Salary Section */}
                <h3 className="md:col-span-2 font-semibold text-gray-700 mt-2">
                  Minimum Salary by Company Type
                </h3>

                {[
                  "SUPER_CAT_A_COMPANY",
                  "CAT_A_COMPANY",
                  "CAT_B",
                  "CAT_C",
                  "GOVERNMENT",
                  "PROPRITORSHIP",
                  "LLP",
                  "UNLISTED",
                  "PARTNERSHIP",
                ].map((key) => (
                  <div key={key}>
                    <label className="block text-sm font-medium mb-1">
                      {key.replaceAll("_", " ")}
                    </label>
                    <input
                      type="number"
                      name={key}
                      value={form.categories[key]}
                      onChange={handleCategoryChange}
                      placeholder={key.replaceAll("_", " ")}
                      className="border p-2 rounded-lg w-full"
                    />
                  </div>
                ))}

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">FOIR Details</label>
                  <input
                    type="text"
                    name="FOIR_DETAILS"
                    value={form.foir_details}
                    onChange={handleChange}
                    placeholder="FOIR Details"
                    className="border p-2 rounded-lg w-full"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#9e1e27] hover:bg-[#7c1820] text-white px-4 py-2 rounded-lg md:col-span-2"
                >
                  {editingProduct ? "Update Product" : "Save Product"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddProduct;
