"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import SectionCard from "@/components/admin/shared/SectionCard";
import SkeletonBlock from "@/components/admin/shared/SkeletonBlock";

export default function OrdersRevenueChartCard({
  chartData = [],
  isLoading = false,
}) {
  if (isLoading) {
    return (
      <SectionCard className="!p-6">
        <div className="mb-6">
          <SkeletonBlock className="h-8 w-64" />
          <SkeletonBlock className="mt-3 h-4 w-72" />
        </div>

        <SkeletonBlock className="h-[320px] w-full rounded-2xl" />
      </SectionCard>
    );
  }

  return (
    <SectionCard className="!p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-dark">
          Commandes et revenus
        </h2>

        <p className="mt-2 text-dark/70">
          Évolution des commandes et des revenus sur les 7 derniers jours.
        </p>
      </div>

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8DDD2" />
<XAxis dataKey="label" stroke="#9A7B63" />
<YAxis yAxisId="left" allowDecimals={false} stroke="#9A7B63" />
<YAxis yAxisId="right" orientation="right" allowDecimals={false} stroke="#9A7B63" />
            <Tooltip
  contentStyle={{
    backgroundColor: "#FFFDFB",
    border: "1px solid #E8DDD2",
    borderRadius: "12px",
  }}
  formatter={(value, name) => {
    if (name === "revenus" || name === "Revenus") {
      return [`${Number(value).toFixed(2)} DT`, "Revenus"];
    }
    return [value, "Commandes"];
  }}
/>
            <Legend />
            <Bar
  yAxisId="left"
  dataKey="commandes"
  name="Commandes"
  fill="#A26A3D"
  radius={[8, 8, 0, 0]}
/>
<Bar
  yAxisId="right"
  dataKey="revenus"
  name="Revenus"
  fill="#D8B08C"
  radius={[8, 8, 0, 0]}
/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}