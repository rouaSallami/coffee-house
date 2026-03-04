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
      { threshold: 0.15 },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      className="relative py-24 text-white bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/bg-coffee.png')" }}
    >
      <div className="relative max-w-6xl mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="reveal text-3xl md:text-4xl font-bold font-heading">
            Comment ça marche ?
          </h2>
          <p className="reveal text-white/80 mt-3">
            Commander votre café n’a jamais été aussi simple.
          </p>
        </div>

        {/* Timeline */}
        {/* Timeline */}
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Ligne verticale في mobile */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-secondary/80 lg:hidden"></div>

          {/* Ligne horizontale في desktop */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-secondary/80"></div>

          {steps.map((step) => (
            <div
              key={step.id}
              className="reveal relative flex flex-col items-center text-center max-w-xs"
              style={{ transitionDelay: `${(step.id - 1) * 120}ms` }}
            >
              {/* Icon */}
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-dark text-accent shadow-lg z-10">
                {step.icon}
              </div>

              <span className="mt-4 text-white/70 font-bold text-xs tracking-widest">
                ÉTAPE {step.id}
              </span>

              <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>

              <p className="text-white/80 text-sm mt-2 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
