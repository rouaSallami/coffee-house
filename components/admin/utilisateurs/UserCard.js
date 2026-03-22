import { formatUserDate } from "@/lib/admin/utilisateurs/helpers";

export default function UserCard({
  user,
  onView,
  onEdit,
  onDelete,
  onToggleStatus,
}) {
  return (
    <div className="rounded-2xl border border-dark/10 bg-white/40 p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-lg font-bold text-dark">{user.name}</h2>

            <button
              type="button"
              onClick={() => onToggleStatus(user.id)}
              className={`relative inline-flex h-9 w-24 items-center rounded-full px-2 text-xs font-semibold shadow-sm transition-all duration-300 ${
                user.active
                  ? "border border-secondary/30 bg-secondary/20 text-marron"
                  : "border border-dark/10 bg-dark/10 text-dark/70"
              }`}
            >
              <span
                className={`absolute h-7 w-7 rounded-full bg-white shadow-md transition-all duration-300 ${
                  user.active ? "right-1" : "left-1"
                }`}
              />
              <span className="w-full text-center">
                {user.active ? "Actif" : "Inactif"}
              </span>
            </button>
          </div>

          <div className="mt-3 space-y-1 text-sm text-dark/70">
            <p>Email : {user.email}</p>
            <p>Téléphone : {user.phone}</p>
            <p>Créé le : {formatUserDate(user.createdAt)}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => onView(user)}
            className="rounded-xl border border-dark/10 bg-base px-4 py-2 text-sm font-semibold text-dark transition hover:bg-white"
          >
            Voir détails
          </button>

          <button
            onClick={() => onEdit(user)}
            className="rounded-xl border border-dark/10 bg-base px-4 py-2 text-sm font-semibold text-dark transition hover:bg-white"
          >
            Modifier
          </button>

          <button
            onClick={() => onDelete(user)}
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}