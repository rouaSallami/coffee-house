export default function AddonCard({
  addon,
  onEdit,
  onDelete,
  onToggleAvailability,
}) {
  return (
    <div className="w-full min-w-0 rounded-2xl border border-dark/10 bg-white/40 p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5">
      <div className="flex flex-col gap-3">
        <div className="min-w-0">
          <h2 className="break-words text-base font-bold text-dark sm:text-lg">
            {addon.name}
          </h2>
          <p className="mt-1 break-words text-sm text-dark/60">
            Supplément café
          </p>
        </div>

        <button
          type="button"
          onClick={() => onToggleAvailability(addon.id)}
          className={`relative inline-flex h-8 w-full items-center rounded-full px-2 text-[11px] font-semibold transition sm:text-xs ${
            addon.available
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          <span
            className={`absolute top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-white shadow-sm transition ${
              addon.available ? "right-1" : "left-1"
            }`}
          />
          <span className="w-full text-center">
            {addon.available ? "Disponible" : "Indisponible"}
          </span>
        </button>
      </div>

      <div className="mt-4 rounded-2xl border border-dark/10 bg-base p-4">
        <p className="text-sm text-dark/60">Prix</p>
        <p className="mt-1 text-lg font-bold text-primary">
          {Number(addon.price).toFixed(2)} DT
        </p>
      </div>

      <p className="mt-4 break-all text-sm text-dark/70">
        {addon.image || "Aucune image"}
      </p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={() => onEdit(addon)}
          className="w-full rounded-xl border border-dark/10 bg-base px-4 py-2 text-sm font-semibold text-dark transition hover:bg-white"
        >
          Modifier
        </button>

        <button
          onClick={() => onDelete(addon)}
          className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}