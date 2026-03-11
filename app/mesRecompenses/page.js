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
    <div className="bg-accent min-h-screen mt-16">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-dark/70 text-sm font-semibold uppercase tracking-widest">
            Programme de fidélité
          </p>
          <h1 className="text-4xl font-bold text-dark mt-2">
            Mes récompenses
          </h1>
          <p className="text-dark/70 mt-3">
            À chaque commande, vous gagnez 20 points.
          </p>
        </div>

        <div className="bg-base rounded-3xl p-8 border border-dark/10 shadow-md">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-accent text-dark flex items-center justify-center">
              <Gift size={24} />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-dark">
                {points} points
              </h2>
              <p className="text-dark/70">
                Objectif: 1000 points = 1 Mug Coffee House offert
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-5 bg-dark/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-dark rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-3 flex justify-between text-sm text-dark/70">
            <span>0</span>
            <span>1000</span>
          </div>

          {/* Reward message */}
          <div className="mt-8">
            {hasReward ? (
              <div className="rounded-2xl bg-dark text-white p-5">
                🎉 Félicitations ! Vous avez gagné votre Mug Coffee House offert.
              </div>
            ) : (
              <div className="rounded-2xl bg-white/50 p-5 text-dark">
                Il vous reste <span className="font-bold">{remaining} points</span> pour obtenir votre mug offert.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}