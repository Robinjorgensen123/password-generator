import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:7000";

export default function Dashboard() {
  const { token, logout } = useContext(AuthContext);
  const [passwords, setPasswords] = useState([]);

  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [editingId, setEditingId] = useState(null); // vilket lösenord som redigeras
  const [editWebsite, setEditWebsite] = useState("");
  const [editUsername, setEditUsername] = useState("");
  const [editPassword, setEditPassword] = useState("");

  const navigate = useNavigate();

  const fetchPasswords = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/passwords`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setPasswords(data);
      } else {
        alert(data.message || "Kunde inte hämta lösenord");
      }
    } catch (err) {
      alert("Något gick fel vid hämtning");
    }
  };

  useEffect(() => {
    if (token) {
      fetchPasswords();
    }
  }, [token]);

  // Lägg till lösenord
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BACKEND_URL}/api/passwords`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ website, username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setWebsite("");
        setUsername("");
        setPassword("");
        fetchPasswords();
      } else {
        alert(data.message || "Kunde inte lägga till lösenord");
      }
    } catch (err) {
      alert("Något gick fel vid tillägg");
    }
  };

  // Ta bort lösenord
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/passwords/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        fetchPasswords();
      } else {
        alert(data.message || "Kunde inte ta bort lösenord");
      }
    } catch (err) {
      alert("Något gick fel vid borttagning");
    }
  };

  // Starta redigera - sätt inputvärden och id
  const startEditing = ({ _id, website, username, password }) => {
    setEditingId(_id);
    setEditWebsite(website);
    setEditUsername(username);
    setEditPassword(password);
  };

  // Avbryt redigering
  const cancelEditing = () => {
    setEditingId(null);
  };

  // Spara uppdatering
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BACKEND_URL}/api/passwords/${editingId}`, {
        method: "PUT", // eller PATCH beroende på backend
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          website: editWebsite,
          username: editUsername,
          password: editPassword,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setEditingId(null);
        fetchPasswords();
      } else {
        alert(data.message || "Kunde inte uppdatera lösenord");
      }
    } catch (err) {
      alert("Något gick fel vid uppdatering");
    }
  };

  // Logga ut
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h2>Dina lösenord</h2>
      <button
        onClick={handleLogout}
        style={{ float: "right", marginBottom: "10px" }}
      >
        Logga ut
      </button>
      <ul>
        {passwords.map(({ _id, website, username, password }) => (
          <li key={_id}>
            {editingId === _id ? (
              <form onSubmit={handleUpdate} style={{ display: "inline" }}>
                <input
                  type="text"
                  value={editWebsite}
                  onChange={(e) => setEditWebsite(e.target.value)}
                  required
                />
                <input
                  type="text"
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value)}
                  required
                />
                <input
                  type="text"
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  required
                />
                <button type="submit">Spara</button>
                <button type="button" onClick={cancelEditing}>
                  Avbryt
                </button>
              </form>
            ) : (
              <>
                <b>{website}</b> ({username}): {password}{" "}
                <button onClick={() => handleDelete(_id)}>Ta bort</button>{" "}
                <button onClick={() => startEditing({ _id, website, username, password })}>
                  Uppdatera
                </button>
              </>
            )}
          </li>
        ))}
      </ul>

      <h3>Lägg till lösenord</h3>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Webbplats"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Användarnamn"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Lägg till</button>
      </form>
    </div>
  );
}
