import { useState } from "react";

function Login({ setAccount }) {
  const [mobile, setMobile] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!mobile || !aadhar) {
      setError("Enter all fields");
      return;
    }

    try {
      const res = await fetch(
        "https://bank-management-dashboard-dxy9.onrender.com/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mobile, aadhar }),
        }
      );

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        localStorage.setItem("account", data.account_number);
        setAccount(data.account_number);
      }
    } catch {
      setError("Server error");
    }
  };

  return (
  <div className="login-container">
    <div className="login-card">
      <h2>Login</h2>

      <input
        placeholder="Mobile"
        onChange={(e) => setMobile(e.target.value)}
      />

      <input
        placeholder="Aadhar"
        onChange={(e) => setAadhar(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      {error && <p className="error">{error}</p>}
    </div>
  </div>
);
}

export default Login;