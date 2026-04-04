import { useState } from "react";

function Balance({ setPage }) {
  const [acc, setAcc] = useState("");
  const [balance, setBalance] = useState("");

  const handleCheck = async () => {
    const res = await fetch("http://127.0.0.1:5000/balance", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ account_number: acc }),
    });

    const data = await res.json();
    setBalance(data.balance || data.error);
  };

  return (
    <div className="card">
      <h2>Check Balance</h2>

      <input placeholder="Account Number" onChange={(e)=>setAcc(e.target.value)}/>

      <button onClick={handleCheck}>Check</button>

      {balance && <p className="success">Balance: ₹{balance}</p>}

      
    </div>
  );
}

export default Balance;