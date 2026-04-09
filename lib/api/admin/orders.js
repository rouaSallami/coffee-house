export async function getOrdersFromStorage() {
  try {
    const storedOrders = JSON.parse(sessionStorage.getItem("orders") || "[]");
    return Array.isArray(storedOrders) ? storedOrders : [];
  } catch {
    return [];
  }
}

export async function saveOrdersToStorage(updatedOrders) {
  sessionStorage.setItem("orders", JSON.stringify(updatedOrders));

  const updatedLastOrder =
    updatedOrders.length > 0
      ? [...updatedOrders].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )[0]
      : null;

  if (updatedLastOrder) {
    sessionStorage.setItem("lastOrder", JSON.stringify(updatedLastOrder));
  } else {
    sessionStorage.removeItem("lastOrder");
  }

  window.dispatchEvent(new Event("orderUpdated"));
}