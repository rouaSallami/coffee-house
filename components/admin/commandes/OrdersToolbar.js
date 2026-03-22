import SectionCard from "@/components/admin/shared/SectionCard";

export default function OrdersToolbar({
  searchTerm,
  setSearchTerm,
  selectedMode,
  setSelectedMode,
  isLoading = false,
}) {
  return (
    <SectionCard className="mb-4 !p-4 sm:!p-5">
      <div className="grid gap-3 md:grid-cols-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={isLoading}
          placeholder="Rechercher par numéro, client, téléphone ou mode..."
          className="w-full rounded-2xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none transition focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
        />

        <select
          value={selectedMode}
          onChange={(e) => setSelectedMode(e.target.value)}
          disabled={isLoading}
          className="w-full rounded-2xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none transition focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          <option value="all">Tous les modes</option>
          <option value="livraison">Livraison</option>
          <option value="emporter">Emporter</option>
          <option value="surplace">Sur place</option>
        </select>
      </div>
    </SectionCard>
  );
}