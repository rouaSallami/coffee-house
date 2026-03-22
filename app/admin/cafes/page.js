"use client";

import { useEffect, useMemo, useState } from "react";

import CafesHeader from "@/components/admin/cafes/CafesHeader";
import CafesFilters from "@/components/admin/cafes/CafesFilters";
import CoffeesGrid from "@/components/admin/cafes/CoffeesGrid";
import CoffeeFormModal from "@/components/admin/cafes/CoffeeFormModal";
import DeleteCoffeeModal from "@/components/admin/cafes/DeleteCoffeeModal";


import { coffeeCategories } from "@/lib/admin/cafes/constants";
import { createEmptyCoffee } from "@/lib/admin/cafes/helpers";
import {
  normalizeCoffees,
  filterCoffees,
  buildCoffeePayload,
  buildUpdatedCoffee,
  isCoffeeFormValid,
} from "@/lib/admin/cafes/cafesUtils";
import { getCafes } from "@/lib/api/admin/cafes";

export default function AdminCafesPage() {
  const [selectedNew, setSelectedNew] = useState("Tous");
  const [coffeeToDelete, setCoffeeToDelete] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Toutes");
  const [selectedStatus, setSelectedStatus] = useState("Tous");

  const [coffees, setCoffees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [newCoffee, setNewCoffee] = useState(createEmptyCoffee());
  const [coffeeToEdit, setCoffeeToEdit] = useState(null);
  const [editCoffee, setEditCoffee] = useState(createEmptyCoffee());

  useEffect(() => {
    const loadCoffees = async () => {
      try {
        const data = await getCafes();
        const normalized = normalizeCoffees(data);
        setCoffees(normalized);
      } finally {
        setIsLoading(false);
      }
    };

    loadCoffees();
  }, []);

  const filteredCoffees = useMemo(() => {
    return filterCoffees(
      coffees,
      searchTerm,
      selectedCategory,
      selectedStatus,
      selectedNew
    );
  }, [coffees, searchTerm, selectedCategory, selectedStatus, selectedNew]);

  const handleDelete = (id) => {
    const updated = coffees.filter((c) => c.id !== id);
    setCoffees(updated);
    setCoffeeToDelete(null);
  };

  const handleAddCoffee = () => {
    if (!isCoffeeFormValid(newCoffee)) return;

    const coffeeToAdd = buildCoffeePayload(newCoffee);
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
    if (!coffeeToEdit || !isCoffeeFormValid(editCoffee)) return;

    const updatedCoffees = coffees.map((coffee) =>
      coffee.id === coffeeToEdit.id
        ? buildUpdatedCoffee(coffee, editCoffee)
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

  const handleCloseAddModal = () => {
    setShowAddForm(false);
    setNewCoffee(createEmptyCoffee());
  };

  const handleCloseEditModal = () => {
    setCoffeeToEdit(null);
    setEditCoffee(createEmptyCoffee());
  };

  return (
    <>
      <div className="w-full min-w-0 max-w-full overflow-x-hidden px-3 sm:px-5 lg:px-8">
        <CafesHeader />

        <CafesFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          selectedNew={selectedNew}
          setSelectedNew={setSelectedNew}
          coffeeCategories={coffeeCategories}
          onAddClick={() => setShowAddForm(true)}
          isLoading={isLoading}
        />

        <CoffeesGrid
          coffees={filteredCoffees}
          isLoading={isLoading}
          onEdit={handleOpenEdit}
          onDelete={setCoffeeToDelete}
          onToggleAvailability={handleToggleAvailability}
          onToggleNew={handleToggleNew}
        />
      </div>

      <DeleteCoffeeModal
        coffee={coffeeToDelete}
        onClose={() => setCoffeeToDelete(null)}
        onConfirm={handleDelete}
      />

      {showAddForm && (
        <CoffeeFormModal
          title="Ajouter un café"
          coffee={newCoffee}
          setCoffee={setNewCoffee}
          onClose={handleCloseAddModal}
          onSubmit={handleAddCoffee}
          submitLabel="Ajouter"
        />
      )}

      {coffeeToEdit && (
        <CoffeeFormModal
          title="Modifier le café"
          coffee={editCoffee}
          setCoffee={setEditCoffee}
          onClose={handleCloseEditModal}
          onSubmit={handleUpdateCoffee}
          submitLabel="Enregistrer"
        />
      )}
    </>
  );
}