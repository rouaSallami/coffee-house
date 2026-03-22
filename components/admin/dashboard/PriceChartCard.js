import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function PriceChartCard({ priceRangeChartData }) {
  return (
    <div className="rounded-3xl border border-dark/10 bg-base p-5 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-dark sm:text-xl">
          Prix maximum par café
        </h2>
        <p className="mt-1 text-sm text-dark/60">
          Basé sur la taille la plus chère de chaque produit affiché.
        </p>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={priceRangeChartData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#F97316"
              fill="#FDBA74"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}