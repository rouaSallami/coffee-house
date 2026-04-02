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

export async function getAddons() {
  const data = await apiRequest("/addons");
  return Array.isArray(data) ? data : [];
}

export async function createAddon(payload) {
  return await apiRequest("/addons", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateAddon(id, payload) {
  return await apiRequest(`/addons/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deleteAddon(id) {
  return await apiRequest(`/addons/${id}`, {
    method: "DELETE",
  });
}

export async function toggleAddonAvailability(id) {
  return await apiRequest(`/addons/${id}/toggle-availability`, {
    method: "PATCH",
  });
}