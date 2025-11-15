import React, { useEffect, useState } from "react";
import { getResellers, createReseller, updateReseller, deleteReseller } from "../api/reseller";

const Resellers = () => {
  const [resellers, setResellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: "", Descriptions: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchResellers = async () => {
    setLoading(true);
    try {
      const data = await getResellers();
      // ✅ Log API response
      console.log("Resellers API response:", data);
      setResellers(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchResellers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId !== null) {
        await updateReseller(editingId, formData);
        setEditingId(null);
      } else {
        await createReseller(formData);
      }
      setFormData({ name: "", Descriptions: "" });
      fetchResellers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (reseller) => {
    setEditingId(reseller.id);
    setFormData({ name: reseller.name, Descriptions: reseller.Descriptions });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this reseller?")) {
      try {
        await deleteReseller(id);
        fetchResellers();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Resellers</h1>

      {/* Form for Create / Edit */}
      <form onSubmit={handleSubmit} className="mb-6 flex gap-3">
        <input
          type="text"
          placeholder="Name"
          className="p-2 border rounded bg-[#222] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          className="p-2 border rounded bg-[#222] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          value={formData.Descriptions}
          onChange={(e) => setFormData({ ...formData, Descriptions: e.target.value })}
          required
        />
        <button
          type="submit"
          className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
        >
          {editingId !== null ? "Update" : "Add"}
        </button>
      </form>

      {/* Table */}
      <table className="min-w-full bg-[#222] text-white">
        <thead className="bg-[#333]">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Users</th>
            <th className="p-2 border">Devices</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {resellers.map((r) => (
            <tr key={r.id} className="text-center border-b border-white/20">
              <td className="p-2 border">{r.id}</td>
              <td className="p-2 border">{r.name}</td>
              <td className="p-2 border">{r.Descriptions}</td>
              <td className="p-2 border">
                {r.users.map((u) => u.name).join(", ")}
              </td>
              <td className="p-2 border">
                {r.devices.map((d) => d.name).join(", ")}
              </td>
              <td className="p-2 border flex justify-center gap-2">
                <button
                  onClick={() => handleEdit(r)}
                  className="bg-yellow-500 px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(r.id)}
                  className="bg-red-500 px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Resellers;
