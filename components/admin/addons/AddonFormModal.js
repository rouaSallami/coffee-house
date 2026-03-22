import { isAddonFormValid } from "@/lib/admin/addons/addonsUtils";

export default function AddonFormModal({
  title,
  addon,
  setAddon,
  onClose,
  onSubmit,
  submitLabel,
}) {
  if (!addon) return null;

  const isValid = isAddonFormValid(addon);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 backdrop-blur-sm sm:p-4">
      <div className="w-full max-w-lg rounded-2xl border border-dark/10 bg-base p-4 shadow-xl sm:rounded-3xl sm:p-6">
        <h2 className="text-lg font-bold text-dark sm:text-xl">
          {title}
        </h2>

        <div className="mt-5 space-y-4">
          <input
            type="text"
            placeholder="Nom de l'addon"
            value={addon.name}
            onChange={(e) =>
              setAddon({ ...addon, name: e.target.value })
            }
            className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none"
          />

          <input
            type="number"
            placeholder="Prix"
            value={addon.price}
            onChange={(e) =>
              setAddon({ ...addon, price: e.target.value })
            }
            className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none"
          />

          <input
            type="text"
            placeholder="Image URL"
            value={addon.image}
            onChange={(e) =>
              setAddon({ ...addon, image: e.target.value })
            }
            className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none"
          />

          {!isValid && (
            <p className="text-sm text-red-600">
              Remplissez le nom et le prix avant de continuer.
            </p>
          )}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={onClose}
            className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm font-semibold text-dark transition hover:bg-base"
          >
            Annuler
          </button>

          <button
            onClick={onSubmit}
            disabled={!isValid}
            className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}