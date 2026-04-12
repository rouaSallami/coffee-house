"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function HistorySummaryChart({
  totalOrders = 0,
  totalRevenue = 0,
}) {
  const data = [
    {
      name: "Historique",
      commandes: totalOrders,
      revenus: Number(totalRevenue.toFixed(2)),
    },
  ];

  return (
    <div className="rounded-3xl border border-dark/10 bg-white/40 p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-dark">
          Résumé visuel
        </h3>

        <p className="mt-2 text-sm text-dark/70">
          Synthèse des commandes et revenus selon les filtres actuels.
        </p>
      </div>

      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={24}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8DDD2" />
            <XAxis dataKey="name" stroke="#9A7B63" />
            <YAxis yAxisId="left" allowDecimals={false} stroke="#9A7B63" />
            <YAxis yAxisId="right" orientation="right" allowDecimals={false} stroke="#9A7B63" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFFDFB",
                border: "1px solid #E8DDD2",
                borderRadius: "12px",
              }}
              formatter={(value, name) => {
                if (name === "revenus") {
                  return [`${Number(value).toFixed(2)} DT`, "Revenus"];
                }

                return [value, "Commandes"];
              }}
            />
            <Bar
              yAxisId="left"
              dataKey="commandes"
              fill="#A26A3D"
              radius={[8, 8, 0, 0]}
            />
            <Bar
              yAxisId="right"
              dataKey="revenus"
              fill="#D8B08C"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}