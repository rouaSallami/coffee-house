"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NosCafesCard from "../components/coffees/NosCafesCard";
import CoffeeDetailsModal from "../components/coffees/CoffeeDetailsModal";
import { getUserData, setUserData } from "../lib/storage";
import { Coffee, Search } from "lucide-react";
import { API_BASE_URL } from "../../lib/api/config";

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
        const res = await fetch(`${API_BASE_URL}/coffees`);

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
    const storedFavorites = getUserData("favoriteCoffees", []);
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
    setUserData("favoriteCoffees", updatedFavorites);
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

      const res = await fetch(`${API_BASE_URL}/coffees/${id}`);

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

  const updatedFavorites = exists
    ? favorites.filter((item) => item.id !== coffee.id)
    : [...favorites, coffee];

  setFavorites(updatedFavorites);
  setUserData("favoriteCoffees", updatedFavorites);
  window.dispatchEvent(new Event("favoritesUpdated"));
};

  return (
    <div className="relative min-h-screen overflow-hidden bg-secondary pt-20 text-dark">
  {/* Background */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_42%)]" />
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(139,94,60,0.10),transparent_30%)]" />
  <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary to-secondary/85" />

  {/* Toast */}
  <AnimatePresence>
    {showToast && (
      <motion.div
        key="toast"
        initial={{ opacity: 0, y: -10, x: "-50%" }}
        animate={{ opacity: 1, y: 0, x: "-50%" }}
        exit={{ opacity: 0, y: -10, x: "-50%" }}
        transition={{ duration: 0.2 }}
        className="fixed left-1/2 top-24 z-[60] rounded-full border border-dark/10 bg-white/80 px-5 py-2.5 text-sm font-medium text-dark2 shadow-lg backdrop-blur-md"
      >
        {toastMessage}
      </motion.div>
    )}
  </AnimatePresence>

  <div className="relative mx-auto max-w-6xl px-6 py-8 md:py-10">
    {/* Hero */}
    <div className="mb-8 text-center md:mb-10">
      <div className="inline-flex items-center gap-2 rounded-full border border-dark/10 bg-white/45 px-4 py-2 shadow-sm backdrop-blur-sm">
        <Coffee size={14} className="text-primary" />
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-dark/70">
          Coffee House
        </span>
      </div>

      <h1 className="mt-4 text-4xl font-bold text-dark font-heading md:text-5xl">
        Nos cafés
      </h1>

      <p className="mx-auto mt-3 max-w-2xl text-dark/75 leading-7">
        Choisissez votre café puis personnalisez-le selon vos envies.
      </p>
    </div>

    {/* Search */}
    <div className="mt-6 flex justify-center">
      <div className="relative w-full max-w-xl">
        <Search
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-dark/45"
        />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Rechercher un café..."
          className="w-full rounded-2xl border border-dark/10 bg-white/45 py-3 pl-11 pr-5 text-dark placeholder:text-dark/45 outline-none backdrop-blur-md shadow-sm transition-all duration-300 focus:border-primary/30 focus:ring-2 focus:ring-primary/20"
        />
      </div>
    </div>

    {/* Categories */}
    <div className="mt-6 flex flex-wrap justify-center gap-2">
      {CATEGORIES.map((cat) => {
        const isActive = activeCat === cat;
        const isNewTab = cat === "Nouveautés";

        return (
          <motion.button
            key={cat}
            type="button"
            onClick={() => setActiveCat(cat)}
            whileTap={{ scale: 0.97 }}
            whileHover={{ y: -1 }}
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
          </motion.button>
        );
      })}
    </div>

    {/* Grid */}
    <div className="mt-8 md:mt-10">
      <motion.div
        key={`${activeCat}-${q}`}
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.06,
            },
          },
        }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((coffee) => {
          const isFavorite = favorites.some((fav) => fav.id === coffee.id);

          return (
            <motion.div
              key={coffee.id}
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              className="h-full"
            >
              <NosCafesCard
                coffee={coffee}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
                onOpenDetails={openDetails}
                isHighlighted={
                  activeCat === "Nouveautés" && Boolean(coffee.isNew)
                }
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>

    {/* Empty */}
    {filtered.length === 0 && (
      <div className="mt-10 text-center">
        <div className="mx-auto max-w-md rounded-[28px] border border-dark/10 bg-white/35 px-6 py-6 text-dark/70 backdrop-blur-md shadow-sm">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-creamy text-primary">
            <Coffee size={20} />
          </div>
          <p className="font-semibold text-primary">Aucun café trouvé</p>
          <p className="mt-1 text-sm text-dark/65">
            Essayez un autre mot-clé ou changez de catégorie.
          </p>
        </div>
      </div>
    )}
  </div>

  {/* Loader */}
  {loadingDetails && (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/25 px-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-[28px] border border-dark/10 bg-white/90 p-5 shadow-xl">
        <div className="animate-pulse space-y-3">
          <div className="h-4 w-24 rounded-full bg-dark/10" />
          <div className="h-10 w-full rounded-2xl bg-dark/10" />
          <div className="h-10 w-5/6 rounded-2xl bg-dark/10" />
        </div>
      </div>
    </div>
  )}

  {/* Modal */}
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