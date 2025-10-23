import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:7000";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BACKEND_URL}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        login(data.user, data.token);
        navigate("/");
      } else {
        alert(data.message || "Fel vid inloggning");
      }
    } catch (error) {
      alert("Något gick fel");
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Logga in</h2>
        <input
          type="text"
          placeholder="Användarnamn"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Logga in</button>
      </form>
      <p>
        Har du inget konto?{" "}
        <button 
          onClick={() => navigate("/signup")} 
          style={{ 
            background: "none", 
            border: "none", 
            color: "blue", 
            textDecoration: "underline", 
            cursor: "pointer", 
            padding: 0,
            fontSize: "1em"
          }}
          type="button"
        >
          Registrera dig här
        </button>
      </p>
    </>
  );
}
