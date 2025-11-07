import React, { useState, useEffect } from "react";
import { IndianRupee, Clock, Percent } from "lucide-react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BASE_URL = "https://bank-project-1-x3bi.onrender.com/v1/api";

function Product() {
  const { id } = useParams();
  const [bank, setBank] = useState(null);
  const [bankProducts, setBankProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBank = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/banks/${id}/`);
      setBank(res.data);
    } catch (err) {
      setError("Failed to fetch bank info");
    }
  };

  const fetchBankProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/products/`);
      const filtered = res.data.filter(
        (product) => product.bank.toString() === id.toString()
      );
      setBankProducts(filtered);
    } catch (err) {
      setError("Failed to fetch products for this bank");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBank();
    fetchBankProducts();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {bank && (
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200">
              {bank.bank_image_url ? (
                <img
                  src={bank.bank_image_url}
                  alt={bank.bank_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500 font-bold text-2xl">
                  {bank.bank_name.charAt(0)}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <h2 className="text-2xl font-semibold text-gray-800">
                {bank.bank_name}
              </h2>
              <p className="text-gray-500 text-sm">{bank.state}</p>
            </div>
          </div>
        </div>
      )}

      <div>
        <h3 className="text-2xl font-semibold mb-6">
          Products for {bank?.bank_name}
        </h3>

        {bankProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {bankProducts.map((product) => (
              <div
                key={product.id}
                className="bg-gradient-to-b from-white to-gray-50 border-t-4 border-red-600 shadow-md rounded-xl p-6 hover:shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-lg text-gray-800">
                    {product.product_title}
                  </h4>
                  <IndianRupee className="text-gray-600" size={20} />
                </div>

                <div className="space-y-2 text-gray-700 text-sm">
                  <p className="flex items-center gap-2">
                    <IndianRupee size={16} className="text-red-500" />
                    Loan: {product.min_loan_amount} - {product.max_loan_amount}
                  </p>

                  <p className="flex items-center gap-2">
                    <Clock size={16} className="text-red-500" />
                    Tenure: {product.min_tenure} - {product.max_tenure} months
                  </p>

                  <p className="flex items-center gap-2">
                    <Percent size={16} className="text-red-500" />
                    ROI: {product.min_roi}% - {product.max_roi}%
                  </p>

                  <p className="text-gray-500 text-sm">
                    FOIR: {product.foir_details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No products available for this bank.</p>
        )}
      </div>
    </div>
  );
}

export default Product;
