export function normalizeOrders(rawOrders) {
  if (!Array.isArray(rawOrders)) return [];

  return rawOrders.map((order) => {
    const items = Array.isArray(order.items) ? order.items : [];

    return {
  id: order.id,
  status: order.status || "pending",
  mode: order.mode || "livraison",
  total: Number(order.total_price || 0),
  totalPrice: Number(order.total_price || 0),
  createdAt: order.created_at || order.createdAt || new Date().toISOString(),
  updatedAt: order.updated_at || order.updatedAt || null,
  notes: order.notes || "",
  isArchived: Boolean(order.is_archived),
  completedAt: order.completed_at || null,

  customer: {
    name: order.customer_name || order.customer?.name || "",
    phone: order.customer_phone || order.customer?.phone || "",
  },

  items: items.map((item) => ({
    id: item.id,
    coffeeId: item.coffee_id,
    coffeeName: item.coffee?.name || item.coffee_name || "Coffee",
    size: {
      label: item.size_name || "Standard",
    },
    qty: Number(item.quantity || 1),
    quantity: Number(item.quantity || 1),
    unitPrice: Number(item.unit_price || 0),
    subtotal: Number(item.subtotal || 0),
    image: item.coffee?.image || null,
    sugar: Number(item.sugar ?? 0),
    milk: item.milk || item.milk_name || null,
    container: item.container || null,
    addons: Array.isArray(item.addons) ? item.addons : [],
    note: item.note || "",
  })),
};
  });
}

export function filterOrders(
  orders,
  selectedStatus,
  selectedMode,
  searchTerm,
  dateFrom,
  dateTo
) {
  let result = [...orders];

  if (selectedStatus !== "all") {
    result = result.filter((order) => order.status === selectedStatus);
  }

  if (selectedMode !== "all") {
    result = result.filter((order) => order.mode === selectedMode);
  }

  if (searchTerm.trim()) {
    const term = searchTerm.toLowerCase();

    result = result.filter((order) => {
      const orderId = String(order.id || "").toLowerCase();
      const customerName = order.customer?.name?.toLowerCase() || "";
      const customerPhone = String(order.customer?.phone || "").toLowerCase();
      const orderMode = order.mode?.toLowerCase() || "";
      const orderStatus = order.status?.toLowerCase() || "";

      return (
        orderId.includes(term) ||
        customerName.includes(term) ||
        customerPhone.includes(term) ||
        orderMode.includes(term) ||
        orderStatus.includes(term)
      );
    });
  }

  if (dateFrom) {
    result = result.filter((order) => {
      if (!order.createdAt) return false;

      const orderDate = new Date(order.createdAt);
      const startDate = new Date(dateFrom);
      startDate.setHours(0, 0, 0, 0);

      return orderDate >= startDate;
    });
  }

  if (dateTo) {
    result = result.filter((order) => {
      if (!order.createdAt) return false;

      const orderDate = new Date(order.createdAt);
      const endDate = new Date(dateTo);
      endDate.setHours(23, 59, 59, 999);

      return orderDate <= endDate;
    });
  }

  result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return result;
}

export function getCountByStatus(orders, status) {
  if (status === "all") return orders.length;
  return orders.filter((order) => order.status === status).length;
}

export function getUpdatedLastOrder(updatedOrders) {
  if (updatedOrders.length === 0) return null;

  return [...updatedOrders].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  )[0];
}