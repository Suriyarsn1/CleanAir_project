import { useState, useEffect } from "react";
import DateFilter from "../sections/cards/dataFilter";
import UserCard from "../sections/cards/userCard";
import { API_ENDPOINTS } from '../../constants/api';
import axios from "../../config/apiInstance";

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
      const params = {};
      if (date) params.predictionDate = date;

      const response = await axios.get(API_ENDPOINTS.ADMIN_USERS, {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });

      setUsers(response.data.users || []);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(filterDate);
  }, [filterDate]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Manage User Lists</h2>
      <DateFilter date={filterDate} setDate={setFilterDate} />

      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && users.length === 0 && <p>No users found.</p>}

      {!loading && !error && users.length > 0 &&
        users.map((user) => <UserCard key={user._id} user={user} />)
      }
    </div>
  );
}
