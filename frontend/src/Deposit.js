import { useState } from "react";

function Deposit() {
  const account = localStorage.getItem("account");
  const [amt, setAmt] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDeposit = async () => {
    if (!account || !amt) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMsg("");

      const res = await fetch(
        "https://bank-management-dashboard-dxy9.onrender.com/deposit",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            account_number: account,
            amount: Number(amt),
          }),
        },
      );

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setMsg(data.message);
      }
    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Deposit</h2>

      {/* <input
        placeholder="Account Number"
        value={acc}
        onChange={(e) => setAcc(e.target.value)}
      /> */}

      <input
        placeholder="Amount"
        type="number"
        value={amt}
        onChange={(e) => setAmt(e.target.value)}
      />

      <button onClick={handleDeposit} disabled={loading}>
        {loading ? "Processing..." : "Deposit"}
      </button>

      {msg && <p className="success">{msg}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Deposit;
