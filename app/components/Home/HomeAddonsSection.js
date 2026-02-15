"use client";

import { useEffect, useState } from "react";
import AddonCard from "../addons/AddonCard";
import Link from "next/link";

export default function HomeAddonsSection() {
  const [addons, setAddons] = useState([]);
  const [error, setError] = useState("");

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

  return (
    <section className="py-16 bg-dark text-white">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold">Petits extras gourmands 🍪</h2>
          <p className="text-white/70 mt-2">
            Disponibles en option lors de votre commande.
          </p>
        </div>

        {error ? (
          <p className="text-center text-white/70">{error}</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {addons.map((addon) => (
              <AddonCard key={addon.id} addon={addon} />
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            href="/nosCafés"
            className="inline-flex bg-accent text-dark px-7 py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            choisir ton café
          </Link>
        </div>

      </div>
    </section>
  );
}
