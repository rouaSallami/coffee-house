export function createEmptyAddon() {
  return {
    name: "",
    price: "",
    image: "",
    imageFile: null,
  };
}

export function normalizeAddon(addon) {
  return {
    ...addon,
    id: addon.id ?? Date.now().toString() + Math.random(),
    name: addon.name || "",
    price: addon.price ?? 0,
    image: addon.image || "",
    imageFile: null,
    available: Boolean(addon.available),
  };
}