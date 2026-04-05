import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function Dashboard() {
  const account = localStorage.getItem("account");

  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //  AUTO LOAD DATA AFTER LOGIN
  useEffect(() => {
    if (account) {
      fetchAllData(account);
    }
  }, [account]);

  const fetchAllData = async (acc) => {
    if (!acc) {
      setError("No account found. Please login.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      //  USER DETAILS
      const userRes = await fetch(
        `https://bank-management-dashboard-dxy9.onrender.com/user/${acc}`
      );
      const userData = await userRes.json();

      //  TRANSACTIONS
      const txRes = await fetch(
        `https://bank-management-dashboard-dxy9.onrender.com/transactions/${acc}`
      );
      const txData = await txRes.json();

      //  BALANCE
      const balRes = await fetch(
        `https://bank-management-dashboard-dxy9.onrender.com/balance/${acc}`
      );
      const balData = await balRes.json();

      if (balData.error) {
        setError(balData.error);
        return;
      }

      setUser(userData);
      setTransactions(txData.transactions || []);
      setBalance(balData.balance);
    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  //  CALCULATIONS
  const totalDeposit = transactions
    .filter((t) => t.type === "Deposit")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalWithdraw = transactions
    .filter((t) => t.type === "Withdraw")
    .reduce((sum, t) => sum + t.amount, 0);

  const chartData = [
    { type: "Deposit", amount: totalDeposit },
    { type: "Withdraw", amount: totalWithdraw },
  ];

  return (
    <div className="dashboard-layout">
      {/* LEFT SIDE */}
      <div className="dashboard-left">
        
        {/* USER INFO */}
        <div className="card">
          <h2>Welcome</h2>

          {user && (
            <>
              <p><b>Name:</b> {user.name}</p>
              <p><b>Account No:</b> {user.account_number}</p>
            </>
          )}

          <button onClick={() => fetchAllData(account)} disabled={loading}>
            {loading ? "Loading..." : "Refresh"}
          </button>

          {error && <p className="error">{error}</p>}
        </div>

        {/* SUMMARY */}
        {transactions.length > 0 && (
          <div className="summary-grid">
            <div className="summary-card">
              <p>Balance</p>
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
                {transactions.slice(-5).reverse().map((t, i) => (
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