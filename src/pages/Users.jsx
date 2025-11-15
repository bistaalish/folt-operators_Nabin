import React, { useEffect, useState } from "react";
import { getUsers, createUser, updateUser, deleteUser, resetUserPassword } from "../api/users";
import { getResellers } from "../api/reseller";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [resellers, setResellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    resellerId: "",
    password: ""
  });
  const [editingId, setEditingId] = useState(null);

  // For password reset
  const [resetId, setResetId] = useState(null);
  const [resetPassword, setResetPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const roleMap = { Admin: 1, Support: 2, Technicians: 3 };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      console.log("Users API response:", data);
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const fetchResellers = async () => {
    try {
      const data = await getResellers();
      setResellers(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchResellers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        role_id: roleMap[formData.role],
        reseller_id: parseInt(formData.resellerId),
        password: !editingId ? formData.password : undefined
      };

      if (editingId !== null) {
        await updateUser(editingId, payload);
        setEditingId(null);
      } else {
        await createUser(payload);
      }

      setFormData({ name: "", email: "", role: "", resellerId: "", password: "" });
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (user) => {
    setEditingId(user.id);
    setFormData({
      name: user.name,
      email: user.email,
      role: Object.keys(roleMap).find(key => roleMap[key] === user.roles?.id) || "",
      resellerId: user.reseller?.id || "",
      password: ""
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        fetchUsers();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (resetPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await resetUserPassword(resetId, { password: resetPassword, confirm_password: confirmPassword });
      setResetId(null);
      setResetPassword("");
      setConfirmPassword("");
      alert("Password reset successfully");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      {/* Form for Create / Edit */}
      <form onSubmit={handleSubmit} className="mb-6 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Name"
          className="p-2 border rounded bg-[#222] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="p-2 border rounded bg-[#222] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        {!editingId && (
          <input
            type="password"
            placeholder="Password"
            className="p-2 border rounded bg-[#222] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        )}
        <select
          className="p-2 border rounded bg-[#222] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          required
        >
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="Support">Support</option>
          <option value="Technicians">Technicians</option>
        </select>
        <select
          className="p-2 border rounded bg-[#222] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          value={formData.resellerId}
          onChange={(e) => setFormData({ ...formData, resellerId: e.target.value })}
          required
        >
          <option value="">Select Reseller</option>
          {resellers.map((r) => (
            <option key={r.id} value={r.id}>{r.name}</option>
          ))}
        </select>
        <button type="submit" className="bg-green-500 px-4 py-2 rounded hover:bg-green-600">
          {editingId !== null ? "Update" : "Add"}
        </button>
      </form>

      {/* Users Table */}
      <table className="min-w-full bg-[#222] text-white">
        <thead className="bg-[#333]">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Reseller</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="text-center border-b border-white/20">
              <td className="p-2 border">{u.id}</td>
              <td className="p-2 border">{u.name}</td>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border">{u.roles?.name}</td>
              <td className="p-2 border">{u.reseller?.name}</td>
              <td className="p-2 border flex justify-center gap-2">
                <button
                  onClick={() => handleEdit(u)}
                  className="bg-yellow-500 px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(u.id)}
                  className="bg-red-500 px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => setResetId(u.id)}
                  className="bg-blue-500 px-2 py-1 rounded hover:bg-blue-600"
                >
                  Reset Password
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Password Reset Form */}
      {resetId && (
        <div className="mt-4 p-4 border rounded bg-[#333] text-white max-w-md">
          <h2 className="text-xl font-bold mb-2">Reset Password</h2>
          <form onSubmit={handleResetPassword} className="flex flex-col gap-2">
            <input
              type="password"
              placeholder="New Password"
              className="p-2 border rounded bg-[#222] text-white"
              value={resetPassword}
              onChange={(e) => setResetPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="p-2 border rounded bg-[#222] text-white"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <div className="flex gap-2 mt-2">
              <button type="submit" className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
                Reset
              </button>
              <button
                type="button"
                className="bg-gray-500 px-4 py-2 rounded hover:bg-gray-600"
                onClick={() => setResetId(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Users;
