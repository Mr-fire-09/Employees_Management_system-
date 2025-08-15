import { useState } from "react";

function App() {
  const [employee, setEmployee] = useState({ name: "", department: "" });

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/employee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
      });

      if (res.ok) {
        const data = await res.json();
        alert("Employee saved with ID: " + data.id);
        setEmployee({ name: "", department: "" });
      } else {
        alert("Failed to save employee");
      }
    } catch (err) {
      console.error(err);
      alert("Error: " + err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Add Employee</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            name="name"
            value={employee.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Department: </label>
          <input
            name="department"
            value={employee.department}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default App;
