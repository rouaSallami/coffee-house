export function getStatusesByMode(mode) {
  if (mode === "livraison") {
    return [
      { key: "confirmed", label: "Commande confirmée" },
      { key: "preparing", label: "En préparation" },
      { key: "out_for_delivery", label: "En livraison" },
      { key: "delivered", label: "Livrée" },
    ];
  }

  if (mode === "emporter") {
    return [
      { key: "confirmed", label: "Commande confirmée" },
      { key: "preparing", label: "En préparation" },
      { key: "ready", label: "Prête à récupérer" },
      { key: "delivered", label: "Récupérée" },
    ];
  }

  if (mode === "surplace") {
    return [
      { key: "confirmed", label: "Commande confirmée" },
      { key: "preparing", label: "En préparation" },
      { key: "ready", label: "Prête à être servie" },
      { key: "delivered", label: "Servie" },
    ];
  }

  return [];
}

export function getStatusLabel(order) {
  const statuses = getStatusesByMode(order.mode);

  return (
    statuses.find((status) => status.key === order.status)?.label ||
    order.status
  );
}

export function formatOrderDate(dateString) {
  if (!dateString) return "Date indisponible";

  return new Date(dateString).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getOrderItemsCount(order) {
  return order.items?.reduce((sum, item) => sum + item.qty, 0) || 0;
}