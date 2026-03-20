"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    fetch("/api/addons")
      .then((res) => res.json())
      .then((data) => {
        const normalized = data.map((addon) => ({
          ...addon,
          available:
            typeof addon.available === "boolean" ? addon.available : true,
        }));

        setAddons(normalized);
      })
      .catch(() => {
        setAddons([]);
      });
  }, []);

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
      name: newAddon.name,
      price: Number(newAddon.price),
      image: newAddon.image || "/images/cookie-maison1.jpg",
      available: true,
    };

    setAddons([addonToAdd, ...addons]);
    setShowAddForm(false);
    setNewAddon({
      name: "",
      price: "",
      image: "",
    });
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
            name: editAddon.name,
            price: Number(editAddon.price),
            image: editAddon.image || addon.image,
          }
        : addon
    );

    setAddons(updatedAddons);
    setAddonToEdit(null);
    setEditAddon({
      name: "",
      price: "",
      image: "",
    });
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
      <div>
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
            Administration
          </p>

          <h1 className="mt-2 text-4xl font-bold text-dark">
            Gestion des addons
          </h1>

          <p className="mt-3 text-dark/80">
            Gérez la liste des suppléments disponibles dans votre boutique.
          </p>

          <div className="mt-5">
            <button
              onClick={() => setShowAddForm(true)}
              className="rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-95"
            >
              Ajouter un addon
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-dark/10 bg-base p-8 shadow-sm">
          {addons.length === 0 ? (
            <p className="text-dark/60">Aucun addon disponible.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {addons.map((addon) => (
                <div
                  key={addon.id}
                  className="rounded-2xl border border-dark/10 bg-white/40 p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-bold text-dark">
                        {addon.name}
                      </h2>
                      <p className="mt-1 text-sm text-dark/60">
                        Supplément café
                      </p>
                    </div>

                    <button
  type="button"
  onClick={() => handleToggleAvailability(addon.id)}
  className={`relative inline-flex h-8 w-24 items-center rounded-full px-2 text-xs font-semibold transition ${
    addon.available
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700"
  }`}
>
  <span
    className={`absolute h-6 w-6 rounded-full bg-white shadow-sm transition ${
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
                    {addon.image}
                  </p>

                  <div className="mt-5 flex gap-3">
                    <button
                      onClick={() => handleOpenEdit(addon)}
                      className="flex-1 rounded-xl border border-dark/10 bg-base px-4 py-2 text-sm font-semibold text-dark transition hover:bg-white"
                    >
                      Modifier
                    </button>

                    <button
                      onClick={() => setAddonToDelete(addon)}
                      className="flex-1 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-dark/10 bg-base p-6 shadow-xl">
            <h2 className="text-xl font-bold text-dark">
              Confirmer la suppression
            </h2>

            <p className="mt-3 text-dark/75 leading-7">
              Êtes-vous sûr de vouloir supprimer{" "}
              <span className="font-semibold text-primary">
                {addonToDelete.name}
              </span>{" "}
              ?
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setAddonToDelete(null)}
                className="flex-1 rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm font-semibold text-dark transition hover:bg-base"
              >
                Annuler
              </button>

              <button
                onClick={() => {
                  handleDelete(addonToDelete.id);
                  setAddonToDelete(null);
                }}
                className="flex-1 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
              >
                Oui, supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-dark/10 bg-base p-6 shadow-xl">
            <h2 className="text-xl font-bold text-dark">
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
                className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-dark outline-none"
              />

              <input
                type="number"
                placeholder="Prix"
                value={newAddon.price}
                onChange={(e) =>
                  setNewAddon({ ...newAddon, price: e.target.value })
                }
                className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-dark outline-none"
              />

              <input
                type="text"
                placeholder="Image URL"
                value={newAddon.image}
                onChange={(e) =>
                  setNewAddon({ ...newAddon, image: e.target.value })
                }
                className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-dark outline-none"
              />
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm font-semibold text-dark transition hover:bg-base"
              >
                Annuler
              </button>

              <button
                onClick={handleAddAddon}
                className="flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}

      {addonToEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-dark/10 bg-base p-6 shadow-xl">
            <h2 className="text-xl font-bold text-dark">
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
                className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-dark outline-none"
              />

              <input
                type="number"
                placeholder="Prix"
                value={editAddon.price}
                onChange={(e) =>
                  setEditAddon({ ...editAddon, price: e.target.value })
                }
                className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-dark outline-none"
              />

              <input
                type="text"
                placeholder="Image URL"
                value={editAddon.image}
                onChange={(e) =>
                  setEditAddon({ ...editAddon, image: e.target.value })
                }
                className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-dark outline-none"
              />
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setAddonToEdit(null)}
                className="flex-1 rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm font-semibold text-dark transition hover:bg-base"
              >
                Annuler
              </button>

              <button
                onClick={handleUpdateAddon}
                className="flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95"
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