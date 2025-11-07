import React, { useState, useEffect } from "react";
import { Plus, X, Edit2, Trash2 } from "lucide-react";
import axios from "axios";

const BASE_URL = "https://bank-project-1-x3bi.onrender.com/v1/api";

export default function Management() {
  const [cards, setCards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [form, setForm] = useState({ title: "", url: "", image: null });
  const [errorMessage, setErrorMessage] = useState("");

  const fetchCards = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/managed-cards/`);
      setCards(res.data);
    } catch (err) {
      console.error("Error fetching cards:", err);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("url", form.url);
    if (form.image) formData.append("image", form.image);

    try {
      if (editingCard) {
        await axios.put(`${BASE_URL}/managed-cards/${editingCard.id}/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post(`${BASE_URL}/managed-cards/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      setForm({ title: "", url: "", image: null });
      setEditingCard(null);
      setShowModal(false);
      fetchCards();
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Network error");
      console.error("Error saving card:", err);
    }
  };

  const handleEdit = (card) => {
    setEditingCard(card);
    setForm({ title: card.title, url: card.url, image: null });
    setShowModal(true);
    setErrorMessage("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this card?")) return;
    try {
      await axios.delete(`${BASE_URL}/managed-cards/${id}/`);
      fetchCards();
    } catch (err) {
      console.error("Error deleting card:", err);
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Managed Cards</h2>
        <button
          onClick={() => { setShowModal(true); setEditingCard(null); setErrorMessage(""); }}
          className="bg-[#c10007] hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition shadow-md hover:shadow-lg w-full sm:w-auto"
        >
          <Plus size={18} /> Add Card
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="relative bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition transform hover:-translate-y-1 cursor-pointer w-full"
          >
            <div className="flex items-center justify-center bg-gray-50 p-3">
              <img
                src={card.image_url}
                alt={card.title}
                className="w-full h-32 sm:h-36 md:h-40 object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-3 flex flex-col gap-1">
              <h3 className="font-semibold text-base sm:text-lg text-gray-800 break-words">{card.title}</h3>
              <a
                href={card.url}
                className="text-blue-600 hover:underline break-words text-sm sm:text-base"
                target="_blank"
                rel="noopener noreferrer"
              >
                {card.url}
              </a>
            </div>

            {/* Action Buttons */}
            <div className="absolute top-2 right-2 flex gap-1">
              <button
                onClick={() => handleEdit(card)}
                className="p-1 bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200 hover:text-indigo-900 transition shadow-sm"
              >
                <Edit2 size={14} />
              </button>
              <button
                onClick={() => handleDelete(card.id)}
                className="p-1 bg-pink-100 text-pink-700 rounded-full hover:bg-pink-200 hover:text-pink-900 transition shadow-sm"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 sm:p-6">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg p-6 relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => { setShowModal(false); setEditingCard(null); setErrorMessage(""); }}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold mb-4 text-[#c10007]">
              {editingCard ? "Edit Card" : "Add Card"}
            </h2>

            {errorMessage && (
              <div className="mb-4 text-red-600 bg-red-100 p-2 rounded-md">{errorMessage}</div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Card Title"
                required
                className="border p-2 rounded-lg w-full"
              />
              <input
                type="url"
                name="url"
                value={form.url}
                onChange={handleChange}
                placeholder="Card URL"
                required
                className="border p-2 rounded-lg w-full"
              />
              <input
                type="file"
                name="image"
                onChange={handleChange}
                accept="image/*"
                className="border p-2 rounded-lg w-full"
              />
              <button
                type="submit"
                className="bg-[#c10007] hover:bg-red-600 text-white px-4 py-2 rounded-lg mt-2 transition shadow-md hover:shadow-lg w-full"
              >
                {editingCard ? "Update Card" : "Save Card"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
