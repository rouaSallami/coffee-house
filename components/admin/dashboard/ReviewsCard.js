"use client";

import { useEffect, useState } from "react";

function StatBox({ value, label }) {
  return (
    <div className="rounded-2xl border border-dark/10 bg-white/40 p-4">
      <p className="text-3xl font-bold text-dark">{value}</p>
      <p className="mt-2 text-sm text-dark/65">{label}</p>
    </div>
  );
}

export default function ReviewsCard() {
  const [data, setData] = useState({
    total: 0,
    average: 0,
    latest: [],
  });
  const [loading, setLoading] = useState(true);

  const loadReviewsSummary = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const res = await fetch("/backend/admin/reviews-summary", {
        cache: "no-store",
        headers: {
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json?.message || "Erreur lors du chargement des avis");
      }

      setData({
        total: Number(json?.total || 0),
        average: Number(json?.average || 0),
        latest: Array.isArray(json?.latest) ? json.latest : [],
      });
    } catch (e) {
      console.error("ReviewsCard error:", e);
      setData({
        total: 0,
        average: 0,
        latest: [],
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviewsSummary();
  }, []);

  const handleDeleteReview = async (reviewId) => {
  const confirmed = window.confirm(
    "Êtes-vous sûr de vouloir supprimer cet avis ?"
  );

  if (!confirmed) return;

  try {
    const token = sessionStorage.getItem("token");

    const res = await fetch(`/backend/admin/reviews/${reviewId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const json = await res.json();

    if (!res.ok) {
      alert(json?.message || "Erreur lors de la suppression");
      return;
    }

    await loadReviewsSummary();
  } catch (error) {
    console.error("Delete review error:", error);
    alert("Erreur serveur");
  }
};

  if (loading) {
    return (
      <div className="mb-8 grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-dark/10 bg-base p-5 shadow-sm">
          <p className="text-dark/60">Chargement...</p>
        </div>
        <div className="rounded-3xl border border-dark/10 bg-base p-5 shadow-sm">
          <p className="text-dark/60">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8 grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-3xl border border-dark/10 bg-base p-5 shadow-sm">
        <h3 className="mb-5 text-2xl font-bold text-dark">Avis clients</h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <StatBox value={data.average.toFixed(1)} label="Note moyenne" />
          <StatBox value={data.total} label="Avis publiés" />
        </div>

        <p className="mt-4 text-sm text-dark/60">
          Vue rapide sur la satisfaction client.
        </p>
      </div>

      <div className="rounded-3xl border border-dark/10 bg-base p-5 shadow-sm">
  <div className="mb-5 flex items-center justify-between gap-3">
    <h3 className="text-2xl font-bold text-dark">Dernier avis</h3>

    <a
      href="/admin/avis"
      className="inline-flex items-center justify-center rounded-2xl bg-dark px-4 py-2 text-sm font-semibold text-creamy shadow-sm transition hover:opacity-95"
    >
      Voir tous les avis
    </a>
  </div>

  {data.latest.length > 0 ? (
    <div className="rounded-2xl border border-dark/10 bg-white/40 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <p className="font-semibold text-dark">
              {data.latest[0].user_name || "Client"}
            </p>

            <span className="rounded-full bg-creamy px-3 py-1 text-sm font-semibold text-primary">
              {Number(data.latest[0].rating || 0).toFixed(1)}
            </span>
          </div>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-dark/70">
            {data.latest[0].comment || "Aucun commentaire"}
          </p>
        </div>

        <button
          type="button"
          onClick={() => handleDeleteReview(data.latest[0].id)}
          className="shrink-0 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
        >
          Supprimer
        </button>
      </div>
    </div>
  ) : (
    <p className="text-dark/60">Aucun avis disponible.</p>
  )}
</div>
    </div>
  );
}