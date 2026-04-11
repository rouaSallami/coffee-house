import OrderCard from "./OrderCard";
import EmptyState from "@/components/admin/shared/EmptyState";
import SkeletonBlock from "@/components/admin/shared/SkeletonBlock";
import SectionCard from "@/components/admin/shared/SectionCard";

export default function OrdersList({
  orders,
  isLoading = false,
  onView,
  onDelete,
  onUpdateStatus,
  exitingOrderId,
}) {
  return (
    <SectionCard className="p-8!">
      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-dark/10 bg-white/40 p-5 shadow-sm"
            >
              <SkeletonBlock className="h-6 w-40" />
              <div className="mt-3 space-y-2">
                <SkeletonBlock className="h-4 w-52" />
                <SkeletonBlock className="h-4 w-40" />
                <SkeletonBlock className="h-4 w-36" />
                <SkeletonBlock className="h-4 w-44" />
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <SkeletonBlock className="h-9 w-32 rounded-full" />
                <SkeletonBlock className="h-9 w-32 rounded-full" />
                <SkeletonBlock className="h-9 w-32 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <EmptyState
          title="Aucune commande trouvée"
          description="Aucune commande ne correspond aux filtres actuels."
        />
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onView={onView}
              onDelete={onDelete}
              onUpdateStatus={onUpdateStatus}
              isExiting={order.id === exitingOrderId}
            />
          ))}
        </div>
      )}
    </SectionCard>
  );
}