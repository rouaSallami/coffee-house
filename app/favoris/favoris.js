"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Sparkles, ChevronRight } from "lucide-react";
import NosCafesCard from "../components/coffees/NosCafesCard";
import CoffeeDetailsModal from "../components/coffees/CoffeeDetailsModal";
import { getUserData, setUserData } from "../lib/storage";

export default function FavorisPage() {
  const [favorites, setFavorites] = useState([]);
  const [selectedCoffee, setSelectedCoffee] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    const loadFavorites = () => {
      try {
        const storedFavorites = getUserData("favoriteCoffees", []);
        setFavorites(Array.isArray(storedFavorites) ? storedFavorites : []);
      } catch (error) {
        console.error("Erreur lecture favoris:", error);
        setFavorites([]);
      }
    };

    loadFavorites();
    window.addEventListener("favoritesUpdated", loadFavorites);

    return () => {
      window.removeEventListener("favoritesUpdated", loadFavorites);
    };
  }, []);

  const toggleFavorite = (coffee) => {
    const exists = favorites.some((fav) => fav.id === coffee.id);

    let updatedFavorites = [];

    if (exists) {
      updatedFavorites = favorites.filter((fav) => fav.id !== coffee.id);
    } else {
      updatedFavorites = [...favorites, coffee];
    }

    setFavorites(updatedFavorites);
    setUserData("favoriteCoffees", updatedFavorites);
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  const openDetails = async (id) => {
    try {
      setLoadingDetails(true);

      const res = await fetch(`/api/coffees/${id}`);
      if (!res.ok) throw new Error("Erreur lors du chargement");

      const data = await res.json();
      setSelectedCoffee(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingDetails(false);
    }
  };

  const isSelectedFavorite = selectedCoffee
    ? favorites.some((fav) => fav.id === selectedCoffee.id)
    : false;

  return (
    <div className="relative min-h-screen overflow-hidden bg-secondary pt-20 text-dark">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_42%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(139,94,60,0.10),transparent_30%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary to-secondary/85" />

      <div className="relative mx-auto max-w-6xl px-6 py-8 md:py-10">
        {/* Hero */}
        <div className="mb-8 text-center md:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-dark/10 bg-white/45 px-4 py-2 shadow-sm backdrop-blur-sm">
            <Sparkles size={15} className="text-primary" />
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-dark/70">
              Coffee House
            </p>
          </div>

          <h1 className="mt-4 font-heading text-3xl font-bold text-dark md:text-4xl">
            Mes favoris
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-dark/75 md:text-lg">
            Retrouvez ici vos cafés préférés et accédez rapidement à ceux que
            vous aimez le plus.
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="rounded-[30px] border border-dark/10 bg-white/35 p-8 text-center shadow-2xl backdrop-blur-md md:p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-creamy text-primary shadow-sm">
              <Heart size={28} />
            </div>

            <p className="mt-5 text-xl font-bold text-primary">
              Aucun café en favoris
            </p>

            <p className="mx-auto mt-2 max-w-md leading-7 text-dark/70">
              Ajoutez vos cafés préférés pour les retrouver ici en un seul
              endroit.
            </p>

            <Link
              href="/nosCafes"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95"
            >
              Découvrir nos cafés
              <ChevronRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((coffee) => (
              <NosCafesCard
                key={coffee.id}
                coffee={coffee}
                isFavorite={true}
                onToggleFavorite={toggleFavorite}
                onOpenDetails={openDetails}
                isHighlighted={false}
              />
            ))}
          </div>
        )}
      </div>

      {loadingDetails && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/30 px-4 backdrop-blur-sm">
          <div className="rounded-2xl border border-dark/10 bg-white/90 px-6 py-4 text-dark shadow-xl">
            Chargement...
          </div>
        </div>
      )}

      {selectedCoffee && (
        <CoffeeDetailsModal
          coffee={selectedCoffee}
          onClose={() => setSelectedCoffee(null)}
          isFavorite={isSelectedFavorite}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
}