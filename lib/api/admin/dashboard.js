import { getAddons } from "./addons";
import { getOrdersFromStorage } from "./orders";
import { getUsersFromStorage } from "./users";

export async function getDashboardData() {
  const [addons, orders, users] = await Promise.all([
    getAddons().catch(() => []),
    getOrdersFromStorage().catch(() => []),
    getUsersFromStorage().catch(() => []),
  ]);

  const lastOrder =
    orders.length > 0
      ? [...orders].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )[0]
      : null;

  return {
    lastOrder,
    addons,
    users,
    orders,
  };
}