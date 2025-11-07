import React, { useState, useEffect, useRef } from "react";
import { Search, Plus, X, Edit2, Trash2 } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BankManagement() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [banks, setBanks] = useState([]);
  const [loadingBanks, setLoadingBanks] = useState(true);
  const [errorBanks, setErrorBanks] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    bank_name: "",
    pincode: "",
    bank_image: null,
  });
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState("");
  const [editingBank, setEditingBank] = useState(null);

  const API_BASE = "https://bank-project-1-x3bi.onrender.com/v1/api/banks/";

  // auto expand textarea for pincodes
  const pincodeRef = useRef(null);
  useEffect(() => {
    if (pincodeRef.current) {
      pincodeRef.current.style.height = "auto";
      pincodeRef.current.style.height = pincodeRef.current.scrollHeight + "px";
    }
  }, [formData.pincode]);

  const fetchBanks = () => {
    setLoadingBanks(true);
    axios
      .get(API_BASE)
      .then((res) => {
        setBanks(res.data);
        setLoadingBanks(false);
      })
      .catch((err) => {
        setErrorBanks(err.response?.data?.message || "Failed to fetch banks");
        setLoadingBanks(false);
      });
  };

  useEffect(() => {
    fetchBanks();
  }, []);

  // 🔍 Search by bank name OR pincode
  const filteredBanks = banks.filter((bank) => {
    const searchLower = search.toLowerCase();
    const matchesName = bank.bank_name?.toLowerCase().includes(searchLower);
    let matchesPincode = false;
    if (bank.pincode) {
      const pincodesArray = Array.isArray(bank.pincode)
        ? bank.pincode.map(String)
        : String(bank.pincode).split(",").map((p) => p.trim());
      matchesPincode = pincodesArray.some((p) =>
        p.toLowerCase().includes(searchLower)
      );
    }
    return matchesName || matchesPincode;
  });

  const handleChange = (e) => {
    if (e.target.name === "bank_image") {
      setFormData({ ...formData, bank_image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorSubmit("");
    setLoadingSubmit(true);

    const form = new FormData();
    form.append("bank_name", formData.bank_name);

    const cleanedPincodes = formData.pincode
      ? formData.pincode
          .toString()
          .split(",")
          .map((p) => p.trim())
          .filter(Boolean)
          .join(",")
      : "";
    form.append("pincode", cleanedPincodes);

    if (formData.bank_image) form.append("bank_image", formData.bank_image);

    const request = editingBank
      ? axios.put(`${API_BASE}${editingBank.id}/`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      : axios.post(API_BASE, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });

    request
      .then((res) => {
        if (editingBank) {
          setBanks((prev) =>
            prev.map((b) => (b.id === editingBank.id ? res.data : b))
          );
        } else {
          setBanks((prev) => [...prev, res.data]);
        }
        resetForm();
        setLoadingSubmit(false);
      })
      .catch((err) => {
        setErrorSubmit(err.response?.data?.message || "Failed to save bank");
        setLoadingSubmit(false);
      });
  };

  const handleDeleteBank = (bankId) => {
    if (!window.confirm("Are you sure you want to delete this bank?")) return;
    axios
      .delete(`${API_BASE}${bankId}/`)
      .then(() =>
        setBanks((prev) => prev.filter((b) => b.id !== bankId))
      )
      .catch(() => alert("Failed to delete bank"));
  };

  const handleEditBank = (bank) => {
    setEditingBank(bank);
    setFormData({
      bank_name: bank.bank_name || "",
      pincode: bank.pincode || "",
      bank_image: null,
    });
    setIsOpen(true);
  };

  const resetForm = () => {
    setFormData({ bank_name: "", pincode: "", bank_image: null });
    setEditingBank(null);
    setIsOpen(false);
    setErrorSubmit("");
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          Bank Management
        </h1>
        <div className="flex flex-col md:flex-row gap-2 items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by bank name or pincode..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#9e1e27] focus:border-[#9e1e27]"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={16}
            />
          </div>
          <button
            onClick={() => {
              setEditingBank(null);
              setFormData({ bank_name: "", pincode: "", bank_image: null });
              setIsOpen(true);
            }}
            className="px-4 py-2 rounded-md bg-[#9e1e27] text-white font-medium hover:bg-[#7a1620] flex items-center gap-1 transition"
          >
            <Plus size={16} /> Add Bank
          </button>
        </div>
      </div>

      {loadingBanks ? (
        <p className="text-gray-500">Loading banks...</p>
      ) : errorBanks ? (
        <p className="text-red-600">{errorBanks}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBanks.map((bank) => (
            <div
              key={bank.id}
              className="bg-white shadow-sm rounded-xl p-5 flex flex-col items-center gap-3 relative hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
              onClick={() => navigate(`/admin/dashboard/product/${bank.id}`)}
            >
              <div
                className="absolute top-3 right-3 flex gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <Edit2
                  size={20}
                  className="text-blue-600 cursor-pointer hover:text-blue-800 transition"
                  onClick={() => handleEditBank(bank)}
                />
                <Trash2
                  size={20}
                  className="text-red-600 cursor-pointer hover:text-red-800 transition"
                  onClick={() => handleDeleteBank(bank.id)}
                />
              </div>

              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200 transition-all duration-300 hover:border-[#9e1e27]">
                {bank.bank_image_url ? (
                  <img
                    src={bank.bank_image_url}
                    alt={bank.bank_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 font-bold text-2xl">
                    {bank.bank_name?.charAt(0) || "B"}
                  </span>
                )}
              </div>

              <h3 className="font-semibold text-gray-800 text-center text-lg">
                {bank.bank_name}
              </h3>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Bank Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={resetForm}
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4">
              {editingBank ? "Update Bank" : "Save Bank"}
            </h2>
            {errorSubmit && (
              <p className="text-red-600 text-sm mb-2">{errorSubmit}</p>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              encType="multipart/form-data"
            >
              <input
                type="text"
                name="bank_name"
                placeholder="Bank Name"
                value={formData.bank_name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-[#9e1e27] focus:border-[#9e1e27]"
                required
              />

              <textarea
                ref={pincodeRef}
                name="pincode"
                placeholder="Pincode(s) e.g. 110001,110002,110003"
                value={formData.pincode}
                onChange={handleChange}
                rows={1}
                className="w-full px-3 py-2 border rounded-md resize-none focus:ring-[#9e1e27] focus:border-[#9e1e27] overflow-hidden"
                required
              />

              {/* Updated Bank Logo Section with Preview */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Bank Logo
                </label>

                {(formData.bank_image instanceof File
                  ? URL.createObjectURL(formData.bank_image)
                  : editingBank?.bank_image_url) && (
                  <div className="mb-3 flex justify-center">
                    <img
                      src={
                        formData.bank_image instanceof File
                          ? URL.createObjectURL(formData.bank_image)
                          : editingBank.bank_image_url
                      }
                      alt="Bank Logo"
                      className="w-24 h-24 rounded-full object-cover border border-gray-300"
                    />
                  </div>
                )}

                <input
                  type="file"
                  name="bank_image"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#9e1e27]"
                />
              </div>

              <button
                type="submit"
                disabled={loadingSubmit}
                className="w-full py-2 bg-[#9e1e27] text-white rounded-md hover:bg-[#7a1620] transition disabled:opacity-50"
              >
                {loadingSubmit
                  ? editingBank
                    ? "Updating..."
                    : "Saving..."
                  : editingBank
                  ? "Update Bank"
                  : "Save Bank"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default BankManagement;
