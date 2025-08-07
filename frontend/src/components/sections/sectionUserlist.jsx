import { useState, useEffect } from "react";
import axios from "axios";

import DateFilter from "../sections/cards/dataFilter";
import UserCard from "../sections/cards/userCard";

export default function SectionUserList() {
  const [users, setUsers] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async (date = "") => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Access denied: Please log in with an admin account.");
        setLoading(false);
        return;
      }
      const url = new URL("http://localhost:5000/api/admin/users");
      if (date) url.searchParams.append("predictionDate", date);
      const response = await axios.get(url.toString(), {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data.users || []);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to fetch users.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(filterDate);
  }, [filterDate]);

  return (
    <section className="animate-fade-up px-4 py-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold text-sky-700 mb-6 text-center sm:text-left">
        Manage User Lists
      </h2>

      <DateFilter filterDate={filterDate} setFilterDate={setFilterDate} />

      {loading && <p className="text-center text-sky-600 animate-pulse">Loading users...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && !error && users.length === 0 && (
        <p className="text-center py-6 text-gray-500">No users found.</p>
      )}

      {!loading && !error && users.length > 0 && (
        <div className="space-y-12">
          {users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
      )}
    </section>
  );
}
