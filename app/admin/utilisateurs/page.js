"use client";

import { useEffect, useMemo, useState } from "react";

import UsersHeader from "@/components/admin/utilisateurs/UsersHeader";
import UsersToolbar from "@/components/admin/utilisateurs/UsersToolbar";
import UsersList from "@/components/admin/utilisateurs/UsersList";
import UserDetailsModal from "@/components/admin/utilisateurs/UserDetailsModal";
import UserFormModal from "@/components/admin/utilisateurs/UserFormModal";
import DeleteUserModal from "@/components/admin/utilisateurs/DeleteUserModal";

import {
  createEmptyUser,
  normalizeStoredUser,
} from "@/lib/admin/utilisateurs/helpers";
import {
  filterUsers,
  isUserFormValid,
  buildUserPayload,
  buildUpdatedUser,
} from "@/lib/admin/utilisateurs/usersUtils";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  toggleUserActive,
} from "@/lib/api/admin/users";

export default function AdminUtilisateursPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState(createEmptyUser());

  const [userToEdit, setUserToEdit] = useState(null);
  const [editUser, setEditUser] = useState(createEmptyUser());

  const [search, setSearch] = useState("");

  useEffect(() => {
  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(Array.isArray(data) ? data.map((user) => normalizeStoredUser(user)) : []);
    } catch (error) {
      console.error("Erreur chargement users:", error);
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  loadUsers();
}, []);

  const filteredUsers = useMemo(() => {
    return filterUsers(users, search);
  }, [users, search]);

  const handleAddUser = async () => {
  if (!isUserFormValid(newUser)) return;

  try {
    const payload = buildUserPayload(newUser);
    const createdUser = await createUser(payload);

    setUsers((prev) => [normalizeStoredUser(createdUser), ...prev]);
    setShowAddForm(false);
    setNewUser(createEmptyUser());
  } catch (error) {
    console.error("Erreur ajout user:", error);
  }
};

  const handleOpenEdit = (user) => {
    setUserToEdit(user);
    setEditUser({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
    });
  };

  const handleUpdateUser = async () => {
  if (!userToEdit || !isUserFormValid(editUser)) return;

  try {
    const payload = {
      name: editUser.name.trim(),
      email: editUser.email.trim(),
      phone: editUser.phone.trim(),
    };

    const updatedUserFromApi = await updateUser(userToEdit.id, payload);
    const normalizedUpdatedUser = normalizeStoredUser(updatedUserFromApi);

    const updatedUsers = users.map((user) =>
      user.id === userToEdit.id ? normalizedUpdatedUser : user
    );

    setUsers(updatedUsers);

    if (selectedUser && selectedUser.id === userToEdit.id) {
      setSelectedUser(normalizedUpdatedUser);
    }

    setUserToEdit(null);
    setEditUser(createEmptyUser());
  } catch (error) {
    console.error("Erreur modification user:", error);
  }
};

  const handleDeleteUser = async (userId) => {
  try {
    await deleteUser(userId);

    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);

    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser(null);
    }
  } catch (error) {
    console.error("Erreur suppression user:", error);
  } finally {
    setUserToDelete(null);
  }
};

  const handleToggleStatus = async (userId) => {
  try {
    const updatedUserFromApi = await toggleUserActive(userId);
    const normalizedUpdatedUser = normalizeStoredUser(updatedUserFromApi);

    const updatedUsers = users.map((user) =>
      user.id === userId ? normalizedUpdatedUser : user
    );

    setUsers(updatedUsers);

    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser(normalizedUpdatedUser);
    }
  } catch (error) {
    console.error("Erreur toggle status user:", error);
  }
};

  const handleCloseAddModal = () => {
    setShowAddForm(false);
    setNewUser(createEmptyUser());
  };

  const handleCloseEditModal = () => {
    setUserToEdit(null);
    setEditUser(createEmptyUser());
  };

  return (
    <>
      <div>
        <UsersHeader />

        <UsersToolbar
          search={search}
          setSearch={setSearch}
          onAddClick={() => setShowAddForm(true)}
          isLoading={isLoading}
        />

        <UsersList
          users={filteredUsers}
          isLoading={isLoading}
          onView={setSelectedUser}
          onEdit={handleOpenEdit}
          onDelete={setUserToDelete}
          onToggleStatus={handleToggleStatus}
        />
      </div>

      <UserDetailsModal
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />

      <DeleteUserModal
        user={userToDelete}
        onClose={() => setUserToDelete(null)}
        onConfirm={handleDeleteUser}
      />

      {showAddForm && (
        <UserFormModal
          title="Ajouter un utilisateur"
          user={newUser}
          setUser={setNewUser}
          onClose={handleCloseAddModal}
          onSubmit={handleAddUser}
          submitLabel="Ajouter"
        />
      )}

      {userToEdit && (
        <UserFormModal
          title="Modifier l'utilisateur"
          user={editUser}
          setUser={setEditUser}
          onClose={handleCloseEditModal}
          onSubmit={handleUpdateUser}
          submitLabel="Enregistrer"
        />
      )}
    </>
  );
}