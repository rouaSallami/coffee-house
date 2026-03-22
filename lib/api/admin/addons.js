import { apiGet } from "./http";

export async function getAddons() {
  const data = await apiGet("/api/addons");
  return Array.isArray(data) ? data : [];
}