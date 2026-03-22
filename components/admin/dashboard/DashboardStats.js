import { Coffee, Croissant, ClipboardList, Users } from "lucide-react";
import SkeletonBlock from "@/components/admin/shared/SkeletonBlock";

const iconMap = {
  coffee: Coffee,
  croissant: Croissant,
  clipboard: ClipboardList,
  users: Users,
};

export default function DashboardStats({ cards, isLoading = false }) {
  if (isLoading) {
    return (
      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-3xl border border-dark/10 bg-base p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <SkeletonBlock className="h-4 w-20" />
                <SkeletonBlock className="mt-3 h-8 w-16" />
              </div>
              <SkeletonBlock className="h-12 w-12 rounded-2xl" />
            </div>

            <SkeletonBlock className="mt-4 h-4 w-28" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = iconMap[card.iconKey];

        return (
          <div
            key={card.title}
            className="rounded-3xl border border-dark/10 bg-base p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-dark/60">{card.title}</p>
                <p className="mt-2 text-3xl font-bold text-dark">
                  {card.value}
                </p>
              </div>

              <div className="rounded-2xl bg-white/70 p-3 text-primary shadow-sm">
                {Icon ? <Icon size={20} /> : null}
              </div>
            </div>

            <p className="mt-4 text-sm text-dark/65">{card.note}</p>
          </div>
        );
      })}
    </div>
  );
}