import Link from "next/link";
import { getCategoryLabel } from "@/lib/admin/dashboard/helpers";

export default function CoffeesToWatchCard({ coffeesToWatch }) {
  return (
    <div className="rounded-3xl border border-dark/10 bg-base p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-dark sm:text-xl">
            Cafés à surveiller
          </h2>
          <p className="mt-1 text-sm text-dark/60">
            Produits avec les prix les plus élevés dans le catalogue.
          </p>
        </div>

        <Link
          href="/admin/cafes"
          className="text-sm font-semibold text-primary transition hover:opacity-80"
        >
          Gérer
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] border-separate border-spacing-y-3">
          <thead>
            <tr>
              <th className="text-left text-xs font-semibold uppercase tracking-[0.18em] text-dark/45">
                Café
              </th>
              <th className="text-left text-xs font-semibold uppercase tracking-[0.18em] text-dark/45">
                Catégorie
              </th>
              <th className="text-left text-xs font-semibold uppercase tracking-[0.18em] text-dark/45">
                Prix max
              </th>
              <th className="text-left text-xs font-semibold uppercase tracking-[0.18em] text-dark/45">
                Statut
              </th>
            </tr>
          </thead>

          <tbody>
            {coffeesToWatch.map((coffee) => (
              <tr key={coffee.id} className="bg-white/40">
                <td className="rounded-l-2xl px-4 py-4 text-sm font-semibold text-dark">
                  {coffee.name}
                </td>

                <td className="px-4 py-4 text-sm text-dark/70">
                  {getCategoryLabel(coffee.category)}
                </td>

                <td className="px-4 py-4 text-sm font-semibold text-primary">
                  {coffee.maxPrice.toFixed(2)} DT
                </td>

                <td className="rounded-r-2xl px-4 py-4">
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}