import { useState } from "react";

function Withdraw() {
  const [acc, setAcc] = useState("");
  const [amt, setAmt] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async () => {
    if (!acc || !amt) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMsg("");

      const res = await fetch(
        "https://bank-management-dashboard-dxy9.onrender.com/withdraw",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            account_number: acc,
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
      setloading(false);
    }
  };

  return (
    <div className="card">
      <h2>Withdraw</h2>

      <input
        placeholder="Account Number"
        value={acc}
        onChange={(e) => setAcc(e.target.value)}
      />

      <input
        placeholder="Amount"
        type="number"
        value={amt}
        onChange={(e) => setAmt(e.target.value)}
      />

      <button onClick={handleWithdraw} disabled={loading}>
        {loading ? "Processing..." : "Withdraw"}
      </button>
      {msg && <p className="success">{msg}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Withdraw;
