"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
    <div className="relative min-h-screen mt-16 overflow-hidden bg-secondary text-dark">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_45%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary to-secondary/80" />

      <div className="relative max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-dark/70 text-sm font-semibold uppercase tracking-[0.2em]">
            Coffee House
          </p>

          <h1 className="text-4xl font-bold text-dark mt-3 font-heading">
            Mes favoris
          </h1>

          <p className="text-dark/75 mt-4 max-w-2xl mx-auto leading-7">
            Retrouvez ici vos cafés préférés.
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="rounded-3xl p-10 border border-dark/10 bg-white/30 backdrop-blur-md shadow-xl text-center">
            <p className="text-primary text-lg font-semibold">
              Aucun café en favoris
            </p>

            <p className="text-dark/70 mt-2">
              Ajoutez vos cafés préférés pour les retrouver ici.
            </p>

            <Link
              href="/nosCafes"
              className="mt-6 inline-flex rounded-2xl bg-primary text-white px-6 py-3 font-semibold transition hover:opacity-95 shadow-md"
            >
              Découvrir nos cafés
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/30 backdrop-blur-sm">
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