import { formatUserDate } from "@/lib/admin/utilisateurs/helpers";

export default function UserCard({
  user,
  onView,
  onEdit,
  onDelete,
  onToggleStatus,
}) {
  return (
    <div className="rounded-[26px] border border-dark/10 bg-white/40 p-6 shadow-sm">
      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.55fr_0.8fr] xl:items-center">
        {/* Left: avatar + main infos */}
        <div className="flex items-center gap-4 min-w-0">
          {user.avatar_url ? (
            <img
              src={user.avatar_url}
              alt={user.name}
              className="h-16 w-16 shrink-0 rounded-2xl border border-dark/10 object-cover shadow-sm"
            />
          ) : (
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/90 text-xl font-bold text-white shadow-sm">
              {user.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}

          <div className="min-w-0">
            <h2 className="text-xl font-bold text-dark truncate">{user.name}</h2>

            <div className="mt-3 space-y-1 text-sm text-dark/70">
              <p className="truncate">
                <span className="font-medium text-dark/80">Email :</span>{" "}
                {user.email}
              </p>
              <p>
                <span className="font-medium text-dark/80">Téléphone :</span>{" "}
                {user.phone || "—"}
              </p>
              <p>
                <span className="font-medium text-dark/80">Créé le :</span>{" "}
                {formatUserDate(user.createdAt)}
              </p>
            </div>
          </div>
        </div>

        {/* Middle: status only */}
        <div className="flex xl:justify-center">
          <button
            type="button"
            onClick={() => onToggleStatus(user.id)}
            className={`relative inline-flex h-10 w-28 items-center rounded-full px-2 text-xs font-semibold shadow-sm transition-all duration-300 ${
              user.active
                ? "border border-secondary/30 bg-secondary/20 text-marron"
                : "border border-dark/10 bg-dark/10 text-dark/70"
            }`}
          >
            <span
              className={`absolute h-8 w-8 rounded-full bg-white shadow-md transition-all duration-300 ${
                user.active ? "right-1" : "left-1"
              }`}
            />
            <span className="w-full text-center">
              {user.active ? "Actif" : "Inactif"}
            </span>
          </button>
        </div>

        {/* Right: actions */}
        <div className="flex flex-wrap gap-3 xl:justify-end">
          <button
            onClick={() => onView(user)}
            className="rounded-xl border border-dark/10 bg-base px-4 py-2.5 text-sm font-semibold text-dark transition hover:bg-white"
          >
            Voir détails
          </button>

          <button
            onClick={() => onEdit(user)}
            className="rounded-xl border border-dark/10 bg-base px-4 py-2.5 text-sm font-semibold text-dark transition hover:bg-white"
          >
            Modifier
          </button>

          <button
            onClick={() => onDelete(user)}
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}