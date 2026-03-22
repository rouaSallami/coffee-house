export default function DeleteCoffeeModal({
  coffee,
  onClose,
  onConfirm,
}) {
  if (!coffee) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 backdrop-blur-sm sm:p-4">
      <div className="w-full max-w-md rounded-2xl border border-dark/10 bg-base p-4 shadow-xl sm:rounded-3xl sm:p-6">
        <h2 className="text-lg font-bold text-dark sm:text-xl">
          Confirmer la suppression
        </h2>

        <p className="mt-3 break-words text-sm leading-7 text-dark/75">
          Êtes-vous sûr de vouloir supprimer{" "}
          <span className="font-semibold text-primary">
            {coffee.name}
          </span>{" "}
          ?
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={onClose}
            className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm font-semibold text-dark transition hover:bg-base"
          >
            Annuler
          </button>

          <button
            onClick={() => onConfirm(coffee.id)}
            className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
          >
            Oui, supprimer
          </button>
        </div>
      </div>
    </div>
  );
}