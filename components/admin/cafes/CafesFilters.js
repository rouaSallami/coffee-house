import { Plus, Search } from "lucide-react";
import SectionCard from "@/components/admin/shared/SectionCard";

export default function CafesFilters({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
  selectedNew,
  setSelectedNew,
  coffeeCategories,
  onAddClick,
  isLoading = false,
}) {
  return (
    <SectionCard className="mb-5 !p-4 sm:!p-5">
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
              disabled={isLoading}
              className="w-full rounded-xl border border-dark/10 bg-white py-3 pl-11 pr-4 text-sm text-dark outline-none disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            disabled={isLoading}
            className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none disabled:cursor-not-allowed disabled:opacity-60 xl:max-w-[220px]"
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
            disabled={isLoading}
            className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none disabled:cursor-not-allowed disabled:opacity-60 xl:max-w-[220px]"
          >
            <option value="Tous">Tous les statuts</option>
            <option value="Disponibles">Disponibles</option>
            <option value="Indisponibles">Indisponibles</option>
          </select>

          <select
            value={selectedNew}
            onChange={(e) => setSelectedNew(e.target.value)}
            disabled={isLoading}
            className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none disabled:cursor-not-allowed disabled:opacity-60 xl:max-w-[220px]"
          >
            <option value="Tous">Tous</option>
            <option value="Nouveaux">Nouveautés</option>
            <option value="Anciens">Anciens</option>
          </select>
        </div>

        <button
          onClick={onAddClick}
          disabled={isLoading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          <Plus size={18} />
          Ajouter un café
        </button>
      </div>
    </SectionCard>
  );
}