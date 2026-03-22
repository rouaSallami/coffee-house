import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import { availabilityColors } from "@/lib/admin/dashboard/constants";

export default function AvailabilityChartCard({ availabilityChartData }) {
  return (
    <div className="rounded-3xl border border-dark/10 bg-base p-5 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-dark sm:text-xl">
          Disponibilité & nouveautés
        </h2>
        <p className="mt-1 text-sm text-dark/60">
          Vue rapide sur la disponibilité du catalogue.
        </p>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={availabilityChartData}
              dataKey="value"
              nameKey="name"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={4}
            >
              {availabilityChartData.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={availabilityColors[entry.name] || "#94A3B8"}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        {availabilityChartData.map((item) => (
          <div
            key={item.name}
            className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-2 text-xs font-medium text-dark/70"
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: availabilityColors[item.name] || "#94A3B8" }}
            />
            {item.name}: {item.value}
          </div>
        ))}
      </div>
    </div>
  );
}