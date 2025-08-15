import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: "", department: "" });
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios.get("http://localhost:8080/api/employee")
      .then(res => setEmployees(res.data))
      .catch(err => console.error(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.department.trim()) return;
    axios.post("http://localhost:8080/api/employee", form)
      .then(() => {
        fetchEmployees();
        setForm({ name: "", department: "" });
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/employee/${id}`)
      .then(() => fetchEmployees())
      .catch(err => console.error(err));
  };

  const handleSearch = () => {
    if (search.trim() === "") {
      fetchEmployees();
    } else {
      axios.get(`http://localhost:8080/api/employee/search/${search}`)
        .then(res => setEmployees(res.data))
        .catch(err => console.error(err));
    }
  };

  const handleClearSearch = () => {
    setSearch("");
    fetchEmployees();
  };

  return (
    <div className="p-8 bg-gradient-to-br from-blue-100 to-purple-100 min-h-screen font-sans">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-700 drop-shadow">Employee Management</h1>

        {/* Form */}
        <form className="bg-white p-6 rounded-xl shadow-lg mb-6 flex flex-col md:flex-row gap-4 items-center"
          onSubmit={handleSubmit}>
          <input type="text" placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border-2 border-blue-200 p-2 flex-1 rounded focus:outline-none focus:border-blue-400 transition" />
          <input type="text" placeholder="Department"
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
            className="border-2 border-blue-200 p-2 flex-1 rounded focus:outline-none focus:border-blue-400 transition" />
          <button type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow transition">
            Add
          </button>
        </form>

        {/* Search */}
        <div className="flex gap-2 mb-6">
          <input type="text" placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-2 border-green-200 p-2 flex-1 rounded focus:outline-none focus:border-green-400 transition" />
          <button onClick={handleSearch}
            className="bg-green-500 hover:bg-green-600 text-white px-4 rounded-lg font-semibold shadow transition">
            Search
          </button>
          <button onClick={handleClearSearch}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 rounded-lg font-semibold shadow transition">
            Clear
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-lg rounded-xl">
            <thead>
              <tr className="bg-blue-200 text-blue-800">
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Department</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp.id} className="text-center border-b hover:bg-blue-50 transition">
                  <td className="p-3">{emp.id}</td>
                  <td className="p-3">{emp.name}</td>
                  <td className="p-3">{emp.department}</td>
                  <td className="p-3">
                    <button onClick={() => handleDelete(emp.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg font-semibold shadow transition">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-6 text-gray-500 text-center">No Employees Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
