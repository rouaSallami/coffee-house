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

export function buildCoffeePayload(coffee) {
  const formData = new FormData();

  formData.append("name", String(coffee.name || "").trim());
  formData.append("category", String(coffee.category || "").trim());
  formData.append("description", String(coffee.description || "").trim());
  formData.append("available", coffee.available ? "1" : "0");
  formData.append("isNew", coffee.isNew ? "1" : "0");

  if (coffee.imageFile instanceof File) {
    formData.append("image", coffee.imageFile);
  }

  (coffee.ingredients || []).forEach((item, index) => {
    const value = String(item || "").trim();
    if (value) {
      formData.append(`ingredients[${index}]`, value);
    }
  });

  (coffee.sizes || []).forEach((size, index) => {
    const label = String(size.label || "").trim();
    const price = String(size.price ?? "").trim();

    if (label) {
      formData.append(`sizes[${index}][label]`, label);
      formData.append(`sizes[${index}][price]`, price || "0");
    }
  });

  return formData;
}

export function isCoffeeFormValid(coffee) {
  return (
    String(coffee.name || "").trim() &&
    String(coffee.category || "").trim() &&
    String(coffee.description || "").trim()
  );
}