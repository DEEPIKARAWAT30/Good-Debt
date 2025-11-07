// src/pages/Agents.jsx
import { useMemo, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  Home,
  Box,
  Users,
  User,
  CalendarDays,
  CreditCard,
  Calculator,
  Megaphone,
  Settings,
  LogOut,
  UserCircle,
  IndianRupee,
  MapPin,
  Phone,
  Eye,
  Pencil,
  Trash2,
  Plus,
  BadgeInfo,
} from "lucide-react";
import logo from "../assets/logo/logos-dark-transparent.png";

export default function Agents() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All"); // All | Team | Partner
  const [currentPage, setCurrentPage] = useState(1);
  const [commissionOpenFor, setCommissionOpenFor] = useState(null); // agent object
  const [commissionAmount, setCommissionAmount] = useState("");

  // ------- Static demo data (replace with API later) -------
  const agents = useMemo(
    () => [
      {
        id: 1,
        name: "Rohit Sharma",
        email: "rohit@example.com",
        phone: "+91 98765 43210",
        location: "Mumbai, India",
        customers: 24,
        type: "Team",
        photo: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      {
        id: 2,
        name: "Priya Singh",
        email: "priya@example.com",
        phone: "+91 91234 56789",
        location: "Delhi, India",
        customers: 18,
        type: "Partner",
        photo: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      {
        id: 3,
        name: "Aman Verma",
        email: "aman@example.com",
        phone: "+91 99887 76655",
        location: "Jaipur, India",
        customers: 31,
        type: "Team",
        photo: "https://randomuser.me/api/portraits/men/41.jpg",
      },
      {
        id: 4,
        name: "Neha Kapoor",
        email: "neha.k@example.com",
        phone: "+91 77001 24567",
        location: "Pune, India",
        customers: 15,
        type: "Partner",
        photo: "https://randomuser.me/api/portraits/women/68.jpg",
      },
      {
        id: 5,
        name: "Arjun Malhotra",
        email: "arjun.m@example.com",
        phone: "+91 88554 11223",
        location: "Chennai, India",
        customers: 22,
        type: "Team",
        photo: "https://randomuser.me/api/portraits/men/77.jpg",
      },
      {
        id: 6,
        name: "Kiara Desai",
        email: "kiara@example.com",
        phone: "+91 90001 22334",
        location: "Surat, India",
        customers: 10,
        type: "Partner",
        photo: "https://randomuser.me/api/portraits/women/21.jpg",
      },
      {
        id: 7,
        name: "Ishaan Patel",
        email: "ishaan.p@example.com",
        phone: "+91 98012 33445",
        location: "Ahmedabad, India",
        customers: 27,
        type: "Team",
        photo: "https://randomuser.me/api/portraits/men/13.jpg",
      },
      {
        id: 8,
        name: "Riya Mehta",
        email: "riya.m@example.com",
        phone: "+91 93456 71234",
        location: "Noida, India",
        customers: 12,
        type: "Partner",
        photo: "https://randomuser.me/api/portraits/women/11.jpg",
      },
      {
        id: 9,
        name: "Kabir Khan",
        email: "kabir.k@example.com",
        phone: "+91 96543 28761",
        location: "Hyderabad, India",
        customers: 29,
        type: "Team",
        photo: "https://randomuser.me/api/portraits/men/9.jpg",
      },
      {
        id: 10,
        name: "Ananya Rao",
        email: "ananya.rao@example.com",
        phone: "+91 90909 10101",
        location: "Bengaluru, India",
        customers: 25,
        type: "Partner",
        photo: "https://randomuser.me/api/portraits/women/9.jpg",
      },
      {
        id: 11,
        name: "Dev Mishra",
        email: "dev.m@example.com",
        phone: "+91 92123 44321",
        location: "Indore, India",
        customers: 8,
        type: "Team",
        photo: "https://randomuser.me/api/portraits/men/28.jpg",
      },
      {
        id: 12,
        name: "Sara Ali",
        email: "sara.ali@example.com",
        phone: "+91 94567 88900",
        location: "Kolkata, India",
        customers: 19,
        type: "Partner",
        photo: "https://randomuser.me/api/portraits/women/28.jpg",
      },
    ],
    []
  );

  // ------- Filtering + Search -------
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return agents.filter((a) => {
      const matchesType = typeFilter === "All" || a.type === typeFilter;
      const matchesQuery =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.location.toLowerCase().includes(q) ||
        a.phone.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q);
      return matchesType && matchesQuery;
    });
  }, [agents, query, typeFilter]);

  // ------- Pagination -------
  const pageSize = 8;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const page = Math.min(currentPage, totalPages);
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const closeCommission = () => {
    setCommissionAmount("");
    setCommissionOpenFor(null);
  };
  const saveCommission = () => {
    if (!commissionAmount) return;
    alert(
      `Commission of ₹${commissionAmount} added for ${commissionOpenFor?.name}`
    );
    closeCommission();
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Main Content */}
      <main className="flex-1 px-4 lg:px-6">
        {/* Top Navbar */}
        {/* <div className="flex justify-between items-center shadow rounded-md px-3 py-3 mb-6 bg-white">
          <button
            className="lg:hidden p-2 rounded-md bg-blue-600 text-white"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
          <h2 className="text-xl font-bold">Agents</h2>
          <div className="flex items-center gap-3">
            <Link to="/wallets-coin" className="flex items-center gap-2">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-50 border border-orange-400 shadow">
                <IndianRupee className="w-4 h-4 text-orange-500" />
              </span>
              <span className="text-green-600 font-bold text-lg">20</span>
            </Link>
            <Link
              to="/agent-profile"
              className="px-3 py-1 border rounded-md text-blue-600 hover:bg-blue-50"
            >
              <UserCircle className="w-4 h-4 inline mr-1" /> My Account
            </Link>
          </div>
        </div> */}

        {/* Filters / Actions */}
        <div className="bg-white shadow rounded-lg mb-4">
          <div className="flex flex-col md:flex-row gap-2 md:gap-3 items-stretch md:items-center justify-between p-3">
            <div className="flex gap-2 w-full md:w-auto">
              <select
                value={typeFilter}
                onChange={(e) => {
                  setTypeFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="border rounded-md px-3 py-2 text-sm w-40"
              >
                <option>All</option>
                <option>Team</option>
                <option>Partner</option>
              </select>
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search agents..."
                className="border rounded-md px-3 py-2 text-sm w-full md:w-72"
              />
            </div>
            <Link
              to="/add-agent"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Agent
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
                <th className="p-3 border-b w-12">#</th>
                <th className="p-3 border-b">Agent</th>
                <th className="p-3 border-b">Location</th>
                <th className="p-3 border-b">Phone</th>
                <th className="p-3 border-b">Customers</th>
                <th className="p-3 border-b">Type</th>
                <th className="p-3 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((a, idx) => (
                <tr key={a.id} className="hover:bg-gray-50 text-sm transition">
                  <td className="p-3 border-b">{(page - 1) * pageSize + idx + 1}</td>
                  <td className="p-3 border-b">
                    <div className="flex items-center gap-3">
                      <img
                        src={a.photo}
                        alt={a.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold text-gray-800">{a.name}</div>
                        <div className="text-xs text-gray-500">{a.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 border-b">
                    <div className="flex items-center gap-1 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {a.location}
                    </div>
                  </td>
                  <td className="p-3 border-b">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Phone className="w-4 h-4" />
                      {a.phone}
                    </div>
                  </td>
                  <td className="p-3 border-b">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-cyan-100 text-cyan-700">
                      {a.customers}
                    </span>
                  </td>
                  <td className="p-3 border-b">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        a.type === "Team"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {a.type}
                    </span>
                  </td>
                  <td className="p-3 border-b">
                    <div className="flex justify-center gap-2">
                      <button
                        className="px-2 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200"
                        title="View"
                        onClick={() => alert(`Viewing ${a.name}`)}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="px-2 py-1 rounded bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                        title="Edit"
                        onClick={() => alert(`Editing ${a.name}`)}
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        className="px-2 py-1 rounded bg-violet-100 text-violet-700 hover:bg-violet-200"
                        title="Add Commission"
                        onClick={() => setCommissionOpenFor(a)}
                      >
                        <IndianRupee className="w-4 h-4" />
                      </button>
                      <button
                        className="px-2 py-1 rounded bg-rose-100 text-rose-700 hover:bg-rose-200"
                        title="Delete"
                        onClick={() => {
                          if (confirm(`Delete ${a.name}?`)) alert("Deleted!");
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {paged.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-gray-500">
                    No agents found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm">
          <div className="text-gray-600">
            Showing{" "}
            <span className="font-medium">
              {filtered.length === 0 ? 0 : (page - 1) * pageSize + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(page * pageSize, filtered.length)}
            </span>{" "}
            of <span className="font-medium">{filtered.length}</span> agents
          </div>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              disabled={page === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </button>
            <span className="px-3 py-1 border rounded bg-gray-50">
              {page} / {totalPages}
            </span>
            <button
              className="px-3 py-1 border rounded disabled:opacity-50"
              disabled={page === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </div>
        </div>
      </main>

      {/* Commission Modal */}
      {commissionOpenFor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={closeCommission}
          />
          <div className="relative bg-white w-[95%] max-w-md rounded-xl shadow-xl p-5">
            <h3 className="text-lg font-semibold mb-1">Add Commission</h3>
            <p className="text-sm text-gray-600 mb-4">
              Agent: <span className="font-medium">{commissionOpenFor.name}</span>
            </p>
            <label className="block text-sm font-medium mb-1">
              Amount (₹)
            </label>
            <input
              type="number"
              value={commissionAmount}
              onChange={(e) => setCommissionAmount(e.target.value)}
              placeholder="Enter commission amount"
              className="w-full border rounded px-3 py-2 mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={closeCommission}
                className="px-4 py-2 rounded border"
              >
                Cancel
              </button>
              <button
                onClick={saveCommission}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Small helpers ---------- */
function SidebarLink({ to, icon, text, active, mobile }) {
  const base =
    "flex items-center px-3 py-2 rounded-md transition";
  const inactive = mobile ? "hover:bg-gray-100" : "hover:bg-gray-500 text-white/90";
  const activeCls = mobile
    ? "bg-blue-100 text-blue-600 font-medium"
    : "bg-gray-700 text-white font-medium";

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${base} ${isActive || active ? activeCls : inactive}`
      }
    >
      <span className="w-5 h-5 mr-2">{icon}</span>
      {text}
    </NavLink>
  );
}
