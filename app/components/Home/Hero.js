"use client";

import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  const now = new Date();
  const hour = now.getHours();
  const minutes = now.getMinutes();

  const closingHour = 22;
  const openingHour = 8;

  const isOpen = hour >= openingHour && hour < closingHour;

  let timeLeft = null;

  if (isOpen) {
    const totalMinutesNow = hour * 60 + minutes;
    const totalMinutesClose = closingHour * 60;
    const diff = totalMinutesClose - totalMinutesNow;

    const h = Math.floor(diff / 60);
    const m = diff % 60;

    timeLeft = `${h}h ${m}min`;
  }

  return (
    <section className="relative overflow-hidden bg-secondary text-dark min-h-svh flex items-center">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_45%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary to-secondary/80" />

      <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-8 w-full">
        <div className="grid lg:grid-cols-2 items-center gap-10">
          {/* LEFT CONTENT */}
          <div className="space-y-5 mx-auto lg:mx-0">
            <p className="text-dark/70 uppercase tracking-[0.25em] text-xs sm:text-sm font-medium">
              Coffee House • Café artisanal
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-xl text-dark drop-shadow-sm">
              Votre café préféré, préparé à votre façon.
            </h1>

            <p className="text-dark/75 text-base sm:text-lg max-w-xl leading-7">
              Choisissez, personnalisez et commandez votre café en quelques clics, avec livraison rapide et saveurs authentiques.
            </p>

            <div>
              {isOpen ? (
                <div className="inline-flex items-center gap-2 rounded-full border border-green-700/15 bg-white/45 px-4 py-2.5 text-sm font-semibold text-green-800 shadow-sm backdrop-blur-sm">
                  <span className="w-2.5 h-2.5 bg-green-600 rounded-full animate-pulse" />
                  Ouvert maintenant • Ferme dans {timeLeft}
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 rounded-full border border-red-700/15 bg-white/45 px-4 py-2.5 text-sm font-semibold text-red-700 shadow-sm backdrop-blur-sm">
                  <span className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                  Fermé • Ouvre à 8h
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-4 pt-1">
              <Link
                href="/nosCafes"
                className="flex-1 text-center rounded-2xl bg-dark text-secondary px-7 py-3.5 font-semibold shadow-lg shadow-black/20 transition hover:scale-[1.02] hover:opacity-95"
              >
                Commander maintenant
              </Link>

              <Link
                href="#promo"
                className="flex-1 text-center rounded-2xl border border-dark/15 bg-dark/10 px-7 py-3.5 font-semibold text-dark backdrop-blur-sm transition hover:bg-dark/15 hover:scale-[1.02]"
              >
                Voir les nouveautés
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-sm text-dark/70">
              <span className="rounded-full border border-dark/10 bg-white/35 px-3 py-1.5 backdrop-blur-sm">
                📍 Tunis
              </span>
              <span className="rounded-full border border-dark/10 bg-white/35 px-3 py-1.5 backdrop-blur-sm">
                ⭐ Avis clients
              </span>
              <span className="rounded-full border border-dark/10 bg-white/35 px-3 py-1.5 backdrop-blur-sm">
                ⏱️ Service rapide
              </span>
            </div>

            <div className="rounded-2xl border border-dark/10 bg-white/30 px-4 py-3 text-sm sm:text-base backdrop-blur-sm max-w-xl">
              <span className="font-semibold text-dark">🚚 Livraison :</span>
              <span className="text-dark font-semibold ml-2">
                Lac • Marsa • Centre Ville
              </span>
              <span className="ml-2 text-dark/60">(30–45 min • Dès 5 DT)</span>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute w-64 h-64 sm:w-72 sm:h-72 bg-dark/10 rounded-full blur-3xl" />
            <div className="absolute bottom-8 w-56 h-14 bg-dark/15 blur-2xl rounded-full" />

            <Image
              src="/images/hero1.png"
              alt="Café signature Coffee House"
              width={380}
              height={380}
              className="relative z-10 animate-float w-[280px] sm:w-[340px] lg:w-[380px] h-auto drop-shadow-[0_25px_45px_rgba(0,0,0,0.25)]"
              priority
            />
          </div>
        </div>

        {/* Promo Bar */}
        <div id="promo" className="mt-8">
          <div className="rounded-3xl border border-dark/10 bg-white/30 backdrop-blur-md px-6 py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] bg-dark text-white promo-blink">
                PROMO
              </span>

              <p className="text-dark/90 font-semibold leading-7">
                Offre de bienvenue :
                <span className="text-dark ml-2">-25%</span>
                <span className="font-normal text-dark/65 ml-2">
                  sur votre première commande • Valable 7 jours
                </span>
              </p>
            </div>

            <Link
              href="/nosCafes"
              className="inline-flex items-center justify-center rounded-2xl bg-dark text-accent px-6 py-3 font-semibold transition hover:scale-[1.02] hover:opacity-95 shadow-md"
            >
              Profiter de l’offre
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}