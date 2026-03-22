import { TrendingUp } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import { categoryChartColors } from "@/lib/admin/dashboard/constants";
import SkeletonBlock from "@/components/admin/shared/SkeletonBlock";
import SectionCard from "@/components/admin/shared/SectionCard";
import EmptyState from "@/components/admin/shared/EmptyState";

export default function CategoryChartCard({
  categoryChartData,
  isLoading = false,
}) {
  if (isLoading) {
    return (
      <SectionCard>
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex-1">
            <SkeletonBlock className="h-6 w-48" />
            <SkeletonBlock className="mt-2 h-4 w-64" />
          </div>
          <SkeletonBlock className="h-12 w-12 rounded-2xl" />
        </div>

        <SkeletonBlock className="h-[360px] w-full rounded-2xl" />
      </SectionCard>
    );
  }

  if (!categoryChartData?.length) {
    return (
      <SectionCard>
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-dark sm:text-xl">
              Répartition par catégorie
            </h2>
            <p className="mt-1 text-sm text-dark/60">
              Distribution actuelle des cafés par catégorie.
            </p>
          </div>

          <div className="rounded-2xl bg-white/60 p-3 text-primary">
            <TrendingUp size={20} />
          </div>
        </div>

        <EmptyState
          title="Aucune catégorie disponible"
          description="Ajoutez des cafés pour voir la répartition par catégorie."
        />
      </SectionCard>
    );
  }

  return (
    <SectionCard>
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-dark sm:text-xl">
            Répartition par catégorie
          </h2>
          <p className="mt-1 text-sm text-dark/60">
            Distribution actuelle des cafés par catégorie.
          </p>
        </div>

        <div className="rounded-2xl bg-white/60 p-3 text-primary">
          <TrendingUp size={20} />
        </div>
      </div>

      <div className="h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={categoryChartData}
            layout="vertical"
            margin={{ top: 8, right: 16, left: 16, bottom: 8 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
            <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12 }} />
            <YAxis
              type="category"
              dataKey="name"
              width={120}
              tick={{ fontSize: 12 }}
            />
            <Tooltip />
            <Bar dataKey="value" radius={[0, 10, 10, 0]}>
              {categoryChartData.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={categoryChartColors[index % categoryChartColors.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}