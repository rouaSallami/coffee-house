import Link from "next/link";

export default function QuickActionsCard() {
  return (
    <div className="rounded-3xl border border-dark/10 bg-base p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-bold text-dark sm:text-xl">
        Actions rapides
      </h2>

      <p className="mt-1 text-sm text-dark/60">
        Raccourcis utiles pour la gestion quotidienne.
      </p>

      <div className="mt-6 space-y-3">
        <Link
          href="/admin/cafes"
          className="block rounded-2xl border border-dark/10 bg-white/40 p-4 transition hover:bg-white/70"
        >
          <p className="text-sm font-semibold text-dark">Gestion des cafés</p>
          <p className="mt-1 text-sm text-dark/65">
            Ajouter, modifier et organiser le catalogue.
          </p>
        </Link>

        <Link
          href="/admin/addons"
          className="block rounded-2xl border border-dark/10 bg-white/40 p-4 transition hover:bg-white/70"
        >
          <p className="text-sm font-semibold text-dark">Gestion des addons</p>
          <p className="mt-1 text-sm text-dark/65">
            Mettre à jour les suppléments disponibles.
          </p>
        </Link>

        <Link
          href="/admin/commandes"
          className="block rounded-2xl border border-dark/10 bg-white/40 p-4 transition hover:bg-white/70"
        >
          <p className="text-sm font-semibold text-dark">Suivi des commandes</p>
          <p className="mt-1 text-sm text-dark/65">
            Voir les commandes et suivre leur statut.
          </p>
        </Link>

        <Link
          href="/admin/utilisateurs"
          className="block rounded-2xl border border-dark/10 bg-white/40 p-4 transition hover:bg-white/70"
        >
          <p className="text-sm font-semibold text-dark">Utilisateurs</p>
          <p className="mt-1 text-sm text-dark/65">
            Consulter les comptes et leur activité.
          </p>
        </Link>
      </div>
    </div>
  );
}