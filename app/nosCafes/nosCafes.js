"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NosCafesCard from "../components/coffees/NosCafesCard";
import CoffeeDetailsModal from "../components/coffees/CoffeeDetailsModal";

const CATEGORIES = [
  "Tous",
  "Nouveautés",
  "Classiques",
  "Lattés",
  "Glacés",
  "Moka & Chocolat",
  "Aromatisés",
  "Signatures",
  "Décaféiné",
];

export default function NosCafesPage() {
  const [coffees, setCoffees] = useState([]);
  const [activeCat, setActiveCat] = useState("Tous");
  const [q, setQ] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [selectedCoffee, setSelectedCoffee] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const toastTimeoutRef = useRef(null);

  useEffect(() => {
    const fetchCoffees = async () => {
      try {
        const res = await fetch("/api/coffees");

        if (!res.ok) {
          throw new Error("Erreur lors du chargement des cafés");
        }

        const data = await res.json();
        setCoffees(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setCoffees([]);
      }
    };

    fetchCoffees();
  }, []);

  useEffect(() => {
    try {
      const storedFavorites = JSON.parse(
        localStorage.getItem("favoriteCoffees") || "[]"
      );
      setFavorites(Array.isArray(storedFavorites) ? storedFavorites : []);
    } catch (error) {
      console.error("Erreur lecture localStorage:", error);
      setFavorites([]);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (selectedCoffee) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedCoffee]);

  const showFeedbackToast = (message) => {
    setToastMessage(message);
    setShowToast(true);

    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    toastTimeoutRef.current = setTimeout(() => {
      setShowToast(false);
    }, 1800);
  };

  const toggleFavorite = (coffee) => {
    const exists = favorites.some((fav) => fav.id === coffee.id);

    const updatedFavorites = exists
      ? favorites.filter((fav) => fav.id !== coffee.id)
      : [...favorites, coffee];

    setFavorites(updatedFavorites);
    localStorage.setItem("favoriteCoffees", JSON.stringify(updatedFavorites));
    window.dispatchEvent(new Event("favoritesUpdated"));

    showFeedbackToast(exists ? "Retiré des favoris" : "Ajouté aux favoris");
  };

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    return coffees.filter((coffee) => {
      const matchCat =
        activeCat === "Tous"
          ? true
          : activeCat === "Nouveautés"
          ? Boolean(coffee.isNew)
          : coffee.category === activeCat;

      const matchQ = query
        ? coffee.name.toLowerCase().includes(query)
        : true;

      return matchCat && matchQ;
    });
  }, [coffees, activeCat, q]);

  const openDetails = async (id) => {
    try {
      setLoadingDetails(true);

      const res = await fetch(`/api/coffees/${id}`);

      if (!res.ok) {
        const errorBody = await res.text();
        console.error("Status:", res.status);
        console.error("Body:", errorBody);
        throw new Error("Erreur lors du chargement");
      }

      const data = await res.json();
      setSelectedCoffee(data);
    } catch (error) {
      console.error("openDetails error:", error);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleToggleFavorite = (coffee) => {
    const exists = favorites.some((item) => item.id === coffee.id);

    if (exists) {
      setFavorites(favorites.filter((item) => item.id !== coffee.id));
    } else {
      setFavorites([...favorites, coffee]);
    }
  };

  return (
    <div className="relative min-h-screen mt-18 overflow-hidden bg-secondary text-dark">
      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_45%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary to-secondary/80" />

      <AnimatePresence>
        {showToast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: -10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -10, x: "-50%" }}
            transition={{ duration: 0.2 }}
            className="fixed top-24 left-1/2 z-[60] rounded-full border border-dark/10 bg-white/80 px-5 py-2.5 text-sm font-medium text-dark2 shadow-lg backdrop-blur-md"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative mx-auto max-w-6xl px-6 py-14">
        <div className="text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-dark/70 sm:text-sm">
            Coffee House
          </p>

          <h1 className="text-4xl font-bold text-dark md:text-5xl">
            Nos cafés
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-dark/75 leading-7">
            Choisissez votre café puis personnalisez-le selon vos envies.
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher un café..."
            className="w-full max-w-xl rounded-2xl border border-dark/10 bg-white/40 px-5 py-3 text-dark placeholder:text-dark/45 outline-none backdrop-blur-md shadow-sm transition-all duration-300 focus:border-primary/30 focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeCat === cat;
            const isNewTab = cat === "Nouveautés";

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCat(cat)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  isNewTab
                    ? isActive
                      ? "border-red-600 bg-red-600 text-white shadow-sm"
                      : "border-red-600/70 bg-white/35 text-red-700 hover:bg-red-600 hover:text-white"
                    : isActive
                    ? "border-dark bg-dark text-white shadow-sm"
                    : "border-dark/10 bg-white/35 text-dark hover:bg-white/55"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="mt-12 overflow-hidden">
          <motion.div
            key={`${activeCat}-${q}`}
            initial={{ opacity: 0.96, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((coffee) => {
              const isFavorite = favorites.some((fav) => fav.id === coffee.id);

              return (
                <div key={coffee.id}>
                  <NosCafesCard
                    coffee={coffee}
                    isFavorite={isFavorite}
                    onToggleFavorite={toggleFavorite}
                    onOpenDetails={openDetails}
                    isHighlighted={
                      activeCat === "Nouveautés" && Boolean(coffee.isNew)
                    }
                  />
                </div>
              );
            })}
          </motion.div>
        </div>

        {filtered.length === 0 && (
          <div className="mt-14 text-center">
            <div className="mx-auto max-w-md rounded-2xl border border-dark/10 bg-white/30 px-6 py-5 text-dark/70 backdrop-blur-sm">
              Aucun café trouvé.
            </div>
          </div>
        )}
      </div>

      {loadingDetails && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/25 backdrop-blur-sm">
          <div className="rounded-2xl border border-dark/10 bg-white px-6 py-4 text-dark shadow-xl">
            Chargement...
          </div>
        </div>
      )}

      {selectedCoffee && (
        <CoffeeDetailsModal
          coffee={selectedCoffee}
          onClose={() => setSelectedCoffee(null)}
          isFavorite={favorites.some((item) => item.id === selectedCoffee?.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
    </div>
  );
}