import { getStatusesByMode, getStatusLabel, formatOrderDate, getOrderItemsCount } from "@/lib/admin/commandes/helpers";
import { statusStyles, modeStyles } from "@/lib/admin/commandes/constants";

export default function OrderCard({
  order,
  onView,
  onDelete,
  onUpdateStatus,
  isExiting = false,
}) {
  const totalItems = getOrderItemsCount(order);
  const formattedDate = formatOrderDate(order.createdAt);

  return (
    <div
  className={`rounded-2xl border border-dark/10 p-5 shadow-sm transition-all duration-500 ${
    isExiting
      ? "translate-x-6 scale-[0.98] opacity-0 blur-[1px]"
      : order.isArchived
      ? "bg-gray-100 opacity-60"
      : "bg-white/40"
  }`}
>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-lg font-bold text-dark">
              Commande #{order.id}
            </h2>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                modeStyles[order.mode] ||
                "bg-creamy text-primary border border-primary/15"
              }`}
            >
              {order.mode}
            </span>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                statusStyles[order.status] ||
                "bg-creamy text-primary border border-primary/15"
              }`}
            >
              {getStatusLabel(order)}
            </span>
          </div>

          <div className="mt-3 space-y-1 text-sm text-dark/70">
            <p>Client : {order.customer?.name || "Non renseigné"}</p>
            <p>Total : {Number(order.total || 0).toFixed(2)} DT</p>
            <p>
              Articles : {totalItems} article{totalItems > 1 ? "s" : ""}
            </p>
            <p>Date : {formattedDate}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onView(order)}
            className="rounded-xl border border-dark/10 bg-base px-4 py-2 text-sm font-semibold text-dark transition hover:bg-white"
          >
            Voir les détails
          </button>

          {!order.isArchived && (
  <button
    onClick={() => onDelete(order)}
    className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
  >
    Supprimer
  </button>
)}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {getStatusesByMode(order.mode).map((status) => {
          const isActive = order.status === status.key;
const isDisabled = isActive || order.isArchived;

          return (
            <button
              key={status.key}
              onClick={() => onUpdateStatus(order.id, status.key)}
              disabled={isDisabled}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                isDisabled
                  ? "cursor-not-allowed bg-primary text-white opacity-60"
                  : "border border-dark/10 bg-base text-dark hover:bg-white"
              }`}
            >
              {status.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}