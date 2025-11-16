import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getDevices,
  searchONUBySN,
  rebootONU,
  deleteONU,
} from "../api/devices";

import ConfirmModal from "../components/ConfirmModal";
import SearchONU from "../components/SearchONU";
import ONUInfoCard from "../components/ONUInfoCard";

const DevicePage = () => {
  const { id } = useParams();
  const [device, setDevice] = useState(null);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("SN");
  const [searchResult, setSearchResult] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);

  const [showRebootModal, setShowRebootModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchDevice = async () => {
      setLoading(true);
      try {
        const devices = await getDevices();
        const selected = devices.find((d) => d.id === Number(id));
        setDevice(selected);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchDevice();
  }, [id]);

  const handleAutofind = () => {
    alert("Autofind functionality triggered!");
  };

  const handleSearchONUClick = async () => {
    const trimmedTerm = searchTerm.trim();
    if (!trimmedTerm) return;

    setSearchLoading(true);
    setSearchResult(null);
    try {
      if (searchType === "SN") {
        const result = await searchONUBySN(id, trimmedTerm);
        setSearchResult(result);
      } else {
        alert("Search by Description not implemented yet.");
      }
    } catch (err) {
      console.error(err);
      alert("Error searching ONU");
    } finally {
      setSearchLoading(false);
    }
  };

  const handleConfirmReboot = async () => {
    setShowRebootModal(false);
    setActionLoading(true);
    try {
      const response = await rebootONU(id, searchResult.FSP, searchResult.ONTID);
      alert(response.message || "ONU rebooted successfully!");
    } catch (err) {
      console.error(err);
      alert("Error rebooting ONU");
    } finally {
      setActionLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    setShowDeleteModal(false);
    setActionLoading(true);
    try {
      await deleteONU(id, {
        FSP: searchResult.FSP,
        ONTID: searchResult.ONTID,
        SN: searchResult.SN,
        Description: searchResult.Description,
      });
      alert("ONU deleted successfully!");
      setSearchResult(null);
      setSearchTerm("");
    } catch (err) {
      console.error(err);
      alert("Error deleting ONU");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <p>Loading device...</p>;
  if (!device) return <p>Device not found.</p>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">{device.name}</h1>
      <p className="mb-6 text-gray-400">IP: {device.ip}</p>

      <div className="flex gap-4 mb-6 flex-wrap">
        <button
          onClick={handleAutofind}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
        >
          Autofind
        </button>
      </div>

      <SearchONU
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchType={searchType}
        setSearchType={setSearchType}
        handleSearchONU={handleSearchONUClick}
        searchLoading={searchLoading}
      />

      {searchResult && !searchLoading && (
        <ONUInfoCard
          searchResult={searchResult}
          actionLoading={actionLoading}
          handleRebootClick={() => setShowRebootModal(true)}
          handleDeleteClick={() => setShowDeleteModal(true)}
        />
      )}

      {showRebootModal && (
        <ConfirmModal
          message={`Are you sure you want to reboot ONU ${searchResult.SN}?`}
          onConfirm={handleConfirmReboot}
          onCancel={() => setShowRebootModal(false)}
          loading={actionLoading}
        />
      )}

      {showDeleteModal && (
        <ConfirmModal
          message={`Are you sure you want to delete ONU ${searchResult.SN}?`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDeleteModal(false)}
          loading={actionLoading}
        />
      )}
    </div>
  );
};

export default DevicePage;
