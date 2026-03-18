"use client";

import { useEffect, useState } from "react";
import HomeCoffeeCard from "../coffees/HomeCoffeeCard";
import Link from "next/link";

export default function HomeCoffeesSection() {
  const [homeCoffees, setHomeCoffees] = useState([]);

  useEffect(() => {
    const fetchCoffees = async () => {
      try {
        const res = await fetch("/api/coffees");

        if (!res.ok) throw new Error("Network response was not ok");

        const data = await res.json();

        const nouveautés = data
          .filter((coffee) => coffee.isNew)
          .slice(0, 4)
          .map((coffee) => ({
            ...coffee,
            description: `Découvrez notre ${coffee.name.toLowerCase()} fraîchement ajouté.`,
            price: coffee.sizes?.length
              ? Math.min(...coffee.sizes.map((s) => s.price))
              : coffee.price,
          }));

        setHomeCoffees(nouveautés);
      } catch (error) {
        console.error("Error fetching coffees:", error);
      }
    };

    fetchCoffees();
  }, []);

  return (
    <section
      className="relative py-20 bg-secondary/50 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bg-coffee.png')" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-dark">
            Les nouveautés
          </h2>
          <p className="text-dark/80 mt-2">
            Découvrez les dernières créations de notre barista.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {homeCoffees.map((coffee) => (
  <HomeCoffeeCard key={coffee.id} coffee={coffee} variant="home" />
))}
        </div>

        <div className="text-center mt-12">
          <Link
  href="/nosCafes"
  className="inline-flex items-center gap-2  px-8 py-3 rounded-2xl font-semibold transition bg-primary text-creamy hover:bg-secondary hover:text-dark shadow-lg"
>
  Voir tous les cafés →
</Link>
        </div>
      </div>
    </section>
  );
}