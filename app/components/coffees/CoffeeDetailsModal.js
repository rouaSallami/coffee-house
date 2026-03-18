"use client";

import { X, Heart } from "lucide-react";
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
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-dark/10 bg-beige shadow-2xl animate-[modalScaleIn_0.2s_ease]"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-dark shadow-md transition hover:scale-105"
        >
          <X size={20} />
        </button>

        {/* Image */}
        <div className="relative h-64 w-full overflow-hidden">
  <Image
    src={coffee.image}
    alt={coffee.name}
    fill
    className="object-cover"
  />

  {coffee.isNew && (
    <span className="absolute top-4 left-4 z-20 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
      Nouveau
    </span>
  )}

  <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-creamy/90 via-creamy/40 to-transparent" />
</div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-dark/60">
                {coffee.category}
              </p>

              <h2 className="mt-2 text-3xl font-bold text-primary">
                {coffee.name}
              </h2>
              {!coffee.available && (
  <p className="mt-2 text-sm font-semibold text-red-500">
    Ce café est actuellement indisponible.
  </p>
)}
            </div>

            <div className="text-right">
              <p className="text-xs text-dark/50">À partir de</p>
              <p className="text-xl font-bold text-primary">{fromPrice} DT</p>
            </div>
          </div>

          <p className="mt-4 leading-7 text-dark/75">
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
                    className="rounded-full border border-dark/10 bg-creamy px-3 py-1.5 text-sm text-dark"
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

              <div className="flex flex-wrap gap-3">
                {coffee.sizes.map((size) => (
                  <div
                    key={size.key}
                    className="min-w-[90px] rounded-2xl border border-dark/10 bg-creamy/80 px-4 py-3 text-center shadow-sm"
                  >
                    <p className="font-semibold text-dark">{size.label}</p>
                    <p className="text-sm text-dark/65">{size.price} DT</p>
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
    className="flex-1 rounded-2xl bg-primary px-5 py-3 text-center font-semibold text-white transition hover:opacity-95"
  >
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
    className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 font-medium transition ${
      isFavorite
        ? "border-red-500 bg-red-50 text-red-600"
        : "border-primary/20 bg-creamy/70 text-primary hover:bg-primary hover:text-white"
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
    className="rounded-xl border border-primary/20 bg-creamy/70 px-4 py-3 font-medium text-primary transition hover:bg-primary hover:text-white"
  >
    Fermer
  </button>

</div>
        </div>
      </div>
    </div>
  );
}