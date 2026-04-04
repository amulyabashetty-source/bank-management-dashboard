import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function Dashboard() {
  const [acc, setAcc] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState("");

  const fetchData = async () => {
    if (!acc) {
      setError("Enter account number");
      return;
    }

    try {
      setError("");

      const res1 = await fetch(`https://bank-management-dashboard-dxy9.onrender.com/transactions/${acc}`);
const data1 = await res1.json();

const res2 = await fetch(`https://bank-management-dashboard-dxy9.onrender.com/balance/${acc}`);
const data2 = await res2.json();

      if (data2.error) {
        setError(data2.error);
        return;
      }

      setTransactions(data1.transactions || []);
      setBalance(data2.balance);

    } catch {
      setError("Server error");
    }
  };

  // CALCULATIONS
  const totalDeposit = transactions
    .filter(t => t.type === "Deposit")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalWithdraw = transactions
    .filter(t => t.type === "Withdraw")
    .reduce((sum, t) => sum + t.amount, 0);

  // CHART DATA (clean)
  const chartData = [
    { type: "Deposit", amount: totalDeposit },
    { type: "Withdraw", amount: totalWithdraw }
  ];

  return (
    <div className="dashboard-layout">

      {/* LEFT SIDE */}
      <div className="dashboard-left">

        {/* INPUT */}
        <div className="card input-card">
          <h2>Dashboard</h2>

          <input
            placeholder="Enter Account Number"
            value={acc}
            onChange={(e) => setAcc(e.target.value)}
          />

          <button onClick={fetchData}>Load Data</button>

          {error && <p className="error">{error}</p>}
        </div>

        {/* SUMMARY */}
        {transactions.length > 0 && (
          <div className="summary-grid">

            <div className="summary-card">
              <p>Current Balance</p>
              <h3>₹{balance}</h3>
            </div>

            <div className="summary-card green">
              <p>Total Deposit</p>
              <h3>₹{totalDeposit}</h3>
            </div>

            <div className="summary-card red">
              <p>Total Withdraw</p>
              <h3>₹{totalWithdraw}</h3>
            </div>

          </div>
        )}

      </div>

      {/* RIGHT SIDE */}
      {transactions.length > 0 && (
        <div className="dashboard-right">

          {/* CHART */}
          <div className="card">
            <h3>Transaction Chart</h3>

            <BarChart width={450} height={250} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#4CAF50" />
            </BarChart>
          </div>

          {/* TABLE */}
          <div className="card">
            <h3>Transaction History</h3>

            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((t, i) => (
                  <tr key={i}>
                    <td>{t.type}</td>
                    <td>₹{t.amount}</td>
                    <td>{t.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

    </div>
  );
}

export default Dashboard;