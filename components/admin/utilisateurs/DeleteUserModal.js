export default function DeleteUserModal({ user, onClose, onConfirm }) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-dark/10 bg-base p-6 shadow-xl">
        <h2 className="text-xl font-bold text-dark">
          Confirmer la suppression
        </h2>

        <p className="mt-3 leading-7 text-dark/75">
          Êtes-vous sûr de vouloir supprimer{" "}
          <span className="font-semibold text-primary">
            {user.name}
          </span>{" "}
          ?
        </p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm font-semibold text-dark transition hover:bg-base"
          >
            Annuler
          </button>

          <button
            onClick={() => onConfirm(user.id)}
            className="flex-1 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
          >
            Oui, supprimer
          </button>
        </div>
      </div>
    </div>
  );
}