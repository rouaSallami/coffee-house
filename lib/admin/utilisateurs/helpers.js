export function createEmptyUser() {
  return {
    name: "",
    email: "",
    phone: "",
  };
}

export function normalizeStoredUser(storedUser) {
  return {
    id: storedUser.id || Date.now(),
    name: storedUser.name || "Utilisateur",
    email: storedUser.email || "",
    phone: storedUser.phone || "",
    active: true,
    createdAt: storedUser.createdAt || new Date().toISOString(),
  };
}

export function formatUserDate(dateString) {
  if (!dateString) return "Date indisponible";

  return new Date(dateString).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}