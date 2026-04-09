"use client";

import { useEffect, useMemo, useState } from "react";

import CafesHeader from "@/components/admin/cafes/CafesHeader";
import CafesFilters from "@/components/admin/cafes/CafesFilters";
import CoffeesGrid from "@/components/admin/cafes/CoffeesGrid";
import CoffeeFormModal from "@/components/admin/cafes/CoffeeFormModal";
import DeleteCoffeeModal from "@/components/admin/cafes/DeleteCoffeeModal";
import toast from "react-hot-toast";

import { coffeeCategories } from "@/lib/admin/cafes/constants";
import { createEmptyCoffee } from "@/lib/admin/cafes/helpers";
import {
  normalizeCoffees,
  filterCoffees,
  buildCoffeePayload,
  isCoffeeFormValid,
} from "@/lib/admin/cafes/cafesUtils";

import {
  getCafes,
  createCafe,
  updateCafe,
  deleteCafe,
  toggleCafeAvailability,
  toggleCafeNew,
} from "@/lib/api/admin/cafes";

export default function AdminCafesPage() {
  const [selectedNew, setSelectedNew] = useState("Tous");
  const [coffeeToDelete, setCoffeeToDelete] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Toutes");
  const [selectedStatus, setSelectedStatus] = useState("Tous");

  const [coffees, setCoffees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newCoffee, setNewCoffee] = useState(createEmptyCoffee());
  const [coffeeToEdit, setCoffeeToEdit] = useState(null);
  const [editCoffee, setEditCoffee] = useState(createEmptyCoffee());

  const loadCoffees = async () => {
    try {
      setIsLoading(true);

      const data = await getCafes();
      const cafesArray = Array.isArray(data) ? data : data.data || [];
      const normalized = normalizeCoffees(cafesArray);

      setCoffees(normalized);
    } catch (error) {
      console.error("Erreur chargement cafés:", error);
      alert(error.message || "Erreur lors du chargement des cafés");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
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

  const handleDelete = async (id) => {
  try {
    setIsSubmitting(true);

    await deleteCafe(id);

    setCoffeeToDelete(null);
    await loadCoffees();

    toast("🗑️ Café supprimé", {
  icon: "✅",
});
  } catch (error) {
    console.error("Erreur suppression café:", error);

    toast.error(error.message || "Erreur lors de la suppression");
  } finally {
    setIsSubmitting(false);
  }
};

  const handleAddCoffee = async () => {
    if (!isCoffeeFormValid(newCoffee)) return;

    try {
      setIsSubmitting(true);

      const payload = buildCoffeePayload(newCoffee);
      await createCafe(payload);

      setShowAddForm(false);
      setNewCoffee(createEmptyCoffee());
      await loadCoffees();
    } catch (error) {
      console.error("Erreur ajout café:", error);
      alert(error.message || "Erreur lors de l'ajout du café");
    } finally {
      setIsSubmitting(false);
    }
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
          ? coffee.sizes.map((size, index) => ({
              key: size.key || `size-${index}-${Date.now()}`,
              label: size.label || "",
              price: Number(size.price) || 0,
            }))
          : [{ key: `size-${Date.now()}`, label: "M", price: 0 }],
      available: Boolean(coffee.available),
    });
  };

  const handleUpdateCoffee = async () => {
    if (!coffeeToEdit || !isCoffeeFormValid(editCoffee)) return;

    try {
      setIsSubmitting(true);

    

      const payload = buildCoffeePayload(editCoffee);

payload.append(
  "available",
  typeof editCoffee.available === "boolean"
    ? (editCoffee.available ? "1" : "0")
    : (coffeeToEdit.available ? "1" : "0")
);

await updateCafe(coffeeToEdit.id, payload);

      setCoffeeToEdit(null);
      setEditCoffee(createEmptyCoffee());
      await loadCoffees();
    } catch (error) {
      console.error("Erreur modification café:", error);
      alert(error.message || "Erreur lors de la modification");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleAvailability = async (id) => {
    try {
      await toggleCafeAvailability(id);
      await loadCoffees();
    } catch (error) {
      console.error("Erreur toggle disponibilité:", error);
      alert(error.message || "Erreur lors de la mise à jour");
    }
  };

  const handleToggleNew = async (id) => {
    try {
      await toggleCafeNew(id);
      await loadCoffees();
    } catch (error) {
      console.error("Erreur toggle nouveauté:", error);
      alert(error.message || "Erreur lors de la mise à jour");
    }
  };

  const handleCloseAddModal = () => {
    if (isSubmitting) return;
    setShowAddForm(false);
    setNewCoffee(createEmptyCoffee());
  };

  const handleCloseEditModal = () => {
    if (isSubmitting) return;
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
          submitLabel={isSubmitting ? "Ajout..." : "Ajouter"}
        />
      )}

      {coffeeToEdit && (
        <CoffeeFormModal
          title="Modifier le café"
          coffee={editCoffee}
          setCoffee={setEditCoffee}
          onClose={handleCloseEditModal}
          onSubmit={handleUpdateCoffee}
          submitLabel={isSubmitting ? "Enregistrement..." : "Enregistrer"}
        />
      )}
    </>
  );
}