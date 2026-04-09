import { coffeeCategories } from "./constants";

export function normalizeCategory(category) {
  const normalized = String(category || "")
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (normalized === "classiques" || normalized === "classique") {
    return "classiques";
  }

  if (normalized === "lattes" || normalized === "latte") {
    return "lattes";
  }

  if (normalized === "glaces" || normalized === "glace") {
    return "glaces";
  }

  if (
    normalized === "moka & chocolat" ||
    normalized === "moka chocolat" ||
    normalized === "moka-chocolat"
  ) {
    return "moka-chocolat";
  }

  if (normalized === "aromatises" || normalized === "aromatise") {
    return "aromatises";
  }

  if (normalized === "signatures" || normalized === "signature") {
    return "signatures";
  }

  if (normalized === "decafeine" || normalized === "decafeines") {
    return "decafeine";
  }

  return normalized;
}

export function getCategoryLabel(value) {
  const foundCategory = coffeeCategories.find(
    (category) => category.value === value
  );

  return foundCategory ? foundCategory.label : value;
}

export function createEmptyCoffee() {
  return {
    name: "",
    category: "",
    description: "",
    image: "",
    imageFile: null,
    isNew: false,
    ingredients: [""],
    sizes: [{ key: Date.now(), label: "M", price: 0 }],
    available: true,
  };
}