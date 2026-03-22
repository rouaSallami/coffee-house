export async function getOrdersFromStorage() {
  try {
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    return Array.isArray(storedOrders) ? storedOrders : [];
  } catch {
    return [];
  }
}

export async function saveOrdersToStorage(updatedOrders) {
  localStorage.setItem("orders", JSON.stringify(updatedOrders));

  const updatedLastOrder =
    updatedOrders.length > 0
      ? [...updatedOrders].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )[0]
      : null;

  if (updatedLastOrder) {
    localStorage.setItem("lastOrder", JSON.stringify(updatedLastOrder));
  } else {
    localStorage.removeItem("lastOrder");
  }

  window.dispatchEvent(new Event("orderUpdated"));
}