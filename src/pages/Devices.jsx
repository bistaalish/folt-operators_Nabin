import React, { useEffect, useState } from "react";
import { getDevices, createDevice, updateDevice, deleteDevice } from "../api/devices";
import { getResellers } from "../api/reseller";

const Devices = () => {
  const [devices, setDevices] = useState([]);
  const [resellers, setResellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    ip: "",
    username: "",
    password: "",
    resellerId: "",
    SNMP_RO: "",
    discordWebhook: ""
  });
  const [editingId, setEditingId] = useState(null);

  const fetchDevices = async () => {
    setLoading(true);
    try {
      const data = await getDevices();
      console.log("Devices API response:", data);
      setDevices(data);
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
    fetchDevices();
    fetchResellers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        ip: formData.ip,
        username: formData.username,
        password: formData.password,
        reseller_id: parseInt(formData.resellerId),
        SNMP_RO: formData.SNMP_RO,
        discordWebhook: formData.discordWebhook
      };

      if (editingId !== null) {
        await updateDevice(editingId, payload);
        setEditingId(null);
      } else {
        await createDevice(payload);
      }

      setFormData({
        name: "",
        ip: "",
        username: "",
        password: "",
        resellerId: "",
        SNMP_RO: "",
        discordWebhook: ""
      });
      fetchDevices();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (device) => {
    setEditingId(device.id);
    setFormData({
      name: device.name,
      ip: device.ip,
      username: device.username || "",
      password: "",
      resellerId: device.reseller?.id || "",
      SNMP_RO: device.SNMP_RO || "",
      discordWebhook: device.discordWebhook || ""
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this device?")) {
      try {
        await deleteDevice(id);
        fetchDevices();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Devices</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Device Name"
          className="p-2 border rounded bg-[#222] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="IP Address"
          className="p-2 border rounded bg-[#222] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          value={formData.ip}
          onChange={(e) => setFormData({ ...formData, ip: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Username"
          className="p-2 border rounded bg-[#222] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 border rounded bg-[#222] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required={!editingId}
        />
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
        <input
          type="text"
          placeholder="SNMP Read-Only Community"
          className="p-2 border rounded bg-[#222] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          value={formData.SNMP_RO}
          onChange={(e) => setFormData({ ...formData, SNMP_RO: e.target.value })}
        />
        <input
          type="text"
          placeholder="Discord Webhook"
          className="p-2 border rounded bg-[#222] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          value={formData.discordWebhook}
          onChange={(e) => setFormData({ ...formData, discordWebhook: e.target.value })}
        />

        <button
          type="submit"
          className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
        >
          {editingId !== null ? "Update" : "Add"}
        </button>
      </form>

      {/* Devices Table */}
      <table className="min-w-full bg-[#222] text-white">
        <thead className="bg-[#333]">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">IP</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((d) => (
            <tr key={d.id} className="text-center border-b border-white/20">
              <td className="p-2 border">{d.id}</td>
              <td className="p-2 border">{d.name}</td>
              <td className="p-2 border">{d.ip}</td>
              <td className="p-2 border flex justify-center gap-2">
                <button
                  onClick={() => handleEdit(d)}
                  className="bg-yellow-500 px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(d.id)}
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

export default Devices;
