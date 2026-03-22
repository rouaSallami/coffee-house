import Link from "next/link";
import { getCategoryLabel, getCoffeeMaxPrice } from "@/lib/admin/dashboard/helpers";
import EmptyState from "@/components/admin/shared/EmptyState";
import SkeletonBlock from "@/components/admin/shared/SkeletonBlock";
import SectionCard from "@/components/admin/shared/SectionCard";

export default function RecentCoffeesTable({
  recentCoffees,
  isLoading = false,
}) {
  if (isLoading) {
    return (
      <SectionCard>
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex-1">
            <SkeletonBlock className="h-6 w-44" />
            <SkeletonBlock className="mt-2 h-4 w-72" />
          </div>

          <SkeletonBlock className="h-4 w-16" />
        </div>

        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonBlock
              key={index}
              className="h-16 w-full rounded-2xl"
            />
          ))}
        </div>
      </SectionCard>
    );
  }

  return (
    <SectionCard>
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-dark sm:text-xl">
            Tableau des cafés
          </h2>
          <p className="mt-1 text-sm text-dark/60">
            Liste rapide des cafés récents avec état et catégorie.
          </p>
        </div>

        <Link
          href="/admin/cafes"
          className="text-sm font-semibold text-primary transition hover:opacity-80"
        >
          Voir tout
        </Link>
      </div>

      {!recentCoffees?.length ? (
        <EmptyState
          title="Aucun café à afficher"
          description="Ajoutez des cafés pour voir la liste récente ici."
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-separate border-spacing-y-3">
            <thead>
              <tr>
                <th className="text-left text-xs font-semibold uppercase tracking-[0.18em] text-dark/45">
                  Café
                </th>
                <th className="text-left text-xs font-semibold uppercase tracking-[0.18em] text-dark/45">
                  Catégorie
                </th>
                <th className="text-left text-xs font-semibold uppercase tracking-[0.18em] text-dark/45">
                  Disponibilité
                </th>
                <th className="text-left text-xs font-semibold uppercase tracking-[0.18em] text-dark/45">
                  Nouveau
                </th>
                <th className="text-left text-xs font-semibold uppercase tracking-[0.18em] text-dark/45">
                  Prix max
                </th>
              </tr>
            </thead>

            <tbody>
              {recentCoffees.map((coffee) => {
                const maxPrice = getCoffeeMaxPrice(coffee);

                return (
                  <tr key={coffee.id} className="rounded-2xl bg-white/40">
                    <td className="rounded-l-2xl px-4 py-4 text-sm font-semibold text-dark">
                      {coffee.name}
                    </td>

                    <td className="px-4 py-4 text-sm text-dark/70">
                      {getCategoryLabel(coffee.category)}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          coffee.available
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {coffee.available ? "Disponible" : "Indisponible"}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          coffee.isNew
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {coffee.isNew ? "Oui" : "Non"}
                      </span>
                    </td>

                    <td className="rounded-r-2xl px-4 py-4 text-sm font-semibold text-primary">
                      {maxPrice.toFixed(2)} DT
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </SectionCard>
  );
}