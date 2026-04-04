import { useState } from "react";

function Withdraw({ setPage }) {
  const [acc, setAcc] = useState("");
  const [amt, setAmt] = useState("");
  const [msg, setMsg] = useState("");

  const handleWithdraw = async () => {
    const res = await fetch("http://127.0.0.1:5000/withdraw", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ account_number: acc, amount: amt }),
    });

    const data = await res.json();
    setMsg(data.message || data.error);
  };

  return (
    <div className="card">
      <h2>Withdraw</h2>

      <input placeholder="Account Number" onChange={(e)=>setAcc(e.target.value)}/>
      <input placeholder="Amount" onChange={(e)=>setAmt(e.target.value)}/>

      <button onClick={handleWithdraw}>Withdraw</button>

      {msg && <p className="success">{msg}</p>}

      
    </div>
  );
}

export default Withdraw;