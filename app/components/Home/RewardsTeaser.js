import Link from "next/link";
import { Gift } from "lucide-react";

export default function RewardsTeaser() {
  return (
    <section className="py-16 bg-dark text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Left */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent text-dark flex items-center justify-center shrink-0">
              <Gift size={22} />
            </div>

            <div>
              <p className="text-accent font-bold tracking-widest text-xs uppercase">
                Programme de fidélité
              </p>

              <h3 className="text-2xl font-bold mt-2">
                Gagnez des points à chaque commande 🎁
              </h3>

              <p className="text-white/70 mt-2 max-w-xl">
                Cumulez des points automatiquement : à{" "}
                <span className="text-accent font-semibold">1000 points</span>,
                votre <span className="font-semibold">mug Coffee House</span>{" "}
                est offert. Retrouvez votre solde et vos récompenses dans “Mes
                récompenses”.
              </p>
            </div>
          </div>

          {/* CTA */}
          <Link
            href="/mesRecompenses"
            className="inline-flex justify-center bg-accent text-dark px-7 py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Voir mes récompenses
          </Link>
        </div>
      </div>
    </section>
  );
}
