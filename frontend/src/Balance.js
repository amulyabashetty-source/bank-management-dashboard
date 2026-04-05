import { useState } from "react";

function Balance() {
  const account = localStorage.getItem("account"); 

  const [balance, setBalance] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!account) {
      setError("Please login first");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setBalance("");

      const res = await fetch(
        `https://bank-management-dashboard-dxy9.onrender.com/balance/${account}`
      );

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setBalance(data.balance);
      }
    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Check Balance</h2>

      <button onClick={handleCheck} disabled={loading}>
        {loading ? "Processing..." : "Check"}
      </button>

      {balance !== "" && <p className="success">Balance: ₹{balance}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Balance;