"use client";

import { useEffect, useMemo, useState } from "react";

import AddonsHeader from "@/components/admin/addons/AddonsHeader";
import AddonsFilters from "@/components/admin/addons/AddonsFilters";
import AddonsGrid from "@/components/admin/addons/AddonsGrid";
import AddonFormModal from "@/components/admin/addons/AddonFormModal";
import DeleteAddonModal from "@/components/admin/addons/DeleteAddonModal";

import { createEmptyAddon, normalizeAddon } from "@/lib/admin/addons/helpers";
import {
  filterAddons,
  isAddonFormValid,
  buildAddonPayload,
  buildUpdatedAddon,
} from "@/lib/admin/addons/addonsUtils";
import { getAddons } from "@/lib/api/admin/addons";

export default function AdminAddonsPage() {
  const [addons, setAddons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [addonToDelete, setAddonToDelete] = useState(null);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddon, setNewAddon] = useState(createEmptyAddon());

  const [addonToEdit, setAddonToEdit] = useState(null);
  const [editAddon, setEditAddon] = useState(createEmptyAddon());

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Tous");

  useEffect(() => {
    const loadAddons = async () => {
      try {
        const data = await getAddons();
        const normalized = Array.isArray(data)
          ? data.map((addon) => normalizeAddon(addon))
          : [];

        setAddons(normalized);
      } catch {
        setAddons([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadAddons();
  }, []);

  const filteredAddons = useMemo(() => {
    return filterAddons(addons, searchTerm, selectedStatus);
  }, [addons, searchTerm, selectedStatus]);

  const handleDelete = (id) => {
    const updated = addons.filter((addon) => addon.id !== id);
    setAddons(updated);
    setAddonToDelete(null);
  };

  const handleAddAddon = () => {
    if (!isAddonFormValid(newAddon)) return;

    const addonToAdd = buildAddonPayload(newAddon);
    setAddons((prev) => [addonToAdd, ...prev]);
    setShowAddForm(false);
    setNewAddon(createEmptyAddon());
  };

  const handleOpenEdit = (addon) => {
    setAddonToEdit(addon);
    setEditAddon({
      name: addon.name || "",
      price: addon.price ?? "",
      image: addon.image || "",
    });
  };

  const handleUpdateAddon = () => {
    if (!addonToEdit || !isAddonFormValid(editAddon)) return;

    const updatedAddons = addons.map((addon) =>
      addon.id === addonToEdit.id
        ? buildUpdatedAddon(addon, editAddon)
        : addon
    );

    setAddons(updatedAddons);
    setAddonToEdit(null);
    setEditAddon(createEmptyAddon());
  };

  const handleToggleAvailability = (id) => {
    const updatedAddons = addons.map((addon) =>
      addon.id === id
        ? { ...addon, available: !addon.available }
        : addon
    );

    setAddons(updatedAddons);
  };

  const handleCloseAddModal = () => {
    setShowAddForm(false);
    setNewAddon(createEmptyAddon());
  };

  const handleCloseEditModal = () => {
    setAddonToEdit(null);
    setEditAddon(createEmptyAddon());
  };

  return (
    <>
      <div className="w-full min-w-0 max-w-full overflow-x-hidden px-3 sm:px-5 lg:px-8">
        <AddonsHeader />

        <AddonsFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          onAddClick={() => setShowAddForm(true)}
          isLoading={isLoading}
        />

        <AddonsGrid
          addons={filteredAddons}
          isLoading={isLoading}
          onEdit={handleOpenEdit}
          onDelete={setAddonToDelete}
          onToggleAvailability={handleToggleAvailability}
        />
      </div>

      <DeleteAddonModal
        addon={addonToDelete}
        onClose={() => setAddonToDelete(null)}
        onConfirm={handleDelete}
      />

      {showAddForm && (
        <AddonFormModal
          title="Ajouter un addon"
          addon={newAddon}
          setAddon={setNewAddon}
          onClose={handleCloseAddModal}
          onSubmit={handleAddAddon}
          submitLabel="Ajouter"
        />
      )}

      {addonToEdit && (
        <AddonFormModal
          title="Modifier l'addon"
          addon={editAddon}
          setAddon={setEditAddon}
          onClose={handleCloseEditModal}
          onSubmit={handleUpdateAddon}
          submitLabel="Enregistrer"
        />
      )}
    </>
  );
}