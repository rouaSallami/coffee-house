import { coffees } from "@/app/api/coffees/data";

export async function getCafes() {
  return Array.isArray(coffees) ? coffees : [];
}