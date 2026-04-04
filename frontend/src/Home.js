function Home({ setPage }) {
  return (
    <div className="menu">
      <button onClick={() => setPage("create")}>Create Account</button>
      <button onClick={() => setPage("deposit")}>Deposit</button>
      <button onClick={() => setPage("withdraw")}>Withdraw</button>
      <button onClick={() => setPage("balance")}>Check Balance</button>
    </div>
  );
}

export default Home;