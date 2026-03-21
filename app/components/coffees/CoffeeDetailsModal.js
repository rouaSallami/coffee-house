"use client";

import { X, Heart, Coffee, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CoffeeDetailsModal({
  coffee,
  onClose,
  isFavorite = false,
  onToggleFavorite = () => {},
}) {
  if (!coffee) return null;

  const fromPrice = coffee.sizes?.length
    ? Math.min(...coffee.sizes.map((s) => s.price))
    : coffee.price;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl overflow-hidden rounded-[32px] border border-dark/10 bg-beige shadow-2xl animate-[modalScaleIn_0.22s_ease]"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-dark/10 bg-white/85 text-dark shadow-md transition-all duration-300 hover:scale-105 hover:bg-white"
          aria-label="Fermer"
        >
          <X size={20} />
        </button>

        {/* Image */}
        <div className="relative h-64 w-full overflow-hidden md:h-72">
          <Image
            src={coffee.image}
            alt={coffee.name}
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />

          {coffee.isNew && (
            <span className="absolute left-4 top-4 z-20 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white shadow-md">
              Nouveau
            </span>
          )}

          {!coffee.available && (
            <span
              className={`absolute left-4 z-20 rounded-full bg-gray-700 px-3 py-1 text-xs font-semibold text-white shadow-md ${
                coffee.isNew ? "top-14" : "top-4"
              }`}
            >
              Indisponible
            </span>
          )}

          <div className="absolute bottom-4 left-4 right-4 z-10">
            <div className="rounded-2xl border border-white/20 bg-white/15 p-4 text-white backdrop-blur-md">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                {coffee.category}
              </p>
              <h2 className="mt-1 text-2xl font-bold md:text-3xl">
                {coffee.name}
              </h2>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">
                <Coffee size={15} />
                Coffee Details
              </div>

              {!coffee.available && (
                <p className="mt-3 text-sm font-semibold text-red-500">
                  Ce café est actuellement indisponible.
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-dark/10 bg-creamy/70 px-4 py-3 text-left shadow-sm sm:text-right">
              <p className="text-xs text-dark/50">À partir de</p>
              <p className="text-xl font-bold text-primary">{fromPrice} DT</p>
            </div>
          </div>

          <p className="mt-5 leading-7 text-dark/75">
            {coffee.description ||
              "Un café savoureux préparé avec soin pour une expérience unique."}
          </p>

          {coffee.ingredients?.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-3 text-lg font-semibold text-primary">
                Ingrédients
              </h3>

              <div className="flex flex-wrap gap-2">
                {coffee.ingredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="rounded-full border border-dark/10 bg-creamy px-3 py-1.5 text-sm text-dark shadow-sm"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
          )}

          {coffee.sizes?.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-3 text-lg font-semibold text-primary">
                Tailles disponibles
              </h3>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {coffee.sizes.map((size) => (
                  <div
                    key={size.key}
                    className="rounded-2xl border border-dark/10 bg-creamy/80 px-4 py-3 text-center shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <p className="font-semibold text-dark">{size.label}</p>
                    <p className="mt-1 text-sm text-dark/65">{size.price} DT</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {coffee.available ? (
              <Link
                href={`/commande/${coffee.id}`}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-center font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95"
              >
                <ShoppingBag size={18} />
                Commander
              </Link>
            ) : (
              <button
                type="button"
                disabled
                className="flex-1 cursor-not-allowed rounded-2xl bg-gray-300 px-5 py-3 text-center font-semibold text-white"
              >
                Commander
              </button>
            )}

            <button
              onClick={() => onToggleFavorite(coffee)}
              className={`inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 font-medium transition-all duration-300 ${
                isFavorite
                  ? "border-red-500 bg-red-50 text-red-600 hover:bg-red-100"
                  : "border-primary/20 bg-creamy/70 text-primary hover:-translate-y-0.5 hover:bg-primary hover:text-white"
              }`}
            >
              <Heart
                size={18}
                className={isFavorite ? "fill-red-500 text-red-500" : ""}
              />
              {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
            </button>

            <button
              onClick={onClose}
              className="rounded-2xl border border-primary/20 bg-creamy/70 px-4 py-3 font-medium text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-white"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}