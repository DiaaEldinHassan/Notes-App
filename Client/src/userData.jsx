import { useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "./userContext.jsx"; // Import from the file above
import { apiUrl } from "../config.service.js";

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(`${apiUrl}/users/userData`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}