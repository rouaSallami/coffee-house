"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

function Stars({ rating }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={i < rating ? "text-secondary" : "text-dark/20"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

const fetchReviews = async () => {
  const res = await fetch("/backend/reviews", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Erreur lors du chargement des avis");
  }

  return res.json();
};

export default function AvisPreview() {
  const [avis, setAvis] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await fetchReviews();
        setAvis(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Load reviews error:", error);
        setAvis([]);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  const latestAvis = useMemo(() => {
    return [...avis]
      .sort(
  (a, b) =>
    new Date(b.created_at || 0) - new Date(a.created_at || 0)
)
      .slice(0, 3)
      .map((item) => ({
        id: item.id,
        name: item.user_name || "Client",
        rating: Number(item.rating || 0),
        text: item.comment,
      }));
  }, [avis]);

  const averageRating = useMemo(() => {
    if (!avis.length) return 0;

    const total = avis.reduce((sum, item) => sum + Number(item.rating || 0), 0);
    return total / avis.length;
  }, [avis]);

  return (
    <section className="relative overflow-hidden bg-secondary py-20 text-dark">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_45%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary to-secondary/80" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-dark/70">
              Témoignages
            </p>

            <h2 className="text-3xl font-bold text-dark sm:text-4xl">
              Avis clients
            </h2>

            <p className="mt-3 text-dark/75">
              Découvrez les retours de nos clients après leur expérience Coffee House.
            </p>
          </div>

          <div className="rounded-2xl border border-dark/10 bg-creamy/40 px-5 py-4 shadow-lg backdrop-blur-md">
            <div className="flex items-center gap-3">
              <p className="text-2xl font-bold text-dark/80">
                {avis.length > 0 ? averageRating.toFixed(1) : "--"}
              </p>

              <div>
                <Stars rating={Math.round(averageRating * 2) / 2} />
                <p className="mt-1 text-sm text-dark/60">
                  Basé sur {avis.length} avis
                </p>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-3xl border border-dark/10 bg-creamy/40 p-6 shadow-lg backdrop-blur-md"
              >
                <div className="h-4 w-24 animate-pulse rounded bg-dark/10" />
                <div className="mt-4 h-16 animate-pulse rounded bg-dark/10" />
                <div className="mt-5 h-4 w-20 animate-pulse rounded bg-dark/10" />
              </div>
            ))}
          </div>
        ) : latestAvis.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-3">
            {latestAvis.map((a) => (
              <div
                key={a.id}
                className="rounded-3xl border border-dark/10 bg-creamy/40 p-6 shadow-lg backdrop-blur-md transition hover:-translate-y-1"
              >
                <Stars rating={a.rating} />

                <p className="mt-4 text-sm leading-relaxed text-dark/75">
                  “{a.text}”
                </p>

                <p className="mt-5 font-semibold text-dark">{a.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dark/10 bg-creamy/30 px-6 py-10 text-center shadow-lg">
            <h3 className="text-xl font-bold text-dark">Soyez le premier à laisser un avis</h3>
            <p className="mt-2 text-dark/70">
              Les premiers avis clients apparaîtront ici bientôt.
            </p>
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/avisClient"
            className="inline-flex items-center justify-center rounded-2xl bg-dark px-8 py-3.5 font-semibold text-creamy shadow-lg transition hover:scale-[1.02] hover:opacity-95"
          >
            Voir tous les avis
          </Link>
        </div>
      </div>
    </section>
  );
}