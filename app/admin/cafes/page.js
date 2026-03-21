"use client";

import { useState } from "react";
import { coffees as initialCoffees } from "../../api/coffees/data";

export default function AdminCafesPage() {
  const [coffees, setCoffees] = useState(initialCoffees);
  const [coffeeToDelete, setCoffeeToDelete] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const createEmptyCoffee = () => ({
    name: "",
    category: "",
    description: "",
    image: "",
    ingredients: [""],
    sizes: [{ key: Date.now(), label: "M", price: 0 }],
  });

  const [newCoffee, setNewCoffee] = useState(createEmptyCoffee());
  const [coffeeToEdit, setCoffeeToEdit] = useState(null);
  const [editCoffee, setEditCoffee] = useState(createEmptyCoffee());

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
      name: newCoffee.name,
      category: newCoffee.category,
      description: newCoffee.description,
      image: newCoffee.image || "/images/espresso1.jpg",
      available: true,
      ingredients: newCoffee.ingredients
        .map((item) => item.trim())
        .filter(Boolean),
      sizes: newCoffee.sizes
        .map((size) => ({
          ...size,
          label: size.label.trim(),
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
            name: editCoffee.name,
            category: editCoffee.category,
            description: editCoffee.description,
            image: editCoffee.image || coffee.image,
            ingredients: editCoffee.ingredients
              .map((item) => item.trim())
              .filter(Boolean),
            sizes: editCoffee.sizes
              .map((size) => ({
                ...size,
                label: size.label.trim(),
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
        <div className="mb-6 sm:mb-8 w-full min-w-0">
          <p className="text-[11px] sm:text-sm font-semibold uppercase tracking-[0.2em] text-secondary break-words">
            Administration
          </p>

          <h1 className="mt-2 break-words text-2xl sm:text-3xl lg:text-4xl font-bold text-dark">
            Gestion des cafés
          </h1>

          <p className="mt-3 text-sm text-dark/80 break-words">
            Gérez la liste des cafés disponibles dans votre boutique.
          </p>
        </div>

        <div className="my-5 w-full">
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95 sm:w-auto sm:min-w-[180px]"
          >
            Ajouter
          </button>
        </div>

        <div className="w-full max-w-full rounded-2xl sm:rounded-3xl border border-dark/10 bg-base p-3 sm:p-5 lg:p-8 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {coffees.map((coffee) => (
              <div
                key={coffee.id}
                className="w-full min-w-0 rounded-2xl border border-dark/10 bg-white/40 p-4 sm:p-5 shadow-sm"
              >
                <div className="flex flex-col gap-3">
                  <div className="min-w-0">
                    <h2 className="text-base sm:text-lg font-bold text-dark break-words">
                      {coffee.name}
                    </h2>
                    <p className="mt-1 text-sm text-dark/60 break-words">
                      {coffee.category}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleToggleAvailability(coffee.id)}
                    className={`relative inline-flex h-8 w-full items-center rounded-full px-2 text-[11px] sm:text-xs font-semibold transition ${
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
        </div>
      </div>

      {coffeeToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 sm:p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl sm:rounded-3xl border border-dark/10 bg-base p-4 sm:p-6 shadow-xl">
            <h2 className="text-lg sm:text-xl font-bold text-dark">
              Confirmer la suppression
            </h2>

            <p className="mt-3 text-sm leading-7 text-dark/75 break-words">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 sm:p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl sm:rounded-3xl border border-dark/10 bg-base p-4 sm:p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg sm:text-xl font-bold text-dark">
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

              <input
                type="text"
                placeholder="Catégorie"
                value={newCoffee.category}
                onChange={(e) =>
                  setNewCoffee({ ...newCoffee, category: e.target.value })
                }
                className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none"
              />

              <textarea
                placeholder="Description"
                value={newCoffee.description}
                onChange={(e) =>
                  setNewCoffee({ ...newCoffee, description: e.target.value })
                }
                className="h-28 w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none resize-none"
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

              <div className="rounded-2xl border border-dark/10 bg-white p-3 sm:p-4">
                <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-sm font-semibold text-dark">
                    Ingrédients
                  </h3>
                  <button
                    type="button"
                    onClick={() => addIngredient("new")}
                    className="w-full sm:w-auto rounded-lg bg-primary/10 px-3 py-2 text-xs font-semibold text-primary"
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
                        className="w-full sm:w-auto rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
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
                    className="w-full sm:w-auto rounded-lg bg-primary/10 px-3 py-2 text-xs font-semibold text-primary"
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
                        className="rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm  text-dark outline-none"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 sm:p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl sm:rounded-3xl border border-dark/10 bg-base p-4 sm:p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg sm:text-xl font-bold text-dark">
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

              <input
                type="text"
                placeholder="Catégorie"
                value={editCoffee.category}
                onChange={(e) =>
                  setEditCoffee({ ...editCoffee, category: e.target.value })
                }
                className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none"
              />

              <textarea
                placeholder="Description"
                value={editCoffee.description}
                onChange={(e) =>
                  setEditCoffee({ ...editCoffee, description: e.target.value })
                }
                className="h-28 w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none resize-none"
              />

              <input
                type="text"
                placeholder="Image URL"
                value={editCoffee.image}
                onChange={(e) =>
                  setEditCoffee({ ...editCoffee, image: e.target.value })
                }
                className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm  text-dark outline-none"
              />

              <div className="rounded-2xl border border-dark/10 bg-white p-3 sm:p-4">
                <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-sm font-semibold text-dark">
                    Ingrédients
                  </h3>
                  <button
                    type="button"
                    onClick={() => addIngredient("edit")}
                    className="w-full sm:w-auto rounded-lg bg-primary/10 px-3 py-2 text-xs font-semibold text-primary"
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
                        className="w-full sm:w-auto rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
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
                    className="w-full sm:w-auto rounded-lg bg-primary/10 px-3 py-2 text-xs font-semibold text-primary"
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