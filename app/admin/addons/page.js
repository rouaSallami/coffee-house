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
import {
  getAddons,
  createAddon,
  updateAddon,
  deleteAddon,
  toggleAddonAvailability,
} from "@/lib/api/admin/addons";

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
    console.log("ADDONS BACKEND RAW:", data);

    const normalized = Array.isArray(data)
      ? data.map((addon) => normalizeAddon(addon))
      : [];

    console.log("ADDONS NORMALIZED:", normalized);

    setAddons(normalized);
  } catch (error) {
    console.error("LOAD ADDONS ERROR:", error);
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

  const handleDelete = async (id) => {
  try {
    await deleteAddon(id);
    setAddons((prev) => prev.filter((addon) => addon.id !== id));
  } catch (error) {
    console.error("Erreur suppression addon:", error);

    setAddons((prev) => prev.filter((addon) => addon.id !== id));
  } finally {
    setAddonToDelete(null);
  }
};

  const handleAddAddon = async () => {
  if (!isAddonFormValid(newAddon)) return;

  try {
    const payload = buildAddonPayload(newAddon);
    const createdAddon = await createAddon(payload);

    setAddons((prev) => [normalizeAddon(createdAddon), ...prev]);
    setShowAddForm(false);
    setNewAddon(createEmptyAddon());
  } catch (error) {
    console.error("Erreur ajout addon:", error);
  }
};

  const handleOpenEdit = (addon) => {
    setAddonToEdit(addon);
    setEditAddon({
      name: addon.name || "",
      price: addon.price ?? "",
      image: addon.image || "",
    });
  };

  const handleUpdateAddon = async () => {
  if (!addonToEdit || !isAddonFormValid(editAddon)) return;

  try {
    const payload = {
      name: editAddon.name.trim(),
      price: Number(editAddon.price) || 0,
      image: editAddon.image.trim(),
    };

    const updatedAddon = await updateAddon(addonToEdit.id, payload);

    setAddons((prev) =>
      prev.map((addon) =>
        addon.id === addonToEdit.id ? normalizeAddon(updatedAddon) : addon
      )
    );

    setAddonToEdit(null);
    setEditAddon(createEmptyAddon());
  } catch (error) {
    console.error("Erreur modification addon:", error);
  }
};

 const handleToggleAvailability = async (id) => {
  try {
    const updatedAddon = await toggleAddonAvailability(id);

    setAddons((prev) =>
      prev.map((addon) =>
        addon.id === id ? normalizeAddon(updatedAddon) : addon
      )
    );
  } catch (error) {
    console.error("Erreur toggle disponibilité:", error);
  }
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