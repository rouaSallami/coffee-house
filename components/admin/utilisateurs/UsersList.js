import UserCard from "./UserCard";
import EmptyState from "@/components/admin/shared/EmptyState";
import SkeletonBlock from "@/components/admin/shared/SkeletonBlock";
import SectionCard from "@/components/admin/shared/SectionCard";

export default function UsersList({
  users,
  isLoading = false,
  onView,
  onEdit,
  onDelete,
  onToggleStatus,
}) {

  console.log("USERS LIST:", users);
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
              <SkeletonBlock className="mt-3 h-4 w-56" />
              <SkeletonBlock className="mt-2 h-4 w-48" />
              <SkeletonBlock className="mt-2 h-4 w-44" />
              <div className="mt-5 flex flex-wrap gap-3">
                <SkeletonBlock className="h-10 w-28 rounded-xl" />
                <SkeletonBlock className="h-10 w-24 rounded-xl" />
                <SkeletonBlock className="h-10 w-24 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      ) : users.length === 0 ? (
        <EmptyState
          title="Aucun utilisateur trouvé"
          description="Ajoutez un utilisateur ou modifiez votre recherche."
        />
      ) : (
        <div className="space-y-4">
          {users.map((user, index) => (
  <UserCard
    key={`${user.id ?? user.email ?? "user"}-${index}`}
    user={user}
    onView={onView}
    onEdit={onEdit}
    onDelete={onDelete}
    onToggleStatus={onToggleStatus}
  />
))}
        </div>
      )}
    </SectionCard>
  );
}