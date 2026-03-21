"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Coffee,
  Croissant,
  ClipboardList,
  Users,
  TrendingUp,
  Plus,
  ArrowRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { coffees } from "../api/coffees/data";

const categoryLabels = {
  nouveautes: "Nouveautés",
  classiques: "Classiques",
  lattes: "Lattés",
  glaces: "Glacés",
  "moka-chocolat": "Moka & Chocolat",
  aromatises: "Aromatisés",
  signatures: "Signatures",
  decafeine: "Décaféiné",
};

const categoryChartColors = [
  "#8B5CF6", // violet
  "#F59E0B", // amber
  "#10B981", // green
  "#EF4444", // red
  "#3B82F6", // blue
  "#EC4899", // pink
  "#14B8A6", // teal
  "#F97316", // orange
];

const availabilityColors = {
  Disponibles: "#22C55E",
  Indisponibles: "#EF4444",
  Nouveautés: "#3B82F6",
};

function getCategoryLabel(value) {
  return categoryLabels[value] || value || "—";
}

export default function AdminDashboardPage() {
  const [dashboardData, setDashboardData] = useState({
    lastOrder: null,
    addons: [],
    users: [],
    orders: [],
  });

  useEffect(() => {
    const safeParse = (key, fallback) => {
      try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : fallback;
      } catch {
        return fallback;
      }
    };

    const lastOrder = safeParse("lastOrder", null);
    const savedOrders = safeParse("orders", lastOrder ? [lastOrder] : []);
    const savedUser = safeParse("user", null);
    const savedUsers = savedUser ? [savedUser] : [];

    setDashboardData((prev) => ({
      ...prev,
      lastOrder,
      orders: savedOrders,
      users: savedUsers,
    }));

    fetch("/api/addons")
      .then((res) => res.json())
      .then((data) => {
        setDashboardData((prev) => ({
          ...prev,
          addons: Array.isArray(data) ? data : [],
        }));
      })
      .catch(() => {
        setDashboardData((prev) => ({
          ...prev,
          addons: [],
        }));
      });
  }, []);

  const normalizedCoffees = useMemo(() => {
    return coffees.map((coffee) => ({
      ...coffee,
      category: coffee.category,
      available: Boolean(coffee.available),
      isNew: Boolean(coffee.isNew),
    }));
  }, []);

  const stats = useMemo(() => {
    const cafesCount = normalizedCoffees.length;
    const addonsCount = dashboardData.addons.length;
    const ordersCount = dashboardData.orders.length;
    const usersCount = dashboardData.users.length;
    const availableCount = normalizedCoffees.filter((coffee) => coffee.available).length;
    const unavailableCount = cafesCount - availableCount;
    const newCount = normalizedCoffees.filter((coffee) => coffee.isNew).length;

    const totalRevenue = dashboardData.orders.reduce((sum, order) => {
      return sum + (Number(order?.total) || 0);
    }, 0);

    return {
      cafesCount,
      addonsCount,
      ordersCount,
      usersCount,
      availableCount,
      unavailableCount,
      newCount,
      totalRevenue,
    };
  }, [normalizedCoffees, dashboardData]);

  const categoryChartData = useMemo(() => {
    const grouped = normalizedCoffees.reduce((acc, coffee) => {
      const key = coffee.category || "autres";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(grouped).map(([key, value]) => ({
      name: getCategoryLabel(key),
      value,
    }));
  }, [normalizedCoffees]);

  const availabilityChartData = useMemo(() => {
    return [
      { name: "Disponibles", value: stats.availableCount },
      { name: "Indisponibles", value: stats.unavailableCount },
      { name: "Nouveautés", value: stats.newCount },
    ];
  }, [stats]);

  const priceRangeChartData = useMemo(() => {
    return normalizedCoffees
      .slice(0, 6)
      .map((coffee) => ({
        name: coffee.name,
        price:
          coffee.sizes?.length > 0
            ? Math.max(...coffee.sizes.map((size) => Number(size.price) || 0))
            : 0,
      }));
  }, [normalizedCoffees]);

  const recentCoffees = useMemo(() => {
    return [...normalizedCoffees].slice(0, 5);
  }, [normalizedCoffees]);

  const dashboardCards = [
    {
      title: "Cafés",
      value: stats.cafesCount,
      icon: Coffee,
      note: `${stats.availableCount} disponibles`,
    },
    {
      title: "Addons",
      value: stats.addonsCount,
      icon: Croissant,
      note: "Suppléments actifs",
    },
    {
      title: "Commandes",
      value: stats.ordersCount,
      icon: ClipboardList,
      note: `${stats.totalRevenue.toFixed(2)} DT revenus`,
    },
    {
      title: "Utilisateurs",
      value: stats.usersCount,
      icon: Users,
      note: "Comptes détectés",
    },
  ];

  const adminAlerts = useMemo(() => {
  const unavailableCoffees = normalizedCoffees.filter((coffee) => !coffee.available);
  const newCoffees = normalizedCoffees.filter((coffee) => coffee.isNew);
  const coffeesWithoutIngredients = normalizedCoffees.filter(
    (coffee) => !coffee.ingredients || coffee.ingredients.length === 0
  );

  const alerts = [];

  if (unavailableCoffees.length > 0) {
    alerts.push({
      title: "Cafés indisponibles",
      value: unavailableCoffees.length,
      tone: "red",
      description: "Des cafés sont actuellement désactivés et nécessitent une vérification.",
    });
  }

  if (newCoffees.length > 0) {
    alerts.push({
      title: "Nouveautés actives",
      value: newCoffees.length,
      tone: "blue",
      description: "Des cafés récents sont visibles dans le catalogue.",
    });
  }

  if (coffeesWithoutIngredients.length > 0) {
    alerts.push({
      title: "Ingrédients manquants",
      value: coffeesWithoutIngredients.length,
      tone: "amber",
      description: "Certains cafés n'ont pas encore de liste d’ingrédients complète.",
    });
  }

  return alerts;
}, [normalizedCoffees]);


const coffeesToWatch = useMemo(() => {
  return normalizedCoffees
    .map((coffee) => {
      const maxPrice =
        coffee.sizes?.length > 0
          ? Math.max(...coffee.sizes.map((size) => Number(size.price) || 0))
          : 0;

      return {
        ...coffee,
        maxPrice,
      };
    })
    .sort((a, b) => b.maxPrice - a.maxPrice)
    .slice(0, 5);
}, [normalizedCoffees]);

  return (
    <div className="w-full min-w-0 overflow-x-hidden">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
            Administration
          </p>

          <h1 className="mt-2 text-3xl font-bold text-dark sm:text-4xl">
            Dashboard
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-dark/80">
           Vue d’ensemble de votre activité et des données principales.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/admin/cafes"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95"
          >
            <Plus size={18} />
            Ajouter un café
          </Link>

          <Link
            href="/admin/commandes"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-dark/10 bg-base px-5 py-3 text-sm font-semibold text-dark transition hover:bg-white"
          >
            Voir les commandes
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-3xl border border-dark/10 bg-base p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-dark/60">{card.title}</p>
                  <p className="mt-2 text-3xl font-bold text-dark">
                    {card.value}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/70 p-3 text-primary shadow-sm">
                  <Icon size={20} />
                </div>
              </div>

              <p className="mt-4 text-sm text-dark/65">{card.note}</p>
            </div>
          );
        })}
      </div>

      <div className="mb-8 grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <div className="rounded-3xl border border-dark/10 bg-base p-5 shadow-sm sm:p-6">
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
</div>

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
      </div>

      <div className="mb-8 grid gap-5 xl:grid-cols-[1.2fr_1fr]">
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

        <div className="rounded-3xl border border-dark/10 bg-base p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-bold text-dark sm:text-xl">
            Dernière commande
          </h2>

          <p className="mt-1 text-sm text-dark/60">
            Dernière commande détectée dans le stockage local.
          </p>

          {!dashboardData.lastOrder ? (
            <div className="mt-6 rounded-2xl border border-dashed border-dark/10 bg-white/30 px-4 py-8 text-center">
              <p className="text-sm text-dark/65">Aucune commande disponible.</p>
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              <div className="rounded-2xl border border-dark/10 bg-white/40 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-dark/45">
                  Client
                </p>
                <p className="mt-2 text-sm font-semibold text-dark">
                  {dashboardData.lastOrder.customer?.name || "—"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-dark/10 bg-white/40 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-dark/45">
                    ID
                  </p>
                  <p className="mt-2 text-sm font-semibold text-dark">
                    #{dashboardData.lastOrder.id || "—"}
                  </p>
                </div>

                <div className="rounded-2xl border border-dark/10 bg-white/40 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-dark/45">
                    Total
                  </p>
                  <p className="mt-2 text-sm font-semibold text-primary">
                    {Number(dashboardData.lastOrder.total || 0).toFixed(2)} DT
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-dark/10 bg-white/40 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-dark/45">
                  Statut
                </p>
                <p className="mt-2 text-sm font-semibold text-secondary">
                  {dashboardData.lastOrder.status || "—"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mb-8 grid gap-5 xl:grid-cols-[1.2fr_1fr]">
        <div className="rounded-3xl border border-dark/10 bg-base p-5 shadow-sm sm:p-6">
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
                  const maxPrice =
                    coffee.sizes?.length > 0
                      ? Math.max(...coffee.sizes.map((size) => Number(size.price) || 0))
                      : 0;

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
        </div>

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
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_1.2fr]">
  <div className="rounded-3xl border border-dark/10 bg-base p-5 shadow-sm sm:p-6">
    <h2 className="text-lg font-bold text-dark sm:text-xl">
      Alertes administrateur
    </h2>

    <p className="mt-1 text-sm text-dark/60">
      Points qui méritent votre attention aujourd’hui.
    </p>

    <div className="mt-5 space-y-3">
      {adminAlerts.length > 0 ? (
        adminAlerts.map((alert, index) => (
          <div
            key={`${alert.title}-${index}`}
            className={`rounded-2xl border p-4 ${
              alert.tone === "red"
                ? "border-red-200 bg-red-50"
                : alert.tone === "blue"
                ? "border-blue-200 bg-blue-50"
                : "border-amber-200 bg-amber-50"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-dark">{alert.title}</p>
                <p className="mt-1 text-sm text-dark/65">{alert.description}</p>
              </div>

              <span className="rounded-full bg-white/80 px-3 py-1 text-sm font-bold text-dark shadow-sm">
                {alert.value}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
          <p className="text-sm font-semibold text-green-700">
            Tout est en ordre
          </p>
          <p className="mt-1 text-sm text-green-600">
            Aucun point critique n’a été détecté pour le moment.
          </p>
        </div>
      )}
    </div>
  </div>

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
</div>
    </div>
  );
}