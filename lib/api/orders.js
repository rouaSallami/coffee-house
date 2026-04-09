export async function getUserOrders() {
  const token = sessionStorage.getItem("token");

  const res = await fetch("/backend/orders", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  const text = await res.text();

  let data = [];
  try {
    data = text ? JSON.parse(text) : [];
  } catch {
    throw new Error(text || "Invalid JSON response");
  }

  if (!res.ok) {
    throw new Error(data.message || "Erreur lors du chargement des commandes");
  }

  return Array.isArray(data) ? data : data.orders || [];
}