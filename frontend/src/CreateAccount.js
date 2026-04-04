import { useState } from "react";

function CreateAccount({ setPage }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    mobile: "",
    aadhar: "",
    account_type: "saving"
  });

  const [msg, setMsg] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("http://127.0.0.1:5000/create-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.account_number) {
      setMsg("Account Created: " + data.account_number);

      // 👉 Go back to home after 2 sec
      setTimeout(() => {
        setPage("home");
      }, 2000);
    }
  };

  return (
    <div className="card">
      <h2>Create Account</h2>

      <input placeholder="Name" onChange={(e)=>setForm({...form,name:e.target.value})}/>
      <input placeholder="Age" onChange={(e)=>setForm({...form,age:e.target.value})}/>
      <input placeholder="Mobile" onChange={(e)=>setForm({...form,mobile:e.target.value})}/>
      <input placeholder="Aadhar" onChange={(e)=>setForm({...form,aadhar:e.target.value})}/>

      <select onChange={(e)=>setForm({...form,account_type:e.target.value})}>
        <option value="saving">Saving</option>
        <option value="zero">Zero</option>
      </select>

      <div className="button-group">
  <button onClick={handleSubmit}>Create</button>
</div>
      {msg && <p className="success">{msg}</p>}

    </div>
  );
}

export default CreateAccount;