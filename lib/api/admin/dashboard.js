import { getAddons } from "./addons";
import { getOrdersFromStorage } from "./orders";
import { getUsersFromStorage } from "./users";

export async function getDashboardData() {
  const [addonsRes, ordersRes, usersRes] = await Promise.all([
    fetch("/backend/addons", {
      headers: { Accept: "application/json" },
    }),
    fetch("/backend/orders", {
      headers: { Accept: "application/json" },
    }),
    fetch("/backend/users", {
      headers: { Accept: "application/json" },
    }),
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