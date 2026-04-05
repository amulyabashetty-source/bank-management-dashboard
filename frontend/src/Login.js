import { useState } from "react";

function Login({ setAccount, setPage }) {
  const [mobile, setMobile] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!mobile || !aadhar) {
      setError("Please enter all fields");
      return;
    }

    if (mobile.length !== 10) {
      setError("Mobile must be 10 digits");
      return;
    }

    if (aadhar.replace(/\s/g, "").length !== 12) {
      setError("Aadhar must be 12 digits");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        "https://bank-management-dashboard-dxy9.onrender.com/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mobile: mobile.trim(),
            aadhar: aadhar.replace(/\s/g, ""),
          }),
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
      setError("Server waking up... wait few seconds");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>

        <input
          placeholder="Mobile (10 digits)"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <input
          placeholder="Aadhar (12 digits)"
          value={aadhar}
          onChange={(e) => setAadhar(e.target.value)}
        />

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && <p className="error">{error}</p>}

        <p style={{ textAlign: "center", marginTop: "15px" }}>
          New user?{" "}
          <span
            style={{
              color: "#4CAF50",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={() => setPage("create")}
          >
            Create Account
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;