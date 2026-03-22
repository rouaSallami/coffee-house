export function filterUsers(users, search) {
  const q = search.trim().toLowerCase();

  if (!q) return users;

  return users.filter((user) => {
    return (
      user.name?.toLowerCase().includes(q) ||
      user.email?.toLowerCase().includes(q) ||
      user.phone?.toLowerCase().includes(q)
    );
  });
}

export function isUserFormValid(user) {
  return (
    user.name.trim() &&
    user.email.trim() &&
    user.phone.trim()
  );
}

export function buildUserPayload(user) {
  return {
    id: Date.now(),
    name: user.name.trim(),
    email: user.email.trim(),
    phone: user.phone.trim(),
    active: true,
    createdAt: new Date().toISOString(),
  };
}

export function buildUpdatedUser(oldUser, editedUser) {
  return {
    ...oldUser,
    name: editedUser.name.trim(),
    email: editedUser.email.trim(),
    phone: editedUser.phone.trim(),
  };
}