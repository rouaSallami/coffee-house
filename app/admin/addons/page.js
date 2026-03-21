"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";

export default function AdminAddonsPage() {
  const [addons, setAddons] = useState([]);
  const [addonToDelete, setAddonToDelete] = useState(null);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddon, setNewAddon] = useState({
    name: "",
    price: "",
    image: "",
  });

  const [addonToEdit, setAddonToEdit] = useState(null);
  const [editAddon, setEditAddon] = useState({
    name: "",
    price: "",
    image: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Tous");

  useEffect(() => {
    fetch("/api/addons")
      .then((res) => res.json())
      .then((data) => {
        const normalized = Array.isArray(data)
          ? data.map((addon) => ({
              ...addon,
              id: addon.id ?? Date.now().toString() + Math.random(),
              name: addon.name || "",
              price: addon.price ?? 0,
              image: addon.image || "",
              available:
                typeof addon.available === "boolean" ? addon.available : true,
            }))
          : [];

        setAddons(normalized);
      })
      .catch(() => {
        setAddons([]);
      });
  }, []);

  const resetNewAddon = () => {
    setNewAddon({
      name: "",
      price: "",
      image: "",
    });
  };

  const resetEditAddon = () => {
    setEditAddon({
      name: "",
      price: "",
      image: "",
    });
  };

  const filteredAddons = useMemo(() => {
    return addons.filter((addon) => {
      const term = searchTerm.toLowerCase();

      const matchesSearch =
        String(addon.name || "").toLowerCase().includes(term) ||
        String(addon.image || "").toLowerCase().includes(term) ||
        String(addon.price ?? "").toLowerCase().includes(term);

      const matchesStatus =
        selectedStatus === "Tous" ||
        (selectedStatus === "Disponibles" && addon.available) ||
        (selectedStatus === "Indisponibles" && !addon.available);

      return matchesSearch && matchesStatus;
    });
  }, [addons, searchTerm, selectedStatus]);

  const handleDelete = (id) => {
    const updated = addons.filter((addon) => addon.id !== id);
    setAddons(updated);
  };

  const handleAddAddon = () => {
    if (!newAddon.name.trim() || !String(newAddon.price).trim()) {
      return;
    }

    const addonToAdd = {
      id: Date.now().toString(),
      name: newAddon.name.trim(),
      price: Number(newAddon.price) || 0,
      image: newAddon.image.trim() || "/images/cookie-maison1.jpg",
      available: true,
    };

    setAddons((prev) => [addonToAdd, ...prev]);
    setShowAddForm(false);
    resetNewAddon();
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
    if (!editAddon.name.trim() || !String(editAddon.price).trim()) {
      return;
    }

    const updatedAddons = addons.map((addon) =>
      addon.id === addonToEdit.id
        ? {
            ...addon,
            name: editAddon.name.trim(),
            price: Number(editAddon.price) || 0,
            image: editAddon.image.trim() || addon.image,
          }
        : addon
    );

    setAddons(updatedAddons);
    setAddonToEdit(null);
    resetEditAddon();
  };

  const handleToggleAvailability = (id) => {
    const updatedAddons = addons.map((addon) =>
      addon.id === id
        ? { ...addon, available: !addon.available }
        : addon
    );

    setAddons(updatedAddons);
  };

  return (
    <>
      <div className="w-full min-w-0 max-w-full overflow-x-hidden px-3 sm:px-5 lg:px-8">
        <div className="mb-6 w-full min-w-0 sm:mb-8">
          <p className="break-words text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary sm:text-sm">
            Administration
          </p>

          <h1 className="mt-2 break-words text-2xl font-bold text-dark sm:text-3xl lg:text-4xl">
            Gestion des addons
          </h1>

          <p className="mt-3 break-words text-sm text-dark/80">
            Gérez la liste des suppléments disponibles dans votre boutique.
          </p>
        </div>

        <div className="mb-5 rounded-2xl border border-dark/10 bg-base p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:flex xl:flex-1 xl:items-center">
              <div className="relative w-full xl:max-w-sm">
                <Search
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-dark/40"
                />
                <input
                  type="text"
                  placeholder="Rechercher un addon..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-dark/10 bg-white py-3 pl-11 pr-4 text-sm text-dark outline-none"
                />
              </div>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none xl:max-w-[220px]"
              >
                <option value="Tous">Tous les statuts</option>
                <option value="Disponibles">Disponibles</option>
                <option value="Indisponibles">Indisponibles</option>
              </select>
            </div>

            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95 sm:w-auto"
            >
              <Plus size={18} />
              Ajouter un addon
            </button>
          </div>
        </div>

        <div className="w-full max-w-full overflow-hidden rounded-2xl border border-dark/10 bg-base p-3 shadow-sm sm:rounded-3xl sm:p-5 lg:p-8">
          {filteredAddons.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-dark/10 bg-white/30 px-4 py-10 text-center">
              <p className="text-sm font-medium text-dark/70">
                Aucun addon ne correspond aux filtres sélectionnés.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredAddons.map((addon) => (
                <div
                  key={addon.id}
                  className="w-full min-w-0 rounded-2xl border border-dark/10 bg-white/40 p-4 shadow-sm sm:p-5"
                >
                  <div className="flex flex-col gap-3">
                    <div className="min-w-0">
                      <h2 className="break-words text-base font-bold text-dark sm:text-lg">
                        {addon.name}
                      </h2>
                      <p className="mt-1 break-words text-sm text-dark/60">
                        Supplément café
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleAvailability(addon.id)}
                      className={`relative inline-flex h-8 w-full items-center rounded-full px-2 text-[11px] font-semibold transition sm:text-xs ${
                        addon.available
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      <span
                        className={`absolute top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-white shadow-sm transition ${
                          addon.available ? "right-1" : "left-1"
                        }`}
                      />
                      <span className="w-full text-center">
                        {addon.available ? "Disponible" : "Indisponible"}
                      </span>
                    </button>
                  </div>

                  <div className="mt-4 rounded-2xl border border-dark/10 bg-base p-4">
                    <p className="text-sm text-dark/60">Prix</p>
                    <p className="mt-1 text-lg font-bold text-primary">
                      {Number(addon.price).toFixed(2)} DT
                    </p>
                  </div>

                  <p className="mt-4 break-all text-sm text-dark/70">
                    {addon.image || "Aucune image"}
                  </p>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <button
                      onClick={() => handleOpenEdit(addon)}
                      className="w-full rounded-xl border border-dark/10 bg-base px-4 py-2 text-sm font-semibold text-dark transition hover:bg-white"
                    >
                      Modifier
                    </button>

                    <button
                      onClick={() => setAddonToDelete(addon)}
                      className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {addonToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 backdrop-blur-sm sm:p-4">
          <div className="w-full max-w-md rounded-2xl border border-dark/10 bg-base p-4 shadow-xl sm:rounded-3xl sm:p-6">
            <h2 className="text-lg font-bold text-dark sm:text-xl">
              Confirmer la suppression
            </h2>

            <p className="mt-3 break-words text-sm leading-7 text-dark/75">
              Êtes-vous sûr de vouloir supprimer{" "}
              <span className="font-semibold text-primary">
                {addonToDelete.name}
              </span>{" "}
              ?
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => setAddonToDelete(null)}
                className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm font-semibold text-dark transition hover:bg-base"
              >
                Annuler
              </button>

              <button
                onClick={() => {
                  handleDelete(addonToDelete.id);
                  setAddonToDelete(null);
                }}
                className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
              >
                Oui, supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 backdrop-blur-sm sm:p-4">
          <div className="w-full max-w-lg rounded-2xl border border-dark/10 bg-base p-4 shadow-xl sm:rounded-3xl sm:p-6">
            <h2 className="text-lg font-bold text-dark sm:text-xl">
              Ajouter un addon
            </h2>

            <div className="mt-5 space-y-4">
              <input
                type="text"
                placeholder="Nom de l'addon"
                value={newAddon.name}
                onChange={(e) =>
                  setNewAddon({ ...newAddon, name: e.target.value })
                }
                className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none"
              />

              <input
                type="number"
                placeholder="Prix"
                value={newAddon.price}
                onChange={(e) =>
                  setNewAddon({ ...newAddon, price: e.target.value })
                }
                className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none"
              />

              <input
                type="text"
                placeholder="Image URL"
                value={newAddon.image}
                onChange={(e) =>
                  setNewAddon({ ...newAddon, image: e.target.value })
                }
                className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none"
              />
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => {
                  setShowAddForm(false);
                  resetNewAddon();
                }}
                className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm font-semibold text-dark transition hover:bg-base"
              >
                Annuler
              </button>

              <button
                onClick={handleAddAddon}
                className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}

      {addonToEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 backdrop-blur-sm sm:p-4">
          <div className="w-full max-w-lg rounded-2xl border border-dark/10 bg-base p-4 shadow-xl sm:rounded-3xl sm:p-6">
            <h2 className="text-lg font-bold text-dark sm:text-xl">
              Modifier l'addon
            </h2>

            <div className="mt-5 space-y-4">
              <input
                type="text"
                placeholder="Nom de l'addon"
                value={editAddon.name}
                onChange={(e) =>
                  setEditAddon({ ...editAddon, name: e.target.value })
                }
                className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none"
              />

              <input
                type="number"
                placeholder="Prix"
                value={editAddon.price}
                onChange={(e) =>
                  setEditAddon({ ...editAddon, price: e.target.value })
                }
                className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none"
              />

              <input
                type="text"
                placeholder="Image URL"
                value={editAddon.image}
                onChange={(e) =>
                  setEditAddon({ ...editAddon, image: e.target.value })
                }
                className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none"
              />
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => {
                  setAddonToEdit(null);
                  resetEditAddon();
                }}
                className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm font-semibold text-dark transition hover:bg-base"
              >
                Annuler
              </button>

              <button
                onClick={handleUpdateAddon}
                className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}