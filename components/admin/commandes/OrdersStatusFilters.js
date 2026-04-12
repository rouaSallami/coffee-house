export default function OrdersStatusFilters({
  selectedStatus,
  setSelectedStatus,
  getCountByStatus,
  isLoading = false,
  variant = "active",
}) {
  const activeFilters = [
    { key: "all", label: "Toutes" },
    { key: "confirmed", label: "Confirmées" },
    { key: "preparing", label: "En préparation" },
    { key: "ready", label: "Prêtes" },
    { key: "out_for_delivery", label: "En livraison" },
  ];

  const historyFilters = [
    { key: "all", label: "Toutes" },
    { key: "delivered", label: "Terminées" },
    { key: "cancelled", label: "Annulées" },
  ];

  const filters = variant === "history" ? historyFilters : activeFilters;

  return (
    <div className="mb-6 flex flex-wrap gap-3">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => setSelectedStatus(filter.key)}
          disabled={isLoading}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
            selectedStatus === filter.key
              ? "bg-primary text-white"
              : "border border-dark/10 bg-base text-dark hover:bg-white"
          }`}
        >
          {filter.label} ({getCountByStatus(filter.key)})
        </button>
      ))}
    </div>
  );
}