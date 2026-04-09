"use client";

import { useEffect, useState } from "react";
import HomeCoffeeCard from "../coffees/HomeCoffeeCard";
import Link from "next/link";

export default function HomeCoffeesSection() {
  const [homeCoffees, setHomeCoffees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCoffees = async () => {
      try {
        setIsLoading(true);

        const res = await fetch("/backend/coffees", {
          method: "GET",
          cache: "no-store",
          headers: {
            Accept: "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Erreur lors du chargement des cafés");
        }

        const data = await res.json();
        const cafesArray = Array.isArray(data) ? data : data.data || [];

        const nouveautes = cafesArray
          .filter((coffee) => coffee.isNew)
          .slice(0, 4)
          .map((coffee) => ({
            ...coffee,
            description:
              coffee.description ||
              `Découvrez notre ${coffee.name.toLowerCase()} fraîchement ajouté.`,
            price: coffee.sizes?.length
              ? Math.min(...coffee.sizes.map((s) => Number(s.price) || 0))
              : Number(coffee.price) || 0,
          }));

        setHomeCoffees(nouveautes);
      } catch (error) {
        console.error("Error fetching coffees:", error);
        setHomeCoffees([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoffees();
  }, []);

  const isSingleCard = homeCoffees.length === 1;

  return (
    <section
      className="relative bg-secondary/50 bg-cover bg-center py-20"
      style={{ backgroundImage: "url('/images/bg-coffee.png')" }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-dark sm:text-4xl">
            Les nouveautés
          </h2>
          <p className="mt-2 text-dark/80">
            Découvrez les dernières créations de notre barista.
          </p>
        </div>

        {isLoading ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-[360px] animate-pulse rounded-2xl border border-white/10 bg-white/10"
              />
            ))}
          </div>
        ) : homeCoffees.length > 0 ? (
          isSingleCard ? (
            <div className="flex justify-center">
              <div className="w-full max-w-sm">
                <HomeCoffeeCard coffee={homeCoffees[0]} variant="home" />
              </div>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {homeCoffees.map((coffee) => (
                <HomeCoffeeCard key={coffee.id} coffee={coffee} variant="home" />
              ))}
            </div>
          )
        ) : (
          <div className="rounded-2xl bg-white/40 p-8 text-center text-dark">
            Aucune nouveauté disponible pour le moment.
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/nosCafes"
            className="inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-3 font-semibold text-creamy shadow-lg transition hover:bg-secondary hover:text-dark"
          >
            Voir tous les cafés →
          </Link>
        </div>
      </div>
    </section>
  );
}