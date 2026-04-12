import SectionCard from "@/components/admin/shared/SectionCard";

export default function OrdersToolbar({
  searchTerm,
  setSearchTerm,
  selectedMode,
  setSelectedMode,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  showModeFilter = true,
  isLoading = false,
}) {
  const setTodayRange = () => {
    const today = new Date().toISOString().split("T")[0];
    setDateFrom(today);
    setDateTo(today);
  };

  const setLast7DaysRange = () => {
    const today = new Date();
    const last7 = new Date();
    last7.setDate(today.getDate() - 6);

    setDateFrom(last7.toISOString().split("T")[0]);
    setDateTo(today.toISOString().split("T")[0]);
  };

  const setCurrentMonthRange = () => {
    const today = new Date();

    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    setDateFrom(firstDay.toISOString().split("T")[0]);
    setDateTo(lastDay.toISOString().split("T")[0]);
  };

  const resetFilters = () => {
    setDateFrom("");
    setDateTo("");
    setSearchTerm("");
    if (showModeFilter) {
      setSelectedMode("all");
    }
  };

  return (
    <SectionCard className="mb-4 !p-4 sm:!p-5">
      <div className="mb-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={setTodayRange}
          disabled={isLoading}
          className="rounded-full border border-dark/10 bg-base px-4 py-2 text-sm font-semibold text-dark transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          Aujourd’hui
        </button>

        <button
          type="button"
          onClick={setLast7DaysRange}
          disabled={isLoading}
          className="rounded-full border border-dark/10 bg-base px-4 py-2 text-sm font-semibold text-dark transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          7 derniers jours
        </button>

        <button
          type="button"
          onClick={setCurrentMonthRange}
          disabled={isLoading}
          className="rounded-full border border-dark/10 bg-base px-4 py-2 text-sm font-semibold text-dark transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          Ce mois
        </button>

        <button
          type="button"
          onClick={resetFilters}
          disabled={isLoading}
          className="rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Réinitialiser
        </button>
      </div>

      <div
        className={`grid gap-3 ${
          showModeFilter ? "md:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-2 xl:grid-cols-3"
        }`}
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={isLoading}
          placeholder="Rechercher par numéro, client ou téléphone..."
          className="w-full rounded-2xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none transition focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
        />

        {showModeFilter && (
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
        )}

        <div className="flex flex-col gap-1">
          <label className="px-1 text-xs font-semibold uppercase tracking-wide text-dark/60">
            Date début
          </label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            disabled={isLoading}
            className="w-full rounded-2xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none transition focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="px-1 text-xs font-semibold uppercase tracking-wide text-dark/60">
            Date fin
          </label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            disabled={isLoading}
            className="w-full rounded-2xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none transition focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>
      </div>
    </SectionCard>
  );
}