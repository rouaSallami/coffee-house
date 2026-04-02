import { normalizeCategory } from "./helpers";

export function normalizeCoffees(coffees = []) {
  return coffees.map((coffee) => ({
    ...coffee,
    category: normalizeCategory(coffee.category),
    isNew: Boolean(coffee.isNew),
    available: coffee.available ?? true,
  }));
}

export function filterCoffees(
  coffees,
  searchTerm,
  selectedCategory,
  selectedStatus,
  selectedNew
) {
  return coffees.filter((coffee) => {
    const name = String(coffee.name || "").toLowerCase();
    const description = String(coffee.description || "").toLowerCase();
    const category = String(coffee.category || "").toLowerCase();
    const term = searchTerm.toLowerCase();

    const matchesSearch =
      name.includes(term) ||
      description.includes(term) ||
      category.includes(term);

    const matchesCategory =
      selectedCategory === "Toutes" || coffee.category === selectedCategory;

    const matchesStatus =
      selectedStatus === "Tous" ||
      (selectedStatus === "Disponibles" && coffee.available) ||
      (selectedStatus === "Indisponibles" && !coffee.available);

    const matchesNew =
      selectedNew === "Tous" ||
      (selectedNew === "Nouveaux" && coffee.isNew) ||
      (selectedNew === "Anciens" && !coffee.isNew);

    return matchesSearch && matchesCategory && matchesStatus && matchesNew;
  });
}

export function buildCoffeePayload(
  coffee,
  fallbackImage = "/images/espresso1.jpg"
) {
  return {
    name: String(coffee.name || "").trim(),
    category: normalizeCategory(coffee.category),
    description: String(coffee.description || "").trim(),
    image: coffee.image || fallbackImage,
    available:
      typeof coffee.available === "boolean" ? coffee.available : true,
    isNew: Boolean(coffee.isNew),
    ingredients: (coffee.ingredients || [])
      .map((item) => String(item || "").trim())
      .filter(Boolean),
    sizes: (coffee.sizes || [])
      .map((size, index) => ({
        key: String(size.key || size.label || `size-${index}`),
        label: String(size.label || "").trim(),
        price: Number(size.price) || 0,
      }))
      .filter((size) => size.label),
  };
}

export function isCoffeeFormValid(coffee) {
  return (
    String(coffee.name || "").trim() &&
    String(coffee.category || "").trim() &&
    String(coffee.description || "").trim()
  );
}