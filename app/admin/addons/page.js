"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

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

const toastStyles = {
  style: {
    background: "#1f2937",
    color: "#fff",
    borderRadius: "14px",
    padding: "14px 16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
    fontSize: "14px",
    fontWeight: 600,
  },
};

function ConfirmDeleteToast({ addonName, onConfirm, onCancel }) {
  return (
    <div className="flex min-w-[280px] max-w-sm flex-col gap-3">
      <div>
        <p className="text-sm font-semibold text-white">
          Supprimer cet addon ?
        </p>
        <p className="mt-1 text-xs text-white/70">
          {addonName ? `"${addonName}" sera supprimé définitivement.` : "Cette action est irréversible."}
        </p>
      </div>

      <div className="flex items-center justify-end gap-2">
        <button
          onClick={onCancel}
          className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/85 transition hover:bg-white/10"
        >
          Annuler
        </button>

        <button
          onClick={onConfirm}
          className="rounded-full bg-red-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-600"
        >
          Oui, supprimer
        </button>
      </div>
    </div>
  );
}

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

  const loadAddons = async () => {
    try {
      setIsLoading(true);
      const data = await getAddons();
      const normalized = Array.isArray(data)
        ? data.map((addon) => normalizeAddon(addon))
        : [];

      setAddons(normalized);
    } catch (error) {
      console.error(error);
      setAddons([]);
      toast.error("Impossible de charger les addons ❌", toastStyles);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAddons();
  }, []);

  const filteredAddons = useMemo(() => {
    return filterAddons(addons, searchTerm, selectedStatus);
  }, [addons, searchTerm, selectedStatus]);

  const handleDelete = async (id) => {
  try {
    const loadingToast = toast.loading("Suppression...");

    await deleteAddon(id);

    setAddons((prev) => prev.filter((addon) => addon.id !== id));
    setAddonToDelete(null);

    toast.success("Supprimé avec succès 🗑️", {
      id: loadingToast,
    });
  } catch (error) {
    console.error(error);
    toast.error("Erreur lors de la suppression ❌");
  }
};

  const handleAddAddon = async () => {
    if (!isAddonFormValid(newAddon)) {
      toast.error("Remplissez les champs !", {
        ...toastStyles,
        icon: "⚠️",
      });
      return;
    }

    const loadingToast = toast.loading("Ajout en cours...", {
      ...toastStyles,
      icon: "✨",
    });

    try {
      const payload = buildAddonPayload(newAddon);
      const created = await createAddon(payload);

      setAddons((prev) => [normalizeAddon(created), ...prev]);
      setShowAddForm(false);
      setNewAddon(createEmptyAddon());

      toast.success("Addon ajouté avec succès 🎉", {
        id: loadingToast,
        ...toastStyles,
        icon: "☕",
      });
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de l'ajout ❌", {
        id: loadingToast,
        ...toastStyles,
      });
    }
  };

  const handleOpenEdit = (addon) => {
    setAddonToEdit(addon);
    setEditAddon({
      id: addon.id,
      name: addon.name || "",
      price: addon.price ?? "",
      image: addon.image || "",
      imageFile: null,
      available: addon.available,
    });
  };

  const handleUpdateAddon = async () => {
    if (!addonToEdit || !isAddonFormValid(editAddon)) {
      toast.error("Champs invalides ❌", {
        ...toastStyles,
        icon: "⚠️",
      });
      return;
    }

    const loadingToast = toast.loading("Modification en cours...", {
      ...toastStyles,
      icon: "✏️",
    });

    try {
      const payload = buildUpdatedAddon(editAddon);
      const updated = await updateAddon(addonToEdit.id, payload);

      setAddons((prev) =>
        prev.map((addon) =>
          addon.id === addonToEdit.id ? normalizeAddon(updated) : addon
        )
      );

      setAddonToEdit(null);
      setEditAddon(createEmptyAddon());

      toast.success("Addon modifié ✏️", {
        id: loadingToast,
        ...toastStyles,
        icon: "✅",
      });
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la modification ❌", {
        id: loadingToast,
        ...toastStyles,
      });
    }
  };

  const handleToggleAvailability = async (id) => {
    try {
      const updated = await toggleAddonAvailability(id);

      setAddons((prev) =>
        prev.map((addon) =>
          addon.id === id ? normalizeAddon(updated) : addon
        )
      );
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors du changement de statut ❌", toastStyles);
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