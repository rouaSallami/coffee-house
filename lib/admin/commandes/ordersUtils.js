export function normalizeOrders(storedOrders) {
  return Array.isArray(storedOrders) ? storedOrders : [];
}

export function filterOrders(orders, selectedStatus, selectedMode, searchTerm) {
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
      const customerPhone = order.customer?.phone?.toLowerCase() || "";
      const orderMode = order.mode?.toLowerCase() || "";

      return (
        orderId.includes(term) ||
        customerName.includes(term) ||
        customerPhone.includes(term) ||
        orderMode.includes(term)
      );
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