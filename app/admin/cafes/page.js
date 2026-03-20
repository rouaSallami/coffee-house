"use client";

import { useState } from "react";
import { coffees as initialCoffees } from "../../api/coffees/data";

export default function AdminCafesPage() {
  const [coffees, setCoffees] = useState(initialCoffees);
  const [coffeeToDelete, setCoffeeToDelete] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCoffee, setNewCoffee] = useState({
  name: "",
  category: "",
  description: "",
  image: "",
});
const [coffeeToEdit, setCoffeeToEdit] = useState(null);
const [editCoffee, setEditCoffee] = useState({
  name: "",
  category: "",
  description: "",
  image: "",
});
  

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
    ingredients: [],
    sizes: [{ key: "M", label: "M", price: 0 }],
  };

  setCoffees([coffeeToAdd, ...coffees]);
  setShowAddForm(false);
  setNewCoffee({
    name: "",
    category: "",
    description: "",
    image: "",
  });
};

const handleOpenEdit = (coffee) => {
  setCoffeeToEdit(coffee);
  setEditCoffee({
    name: coffee.name || "",
    category: coffee.category || "",
    description: coffee.description || "",
    image: coffee.image || "",
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
        }
      : coffee
  );

  setCoffees(updatedCoffees);
  setCoffeeToEdit(null);
  setEditCoffee({
    name: "",
    category: "",
    description: "",
    image: "",
  });
};

const handleToggleAvailability = (id) => {
  const updatedCoffees = coffees.map((coffee) =>
    coffee.id === id
      ? { ...coffee, available: !coffee.available }
      : coffee
  );

  setCoffees(updatedCoffees);
};


  return (
    <>
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
          Administration
        </p>

        <h1 className="mt-2 text-4xl font-bold text-dark">
          Gestion des cafés
        </h1>

        <p className="mt-3 text-dark/80">
          Gérez la liste des cafés disponibles dans votre boutique.
        </p>
      </div>

      <div className="my-5 flex justify-center">
  <button
  onClick={handleAddCoffee}
  className="flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95"
>
  Ajouter
</button>
</div>

      <div className="rounded-3xl border border-dark/10 bg-base p-8 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {coffees.map((coffee) => (
            <div
              key={coffee.id}
              className="rounded-2xl border border-dark/10 bg-white/40 p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-dark">
                    {coffee.name}
                  </h2>
                  <p className="mt-1 text-sm text-dark/60">
                    {coffee.category}
                  </p>
                </div>

                <button
  type="button"
  onClick={() => handleToggleAvailability(coffee.id)}
  className={`relative inline-flex h-8 w-24 items-center rounded-full px-2 text-xs font-semibold transition ${
    coffee.available
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700"
  }`}
>
  <span
    className={`absolute h-6 w-6 rounded-full bg-white shadow-sm transition ${
      coffee.available ? "right-1" : "left-1"
    }`}
  />
  <span className="w-full text-center">
    {coffee.available ? "Disponible" : "Indisponible"}
  </span>
</button>
              </div>

              <p className="mt-4 line-clamp-3 text-sm leading-6 text-dark/75">
                {coffee.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {coffee.sizes?.map((size) => (
                  <span
                    key={size.key}
                    className="rounded-full border border-dark/10 bg-base px-3 py-1 text-xs font-medium text-dark/70"
                  >
                    {size.label} - {size.price} DT
                  </span>
                ))}
              </div>

              <div className="mt-5 flex gap-3">
                <button
  onClick={() => handleOpenEdit(coffee)}
  className="flex-1 rounded-xl border border-dark/10 bg-base px-4 py-2 text-sm font-semibold text-dark transition hover:bg-white"
>
  Modifier
</button>

                <button
                  onClick={() => setCoffeeToDelete(coffee)}
                  className="flex-1 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
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
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <div className="w-full max-w-md rounded-3xl border border-dark/10 bg-base p-6 shadow-xl">
      <h2 className="text-xl font-bold text-dark">
        Confirmer la suppression
      </h2>

      <p className="mt-3 text-dark/75 leading-7">
        Êtes-vous sûr de vouloir supprimer{" "}
        <span className="font-semibold text-primary">
          {coffeeToDelete.name}
        </span>{" "}
        ?
      </p>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => setCoffeeToDelete(null)}
          className="flex-1 rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm font-semibold text-dark transition hover:bg-base"
        >
          Annuler
        </button>

        <button
          onClick={() => {
            handleDelete(coffeeToDelete.id);
            setCoffeeToDelete(null);
          }}
          className="flex-1 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
        >
          Oui, supprimer
        </button>
      </div>
    </div>
  </div>
)}


{showAddForm && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <div className="w-full max-w-lg rounded-3xl border border-dark/10 bg-base p-6 shadow-xl">
      <h2 className="text-xl font-bold text-dark">
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
  className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-dark outline-none"
/>

        <input
  type="text"
  placeholder="Catégorie"
  value={newCoffee.category}
  onChange={(e) =>
    setNewCoffee({ ...newCoffee, category: e.target.value })
  }
  className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-dark outline-none"
/>

        <textarea
  placeholder="Description"
  value={newCoffee.description}
  onChange={(e) =>
    setNewCoffee({ ...newCoffee, description: e.target.value })
  }
  className="h-28 w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-dark outline-none resize-none"
/>

        <input
  type="text"
  placeholder="Image URL"
  value={newCoffee.image}
  onChange={(e) =>
    setNewCoffee({ ...newCoffee, image: e.target.value })
  }
  className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-dark outline-none"
/>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => setShowAddForm(false)}
          className="flex-1 rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm font-semibold text-dark transition hover:bg-base"
        >
          Annuler
        </button>

        <button
          className="flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95"
        >
          Ajouter
        </button>
      </div>
    </div>
  </div>
)}

{coffeeToEdit && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <div className="w-full max-w-lg rounded-3xl border border-dark/10 bg-base p-6 shadow-xl">
      <h2 className="text-xl font-bold text-dark">
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
          className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-dark outline-none"
        />

        <input
          type="text"
          placeholder="Catégorie"
          value={editCoffee.category}
          onChange={(e) =>
            setEditCoffee({ ...editCoffee, category: e.target.value })
          }
          className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-dark outline-none"
        />

        <textarea
          placeholder="Description"
          value={editCoffee.description}
          onChange={(e) =>
            setEditCoffee({ ...editCoffee, description: e.target.value })
          }
          className="h-28 w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-dark outline-none resize-none"
        />

        <input
          type="text"
          placeholder="Image URL"
          value={editCoffee.image}
          onChange={(e) =>
            setEditCoffee({ ...editCoffee, image: e.target.value })
          }
          className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-dark outline-none"
        />
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => setCoffeeToEdit(null)}
          className="flex-1 rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm font-semibold text-dark transition hover:bg-base"
        >
          Annuler
        </button>

        <button
          onClick={handleUpdateCoffee}
          className="flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95"
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