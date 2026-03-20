"use client";

import { useEffect, useMemo, useState } from "react";

export default function AdminUtilisateursPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [userToEdit, setUserToEdit] = useState(null);
  const [editUser, setEditUser] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      const normalizedUser = {
        id: storedUser.id || Date.now(),
        name: storedUser.name || "Utilisateur",
        email: storedUser.email || "",
        phone: storedUser.phone || "",
        active: true,
        createdAt: storedUser.createdAt || new Date().toISOString(),
      };

      setUsers([normalizedUser]);
    } else {
      setUsers([]);
    }
  }, []);

  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();

    if (!q) return users;

    return users.filter((user) => {
      return (
        user.name?.toLowerCase().includes(q) ||
        user.email?.toLowerCase().includes(q) ||
        user.phone?.toLowerCase().includes(q)
      );
    });
  }, [users, search]);

  const handleAddUser = () => {
    if (
      !newUser.name.trim() ||
      !newUser.email.trim() ||
      !newUser.phone.trim()
    ) {
      return;
    }

    const userToAdd = {
      id: Date.now(),
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      active: true,
      createdAt: new Date().toISOString(),
    };

    setUsers([userToAdd, ...users]);
    setShowAddForm(false);
    setNewUser({
      name: "",
      email: "",
      phone: "",
    });
  };

  const handleOpenEdit = (user) => {
    setUserToEdit(user);
    setEditUser({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
    });
  };

  const handleUpdateUser = () => {
    if (
      !editUser.name.trim() ||
      !editUser.email.trim() ||
      !editUser.phone.trim()
    ) {
      return;
    }

    const updatedUsers = users.map((user) =>
      user.id === userToEdit.id
        ? {
            ...user,
            name: editUser.name,
            email: editUser.email,
            phone: editUser.phone,
          }
        : user
    );

    setUsers(updatedUsers);

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.email === userToEdit.email) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...storedUser,
          name: editUser.name,
          email: editUser.email,
          phone: editUser.phone,
        })
      );
      window.dispatchEvent(new Event("authChanged"));
    }

    setUserToEdit(null);
    setEditUser({
      name: "",
      email: "",
      phone: "",
    });
  };

  const handleDeleteUser = (userId) => {
    const targetUser = users.find((user) => user.id === userId);
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && targetUser && storedUser.email === targetUser.email) {
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
      window.dispatchEvent(new Event("authChanged"));
    }

    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser(null);
    }

    setUserToDelete(null);
  };

  const handleToggleStatus = (userId) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, active: !user.active } : user
    );
    setUsers(updatedUsers);

    if (selectedUser && selectedUser.id === userId) {
      const updatedSelected = updatedUsers.find((user) => user.id === userId);
      setSelectedUser(updatedSelected || null);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Date indisponible";

    return new Date(dateString).toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <div>
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
            Administration
          </p>

          <h1 className="mt-2 text-4xl font-bold text-dark">
            Gestion des utilisateurs
          </h1>

          <p className="mt-3 text-dark/80">
            Consultez, ajoutez, modifiez et gérez les utilisateurs.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <input
              type="text"
              placeholder="Rechercher par nom, email ou téléphone"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-dark/10 bg-base px-4 py-3 text-dark outline-none sm:max-w-md"
            />

            <button
              onClick={() => setShowAddForm(true)}
              className="rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-95"
            >
              Ajouter un utilisateur
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-dark/10 bg-base p-8 shadow-sm">
          {filteredUsers.length === 0 ? (
            <p className="text-dark/60">Aucun utilisateur trouvé.</p>
          ) : (
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="rounded-2xl border border-dark/10 bg-white/40 p-5 shadow-sm"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-lg font-bold text-dark">
                          {user.name}
                        </h2>

                        <button
                          type="button"
                          onClick={() => handleToggleStatus(user.id)}
                          className={`relative inline-flex h-9 w-24 items-center rounded-full px-2 text-xs font-semibold shadow-sm transition-all duration-300 ${
                            user.active
                              ? "bg-secondary/20 text-marron border border-secondary/30"
                              : "bg-dark/10 text-dark/70 border border-dark/10"
                          }`}
                        >
                          <span
                            className={`absolute h-7 w-7 rounded-full bg-white shadow-md transition-all duration-300 ${
                              user.active ? "right-1" : "left-1"
                            }`}
                          />
                          <span className="w-full text-center">
                            {user.active ? "Actif" : "Inactif"}
                          </span>
                        </button>
                      </div>

                      <div className="mt-3 space-y-1 text-sm text-dark/70">
                        <p>Email : {user.email}</p>
                        <p>Téléphone : {user.phone}</p>
                        <p>Créé le : {formatDate(user.createdAt)}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="rounded-xl border border-dark/10 bg-base px-4 py-2 text-sm font-semibold text-dark transition hover:bg-white"
                      >
                        Voir détails
                      </button>

                      <button
                        onClick={() => handleOpenEdit(user)}
                        className="rounded-xl border border-dark/10 bg-base px-4 py-2 text-sm font-semibold text-dark transition hover:bg-white"
                      >
                        Modifier
                      </button>

                      <button
                        onClick={() => setUserToDelete(user)}
                        className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-3xl border border-dark/10 bg-base p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-dark">
                  Détails utilisateur
                </h2>
                <p className="mt-2 text-dark/70">{selectedUser.name}</p>
              </div>

              <button
                onClick={() => setSelectedUser(null)}
                className="rounded-xl border border-dark/10 bg-white px-4 py-2 text-sm font-semibold text-dark transition hover:bg-base"
              >
                Fermer
              </button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-dark/10 bg-white/40 p-4">
                <p className="text-sm text-dark/60">Nom</p>
                <p className="mt-1 font-bold text-dark">
                  {selectedUser.name}
                </p>
              </div>

              <div className="rounded-2xl border border-dark/10 bg-white/40 p-4">
                <p className="text-sm text-dark/60">Statut</p>
                <p className="mt-1 font-bold text-primary">
                  {selectedUser.active ? "Actif" : "Inactif"}
                </p>
              </div>

              <div className="rounded-2xl border border-dark/10 bg-white/40 p-4">
                <p className="text-sm text-dark/60">Email</p>
                <p className="mt-1 font-bold text-dark break-all">
                  {selectedUser.email}
                </p>
              </div>

              <div className="rounded-2xl border border-dark/10 bg-white/40 p-4">
                <p className="text-sm text-dark/60">Téléphone</p>
                <p className="mt-1 font-bold text-dark">
                  {selectedUser.phone}
                </p>
              </div>

              <div className="rounded-2xl border border-dark/10 bg-white/40 p-4 md:col-span-2">
                <p className="text-sm text-dark/60">Date de création</p>
                <p className="mt-1 font-bold text-dark">
                  {formatDate(selectedUser.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-dark/10 bg-base p-6 shadow-xl">
            <h2 className="text-xl font-bold text-dark">
              Confirmer la suppression
            </h2>

            <p className="mt-3 text-dark/75 leading-7">
              Êtes-vous sûr de vouloir supprimer{" "}
              <span className="font-semibold text-primary">
                {userToDelete.name}
              </span>{" "}
              ?
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setUserToDelete(null)}
                className="flex-1 rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm font-semibold text-dark transition hover:bg-base"
              >
                Annuler
              </button>

              <button
                onClick={() => handleDeleteUser(userToDelete.id)}
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
              Ajouter un utilisateur
            </h2>

            <div className="mt-5 space-y-4">
              <input
                type="text"
                placeholder="Nom"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-dark outline-none"
              />

              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-dark outline-none"
              />

              <input
                type="text"
                placeholder="Téléphone"
                value={newUser.phone}
                onChange={(e) =>
                  setNewUser({ ...newUser, phone: e.target.value })
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
                onClick={handleAddUser}
                className="flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}

      {userToEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-dark/10 bg-base p-6 shadow-xl">
            <h2 className="text-xl font-bold text-dark">
              Modifier l'utilisateur
            </h2>

            <div className="mt-5 space-y-4">
              <input
                type="text"
                placeholder="Nom"
                value={editUser.name}
                onChange={(e) =>
                  setEditUser({ ...editUser, name: e.target.value })
                }
                className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-dark outline-none"
              />

              <input
                type="email"
                placeholder="Email"
                value={editUser.email}
                onChange={(e) =>
                  setEditUser({ ...editUser, email: e.target.value })
                }
                className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-dark outline-none"
              />

              <input
                type="text"
                placeholder="Téléphone"
                value={editUser.phone}
                onChange={(e) =>
                  setEditUser({ ...editUser, phone: e.target.value })
                }
                className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-dark outline-none"
              />
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setUserToEdit(null)}
                className="flex-1 rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm font-semibold text-dark transition hover:bg-base"
              >
                Annuler
              </button>

              <button
                onClick={handleUpdateUser}
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