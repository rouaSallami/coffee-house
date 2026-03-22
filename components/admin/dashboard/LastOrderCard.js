import SectionCard from "@/components/admin/shared/SectionCard";
import EmptyState from "@/components/admin/shared/EmptyState";
import SkeletonBlock from "@/components/admin/shared/SkeletonBlock";

export default function LastOrderCard({ lastOrder, isLoading = false }) {
  if (isLoading) {
    return (
      <SectionCard>
        <SkeletonBlock className="h-6 w-40" />
        <SkeletonBlock className="mt-2 h-4 w-64" />

        <div className="mt-6 space-y-3">
          <SkeletonBlock className="h-20 w-full rounded-2xl" />
          <div className="grid grid-cols-2 gap-3">
            <SkeletonBlock className="h-20 w-full rounded-2xl" />
            <SkeletonBlock className="h-20 w-full rounded-2xl" />
          </div>
          <SkeletonBlock className="h-20 w-full rounded-2xl" />
        </div>
      </SectionCard>
    );
  }

  return (
    <SectionCard>
      <h2 className="text-lg font-bold text-dark sm:text-xl">
        Dernière commande
      </h2>

      <p className="mt-1 text-sm text-dark/60">
        Dernière commande détectée dans le stockage local.
      </p>

      {!lastOrder ? (
        <div className="mt-6">
          <EmptyState
            title="Aucune commande disponible"
            description="Les commandes récentes apparaîtront ici dès qu’une commande sera enregistrée."
          />
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          <div className="rounded-2xl border border-dark/10 bg-white/40 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-dark/45">
              Client
            </p>
            <p className="mt-2 text-sm font-semibold text-dark">
              {lastOrder.customer?.name || "—"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-dark/10 bg-white/40 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-dark/45">
                ID
              </p>
              <p className="mt-2 text-sm font-semibold text-dark">
                #{lastOrder.id || "—"}
              </p>
            </div>

            <div className="rounded-2xl border border-dark/10 bg-white/40 p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-dark/45">
                Total
              </p>
              <p className="mt-2 text-sm font-semibold text-primary">
                {Number(lastOrder.total || 0).toFixed(2)} DT
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-dark/10 bg-white/40 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-dark/45">
              Statut
            </p>
            <p className="mt-2 text-sm font-semibold text-secondary">
              {lastOrder.status || "—"}
            </p>
          </div>
        </div>
      )}
    </SectionCard>
  );
}