import CoffeeCard from "./CoffeeCard";
import EmptyState from "@/components/admin/shared/EmptyState";
import SkeletonBlock from "@/components/admin/shared/SkeletonBlock";
import SectionCard from "@/components/admin/shared/SectionCard";

export default function CoffeesGrid({
  coffees,
  isLoading = false,
  onEdit,
  onDelete,
  onToggleAvailability,
  onToggleNew,
}) {
  return (
    <SectionCard className="w-full max-w-full overflow-hidden !p-3 sm:!rounded-3xl sm:!p-5 lg:!p-8">
      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-dark/10 bg-white/40 p-4 shadow-sm sm:p-5"
            >
              <SkeletonBlock className="h-5 w-20" />
              <SkeletonBlock className="mt-3 h-6 w-36" />
              <SkeletonBlock className="mt-2 h-4 w-24" />
              <SkeletonBlock className="mt-4 h-8 w-full rounded-full" />
              <SkeletonBlock className="mt-3 h-8 w-full rounded-full" />
              <SkeletonBlock className="mt-4 h-4 w-full" />
              <SkeletonBlock className="mt-2 h-4 w-4/5" />
              <div className="mt-4 flex gap-2">
                <SkeletonBlock className="h-7 w-20 rounded-full" />
                <SkeletonBlock className="h-7 w-20 rounded-full" />
              </div>
              <div className="mt-5 space-y-3">
                <SkeletonBlock className="h-10 w-full rounded-xl" />
                <SkeletonBlock className="h-10 w-full rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      ) : coffees.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {coffees.map((coffee) => (
            <CoffeeCard
              key={coffee.id}
              coffee={coffee}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleAvailability={onToggleAvailability}
              onToggleNew={onToggleNew}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Aucun café ne correspond aux filtres"
          description="Modifiez la recherche ou les filtres pour afficher des résultats."
        />
      )}
    </SectionCard>
  );
}