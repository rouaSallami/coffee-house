"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { getUserData, setUserData } from "../../lib/storage";

export default function HomeCoffeeCard({ coffee, variant = "home" }) {
  const isMenu = variant === "menu";
  const [isFavorite, setIsFavorite] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
  const storedFavorites = getUserData("favoriteCoffees", []);
  const exists = storedFavorites.some((fav) => fav.id === coffee.id);
  setIsFavorite(exists);
}, [coffee.id]);

const toggleFavorite = () => {
  const storedFavorites = getUserData("favoriteCoffees", []);

  let updatedFavorites;

  if (storedFavorites.some((fav) => fav.id === coffee.id)) {
    updatedFavorites = storedFavorites.filter((fav) => fav.id !== coffee.id);
    setIsFavorite(false);
    setToastMessage("Retiré des favoris");
  } else {
    updatedFavorites = [...storedFavorites, coffee];
    setIsFavorite(true);
    setToastMessage("Ajouté aux favoris");
  }

  setUserData("favoriteCoffees", updatedFavorites);
  window.dispatchEvent(new Event("favoritesUpdated"));

  setShowToast(true);
  setTimeout(() => {
    setShowToast(false);
  }, 1800);
};

  const fromPrice = coffee.sizes?.length
    ? Math.min(...coffee.sizes.map((s) => s.price))
    : coffee.price;

  return (
    <div
      className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
      {showToast && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 rounded-full bg-dark text-white text-xs px-4 py-2 shadow-lg animate-pulse">
          {toastMessage}
        </div>
      )}

      <div className="relative w-full h-48 overflow-hidden rounded-2xl mb-4">
        <Image
          src={coffee.image}
          alt={coffee.name}
          fill
          className="object-cover"
        />

        {coffee.isNew && variant === "home" && (
          <span className="absolute top-3 left-3 z-10 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            Nouveau
          </span>
        )}

        <button
          onClick={toggleFavorite}
          className={`absolute top-3 right-3 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/85 backdrop-blur-sm shadow-md transition cursor-pointer ${
            isFavorite ? "scale-110" : "hover:scale-105"
          }`}
        >
          <Heart
            size={18}
            className={`transition duration-300 ${
              isFavorite
                ? "fill-red-500 text-red-500 scale-110"
                : "text-dark"
            }`}
          />
        </button>
      </div>

      <h3 className="text-xl font-bold text-dark/90 mb-2">{coffee.name}</h3>

      {isMenu ? (
        <p className="text-gray-500 text-sm mb-4">{coffee.category}</p>
      ) : (
        <p className="text-dark text-sm mb-4">
          {coffee.description ||
            `Découvrez notre ${coffee.name.toLowerCase()} fraîchement ajouté.`}
        </p>
      )}

      <div className="flex items-center justify-between w-full mt-auto gap-3">
        <div className="text-left">
          {isMenu && (
            <p className="text-xs text-gray-500 leading-none mb-1">À partir de</p>
          )}
          <span className="font-semibold text-primary text-lg">
            {fromPrice} DT
          </span>
        </div>

        <Link
          href={`/commande/${coffee.id}`}
          className="bg-accent text-dark px-4 py-2 rounded-lg text-sm hover:bg-secondary/60 transition-colors"
        >
          {isMenu ? "Choisir" : "Commander"}
        </Link>
      </div>
    </div>
  );
}