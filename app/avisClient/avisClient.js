"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  MessageCircleHeart,
  Star,
  Sparkles,
  ChevronRight,
  Filter,
  BadgeCheck,
  Quote,
  Search,
  X,
  Send,
  AlertCircle,
} from "lucide-react";

const MOCK_AVIS = [
  {
    id: 1,
    user_id: 101,
    user_name: "Sarah",
    rating: 5,
    comment: "Le meilleur cappuccino à Tunis ! Goût parfait et super service.",
    created_at: "2026-03-10",
  },
  {
    id: 2,
    user_id: 102,
    user_name: "Ahmed",
    rating: 5,
    comment: "Ambiance cosy et commande rapide. Je recommande fortement.",
    created_at: "2026-03-08",
  },
  {
    id: 3,
    user_id: 103,
    user_name: "Mariem",
    rating: 4,
    comment: "Très bon latte, bien équilibré. J’aime beaucoup les extras gourmands.",
    created_at: "2026-03-05",
  },
  {
    id: 4,
    user_id: 104,
    user_name: "Youssef",
    rating: 5,
    comment: "Service chaleureux et desserts excellents. Une adresse que je garde.",
    created_at: "2026-02-28",
  },
  {
    id: 5,
    user_id: 105,
    user_name: "Ines",
    rating: 4,
    comment: "Le lieu est élégant, calme et parfait pour travailler ou prendre un café entre amis.",
    created_at: "2026-02-20",
  },
  {
    id: 6,
    user_id: 106,
    user_name: "Sami",
    rating: 5,
    comment: "Très bonne expérience du début à la fin. Café de qualité et accueil top.",
    created_at: "2026-02-16",
  },
];

const MOCK_AUTH_USER = {
  id: 999,
  name: "Lisa Lisa",
  email: "lisa@example.com",
};

const ITEMS_PER_PAGE = 6;

function formatDate(dateString) {
  try {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
}

function Stars({ rating, size = 16 }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < rating ? "fill-secondary text-secondary" : "text-dark/20"}
        />
      ))}
    </div>
  );
}

function RatingBar({ label, count, total }) {
  const percentage = total > 0 ? Math.round((count / total) * 100) : 0;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
        <span className="font-semibold text-primary">{label}</span>
        <span className="text-dark/60">
          {count} avis · {percentage}%
        </span>
      </div>

      <div className="h-2.5 overflow-hidden rounded-full bg-white/60">
        <div
          className="h-full rounded-full bg-dark transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}



function FilterButton({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
        active
          ? "bg-dark text-creamy shadow-md"
          : "border border-dark/10 bg-white/45 text-dark/70 hover:bg-white/65"
      }`}
    >
      {children}
    </button>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-2xl border border-dark/10 bg-white/55 px-4 py-2 text-sm font-semibold text-dark transition disabled:cursor-not-allowed disabled:opacity-40 hover:bg-white"
      >
        Précédent
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`h-11 min-w-[44px] rounded-2xl px-3 text-sm font-semibold transition ${
            currentPage === page
              ? "bg-dark text-creamy shadow-md"
              : "border border-dark/10 bg-white/55 text-dark hover:bg-white"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-2xl border border-dark/10 bg-white/55 px-4 py-2 text-sm font-semibold text-dark transition disabled:cursor-not-allowed disabled:opacity-40 hover:bg-white"
      >
        Suivant
      </button>
    </div>
  );
}

function Toast({ toast, onClose }) {
  if (!toast) return null;

  return (
    <div className="fixed right-4 top-24 z-[70] w-full max-w-sm animate-in slide-in-from-top-2 duration-300">
      <div
        className={`rounded-2xl border px-4 py-3 shadow-xl backdrop-blur-md ${
          toast.type === "success"
            ? "border-green-200 bg-green-50/95 text-green-700"
            : "border-red-200 bg-red-50/95 text-red-700"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-semibold">{toast.title}</p>
            <p className="mt-1 text-sm">{toast.message}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 opacity-70 transition hover:opacity-100"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function ReviewCardSkeleton() {
  return (
    <div className="animate-pulse rounded-[24px] border border-dark/10 bg-white/45 p-5 shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <div className="h-4 w-28 rounded bg-dark/10" />
          <div className="h-3 w-20 rounded bg-dark/10" />
        </div>
        <div className="h-8 w-14 rounded-full bg-dark/10" />
      </div>

      <div className="mt-4 flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-4 w-4 rounded bg-dark/10" />
        ))}
      </div>

      <div className="mt-4 space-y-2">
        <div className="h-3 w-full rounded bg-dark/10" />
        <div className="h-3 w-[90%] rounded bg-dark/10" />
        <div className="h-3 w-[70%] rounded bg-dark/10" />
      </div>
    </div>
  );
}

function EmptyState({ search, selectedFilter, onReset }) {
  return (
    <div className="rounded-[24px] border border-dark/10 bg-white/50 px-6 py-10 text-center shadow-lg">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Search size={26} />
      </div>

      <h3 className="mt-4 text-xl font-bold text-dark">Aucun avis trouvé</h3>
      <p className="mx-auto mt-2 max-w-md leading-7 text-dark/65">
        Aucun résultat ne correspond à votre recherche
        {search ? ` “${search}”` : ""} {selectedFilter !== "all" ? "avec ce filtre" : ""}.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-5 inline-flex items-center justify-center rounded-2xl bg-dark px-5 py-3 font-semibold text-accent shadow-md transition hover:scale-[1.02] hover:opacity-95"
      >
        Réinitialiser
      </button>
    </div>
  );
}

function ReviewFormModal({
  open,
  onClose,
  authUser,
  onSubmitReview,
  isSubmitting,
  validationErrors,
}) {
  const [form, setForm] = useState({
    rating: 0,
    comment: "",
  });
  const [hoveredStar, setHoveredStar] = useState(0);

  useEffect(() => {
    if (!open) {
      setForm({ rating: 0, comment: "" });
      setHoveredStar(0);
    }
  }, [open]);

  if (!open) return null;

  const ratingError = validationErrors?.rating?.[0];
  const commentError = validationErrors?.comment?.[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmitReview({
      rating: form.rating,
      comment: form.comment.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark/45 px-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl animate-in zoom-in-95 fade-in duration-300 rounded-[30px] border border-dark/10 bg-secondary p-6 shadow-2xl md:p-7">
        <div className="relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/60 text-dark transition hover:bg-white"
          >
            <X size={18} />
          </button>

          <div className="mb-6 pr-12">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">
              <MessageCircleHeart size={16} />
              Laisser votre avis
            </div>

            <h3 className="font-heading text-2xl font-bold text-dark">
              Partagez votre expérience
            </h3>

            <p className="mt-2 text-dark/70">
              Merci{" "}
              <span className="font-semibold text-primary">{authUser?.name || "Client"}</span>,
              votre nom sera ajouté automatiquement.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block font-semibold text-primary">
                Nom du client
              </label>
              <input
                type="text"
                value={authUser?.name || ""}
                disabled
                className="w-full rounded-2xl border border-dark/10 bg-white/50 px-4 py-3 text-dark/70 outline-none"
              />
            </div>

            <div>
              <label className="mb-3 block font-semibold text-primary">
                Votre note
              </label>

              <div className="flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, i) => {
                  const value = i + 1;
                  const active = value <= (hoveredStar || form.rating);

                  return (
                    <button
                      key={value}
                      type="button"
                      onMouseEnter={() => setHoveredStar(value)}
                      onMouseLeave={() => setHoveredStar(0)}
                      onClick={() => setForm((prev) => ({ ...prev, rating: value }))}
                      className="transition hover:scale-110"
                    >
                      <Star
                        size={30}
                        className={active ? "fill-secondary text-secondary" : "text-dark/25"}
                      />
                    </button>
                  );
                })}
              </div>

              <p className="mt-2 text-sm text-dark/60">
                {form.rating > 0
                  ? `Vous avez donné ${form.rating} étoile${form.rating > 1 ? "s" : ""}.`
                  : "Choisissez une note entre 1 et 5 étoiles."}
              </p>

              {ratingError && (
                <p className="mt-2 text-sm font-medium text-red-600">{ratingError}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block font-semibold text-primary">
                Commentaire
              </label>
              <textarea
                name="comment"
                value={form.comment}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, comment: e.target.value }))
                }
                placeholder="Écrivez votre expérience..."
                className={`h-36 w-full resize-none rounded-2xl border bg-white/60 px-4 py-3 text-dark outline-none backdrop-blur-sm transition-all duration-300 placeholder:text-dark2/40 focus:ring-2 ${
                  commentError
                    ? "border-red-300 focus:border-red-300 focus:ring-red-100"
                    : "border-dark/10 focus:border-primary/30 focus:ring-primary/20"
                }`}
              />

              {commentError && (
                <p className="mt-2 text-sm font-medium text-red-600">{commentError}</p>
              )}
            </div>

            <div className="flex justify-center pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex min-w-[220px] items-center justify-center gap-2 rounded-2xl bg-dark px-5 py-3 font-semibold text-accent shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send size={18} />
                {isSubmitting ? "Envoi..." : "Publier mon avis"}
                <ChevronRight size={17} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function AvisClientPage() {
  const [avis, setAvis] = useState([]);
  const [authUser, setAuthUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  const [selectedFilter, setSelectedFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setPageError("");

        const [reviewsData, meData] = await Promise.all([
          fetchReviews(),
          fetchAuthenticatedUser().catch(() => null),
        ]);

        setAvis(Array.isArray(reviewsData) ? reviewsData : []);
        setAuthUser(meData);
      } catch (error) {
        setPageError(error.message || "Erreur de chargement.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (!toast) return;

    const timeout = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(timeout);
  }, [toast]);

  const totalReviews = avis.length;
  const averageRating =
    totalReviews > 0
      ? avis.reduce((sum, item) => sum + Number(item.rating), 0) / totalReviews
      : 0;

  const count5 = avis.filter((item) => Number(item.rating) === 5).length;
  const count4 = avis.filter((item) => Number(item.rating) === 4).length;
  const count3 = avis.filter((item) => Number(item.rating) === 3).length;
  const count2 = avis.filter((item) => Number(item.rating) === 2).length;
  const count1 = avis.filter((item) => Number(item.rating) === 1).length;

  const filteredAvis = useMemo(() => {
    let result = [...avis];

    if (selectedFilter !== "all") {
      result = result.filter((item) => Number(item.rating) === Number(selectedFilter));
    }

    if (search.trim()) {
      const term = search.toLowerCase();
      result = result.filter(
        (item) =>
          item.user_name?.toLowerCase().includes(term) ||
          item.comment?.toLowerCase().includes(term)
      );
    }

    return result.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
  }, [avis, selectedFilter, search]);

  const totalPages = Math.ceil(filteredAvis.length / ITEMS_PER_PAGE);

  const paginatedAvis = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAvis.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAvis, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilter, search]);

  const resetSearchAndFilter = () => {
    setSearch("");
    setSelectedFilter("all");
    setCurrentPage(1);
  };

  const handleOpenForm = () => {
    if (!authUser) {
      setToast({
        type: "error",
        title: "Connexion requise",
        message: "Veuillez vous connecter pour laisser un avis.",
      });
      return;
    }

    setValidationErrors({});
    setIsFormOpen(true);
  };

  const handleSubmitReview = async (payload) => {
  try {
    setIsSubmittingReview(true);
    setValidationErrors({});

    if (!payload.rating) {
      setValidationErrors({
        rating: ["Veuillez choisir une note."],
      });
      return false;
    }

    if (!payload.comment?.trim()) {
      setValidationErrors({
        comment: ["Veuillez écrire votre commentaire."],
      });
      return false;
    }

    const newReview = {
      id: Date.now(),
      user_id: authUser?.id,
      user_name: authUser?.name || "Client",
      rating: payload.rating,
      comment: payload.comment.trim(),
      created_at: new Date().toISOString(),
    };

    setAvis((prev) => [newReview, ...prev]);
    setIsFormOpen(false);

    setToast({
      type: "success",
      title: "Avis publié",
      message: "Merci, votre avis a été ajouté avec succès.",
    });

    return true;
  } catch (error) {
    setToast({
      type: "error",
      title: "Erreur",
      message: "Impossible d'envoyer votre avis.",
    });
    return false;
  } finally {
    setIsSubmittingReview(false);
  }
};

  return (
    <>
      <Toast toast={toast} onClose={() => setToast(null)} />

      <div className="relative min-h-screen overflow-hidden bg-secondary pt-20 text-dark">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_42%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(139,94,60,0.10),transparent_30%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary to-secondary/85" />

        <div className="relative mx-auto max-w-6xl px-6 py-8 md:py-10">
          <section className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-dark/10 bg-white/45 px-4 py-2 shadow-sm backdrop-blur-sm">
              <Sparkles size={15} className="text-primary" />
              <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-dark/70">
                Coffee House
              </p>
            </div>

            <h1 className="mt-4 font-heading text-3xl font-bold text-dark md:text-4xl lg:text-[58px]">
              Avis clients
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-dark/75 md:text-lg">
              Découvrez les retours et impressions de nos clients après leur expérience chez Coffee House.
            </p>
          </section>

          <section className="mt-8 grid gap-4 md:grid-cols-3 md:mt-10">
            <div className="rounded-[28px] border border-dark/10 bg-white/40 p-5 shadow-xl backdrop-blur-md">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">
                <Star size={16} />
                Note moyenne
              </div>

              <div className="flex items-end gap-3">
                <h2 className="text-4xl font-bold text-dark">
                  {averageRating.toFixed(1)}
                </h2>
                <p className="pb-1 text-dark/60">/ 5</p>
              </div>

              <div className="mt-3">
                <Stars rating={Math.round(averageRating)} />
              </div>
            </div>

            <div className="rounded-[28px] border border-dark/10 bg-white/40 p-5 shadow-xl backdrop-blur-md">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">
                <BadgeCheck size={16} />
                Avis excellents
              </div>

              <h2 className="text-4xl font-bold text-dark">{count5}</h2>
              <p className="mt-2 text-dark/70">clients nous ont attribué 5 étoiles.</p>
            </div>

            <div className="rounded-[28px] border border-dark/10 bg-white/40 p-5 shadow-xl backdrop-blur-md">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">
                <MessageCircleHeart size={16} />
                Total des avis
              </div>

              <h2 className="text-4xl font-bold text-dark">{totalReviews}</h2>
              <p className="mt-2 text-dark/70">retours publiés par nos clients.</p>
            </div>
          </section>

          <section className="mt-8 grid items-start gap-6 lg:grid-cols-[0.95fr_1.05fr] md:mt-10">
            <div className="space-y-4">
              <div className="rounded-[28px] border border-dark/10 bg-white/40 p-6 shadow-xl backdrop-blur-md md:p-7">
                <div className="mb-5">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">
                    <Filter size={16} />
                    Recherche & filtres
                  </div>

                  <h2 className="font-heading text-xl font-bold text-dark md:text-2xl">
                    Parcourir les avis
                  </h2>

                  <p className="mt-2 text-dark/70">
                    Recherchez un nom, un mot-clé ou filtrez par note.
                  </p>
                </div>

                <div className="relative mb-4">
                  <Search
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-dark/45"
                  />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Rechercher un avis..."
                    className="w-full rounded-2xl border border-dark/10 bg-white/60 py-3 pl-11 pr-4 text-dark outline-none backdrop-blur-sm transition-all duration-300 placeholder:text-dark2/40 focus:border-primary/30 focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="flex flex-wrap gap-3">
                  <FilterButton active={selectedFilter === "all"} onClick={() => setSelectedFilter("all")}>
                    Tous
                  </FilterButton>
                  <FilterButton active={selectedFilter === "5"} onClick={() => setSelectedFilter("5")}>
                    5 étoiles
                  </FilterButton>
                  <FilterButton active={selectedFilter === "4"} onClick={() => setSelectedFilter("4")}>
                    4 étoiles
                  </FilterButton>
                  <FilterButton active={selectedFilter === "3"} onClick={() => setSelectedFilter("3")}>
                    3 étoiles
                  </FilterButton>
                  <FilterButton active={selectedFilter === "2"} onClick={() => setSelectedFilter("2")}>
                    2 étoiles
                  </FilterButton>
                  <FilterButton active={selectedFilter === "1"} onClick={() => setSelectedFilter("1")}>
                    1 étoile
                  </FilterButton>
                </div>
              </div>

              <div className="rounded-[28px] border border-dark/10 bg-white/40 p-6 shadow-xl backdrop-blur-md md:p-7">
                <div className="mb-5">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">
                    <Quote size={16} />
                    Répartition des notes
                  </div>

                  <h2 className="font-heading text-xl font-bold text-dark md:text-2xl">
                    Détail des évaluations
                  </h2>
                </div>

                <div className="space-y-4">
                  <RatingBar label="5★" count={count5} total={totalReviews} />
                  <RatingBar label="4★" count={count4} total={totalReviews} />
                  <RatingBar label="3★" count={count3} total={totalReviews} />
                  <RatingBar label="2★" count={count2} total={totalReviews} />
                  <RatingBar label="1★" count={count1} total={totalReviews} />
                </div>
              </div>

              <div className="rounded-[28px] border border-dark/10 bg-white/35 p-5 shadow-lg backdrop-blur-md">
                <p className="leading-7 text-dark/70">
                  Votre satisfaction est au cœur de notre expérience. Chaque avis nous aide à améliorer nos produits et notre service au quotidien.
                </p>
              </div>
            </div>

            <div className="rounded-[28px] border border-dark/10 bg-white/35 p-6 shadow-2xl backdrop-blur-md md:p-7">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">
                    <MessageCircleHeart size={16} />
                    Témoignages
                  </div>

                  <h2 className="font-heading text-xl font-bold text-dark md:text-2xl">
                    Tous les retours clients
                  </h2>

                  <p className="mt-2 text-dark/70">
                    {filteredAvis.length} avis trouvé{filteredAvis.length > 1 ? "s" : ""}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 self-start rounded-2xl border border-dark/10 bg-white/60 px-4 py-2 text-sm font-semibold text-dark transition-all duration-300 hover:bg-white"
                  >
                    Nous contacter
                    <ChevronRight size={16} />
                  </Link>

                  <button
                    type="button"
                    onClick={handleOpenForm}
                    className="inline-flex items-center gap-2 self-start rounded-2xl bg-dark px-4 py-2 text-sm font-semibold text-accent shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:opacity-95"
                  >
                    Laisser votre avis
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {loading ? (
  <div className="grid gap-4 md:grid-cols-2">
    {Array.from({ length: 6 }).map((_, i) => (
      <ReviewCardSkeleton key={i} />
    ))}
  </div>
) : paginatedAvis.length === 0 ? (
  <EmptyState
    search={search}
    selectedFilter={selectedFilter}
    onReset={resetSearchAndFilter}
  />
) : (
  <>
    <div className="grid gap-4 md:grid-cols-2">
      {paginatedAvis.map((item) => (
        <div
          key={item.id}
          className="rounded-[24px] border border-dark/10 bg-white/45 p-5 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-semibold text-primary">{item.user_name}</p>
              <p className="mt-1 text-sm text-dark/50">
                {formatDate(item.created_at)}
              </p>
            </div>

            <div className="rounded-full bg-creamy px-3 py-1 text-sm font-semibold text-primary shadow-sm">
              {Number(item.rating).toFixed(1)}
            </div>
          </div>

          <div className="mt-4">
            <Stars rating={Number(item.rating)} />
          </div>

          <p className="mt-4 leading-7 text-dark/75">“{item.comment}”</p>
        </div>
      ))}
    </div>

    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
    />
  </>
)}
            </div>
          </section>
        </div>
      </div>

      <ReviewFormModal
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        authUser={authUser}
        onSubmitReview={handleSubmitReview}
        isSubmitting={isSubmittingReview}
        validationErrors={validationErrors}
      />
    </>
  );
}