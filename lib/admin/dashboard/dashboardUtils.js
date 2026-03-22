export function normalizeCoffees(coffees = []) {
  return coffees.map((coffee) => ({
    ...coffee,
    category: coffee.category,
    available: Boolean(coffee.available),
    isNew: Boolean(coffee.isNew),
  }));
}

export function buildStats(normalizedCoffees, dashboardData) {
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
}

export function buildCategoryChartData(normalizedCoffees, getCategoryLabel) {
  const grouped = normalizedCoffees.reduce((acc, coffee) => {
    const key = coffee.category || "autres";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(grouped).map(([key, value]) => ({
    name: getCategoryLabel(key),
    value,
  }));
}

export function buildAvailabilityChartData(stats) {
  return [
    { name: "Disponibles", value: stats.availableCount },
    { name: "Indisponibles", value: stats.unavailableCount },
    { name: "Nouveautés", value: stats.newCount },
  ];
}

export function buildPriceRangeChartData(normalizedCoffees) {
  return normalizedCoffees.slice(0, 6).map((coffee) => ({
    name: coffee.name,
    price:
      coffee.sizes?.length > 0
        ? Math.max(...coffee.sizes.map((size) => Number(size.price) || 0))
        : 0,
  }));
}

export function buildRecentCoffees(normalizedCoffees) {
  return [...normalizedCoffees].slice(0, 5);
}

export function buildDashboardCards(stats) {
  return [
    {
      title: "Cafés",
      value: stats.cafesCount,
      note: `${stats.availableCount} disponibles`,
      iconKey: "coffee",
    },
    {
      title: "Addons",
      value: stats.addonsCount,
      note: "Suppléments actifs",
      iconKey: "croissant",
    },
    {
      title: "Commandes",
      value: stats.ordersCount,
      note: `${stats.totalRevenue.toFixed(2)} DT revenus`,
      iconKey: "clipboard",
    },
    {
      title: "Utilisateurs",
      value: stats.usersCount,
      note: "Comptes détectés",
      iconKey: "users",
    },
  ];
}

export function buildAdminAlerts(normalizedCoffees) {
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
}

export function buildCoffeesToWatch(normalizedCoffees) {
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
}