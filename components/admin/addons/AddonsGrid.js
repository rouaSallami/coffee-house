import AddonCard from "./AddonCard";
import EmptyState from "@/components/admin/shared/EmptyState";
import SkeletonBlock from "@/components/admin/shared/SkeletonBlock";
import SectionCard from "@/components/admin/shared/SectionCard";

export default function AddonsGrid({
  addons,
  isLoading = false,
  onEdit,
  onDelete,
  onToggleAvailability,
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
              <SkeletonBlock className="h-6 w-32" />
              <SkeletonBlock className="mt-2 h-4 w-24" />
              <SkeletonBlock className="mt-4 h-8 w-full rounded-full" />
              <SkeletonBlock className="mt-4 h-20 w-full rounded-2xl" />
              <SkeletonBlock className="mt-4 h-4 w-full" />
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <SkeletonBlock className="h-10 w-full rounded-xl" />
                <SkeletonBlock className="h-10 w-full rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      ) : addons.length === 0 ? (
        <EmptyState
          title="Aucun addon ne correspond aux filtres"
          description="Modifiez la recherche ou les filtres pour afficher des résultats."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {addons.map((addon) => (
            <AddonCard
              key={addon.id}
              addon={addon}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleAvailability={onToggleAvailability}
            />
          ))}
        </div>
      )}
    </SectionCard>
  );
}