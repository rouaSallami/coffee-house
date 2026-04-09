function getAuthHeaders(isFormData = false) {
  const token = sessionStorage.getItem("token");

  return {
    Accept: "application/json",
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// 🔥 ADMIN requests
async function apiRequest(endpoint, options = {}, isFormData = false) {
  const response = await fetch(`/backend/admin${endpoint}`, {
    headers: {
      ...getAuthHeaders(isFormData),
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

// ✅ PUBLIC
export async function getAddons() {
  const res = await fetch("/backend/addons", {
    headers: {
      Accept: "application/json",
    },
  });

  const data = await res.json().catch(() => []);

  return Array.isArray(data) ? data : [];
}

// ✅ ADMIN
export async function createAddon(payload) {
  return await apiRequest(
    "/addons",
    {
      method: "POST",
      body: payload,
    },
    true
  );
}

export async function updateAddon(id, payload) {
  return await apiRequest(
    `/addons/${id}`,
    {
      method: "POST",
      body: payload,
    },
    true
  );
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