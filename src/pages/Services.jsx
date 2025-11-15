import React, { useEffect, useState } from "react";
import { getServices, createService, updateService, deleteService } from "../api/services";
import { getDevices } from "../api/devices";

const Services = () => {
  const [services, setServices] = useState([]);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    serviceprofile_id: "",
    lineprofile_id: "",
    gemport: "",
    vlan: "",
    deviceId: "",
    acs: false,
    acs_gemport: "",
    acs_vlan: "",
    acsprofile_id: ""
  });
  const [editingId, setEditingId] = useState(null);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const data = await getServices();
      console.log("Services API response:", data);
      setServices(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const fetchDevices = async () => {
    try {
      const data = await getDevices();
      setDevices(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchServices();
    fetchDevices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        serviceprofile_id: formData.serviceprofile_id,
        lineprofile_id: formData.lineprofile_id,
        gemport: formData.gemport,
        vlan: formData.vlan,
        device_id: parseInt(formData.deviceId),
        acs: formData.acs,
        acs_gemport: formData.acs_gemport,
        acs_vlan: formData.acs_vlan,
        acsprofile_id: formData.acsprofile_id
      };

      if (editingId !== null) {
        await updateService(editingId, payload);
        setEditingId(null);
      } else {
        await createService(payload);
      }

      setFormData({
        name: "",
        serviceprofile_id: "",
        lineprofile_id: "",
        gemport: "",
        vlan: "",
        deviceId: "",
        acs: false,
        acs_gemport: "",
        acs_vlan: "",
        acsprofile_id: ""
      });
      fetchServices();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (service) => {
    setEditingId(service.id);
    setFormData({
      name: service.name,
      serviceprofile_id: service.serviceprofile_id,
      lineprofile_id: service.lineprofile_id,
      gemport: service.gemport,
      vlan: service.vlan,
      deviceId: service.device?.id || "",
      acs: service.acs || false,
      acs_gemport: service.acs_gemport || "",
      acs_vlan: service.acs_vlan || "",
      acsprofile_id: service.acsprofile_id || ""
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await deleteService(id);
        fetchServices();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Services</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Service Name"
          className="p-2 border rounded bg-[#222] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Service Profile ID"
          className="p-2 border rounded bg-[#222] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          value={formData.serviceprofile_id}
          onChange={(e) => setFormData({ ...formData, serviceprofile_id: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Line Profile ID"
          className="p-2 border rounded bg-[#222] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          value={formData.lineprofile_id}
          onChange={(e) => setFormData({ ...formData, lineprofile_id: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="GEM Port"
          className="p-2 border rounded bg-[#222] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          value={formData.gemport}
          onChange={(e) => setFormData({ ...formData, gemport: e.target.value })}
        />
        <input
          type="text"
          placeholder="VLAN"
          className="p-2 border rounded bg-[#222] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          value={formData.vlan}
          onChange={(e) => setFormData({ ...formData, vlan: e.target.value })}
        />
        <select
          className="p-2 border rounded bg-[#222] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          value={formData.deviceId}
          onChange={(e) => setFormData({ ...formData, deviceId: e.target.value })}
          required
        >
          <option value="">Select Device</option>
          {devices.map((d) => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.acs}
            onChange={(e) => setFormData({ ...formData, acs: e.target.checked })}
          />
          ACS
        </label>
        <input
          type="text"
          placeholder="ACS GEM Port"
          className="p-2 border rounded bg-[#222] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          value={formData.acs_gemport}
          onChange={(e) => setFormData({ ...formData, acs_gemport: e.target.value })}
        />
        <input
          type="text"
          placeholder="ACS VLAN"
          className="p-2 border rounded bg-[#222] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          value={formData.acs_vlan}
          onChange={(e) => setFormData({ ...formData, acs_vlan: e.target.value })}
        />
        <input
          type="text"
          placeholder="ACS Profile ID"
          className="p-2 border rounded bg-[#222] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          value={formData.acsprofile_id}
          onChange={(e) => setFormData({ ...formData, acsprofile_id: e.target.value })}
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
            <th className="p-2 border">Device</th>
            <th className="p-2 border">Service Profile</th>
            <th className="p-2 border">Line Profile</th>
            <th className="p-2 border">GEM Port</th>
            <th className="p-2 border">VLAN</th>
            <th className="p-2 border">ACS</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((s) => (
            <tr key={s.id} className="text-center border-b border-white/20">
              <td className="p-2 border">{s.id}</td>
              <td className="p-2 border">{s.name}</td>
              <td className="p-2 border">{s.device?.name}</td>
              <td className="p-2 border">{s.serviceprofile_id}</td>
              <td className="p-2 border">{s.lineprofile_id}</td>
              <td className="p-2 border">{s.gemport}</td>
              <td className="p-2 border">{s.vlan}</td>
              <td className="p-2 border">{s.acs ? "Yes" : "No"}</td>
              <td className="p-2 border flex justify-center gap-2">
                <button
                  onClick={() => handleEdit(s)}
                  className="bg-yellow-500 px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(s.id)}
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

export default Services;
