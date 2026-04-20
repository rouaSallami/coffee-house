"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Gift } from "lucide-react";

export default function RewardsTeaser() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [points, setPoints] = useState(0);
  const [goal, setGoal] = useState(1000);
  const [hasReward, setHasReward] = useState(false);

  useEffect(() => {
    const loadRewards = async () => {
      try {
        const token = sessionStorage.getItem("token");

        if (!token) {
          setLoading(false);
          return;
        }

        const res = await fetch("/backend/rewards/me", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        });

        if (!res.ok) {
          setLoading(false);
          return;
        }

        const data = await res.json();

        setIsLoggedIn(true);
        setPoints(Number(data.current_points || 0));
        setGoal(Number(data.goal || 1000));
        setHasReward(Boolean(data.has_reward));
      } catch (error) {
        console.error("Rewards teaser error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRewards();
  }, []);

  return (
    <section className="relative py-20 bg-secondary text-dark overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_45%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary to-secondary/80" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="bg-white/30 border border-dark/10 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 backdrop-blur-md shadow-xl">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-dark text-creamy flex items-center justify-center shrink-0 shadow-lg shadow-black/20">
              <Gift size={24} />
            </div>

            <div>
              <p className="text-dark/70 font-bold tracking-[0.2em] text-xs uppercase">
                Programme de fidélité
              </p>

              <h3 className="text-2xl md:text-3xl font-bold mt-3 text-dark">
                Gagnez des points à chaque commande 🎁
              </h3>

              {loading ? (
                <p className="text-dark/75 mt-3 max-w-xl leading-7">
                  Chargement de votre fidélité...
                </p>
              ) : !isLoggedIn ? (
                <p className="text-dark/75 mt-3 max-w-xl leading-7">
                  Connectez-vous pour suivre vos points et débloquer votre mug Coffee House offert à 1000 points.
                </p>
              ) : hasReward ? (
                <p className="text-dark/75 mt-3 max-w-xl leading-7">
                  Vous avez actuellement <span className="font-semibold">{points} points</span> et une récompense est disponible.
                </p>
              ) : (
                <p className="text-dark/75 mt-3 max-w-xl leading-7">
                  Vous avez actuellement <span className="font-semibold">{points} points</span> sur <span className="font-semibold">{goal}</span>. Continuez à commander pour débloquer votre mug Coffee House.
                </p>
              )}
            </div>
          </div>

          <Link
            href="/mesRecompenses"
            className="inline-flex justify-center items-center rounded-2xl bg-dark text-creamy px-7 py-3.5 font-semibold shadow-lg shadow-black/20 transition hover:scale-[1.02] hover:opacity-95"
          >
            Voir mes récompenses
          </Link>
        </div>
      </div>
    </section>
  );
}