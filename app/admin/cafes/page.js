"use client";

import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { coffees as initialCoffees } from "../../api/coffees/data";

export default function AdminCafesPage() {
  const [selectedNew, setSelectedNew] = useState("Tous");
  const [coffeeToDelete, setCoffeeToDelete] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Toutes");
  const [selectedStatus, setSelectedStatus] = useState("Tous");

  const normalizeCategory = (category) => {
    const normalized = String(category || "")
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    if (normalized === "classiques" || normalized === "classique") {
      return "classiques";
    }

    if (normalized === "lattes" || normalized === "latte" || normalized === "lattes") {
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
  };

  const createEmptyCoffee = () => ({
    name: "",
    category: "",
    description: "",
    image: "",
    ingredients: [""],
    sizes: [{ key: Date.now(), label: "M", price: 0 }],
    isNew: false,
  });

  const coffeeCategories = [
    { label: "Classiques", value: "classiques" },
    { label: "Lattés", value: "lattes" },
    { label: "Glacés", value: "glaces" },
    { label: "Moka & Chocolat", value: "moka-chocolat" },
    { label: "Aromatisés", value: "aromatises" },
    { label: "Signatures", value: "signatures" },
    { label: "Décaféiné", value: "decafeine" },
  ];

  const getCategoryLabel = (value) => {
    const foundCategory = coffeeCategories.find(
      (category) => category.value === value
    );

    return foundCategory ? foundCategory.label : value;
  };

  const [coffees, setCoffees] = useState(
    initialCoffees.map((coffee) => ({
      ...coffee,
      category: normalizeCategory(coffee.category),
      isNew: Boolean(coffee.isNew),
      available: coffee.available ?? true,
    }))
  );

  const [newCoffee, setNewCoffee] = useState(createEmptyCoffee());
  const [coffeeToEdit, setCoffeeToEdit] = useState(null);
  const [editCoffee, setEditCoffee] = useState(createEmptyCoffee());

  const filteredCoffees = useMemo(() => {
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
  }, [coffees, searchTerm, selectedCategory, selectedStatus, selectedNew]);

  const handleDelete = (id) => {
    const updated = coffees.filter((c) => c.id !== id);
    setCoffees(updated);
  };

  const handleAddCoffee = () => {
    if (
      !newCoffee.name.trim() ||
      !newCoffee.category.trim() ||
      !newCoffee.description.trim()
    ) {
      return;
    }

    const coffeeToAdd = {
      id: Date.now(),
      name: newCoffee.name.trim(),
      category: normalizeCategory(newCoffee.category),
      description: newCoffee.description.trim(),
      image: newCoffee.image || "/images/espresso1.jpg",
      available: true,
      isNew: Boolean(newCoffee.isNew),
      ingredients: newCoffee.ingredients
        .map((item) => item.trim())
        .filter(Boolean),
      sizes: newCoffee.sizes
        .map((size) => ({
          ...size,
          label: String(size.label || "").trim(),
          price: Number(size.price) || 0,
        }))
        .filter((size) => size.label),
    };

    setCoffees([coffeeToAdd, ...coffees]);
    setShowAddForm(false);
    setNewCoffee(createEmptyCoffee());
  };

  const handleOpenEdit = (coffee) => {
    setCoffeeToEdit(coffee);
    setEditCoffee({
      name: coffee.name || "",
      category: coffee.category || "",
      description: coffee.description || "",
      image: coffee.image || "",
      isNew: Boolean(coffee.isNew),
      ingredients: coffee.ingredients?.length > 0 ? coffee.ingredients : [""],
      sizes:
        coffee.sizes?.length > 0
          ? coffee.sizes.map((size) => ({
              key: size.key || Date.now() + Math.random(),
              label: size.label || "",
              price: size.price || 0,
            }))
          : [{ key: Date.now(), label: "M", price: 0 }],
    });
  };

  const handleUpdateCoffee = () => {
    if (
      !editCoffee.name.trim() ||
      !editCoffee.category.trim() ||
      !editCoffee.description.trim()
    ) {
      return;
    }

    const updatedCoffees = coffees.map((coffee) =>
      coffee.id === coffeeToEdit.id
        ? {
            ...coffee,
            name: editCoffee.name.trim(),
            category: normalizeCategory(editCoffee.category),
            description: editCoffee.description.trim(),
            image: editCoffee.image || coffee.image,
            isNew: Boolean(editCoffee.isNew),
            ingredients: editCoffee.ingredients
              .map((item) => item.trim())
              .filter(Boolean),
            sizes: editCoffee.sizes
              .map((size) => ({
                ...size,
                label: String(size.label || "").trim(),
                price: Number(size.price) || 0,
              }))
              .filter((size) => size.label),
          }
        : coffee
    );

    setCoffees(updatedCoffees);
    setCoffeeToEdit(null);
    setEditCoffee(createEmptyCoffee());
  };

  const handleToggleAvailability = (id) => {
    const updatedCoffees = coffees.map((coffee) =>
      coffee.id === id ? { ...coffee, available: !coffee.available } : coffee
    );

    setCoffees(updatedCoffees);
  };

  const handleToggleNew = (id) => {
    const updated = coffees.map((coffee) =>
      coffee.id === id ? { ...coffee, isNew: !coffee.isNew } : coffee
    );

    setCoffees(updated);
  };

  const handleIngredientChange = (index, value, type = "new") => {
    const data = type === "new" ? newCoffee : editCoffee;
    const setData = type === "new" ? setNewCoffee : setEditCoffee;

    const updatedIngredients = [...data.ingredients];
    updatedIngredients[index] = value;

    setData({ ...data, ingredients: updatedIngredients });
  };

  const addIngredient = (type = "new") => {
    const data = type === "new" ? newCoffee : editCoffee;
    const setData = type === "new" ? setNewCoffee : setEditCoffee;

    setData({
      ...data,
      ingredients: [...data.ingredients, ""],
    });
  };

  const removeIngredient = (index, type = "new") => {
    const data = type === "new" ? newCoffee : editCoffee;
    const setData = type === "new" ? setNewCoffee : setEditCoffee;

    const updatedIngredients = data.ingredients.filter((_, i) => i !== index);

    setData({
      ...data,
      ingredients: updatedIngredients.length > 0 ? updatedIngredients : [""],
    });
  };

  const handleSizeChange = (index, field, value, type = "new") => {
    const data = type === "new" ? newCoffee : editCoffee;
    const setData = type === "new" ? setNewCoffee : setEditCoffee;

    const updatedSizes = [...data.sizes];
    updatedSizes[index] = {
      ...updatedSizes[index],
      [field]: value,
    };

    setData({ ...data, sizes: updatedSizes });
  };

  const addSize = (type = "new") => {
    const data = type === "new" ? newCoffee : editCoffee;
    const setData = type === "new" ? setNewCoffee : setEditCoffee;

    setData({
      ...data,
      sizes: [
        ...data.sizes,
        {
          key: Date.now() + Math.random(),
          label: "",
          price: 0,
        },
      ],
    });
  };

  const removeSize = (index, type = "new") => {
    const data = type === "new" ? newCoffee : editCoffee;
    const setData = type === "new" ? setNewCoffee : setEditCoffee;

    const updatedSizes = data.sizes.filter((_, i) => i !== index);

    setData({
      ...data,
      sizes:
        updatedSizes.length > 0
          ? updatedSizes
          : [{ key: Date.now(), label: "M", price: 0 }],
    });
  };

  return (
    <>
      <div className="w-full min-w-0 max-w-full overflow-x-hidden px-3 sm:px-5 lg:px-8">
        <div className="mb-6 w-full min-w-0 sm:mb-8">
          <p className="break-words text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary sm:text-sm">
            Administration
          </p>

          <h1 className="mt-2 break-words text-2xl font-bold text-dark sm:text-3xl lg:text-4xl">
            Gestion des cafés
          </h1>

          <p className="mt-3 break-words text-sm text-dark/80">
            Gérez la liste des cafés disponibles dans votre boutique.
          </p>
        </div>

        <div className="mb-5 rounded-2xl border border-dark/10 bg-base p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:flex xl:flex-1 xl:items-center">
              <div className="relative w-full xl:max-w-sm">
                <Search
                  size={18}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-dark/40"
                />
                <input
                  type="text"
                  placeholder="Rechercher un café..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-xl border border-dark/10 bg-white py-3 pl-11 pr-4 text-sm text-dark outline-none"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none xl:max-w-[220px]"
              >
                <option value="Toutes">Toutes les catégories</option>
                {coffeeCategories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none xl:max-w-[220px]"
              >
                <option value="Tous">Tous les statuts</option>
                <option value="Disponibles">Disponibles</option>
                <option value="Indisponibles">Indisponibles</option>
              </select>

              <select
                value={selectedNew}
                onChange={(e) => setSelectedNew(e.target.value)}
                className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none xl:max-w-[220px]"
              >
                <option value="Tous">Tous</option>
                <option value="Nouveaux">Nouveautés</option>
                <option value="Anciens">Anciens</option>
              </select>
            </div>

            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95 sm:w-auto"
            >
              <Plus size={18} />
              Ajouter un café
            </button>
          </div>
        </div>

        <div className="w-full max-w-full overflow-hidden rounded-2xl border border-dark/10 bg-base p-3 shadow-sm sm:rounded-3xl sm:p-5 lg:p-8">
          {filteredCoffees.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredCoffees.map((coffee) => (
                <div
                  key={coffee.id}
                  className="w-full min-w-0 rounded-2xl border border-dark/10 bg-white/40 p-4 shadow-sm sm:p-5"
                >
                  <div className="flex flex-col gap-3">
                    <div className="min-w-0">
                      {coffee.isNew && (
                        <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                          Nouveau
                        </span>
                      )}

                      <h2 className="mt-2 break-words text-base font-bold text-dark sm:text-lg">
                        {coffee.name}
                      </h2>

                      <p className="mt-1 break-words text-sm text-dark/60">
                        {getCategoryLabel(coffee.category)}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleAvailability(coffee.id)}
                      className={`relative inline-flex h-8 w-full items-center rounded-full px-2 text-[11px] font-semibold transition sm:text-xs ${
                        coffee.available
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      <span
                        className={`absolute top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-white shadow-sm transition ${
                          coffee.available ? "right-1" : "left-1"
                        }`}
                      />
                      <span className="w-full text-center">
                        {coffee.available ? "Disponible" : "Indisponible"}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggleNew(coffee.id)}
                      className={`relative inline-flex h-8 w-full items-center rounded-full px-2 text-[11px] font-semibold transition sm:text-xs ${
                        coffee.isNew
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <span
                        className={`absolute top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-white shadow-sm transition ${
                          coffee.isNew ? "right-1" : "left-1"
                        }`}
                      />
                      <span className="w-full text-center">
                        {coffee.isNew ? "Nouveau" : "Normal"}
                      </span>
                    </button>
                  </div>

                  <p className="mt-4 break-words text-sm leading-6 text-dark/75">
                    {coffee.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {coffee.sizes?.map((size, index) => (
                      <span
                        key={size.key || index}
                        className="rounded-full border border-dark/10 bg-base px-3 py-1 text-xs font-medium text-dark/70"
                      >
                        {size.label} - {size.price} DT
                      </span>
                    ))}
                  </div>

                  {coffee.ingredients?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {coffee.ingredients.map((ingredient, index) => (
                        <span
                          key={index}
                          className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-5 flex flex-col gap-3">
                    <button
                      onClick={() => handleOpenEdit(coffee)}
                      className="w-full rounded-xl border border-dark/10 bg-base px-4 py-2 text-sm font-semibold text-dark transition hover:bg-white"
                    >
                      Modifier
                    </button>

                    <button
                      onClick={() => setCoffeeToDelete(coffee)}
                      className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-dark/10 bg-white/30 px-4 py-10 text-center">
              <p className="text-sm font-medium text-dark/70">
                Aucun café ne correspond aux filtres sélectionnés.
              </p>
            </div>
          )}
        </div>
      </div>

      {coffeeToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 backdrop-blur-sm sm:p-4">
          <div className="w-full max-w-md rounded-2xl border border-dark/10 bg-base p-4 shadow-xl sm:rounded-3xl sm:p-6">
            <h2 className="text-lg font-bold text-dark sm:text-xl">
              Confirmer la suppression
            </h2>

            <p className="mt-3 break-words text-sm leading-7 text-dark/75">
              Êtes-vous sûr de vouloir supprimer{" "}
              <span className="font-semibold text-primary">
                {coffeeToDelete.name}
              </span>{" "}
              ?
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => setCoffeeToDelete(null)}
                className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm font-semibold text-dark transition hover:bg-base"
              >
                Annuler
              </button>

              <button
                onClick={() => {
                  handleDelete(coffeeToDelete.id);
                  setCoffeeToDelete(null);
                }}
                className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
              >
                Oui, supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 backdrop-blur-sm sm:p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-dark/10 bg-base p-4 shadow-xl sm:rounded-3xl sm:p-6">
            <h2 className="text-lg font-bold text-dark sm:text-xl">
              Ajouter un café
            </h2>

            <div className="mt-5 space-y-4">
              <input
                type="text"
                placeholder="Nom du café"
                value={newCoffee.name}
                onChange={(e) =>
                  setNewCoffee({ ...newCoffee, name: e.target.value })
                }
                className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none"
              />

              <select
                value={newCoffee.category}
                onChange={(e) =>
                  setNewCoffee({ ...newCoffee, category: e.target.value })
                }
                className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none"
              >
                <option value="">Choisir une catégorie</option>
                {coffeeCategories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>

              <textarea
                placeholder="Description"
                value={newCoffee.description}
                onChange={(e) =>
                  setNewCoffee({ ...newCoffee, description: e.target.value })
                }
                className="h-28 w-full resize-none rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none"
              />

              <input
                type="text"
                placeholder="Image URL"
                value={newCoffee.image}
                onChange={(e) =>
                  setNewCoffee({ ...newCoffee, image: e.target.value })
                }
                className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none"
              />

              <label className="flex items-center gap-3 rounded-xl border border-dark/10 bg-white px-4 py-3">
                <input
                  type="checkbox"
                  checked={newCoffee.isNew}
                  onChange={(e) =>
                    setNewCoffee({ ...newCoffee, isNew: e.target.checked })
                  }
                />
                <span className="text-sm text-dark">Marquer comme nouveau</span>
              </label>

              <div className="rounded-2xl border border-dark/10 bg-white p-3 sm:p-4">
                <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-sm font-semibold text-dark">
                    Ingrédients
                  </h3>
                  <button
                    type="button"
                    onClick={() => addIngredient("new")}
                    className="w-full rounded-lg bg-primary/10 px-3 py-2 text-xs font-semibold text-primary sm:w-auto"
                  >
                    + Ajouter
                  </button>
                </div>

                <div className="space-y-2">
                  {newCoffee.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex flex-col gap-2 sm:flex-row">
                      <input
                        type="text"
                        placeholder="Ex: Espresso"
                        value={ingredient}
                        onChange={(e) =>
                          handleIngredientChange(index, e.target.value, "new")
                        }
                        className="flex-1 rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none"
                      />

                      <button
                        type="button"
                        onClick={() => removeIngredient(index, "new")}
                        className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100 sm:w-auto"
                      >
                        Supprimer
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-dark/10 bg-white p-3 sm:p-4">
                <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-sm font-semibold text-dark">
                    Tailles et prix
                  </h3>
                  <button
                    type="button"
                    onClick={() => addSize("new")}
                    className="w-full rounded-lg bg-primary/10 px-3 py-2 text-xs font-semibold text-primary sm:w-auto"
                  >
                    + Ajouter taille
                  </button>
                </div>

                <div className="space-y-3">
                  {newCoffee.sizes.map((size, index) => (
                    <div
                      key={size.key}
                      className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3"
                    >
                      <input
                        type="text"
                        placeholder="Label (S, M, L...)"
                        value={size.label}
                        onChange={(e) =>
                          handleSizeChange(index, "label", e.target.value, "new")
                        }
                        className="rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none"
                      />

                      <input
                        type="number"
                        placeholder="Prix"
                        value={size.price}
                        onChange={(e) =>
                          handleSizeChange(index, "price", e.target.value, "new")
                        }
                        className="rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none"
                      />

                      <button
                        type="button"
                        onClick={() => removeSize(index, "new")}
                        className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                      >
                        Supprimer
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setNewCoffee(createEmptyCoffee());
                }}
                className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm font-semibold text-dark transition hover:bg-base"
              >
                Annuler
              </button>

              <button
                onClick={handleAddCoffee}
                className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}

      {coffeeToEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 backdrop-blur-sm sm:p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-dark/10 bg-base p-4 shadow-xl sm:rounded-3xl sm:p-6">
            <h2 className="text-lg font-bold text-dark sm:text-xl">
              Modifier le café
            </h2>

            <div className="mt-5 space-y-4">
              <input
                type="text"
                placeholder="Nom du café"
                value={editCoffee.name}
                onChange={(e) =>
                  setEditCoffee({ ...editCoffee, name: e.target.value })
                }
                className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none"
              />

              <select
                value={editCoffee.category}
                onChange={(e) =>
                  setEditCoffee({ ...editCoffee, category: e.target.value })
                }
                className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none"
              >
                <option value="">Choisir une catégorie</option>
                {coffeeCategories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>

              <textarea
                placeholder="Description"
                value={editCoffee.description}
                onChange={(e) =>
                  setEditCoffee({ ...editCoffee, description: e.target.value })
                }
                className="h-28 w-full resize-none rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none"
              />

              <input
                type="text"
                placeholder="Image URL"
                value={editCoffee.image}
                onChange={(e) =>
                  setEditCoffee({ ...editCoffee, image: e.target.value })
                }
                className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none"
              />

              <label className="flex items-center gap-3 rounded-xl border border-dark/10 bg-white px-4 py-3">
                <input
                  type="checkbox"
                  checked={editCoffee.isNew}
                  onChange={(e) =>
                    setEditCoffee({ ...editCoffee, isNew: e.target.checked })
                  }
                />
                <span className="text-sm text-dark">Marquer comme nouveau</span>
              </label>

              <div className="rounded-2xl border border-dark/10 bg-white p-3 sm:p-4">
                <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-sm font-semibold text-dark">
                    Ingrédients
                  </h3>
                  <button
                    type="button"
                    onClick={() => addIngredient("edit")}
                    className="w-full rounded-lg bg-primary/10 px-3 py-2 text-xs font-semibold text-primary sm:w-auto"
                  >
                    + Ajouter
                  </button>
                </div>

                <div className="space-y-2">
                  {editCoffee.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex flex-col gap-2 sm:flex-row">
                      <input
                        type="text"
                        placeholder="Ex: Espresso"
                        value={ingredient}
                        onChange={(e) =>
                          handleIngredientChange(index, e.target.value, "edit")
                        }
                        className="flex-1 rounded-xl border border-dark/10 bg-white px-4 py-3 text-dark outline-none"
                      />

                      <button
                        type="button"
                        onClick={() => removeIngredient(index, "edit")}
                        className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100 sm:w-auto"
                      >
                        Supprimer
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-dark/10 bg-white p-3 sm:p-4">
                <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-sm font-semibold text-dark">
                    Tailles et prix
                  </h3>
                  <button
                    type="button"
                    onClick={() => addSize("edit")}
                    className="w-full rounded-lg bg-primary/10 px-3 py-2 text-xs font-semibold text-primary sm:w-auto"
                  >
                    + Ajouter taille
                  </button>
                </div>

                <div className="space-y-3">
                  {editCoffee.sizes.map((size, index) => (
                    <div
                      key={size.key}
                      className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3"
                    >
                      <input
                        type="text"
                        placeholder="Label (S, M, L...)"
                        value={size.label}
                        onChange={(e) =>
                          handleSizeChange(index, "label", e.target.value, "edit")
                        }
                        className="rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none"
                      />

                      <input
                        type="number"
                        placeholder="Prix"
                        value={size.price}
                        onChange={(e) =>
                          handleSizeChange(index, "price", e.target.value, "edit")
                        }
                        className="rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none"
                      />

                      <button
                        type="button"
                        onClick={() => removeSize(index, "edit")}
                        className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                      >
                        Supprimer
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => {
                  setCoffeeToEdit(null);
                  setEditCoffee(createEmptyCoffee());
                }}
                className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm font-semibold text-dark transition hover:bg-base"
              >
                Annuler
              </button>

              <button
                onClick={handleUpdateCoffee}
                className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}