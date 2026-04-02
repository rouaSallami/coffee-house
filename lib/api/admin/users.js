async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`/backend${endpoint}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Erreur API");
  }

  return data;
}

export async function getUsers() {
  const data = await apiRequest("/users", {
    method: "GET",
  });

  return Array.isArray(data) ? data : [];
}

export async function createUser(payload) {
  return await apiRequest("/users", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateUser(id, payload) {
  return await apiRequest(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteUser(id) {
  return await apiRequest(`/users/${id}`, {
    method: "DELETE",
  });
}


export async function toggleUserActive(id) {
  return await apiRequest(`/users/${id}/toggle-active`, {
    method: "PATCH",
  });
}