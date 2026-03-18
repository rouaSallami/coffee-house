"use client";

import { useEffect, useState } from "react";
import { Gift } from "lucide-react";

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
    <div className="relative min-h-screen mt-16 overflow-hidden bg-secondary text-dark">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_45%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary to-secondary/80" />

      <div className="relative max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-dark/70 text-sm font-semibold uppercase tracking-[0.2em]">
            Programme de fidélité
          </p>

          <h1 className="text-4xl font-bold text-dark mt-3 font-heading">
            Mes récompenses
          </h1>

          <p className="text-dark/75 mt-4 max-w-2xl mx-auto leading-7">
            Cumulez des points à chaque commande et profitez d’une récompense
            exclusive une fois votre objectif atteint.
          </p>
        </div>

        {/* Main card */}
        <div className="rounded-3xl border border-dark/10 bg-white/30 backdrop-blur-md p-8 md:p-10 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-creamy text-primary border border-dark/10 flex items-center justify-center shadow-sm">
                <Gift size={24} />
              </div>

              <div>
                <p className="text-sm uppercase tracking-wider text-dark/60 font-semibold">
                  Solde actuel
                </p>
                <h2 className="text-3xl font-bold text-primary mt-1">
                  {points} points
                </h2>
              </div>
            </div>

            <div className="text-left md:text-right">
              <p className="text-sm text-dark/60">Objectif fidélité</p>
              <p className="text-lg font-semibold text-dark">1000 points</p>
              <p className="text-sm text-dark/60 mt-1">
                1 Mug Coffee House offert
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="rounded-2xl border border-dark/10 bg-white/40 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3 text-sm">
              <span className="text-dark/60">Progression</span>
              <span className="font-semibold text-primary">
                {Math.round(progress)}%
              </span>
            </div>

            <div className="w-full h-3 bg-dark/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-3 flex justify-between text-sm text-dark/60">
              <span>0</span>
              <span>1000</span>
            </div>
          </div>

          {/* Message */}
          <div className="mt-8">
            {hasReward ? (
              <div className="rounded-2xl border border-primary/15 bg-primary text-white p-5 shadow-sm">
                <p className="font-semibold">Récompense débloquée</p>
                <p className="mt-1 text-white/85 leading-7">
                  Félicitations, votre mug Coffee House offert est maintenant
                  disponible.
                </p>
              </div>
            ) : (
              <div className="rounded-2xl border border-dark/10 bg-white/40 p-5 shadow-sm">
                <p className="text-dark leading-7">
                  Il vous reste{" "}
                  <span className="font-bold text-primary">{remaining} points</span>{" "}
                  pour débloquer votre mug Coffee House offert.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}