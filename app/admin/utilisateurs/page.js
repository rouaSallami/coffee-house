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
  getUsersFromStorage,
  saveCurrentUserToStorage,
  removeCurrentUserFromStorage,
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
        const storedUsers = await getUsersFromStorage();

        if (storedUsers.length > 0) {
          setUsers(storedUsers.map((user) => normalizeStoredUser(user)));
        } else {
          setUsers([]);
        }
      } catch {
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

  const handleAddUser = () => {
    if (!isUserFormValid(newUser)) return;

    const userToAdd = buildUserPayload(newUser);
    setUsers([userToAdd, ...users]);
    setShowAddForm(false);
    setNewUser(createEmptyUser());
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

    const updatedUsers = users.map((user) =>
      user.id === userToEdit.id
        ? buildUpdatedUser(user, editUser)
        : user
    );

    setUsers(updatedUsers);

    try {
      const storedUsers = await getUsersFromStorage();
      const storedUser = storedUsers[0];

      if (storedUser && storedUser.email === userToEdit.email) {
        await saveCurrentUserToStorage({
          ...storedUser,
          name: editUser.name.trim(),
          email: editUser.email.trim(),
          phone: editUser.phone.trim(),
        });
      }
    } catch {}

    if (selectedUser && selectedUser.id === userToEdit.id) {
      const updatedSelected = updatedUsers.find(
        (user) => user.id === userToEdit.id
      );
      setSelectedUser(updatedSelected || null);
    }

    setUserToEdit(null);
    setEditUser(createEmptyUser());
  };

  const handleDeleteUser = async (userId) => {
    const targetUser = users.find((user) => user.id === userId);
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);

    try {
      const storedUsers = await getUsersFromStorage();
      const storedUser = storedUsers[0];

      if (storedUser && targetUser && storedUser.email === targetUser.email) {
        await removeCurrentUserFromStorage();
      }
    } catch {}

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