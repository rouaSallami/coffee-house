"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const CATEGORIES = [
  "Tous",
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

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/coffees");
      const data = await res.json();
      setCoffees(data);
    })();
  }, []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    return coffees.filter((c) => {
      const matchCat = activeCat === "Tous" ? true : c.category === activeCat;
      const matchQ = query ? c.name.toLowerCase().includes(query) : true;
      return matchCat && matchQ;
    });
  }, [coffees, activeCat, q]);

  return (
    <div className="bg-accent min-h-screen mt-18">
      <div className="max-w-6xl mx-auto px-6 py-14">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-dark font-heading">
            Nos cafés
          </h1>
          <p className="mt-3 text-dark/70">
            Choisissez votre café, puis personnalisez-le en quelques étapes.
          </p>
        </div>

        {/* Search */}
        <div className="mt-10 flex justify-center">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Rechercher un café..."
            className="w-full max-w-xl rounded-2xl border border-dark/10 bg-base px-5 py-3 text-dark outline-none focus:ring-2 focus:ring-secondary/40"
          />
        </div>

        {/* Tabs */}
        <div className="mt-8 flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition
                ${
                  activeCat === cat
                    ? "bg-dark text-white border-dark"
                    : "bg-base text-dark border-dark/10 hover:border-dark/30"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => {
            const fromPrice = c.sizes?.length
              ? Math.min(...c.sizes.map((s) => s.price))
              : c.price;

            return (
              <div
                key={c.id}
                className="rounded-3xl bg-base border border-dark/10 overflow-hidden shadow-sm"
              >
                <div className="relative h-44">
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold text-dark">{c.name}</h3>
                      <p className="text-xs text-dark/60 mt-1">{c.category}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-dark/60">À partir de</p>
                      <p className="text-lg font-bold text-dark">
                        {fromPrice} DT
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/commande/${c.id}`}
                    className="mt-5 inline-flex w-full justify-center rounded-2xl bg-accent text-dark px-5 py-3 font-semibold hover:opacity-90 transition"
                  >
                    Choisir
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty */}
        {filtered.length === 0 && (
          <div className="text-center mt-14 text-dark/70">
            Aucun café trouvé.
          </div>
        )}
      </div>
    </div>
  );
}
