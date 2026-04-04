import { useState } from "react";

function Deposit({ setPage }) {
  const [acc, setAcc] = useState("");
  const [amt, setAmt] = useState("");
  const [msg, setMsg] = useState("");

  const handleDeposit = async () => {
    const res = await fetch("http://127.0.0.1:5000/deposit", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ account_number: acc, amount: amt }),
    });

    const data = await res.json();
    setMsg(data.message);
  };

  return (
    <div className="card">
      <h2>Deposit</h2>

      <input placeholder="Account Number" onChange={(e)=>setAcc(e.target.value)}/>
      <input placeholder="Amount" onChange={(e)=>setAmt(e.target.value)}/>

      <button onClick={handleDeposit}>Deposit</button>

      {msg && <p className="success">{msg}</p>}

      
    </div>
  );
}

export default Deposit;