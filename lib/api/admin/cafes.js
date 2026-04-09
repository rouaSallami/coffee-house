const API_BASE = "/backend/admin/cafes";

async function handleResponse(response) {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Erreur serveur");
  }

  return data;
}

function getAuthHeaders(isFormData = false) {
  const token = sessionStorage.getItem("token");

  return {
    Accept: "application/json",
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function getCafes() {
  const response = await fetch(API_BASE, {
    method: "GET",
    headers: getAuthHeaders(),
    cache: "no-store",
  });

  return handleResponse(response);
}

export async function getCafeById(id) {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "GET",
    headers: getAuthHeaders(),
    cache: "no-store",
  });

  return handleResponse(response);
}

export async function createCafe(payload) {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: getAuthHeaders(true),
    body: payload,
  });

  return handleResponse(response);
}

export async function updateCafe(id, payload) {
  const isFormData = payload instanceof FormData;

  let body = payload;

  if (isFormData) {
    if (!payload.has("_method")) {
      payload.append("_method", "PUT");
    }
  } else {
    body = JSON.stringify(payload);
  }

  const response = await fetch(`${API_BASE}/${id}`, {
    method: isFormData ? "POST" : "PUT",
    headers: getAuthHeaders(isFormData),
    body,
  });

  return handleResponse(response);
}

export async function toggleCafeAvailability(id) {
  const response = await fetch(`${API_BASE}/${id}/toggle-availability`, {
    method: "PATCH",
    headers: getAuthHeaders(),
  });

  return handleResponse(response);
}

export async function toggleCafeNew(id) {
  const response = await fetch(`${API_BASE}/${id}/toggle-new`, {
    method: "PATCH",
    headers: getAuthHeaders(),
  });

  return handleResponse(response);
}


export async function deleteCafe(id) {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  return handleResponse(response);
}