"use client";

import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-dark text-white min-h-[calc(100vh-70px)]">
      <div className="max-w-6xl mx-auto px-6 py-20 grid lg:grid-cols-2 items-center gap-12">

        {/* LEFT CONTENT */}
        <div className="space-y-6 mx-auto">

          <p className="text-accent uppercase tracking-widest text-sm">
            Coffee House • Café artisanal
          </p>

          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            Le goût du vrai café, ici.
          </h1>

          <p className="text-white/80 text-lg max-w-md">
            Un café riche, des arômes intenses et une expérience douce à chaque visite.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/nosCafés"
              className="bg-accent  text-dark px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition"
            >
              Commander maintenant
            </Link>

            <Link
              href="/nosCafés"
              className="border border-white/30 px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition"
            >
              Découvrir nos cafés
            </Link>
          </div>

          <div className="pt-4 text-sm text-white/60">
            📍 Tunis • ⭐ Avis clients • ⏱️ Service rapide
          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center">

          {/* Glow background */}
          <div className="absolute w-72 h-72 bg-accent/20 rounded-full blur-3xl"></div>

          <Image
            src="/images/hero1.png" 
            alt="Café"
            width={400}
            height={400}
            className="relative z-10 animate-float drop-shadow-2xl"
          />
        </div>

      </div>

      {/* Promo Bar */}
<div className="mt-16 max-w-6xl mx-auto px-6">
  <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 shadow-lg">

    {/* Left Side */}
    <div className="flex items-center gap-4 flex-wrap">

      <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-widest bg-white/10 promo-blink">
        PROMO
      </span>

      <p className="text-white/90 font-semibold">
        Offre de bienvenue :
        <span className="text-accent ml-2">-25%</span>
        <span className="font-normal text-white/70 ml-2">
          sur votre première commande • Valable 7 jours
        </span>
      </p>

    </div>

    {/* Button */}
    <Link
      href="/nosCafés"
      className="bg-accent text-dark px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform duration-300"
    >
      Profiter de l’offre
    </Link>

  </div>
</div>



    </section>
  );
}
