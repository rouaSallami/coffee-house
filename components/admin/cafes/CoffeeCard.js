import { getCategoryLabel } from "@/lib/admin/cafes/helpers";

export default function CoffeeCard({
  coffee,
  onEdit,
  onDelete,
  onToggleAvailability,
  onToggleNew,
}) {
  return (
    <div className="w-full min-w-0 rounded-2xl border border-dark/10 bg-white/40 p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5">
      <div className="flex flex-col gap-3">
        <div className="min-w-0">
          {coffee.isNew && (
            <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
              Nouveau
            </span>
          )}

          <h2 className="mt-2 break-words text-base font-bold text-dark sm:text-lg">
            {coffee.name}
          </h2>

          <p className="mt-1 break-words text-sm text-dark/60">
            {getCategoryLabel(coffee.category)}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onToggleAvailability(coffee.id)}
          className={`relative inline-flex h-8 w-full items-center rounded-full px-2 text-[11px] font-semibold transition sm:text-xs ${
            coffee.available
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          <span
            className={`absolute top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-white shadow-sm transition ${
              coffee.available ? "right-1" : "left-1"
            }`}
          />
          <span className="w-full text-center">
            {coffee.available ? "Disponible" : "Indisponible"}
          </span>
        </button>

        <button
          type="button"
          onClick={() => onToggleNew(coffee.id)}
          className={`relative inline-flex h-8 w-full items-center rounded-full px-2 text-[11px] font-semibold transition sm:text-xs ${
            coffee.isNew
              ? "bg-red-100 text-red-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          <span
            className={`absolute top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-white shadow-sm transition ${
              coffee.isNew ? "right-1" : "left-1"
            }`}
          />
          <span className="w-full text-center">
            {coffee.isNew ? "Nouveau" : "Normal"}
          </span>
        </button>
      </div>

      <p className="mt-4 break-words text-sm leading-6 text-dark/75">
        {coffee.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {coffee.sizes?.map((size, index) => (
          <span
            key={size.key || index}
            className="rounded-full border border-dark/10 bg-base px-3 py-1 text-xs font-medium text-dark/70"
          >
            {size.label} - {size.price} DT
          </span>
        ))}
      </div>

      {coffee.ingredients?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {coffee.ingredients.map((ingredient, index) => (
            <span
              key={index}
              className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary"
            >
              {ingredient}
            </span>
          ))}
        </div>
      )}

      <div className="mt-5 flex flex-col gap-3">
        <button
          onClick={() => onEdit(coffee)}
          className="w-full rounded-xl border border-dark/10 bg-base px-4 py-2 text-sm font-semibold text-dark transition hover:bg-white"
        >
          Modifier
        </button>

        <button
          onClick={() => onDelete(coffee)}
          className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}