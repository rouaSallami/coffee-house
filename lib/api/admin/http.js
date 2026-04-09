export async function apiGet(url) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`GET ${url} failed with status ${response.status}`);
  }

  return response.json();
}

export async function apiPost(url, body) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`POST ${url} failed with status ${response.status}`);
  }

  return response.json();
}

export async function apiPut(url, body) {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`PUT ${url} failed with status ${response.status}`);
  }

  return response.json();
}

export async function apiDelete(url) {
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`DELETE ${url} failed with status ${response.status}`);
  }

  return true;
}


function getAuthHeaders(isFormData = false) {
  if (typeof window === "undefined") {
    return isFormData
      ? { Accept: "application/json" }
      : {
          Accept: "application/json",
          "Content-Type": "application/json",
        };
  }

  const token = sessionStorage.getItem("token");

  return {
    Accept: "application/json",
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function handleResponse(response, label) {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message || `${label} failed with status ${response.status}`
    );
  }

  return data;
}

export async function apiGet(url) {
  const response = await fetch(url, {
    method: "GET",
    headers: getAuthHeaders(false),
    cache: "no-store",
  });

  return handleResponse(response, `GET ${url}`);
}

export async function apiPost(url, body, isFormData = false) {
  const response = await fetch(url, {
    method: "POST",
    headers: getAuthHeaders(isFormData),
    body: isFormData ? body : JSON.stringify(body),
  });

  return handleResponse(response, `POST ${url}`);
}

export async function apiPut(url, body, isFormData = false) {
  const response = await fetch(url, {
    method: "PUT",
    headers: getAuthHeaders(isFormData),
    body: isFormData ? body : JSON.stringify(body),
  });

  return handleResponse(response, `PUT ${url}`);
}

export async function apiPatch(url, body = null, isFormData = false) {
  const response = await fetch(url, {
    method: "PATCH",
    headers: getAuthHeaders(isFormData),
    ...(body ? { body: isFormData ? body : JSON.stringify(body) } : {}),
  });

  return handleResponse(response, `PATCH ${url}`);
}

export async function apiDelete(url) {
  const response = await fetch(url, {
    method: "DELETE",
    headers: getAuthHeaders(false),
  });

  await handleResponse(response, `DELETE ${url}`);
  return true;
}