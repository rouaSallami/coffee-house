export function filterAddons(addons, searchTerm, selectedStatus) {
  return addons.filter((addon) => {
    const term = searchTerm.toLowerCase();

    const matchesSearch =
      String(addon.name || "").toLowerCase().includes(term) ||
      String(addon.image || "").toLowerCase().includes(term) ||
      String(addon.price ?? "").toLowerCase().includes(term);

    const matchesStatus =
      selectedStatus === "Tous" ||
      (selectedStatus === "Disponibles" && addon.available) ||
      (selectedStatus === "Indisponibles" && !addon.available);

    return matchesSearch && matchesStatus;
  });
}

export function isAddonFormValid(addon) {
  return addon.name.trim() && String(addon.price).trim();
}

export function buildAddonPayload(addon) {
  return {
    id: Date.now().toString(),
    name: addon.name.trim(),
    price: Number(addon.price) || 0,
    image: addon.image.trim() || "/images/cookie-maison1.jpg",
    available: true,
  };
}

export function buildUpdatedAddon(oldAddon, editAddon) {
  return {
    ...oldAddon,
    name: editAddon.name.trim(),
    price: Number(editAddon.price) || 0,
    image: editAddon.image.trim() || oldAddon.image,
  };
}