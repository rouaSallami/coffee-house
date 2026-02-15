"use client";

import { useEffect, useState } from "react";
import HomeCoffeeCard from "../coffees/HomeCoffeeCard";
import Link from "next/link";

export default function HomeCoffeesSection() {
  const [homeCoffees, setHomeCoffees] = useState([]);

useEffect(() => {
  const fetchCoffees = async () => {
    try {
      const res = await fetch("/api/homeCoffees");

      if (!res.ok) throw new Error("Network response was not ok");

      const data = await res.json();
      setHomeCoffees(data);
    } catch (error) {
      console.error("Error fetching coffees:", error);
    }
  };

  fetchCoffees();
}, []);


  return (
    <section
      className="relative py-20 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bg-coffee.png')" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dark">Nos cafés</h2>
          <p className="text-gray-500 mt-2">Découvrez nos incontournables.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {homeCoffees.map((coffee) => (
            <HomeCoffeeCard key={coffee.id} coffee={coffee} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/nosCafés"
            className="inline-block bg-accent text-dark border hover:bg-dark hover:text-accent px-8 py-3 rounded-xl font-semibold transition"
          >
            Voir plus
          </Link>
        </div>
      </div>
    </section>
  );
}
