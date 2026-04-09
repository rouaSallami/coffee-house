"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function NosCafesCard({
  coffee,
  isFavorite,
  onToggleFavorite,
  onOpenDetails,
  isHighlighted = false,
}) {
  const fromPrice = coffee.sizes?.length
    ? Math.min(...coffee.sizes.map((s) => s.price))
    : coffee.price;

  const imageSrc = coffee.image
    ? coffee.image.startsWith("http")
      ? coffee.image.replace("127.0.0.1", "localhost")
      : `http://localhost:8000${coffee.image}`
    : "/images/placeholder-coffee.png";

  return (
    <div
      className={`rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition ${
        isHighlighted
          ? "bg-beige border border-red-500/30 ring-1 ring-red-500/20"
          : "bg-beige border border-dark/10"
      }`}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={imageSrc}
          alt={coffee.name}
          fill
          className="object-cover transition duration-300 hover:scale-105"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />

        {coffee.isNew && (
          <span className="absolute top-4 left-4 z-10 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white shadow-md">
            Nouveau
          </span>
        )}

        {!coffee.available && (
          <span
            className={`absolute left-4 z-10 rounded-full px-3 py-1 text-xs font-semibold text-white shadow-md ${
              coffee.isNew ? "top-14" : "top-4"
            } bg-gray-600`}
          >
            Indisponible
          </span>
        )}

        <button
          onClick={() => onToggleFavorite(coffee)}
          className={`absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 shadow-md backdrop-blur-sm transition cursor-pointer ${
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

      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-primary">{coffee.name}</h3>
            <p className="mt-1 text-sm text-dark/60">{coffee.category}</p>
          </div>

          <div className="text-right">
            <p className="text-xs text-dark/50">À partir de</p>
            <p className="text-lg font-bold text-primary">{fromPrice} DT</p>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3">
          {coffee.available ? (
            <Link
              href={`/commande/${coffee.id}`}
              className="flex-1 text-center rounded-2xl bg-primary text-white px-5 py-3 font-semibold transition hover:bg-secondary"
            >
              Choisir
            </Link>
          ) : (
            <button
              type="button"
              disabled
              className="flex-1 cursor-not-allowed rounded-2xl bg-primary px-5 py-3 text-center font-semibold text-white"
            >
              Choisir
            </button>
          )}

          <button
            type="button"
            onClick={() => onOpenDetails(coffee.id)}
            className="rounded-xl border border-primary/20 bg-creamy/70 px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-white"
          >
            Détails
          </button>
        </div>
      </div>
    </div>
  );
}