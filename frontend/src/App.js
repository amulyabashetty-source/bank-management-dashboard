import { useState } from "react";
import CreateAccount from "./CreateAccount";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import Balance from "./Balance";
import Dashboard from "./Dashboard";
import "./App.css";

import {
  FaTachometerAlt,
  FaUserPlus,
  FaWallet,
  FaMoneyBillWave,
  FaFileAlt,
} from "react-icons/fa";

function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="app-layout">
      {/* SIDEBAR */}
      <div className="sidebar">
        <h2 className="logo">Bank</h2>

        <button
          className={page === "dashboard" ? "active" : ""}
          onClick={() => setPage("dashboard")}
        >
          <FaTachometerAlt /> Dashboard
        </button>

        <button
          className={page === "create" ? "active" : ""}
          onClick={() => setPage("create")}
        >
          <FaUserPlus /> Create Account
        </button>

        <button
          className={page === "deposit" ? "active" : ""}
          onClick={() => setPage("deposit")}
        >
          <FaWallet /> Deposit
        </button>

        <button
          className={page === "withdraw" ? "active" : ""}
          onClick={() => setPage("withdraw")}
        >
          <FaMoneyBillWave /> Withdraw
        </button>

        <button
          className={page === "balance" ? "active" : ""}
          onClick={() => setPage("balance")}
        >
          <FaFileAlt /> Balance
        </button>
      </div>

      {/* MAIN */}
      <div className="main">
  <div className="content-wrapper">

    <h1 className="title">Banking Application</h1>

    {page === "dashboard" && <Dashboard />}
    {page === "create" && <CreateAccount />}
    {page === "deposit" && <Deposit />}
    {page === "withdraw" && <Withdraw />}
    {page === "balance" && <Balance />}

  </div>
</div>
    </div>
  );
}

export default App;
