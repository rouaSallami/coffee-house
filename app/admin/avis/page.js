"use client";

import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 10;

export default function AdminAvisPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedRating, setSelectedRating] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const loadReviews = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const res = await fetch("/backend/reviews", {
        headers: {
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        cache: "no-store",
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json?.message || "Erreur chargement avis");
      }

      setReviews(Array.isArray(json) ? json : []);
    } catch (e) {
      console.error(e);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);


  const filteredReviews = reviews.filter((review) => {
  const term = search.trim().toLowerCase();

  const matchesSearch = !term
    ? true
    : (review.user_name || "").toLowerCase().includes(term);

  const matchesRating =
    selectedRating === "all"
      ? true
      : Number(review.rating) === Number(selectedRating);

  return matchesSearch && matchesRating;
});



const totalPages = Math.ceil(filteredReviews.length / ITEMS_PER_PAGE);

const paginatedReviews = filteredReviews.slice(
  (currentPage - 1) * ITEMS_PER_PAGE,
  currentPage * ITEMS_PER_PAGE
);


useEffect(() => {
  setCurrentPage(1);
}, [search, selectedRating]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cet avis ?"
    );

    if (!confirmed) return;

    try {
      const token = sessionStorage.getItem("token");

      const res = await fetch(`/backend/admin/reviews/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!res.ok) {
        alert("Erreur suppression");
        return;
      }

      await loadReviews();
setCurrentPage(1);
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return <p className="p-6">Chargement...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold text-dark">
  Tous les avis clients
</h1>

<div className="mb-6">
  <input
    type="text"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Rechercher par client..."
    className="w-full rounded-2xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none transition focus:border-primary"
  />
</div>

<div className="mb-6 flex flex-wrap gap-3">
  <button
    type="button"
    onClick={() => setSelectedRating("all")}
    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
      selectedRating === "all"
        ? "bg-primary text-white"
        : "border border-dark/10 bg-white text-dark hover:bg-base"
    }`}
  >
    Toutes
  </button>

  {[5, 4, 3, 2, 1].map((rating) => (
    <button
      key={rating}
      type="button"
      onClick={() => setSelectedRating(String(rating))}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
        selectedRating === String(rating)
          ? "bg-primary text-white"
          : "border border-dark/10 bg-white text-dark hover:bg-base"
      }`}
    >
      {rating} étoile{rating > 1 ? "s" : ""}
    </button>
  ))}
</div>

      <div className="space-y-4">
        {paginatedReviews.length > 0 ? (
          paginatedReviews.map((r) => (
            <div
              key={r.id}
              className="rounded-3xl border border-dark/10 bg-base p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-3">
                    <p className="font-semibold text-dark">
                      {r.user_name || "Client"}
                    </p>

                    <span className="rounded-full bg-creamy px-3 py-1 text-sm font-semibold text-primary">
                      {Number(r.rating || 0).toFixed(1)}
                    </span>
                  </div>

                  <p className="mt-2 text-dark/70">
                    {r.comment}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(r.id)}
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-dark/60">Aucun avis disponible.</p>
        )}
      </div>

      {totalPages > 1 && (
  <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
    <button
      type="button"
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
      className="rounded-2xl border border-dark/10 bg-white px-4 py-2 text-sm font-semibold text-dark transition disabled:cursor-not-allowed disabled:opacity-40 hover:bg-base"
    >
      Précédent
    </button>

    {Array.from({ length: totalPages }).map((_, i) => {
      const page = i + 1;

      return (
        <button
          key={page}
          type="button"
          onClick={() => setCurrentPage(page)}
          className={`h-11 min-w-[44px] rounded-2xl px-3 text-sm font-semibold transition ${
            currentPage === page
              ? "bg-primary text-white"
              : "border border-dark/10 bg-white text-dark hover:bg-base"
          }`}
        >
          {page}
        </button>
      );
    })}

    <button
      type="button"
      onClick={() =>
        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
      }
      disabled={currentPage === totalPages}
      className="rounded-2xl border border-dark/10 bg-white px-4 py-2 text-sm font-semibold text-dark transition disabled:cursor-not-allowed disabled:opacity-40 hover:bg-base"
    >
      Suivant
    </button>
  </div>
)}
    </div>
  );
}