"use client";

import { useEffect, useState } from "react";
import { Gift, Sparkles, Trophy, Coffee, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function MesRecompensesPage() {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const storedPoints = Number(localStorage.getItem("points")) || 0;
    setPoints(storedPoints);
  }, []);

  const goal = 1000;
  const progress = Math.min((points / goal) * 100, 100);
  const remaining = Math.max(goal - points, 0);
  const hasReward = points >= goal;

  return (
    <div className="relative min-h-screen overflow-hidden bg-secondary pt-20 text-dark">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_42%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(139,94,60,0.10),transparent_30%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary to-secondary/85" />

      <div className="relative mx-auto max-w-5xl px-6 py-8 md:py-10">
        {/* Hero */}
        <section className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-dark/10 bg-white/45 px-4 py-2 shadow-sm backdrop-blur-sm">
            <Sparkles size={15} className="text-primary" />
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-dark/70">
              Programme de fidélité
            </p>
          </div>

          <h1 className="mt-4 font-heading text-4xl font-bold text-dark md:text-5xl">
            Mes récompenses
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-dark/75 md:text-lg">
            Cumulez des points à chaque commande et profitez d’une récompense
            exclusive une fois votre objectif atteint.
          </p>
        </section>

        {/* Main card */}
        <section className="mt-8 md:mt-10">
          <div className="rounded-[30px] border border-dark/10 bg-white/35 p-6 shadow-2xl backdrop-blur-md md:p-8">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl border border-dark/10 bg-creamy text-primary shadow-sm">
                  <Gift size={24} />
                </div>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-dark/55">
                    Solde actuel
                  </p>
                  <h2 className="mt-1 text-3xl font-bold text-primary md:text-4xl">
                    {points} points
                  </h2>
                </div>
              </div>

              <div className="rounded-2xl border border-dark/10 bg-white/45 px-4 py-3 text-left shadow-sm md:text-right">
                <p className="text-sm text-dark/60">Objectif fidélité</p>
                <p className="mt-1 text-lg font-semibold text-dark">
                  {goal} points
                </p>
                <p className="mt-1 text-sm text-dark/60">
                  1 Mug Coffee House offert
                </p>
              </div>
            </div>

            {/* Progress */}
            <div className="mt-6 rounded-[24px] border border-dark/10 bg-white/45 p-5 shadow-sm">
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="text-dark/60">Progression</span>
                <span className="font-semibold text-primary">
                  {Math.round(progress)}%
                </span>
              </div>

              <div className="h-3.5 w-full overflow-hidden rounded-full bg-dark/10">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="mt-3 flex justify-between text-sm text-dark/60">
                <span>0</span>
                <span>{goal}</span>
              </div>
            </div>

            {/* Status message */}
            <div className="mt-6">
              {hasReward ? (
                <div className="rounded-[24px] border border-primary/15 bg-primary p-5 text-white shadow-lg shadow-primary/15">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                      <Trophy size={20} />
                    </div>

                    <div>
                      <p className="text-lg font-semibold">
                        Récompense débloquée
                      </p>
                      <p className="mt-2 leading-7 text-white/85">
                        Félicitations, votre mug Coffee House offert est
                        maintenant disponible.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-[24px] border border-dark/10 bg-white/45 p-5 shadow-sm">
                  <p className="leading-7 text-dark">
                    Il vous reste{" "}
                    <span className="font-bold text-primary">
                      {remaining} points
                    </span>{" "}
                    pour débloquer votre mug Coffee House offert.
                  </p>
                </div>
              )}
            </div>

            {/* Small benefits cards */}
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-dark/10 bg-white/45 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-creamy text-primary">
                  <Coffee size={18} />
                </div>
                <h3 className="font-semibold text-primary">
                  1 commande = plus d’avantages
                </h3>
                <p className="mt-2 text-sm leading-6 text-dark/70">
                  Continuez à commander vos cafés préférés pour accumuler encore
                  plus de points.
                </p>
              </div>

              <div className="rounded-2xl border border-dark/10 bg-white/45 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-creamy text-primary">
                  <Gift size={18} />
                </div>
                <h3 className="font-semibold text-primary">
                  Récompense exclusive
                </h3>
                <p className="mt-2 text-sm leading-6 text-dark/70">
                  Une fois votre objectif atteint, vous débloquez votre cadeau
                  Coffee House.
                </p>
              </div>

              <div className="rounded-2xl border border-dark/10 bg-white/45 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-creamy text-primary">
                  <Sparkles size={18} />
                </div>
                <h3 className="font-semibold text-primary">
                  Expérience fidélité
                </h3>
                <p className="mt-2 text-sm leading-6 text-dark/70">
                  Un programme simple, moderne et motivant pour récompenser vos
                  commandes régulières.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-8 md:mt-10">
          <div className="rounded-[28px] border border-dark/10 bg-white/30 p-5 text-center shadow-lg backdrop-blur-md md:p-7">
            <h2 className="font-heading text-2xl font-bold text-dark">
              Continuez à cumuler vos points
            </h2>

            <p className="mx-auto mt-3 max-w-2xl leading-7 text-dark/70">
              Découvrez nos cafés et passez votre prochaine commande pour vous
              rapprocher encore plus de votre récompense.
            </p>

            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/nosCafes"
                className="inline-flex min-w-[180px] items-center justify-center gap-2 rounded-2xl bg-dark px-5 py-3 font-semibold text-accent shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:opacity-95"
              >
                Voir nos cafés
                <ChevronRight size={18} />
              </Link>

              <Link
                href="/panier"
                className="inline-flex min-w-[180px] items-center justify-center rounded-2xl border border-dark/15 bg-accent/35 px-5 py-3 font-semibold text-primary shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-accent/50"
              >
                Voir mon panier
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}