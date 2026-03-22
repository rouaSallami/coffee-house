import { formatUserDate } from "@/lib/admin/utilisateurs/helpers";

export default function UserDetailsModal({ user, onClose }) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-3xl border border-dark/10 bg-base p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-dark">
              Détails utilisateur
            </h2>
            <p className="mt-2 text-dark/70">{user.name}</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-dark/10 bg-white px-4 py-2 text-sm font-semibold text-dark transition hover:bg-base"
          >
            Fermer
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-dark/10 bg-white/40 p-4">
            <p className="text-sm text-dark/60">Nom</p>
            <p className="mt-1 font-bold text-dark">{user.name}</p>
          </div>

          <div className="rounded-2xl border border-dark/10 bg-white/40 p-4">
            <p className="text-sm text-dark/60">Statut</p>
            <p className="mt-1 font-bold text-primary">
              {user.active ? "Actif" : "Inactif"}
            </p>
          </div>

          <div className="rounded-2xl border border-dark/10 bg-white/40 p-4">
            <p className="text-sm text-dark/60">Email</p>
            <p className="mt-1 break-all font-bold text-dark">{user.email}</p>
          </div>

          <div className="rounded-2xl border border-dark/10 bg-white/40 p-4">
            <p className="text-sm text-dark/60">Téléphone</p>
            <p className="mt-1 font-bold text-dark">{user.phone}</p>
          </div>

          <div className="rounded-2xl border border-dark/10 bg-white/40 p-4 md:col-span-2">
            <p className="text-sm text-dark/60">Date de création</p>
            <p className="mt-1 font-bold text-dark">
              {formatUserDate(user.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}