import { useState } from "react";

function CreateAccount({ setPage }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    mobile: "",
    aadhar: "",
    account_type: "saving",
  });

  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!form.name || !form.age || !form.mobile || !form.aadhar) {
      setError("Please fill all fields");
      return;
    }

    try {
      setError("");
      setMsg("");

      const res = await fetch(
        "https://bank-management-dashboard-dxy9.onrender.com/create-account",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            age: Number(form.age),
          }),
        }
      );

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setMsg("Account Created: " + data.account_number);

        setTimeout(() => {
          setPage("dashboard");
        }, 2000);
      }
    } catch {
      setError("Server error");
    }
  };

  return (
    <div className="card">
      <h2>Create Account</h2>

      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Age"
        type="number"
        onChange={(e) => setForm({ ...form, age: e.target.value })}
      />

      <input
        placeholder="Mobile"
        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
      />

      <input
        placeholder="Aadhar"
        onChange={(e) => setForm({ ...form, aadhar: e.target.value })}
      />

      <select
        onChange={(e) =>
          setForm({ ...form, account_type: e.target.value })
        }
      >
        <option value="saving">Saving</option>
        <option value="zero">Zero</option>
      </select>
<br/>
      <button onClick={handleSubmit}>Create</button>

      {msg && <p className="success">{msg}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default CreateAccount;