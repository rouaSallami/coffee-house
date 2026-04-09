export function filterAddons(addons, searchTerm, selectedStatus) {
  return addons.filter((addon) => {
    const term = String(searchTerm || "").toLowerCase();

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
  return (
    String(addon?.name || "").trim() &&
    String(addon?.price ?? "").trim()
  );
}

export function buildAddonPayload(addon) {
  const formData = new FormData();

  formData.append("name", String(addon.name || "").trim());
  formData.append("price", String(Number(addon.price) || 0));

  if (addon.imageFile instanceof File) {
    formData.append("image", addon.imageFile);
  }

  formData.append("available", "1");

  return formData;
}

export function buildUpdatedAddon(editAddon) {
  const formData = new FormData();

  formData.append("name", String(editAddon.name || "").trim());
  formData.append("price", String(Number(editAddon.price) || 0));

  if (editAddon.imageFile instanceof File) {
    formData.append("image", editAddon.imageFile);
  }

  formData.append(
    "available",
    typeof editAddon.available === "boolean"
      ? (editAddon.available ? "1" : "0")
      : "1"
  );

  formData.append("_method", "PUT");

  return formData;
}

export function createEmptyAddon() {
  return {
    name: "",
    price: "",
    image: "",
    imageFile: null,
    available: true,
  };
}

function normalizeAddons(rawAddons = []) {
  return rawAddons.map((addon, index) => {
    let image = addon.image;

    if (!image) {
      image = "/images/placeholder-addon.png";
    } else if (!image.startsWith("http")) {
      image = `http://localhost:8000${image}`;
    } else {
      image = image.replace("127.0.0.1", "localhost");
    }

    return {
      id: addon.id ?? index + 1,
      name: addon.name ?? "Extra",
      image,
      price: Number(addon.price ?? 0),
      available: Boolean(Number(addon.available)),
    };
  });
}