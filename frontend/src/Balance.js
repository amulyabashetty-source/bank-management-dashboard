import { useState } from "react";

function Balance() {
  const [acc, setAcc] = useState("");
  const [balance, setBalance] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleCheck = async () => {
    if (!acc) {
      setError("Enter account number");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setBalance("");

      const res = await fetch(
        `https://bank-management-dashboard-dxy9.onrender.com/balance/${acc}`,
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

      <input
        placeholder="Account Number"
        value={acc}
        onChange={(e) => setAcc(e.target.value)}
      />

      <button onClick={handleCheck} disabled={loading}>
        {loading ? "Processing..." : "Check"}
      </button>

      {balance && <p className="success">Balance: ₹{balance}</p>}

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Balance;
