import SectionCard from "@/components/admin/shared/SectionCard";

export default function UsersToolbar({
  search,
  setSearch,
  onAddClick,
  isLoading = false,
}) {
  return (
    <SectionCard className="mb-5 !p-4 sm:!p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          placeholder="Rechercher par nom, email ou téléphone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          disabled={isLoading}
          className="w-full rounded-2xl border border-dark/10 bg-white px-4 py-3 text-dark outline-none disabled:cursor-not-allowed disabled:opacity-60 sm:max-w-md"
        />

        <button
          onClick={onAddClick}
          disabled={isLoading}
          className="rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Ajouter un utilisateur
        </button>
      </div>
    </SectionCard>
  );
}