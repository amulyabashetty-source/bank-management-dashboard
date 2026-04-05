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
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (loading) return;

    //  EMPTY VALIDATION
    if (!form.name || !form.age || !form.mobile || !form.aadhar) {
      setError("Please fill all fields");
      return;
    }

    //  AGE VALIDATION
    if (form.age <= 0) {
      setError("Age must be greater than 0");
      return;
    }

    //  MOBILE VALIDATION (10 digits)
    if (!/^[0-9]{10}$/.test(form.mobile)) {
      setError("Mobile must be exactly 10 digits");
      return;
    }

    //  AADHAR VALIDATION (12 digits)
    const cleanAadhar = form.aadhar.replace(/\s/g, "");

    if (!/^[0-9]{12}$/.test(cleanAadhar)) {
      setError("Aadhar must be exactly 12 digits");
      return;
    }

    try {
      setLoading(true);
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
            aadhar: cleanAadhar, 
          }),
        }
      );

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setMsg("Account Created: " + data.account_number);
      }

    } catch {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Create Account</h2>

      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Age"
        type="number"
        value={form.age}
        onChange={(e) => setForm({ ...form, age: e.target.value })}
      />

      <input
        placeholder="Mobile (10 digits)"
        value={form.mobile}
        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
      />

      <input
        placeholder="Aadhar (12 digits)"
        value={form.aadhar}
        onChange={(e) => setForm({ ...form, aadhar: e.target.value })}
      />

      <select
        className="custom-select"
        value={form.account_type}
        onChange={(e) =>
          setForm({ ...form, account_type: e.target.value })
        }
      >
        <option value="saving">Saving</option>
        <option value="zero">Zero</option>
      </select>

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Creating..." : "Create"}
      </button>

      {/* SUCCESS UI */}
      {msg && (
        <div className="success-box">
          <p>{msg}</p>
          <button onClick={() => setPage("dashboard")}>
            Go to Dashboard
          </button>
        </div>
      )}

      {/*  ERROR UI */}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default CreateAccount;