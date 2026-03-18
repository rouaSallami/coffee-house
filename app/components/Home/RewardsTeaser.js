import Link from "next/link";
import { Gift } from "lucide-react";

export default function RewardsTeaser() {
  return (
    <section className="relative py-20 bg-secondary text-dark overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_45%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary to-secondary/80" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="bg-white/30 border border-dark/10 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 backdrop-blur-md shadow-xl">
          {/* Left */}
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

              <p className="text-dark/75 mt-3 max-w-xl leading-7">
                Cumulez des points automatiquement : à{" "}
                <span className="text-dark font-semibold">1000 points</span>,
                votre <span className="font-semibold text-dark">mug Coffee House</span>{" "}
                est offert. Retrouvez votre solde et vos récompenses dans
                “Mes récompenses”.
              </p>
            </div>
          </div>

          {/* CTA */}
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