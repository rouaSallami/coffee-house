export default function OrdersStatusFilters({
  selectedStatus,
  setSelectedStatus,
  getCountByStatus,
  isLoading = false,
}) {
  const filters = [
    { key: "all", label: "Toutes" },
    { key: "confirmed", label: "Confirmées" },
    { key: "preparing", label: "En préparation" },
    { key: "ready", label: "Prêtes" },
    { key: "out_for_delivery", label: "En livraison" },
    { key: "delivered", label: "Terminées" },
  ];

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