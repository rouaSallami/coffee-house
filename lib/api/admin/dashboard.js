function getAuthHeaders() {
  const token = sessionStorage.getItem("token");

  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function getDashboardData() {
  const [addonsRes, ordersRes, usersRes] = await Promise.all([
    fetch("/backend/addons", { headers: getAuthHeaders() }),
    fetch("/backend/orders", { headers: getAuthHeaders() }),
    fetch("/backend/admin/users", { headers: getAuthHeaders() }),
  ]);

  const addons = addonsRes.ok ? await addonsRes.json() : [];
  const orders = ordersRes.ok ? await ordersRes.json() : [];
  const users = usersRes.ok ? await usersRes.json() : [];

  const lastOrder =
    orders.length > 0
      ? [...orders].sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        )[0]
      : null;

  return {
    lastOrder,
    addons,
    users,
    orders,
  };
}