const API_BASE = "http://127.0.0.1:8000/api/admin/cafes";

async function handleResponse(response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Erreur serveur");
  }

  return data;
}

export async function getCafes() {
  const response = await fetch(API_BASE, {
    method: "GET",
    cache: "no-store",
  });

  return handleResponse(response);
}

export async function getCafeById(id) {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "GET",
    cache: "no-store",
  });

  return handleResponse(response);
}

export async function createCafe(payload) {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
}

export async function updateCafe(id, payload) {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
}

export async function deleteCafe(id) {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
    },
  });

  return handleResponse(response);
}

export async function toggleCafeAvailability(id) {
  const response = await fetch(`${API_BASE}/${id}/toggle-availability`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
    },
  });

  return handleResponse(response);
}

export async function toggleCafeNew(id) {
  const response = await fetch(`${API_BASE}/${id}/toggle-new`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
    },
  });

  return handleResponse(response);
}