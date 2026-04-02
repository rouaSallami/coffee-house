export function createEmptyAddon() {
  return {
    name: "",
    price: "",
    image: "",
  };
}

export function normalizeAddon(addon) {
  return {
    ...addon,
    id: addon.id,
    name: addon.name || "",
    price: addon.price ?? 0,
    image: addon.image || "",
    available: Boolean(addon.available),
  };
}