"use client";

import { useEffect } from "react";
import { Coffee, SlidersHorizontal, ShoppingBag, MapPin } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Choisir",
      desc: "Sélectionnez votre café préféré parmi nos spécialités.",
      icon: <Coffee size={22} />,
    },
    {
      id: 2,
      title: "Personnaliser",
      desc: "Choisissez la taille, le sucre et le type de contenant.",
      icon: <SlidersHorizontal size={22} />,
    },
    {
      id: 3,
      title: "Commander",
      desc: "Validez votre commande en quelques clics simplement.",
      icon: <ShoppingBag size={22} />,
    },
    {
      id: 4,
      title: "Suivre",
      desc: "Suivez votre commande jusqu’à sa préparation.",
      icon: <MapPin size={22} />,
    },
  ];

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("show");
        });
      },
      { threshold: 0.15 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      className="relative py-20 bg-secondary/50 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bg-coffee.png')" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="reveal text-3xl sm:text-4xl font-bold text-dark font-heading">
            Comment ça marche ?
          </h2>

          <p className="reveal text-dark/80 mt-4 text-lg max-w-xl mx-auto">
            Choisissez, personnalisez et suivez votre commande en quelques instants.
          </p>
        </div>

        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Ligne verticale mobile */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-beige/20 lg:hidden"></div>

          {/* Ligne horizontale desktop */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-beige/20"></div>

          {steps.map((step) => (
            <div
              key={step.id}
              className="reveal relative flex flex-col items-center text-center max-w-xs z-10"
              style={{ transitionDelay: `${(step.id - 1) * 120}ms` }}
            >
              <div className="w-full rounded-3xl border border-beige/20 bg-dark/30 backdrop-blur-md shadow-lg px-6 py-8">
                <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-secondary text-dark shadow-lg border border-accent/10">
                  {step.icon}
                </div>

                <span className="mt-4 block text-dark/70 font-bold text-xs tracking-widest">
                  ÉTAPE {step.id}
                </span>

                <h3 className="mt-3 text-2xl font-semibold text-dark/95">
                  {step.title}
                </h3>

                <p className="text-dark/85 text-sm mt-2 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}