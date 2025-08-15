import React, { useState } from "react";
import axios from "axios";

export default function EmployeeForm() {
  const [form, setForm] = useState({ name: "", department: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      // Proxy ki wajah se relative path chalega
      const res = await axios.post("/api/employee", {
        name: form.name,
        department: form.department,
      });
      setMsg(`Saved ✓ (id: ${res.data.id})`);
      setForm({ name: "", department: "" });
    } catch (err) {
      console.error(err);
      setMsg("Error saving employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: 420, margin: "40px auto", padding: 24,
      borderRadius: 16, boxShadow: "0 6px 20px rgba(0,0,0,.1)"
    }}>
      <h2 style={{ marginBottom: 16 }}>Add Employee</h2>

      <form onSubmit={submit}>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", marginBottom: 6 }}>Name</label>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            required
            placeholder="Neeraj Singh"
            style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 6 }}>Department</label>
          <input
            name="department"
            value={form.department}
            onChange={onChange}
            required
            placeholder="IT"
            style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%", padding: 12, border: 0, borderRadius: 12,
            cursor: "pointer", fontWeight: 600
          }}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>

      {msg && (
        <p style={{ marginTop: 12 }}>{msg}</p>
      )}
    </div>
  );
}
