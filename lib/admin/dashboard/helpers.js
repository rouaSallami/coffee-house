import { categoryLabels } from "./constants";

export function getCategoryLabel(value) {
  return categoryLabels[value] || value || "—";
}

export function getCoffeeMaxPrice(coffee) {
  return coffee?.sizes?.length > 0
    ? Math.max(...coffee.sizes.map((size) => Number(size.price) || 0))
    : 0;
}