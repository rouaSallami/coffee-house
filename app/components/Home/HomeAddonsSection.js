"use client";

import { useEffect, useRef, useState } from "react";
import AddonCard from "../addons/AddonCard";
import Link from "next/link";

export default function HomeAddonsSection() {
  const [addons, setAddons] = useState([]);
  const [error, setError] = useState("");
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchAddons = async () => {
      try {
        const res = await fetch("/api/addons");
        if (!res.ok) throw new Error("Failed to fetch addons");

        const data = await res.json();
        setAddons(data);
      } catch (e) {
        setError("Erreur lors du chargement des extras.");
        console.error(e);
      }
    };

    fetchAddons();
  }, []);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden py-20 bg-secondary text-dark">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.05),_transparent_45%)]" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-dark/70 uppercase tracking-[0.2em] text-xs sm:text-sm font-medium mb-3">
            Gourmandises
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold">
            Petits extras gourmands 🍪
          </h2>

          <p className="text-dark/70 mt-3 max-w-2xl mx-auto leading-7">
            Complétez votre café avec des extras savoureux pour une expérience
            encore plus gourmande.
          </p>
        </div>

        {error ? (
          <div className="max-w-xl mx-auto rounded-2xl border border-dark/10 bg-dark/5 px-6 py-4 text-center text-dark/70 backdrop-blur-sm">
            {error}
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-dark/10 px-3 py-2 backdrop-blur hover:bg-dark/20"
            >
              ←
            </button>

            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide px-10"
            >
              {addons.map((addon) => (
                <div
                  key={addon.id}
                  className="w-[80%] sm:w-[48%] lg:w-[19%] flex-shrink-0"
                >
                  <AddonCard addon={addon} />
                </div>
              ))}
            </div>

            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-dark/10 px-3 py-2 backdrop-blur hover:bg-dark/20"
            >
              →
            </button>
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/nosCafes"
            className="inline-flex items-center justify-center rounded-2xl bg-dark text-white px-7 py-3.5 font-semibold shadow-lg transition hover:scale-[1.02] hover:opacity-95"
          >
            Choisir mon café
          </Link>
        </div>
      </div>
    </section>
  );
}