import Link from "next/link";

const avis = [
  {
    id: 1,
    name: "Sarah",
    rating: 5,
    text: "Le meilleur cappuccino à Tunis ! Goût parfait et super service.",
  },
  {
    id: 2,
    name: "Ahmed",
    rating: 5,
    text: "Ambiance cosy et commande rapide. Je recommande fortement.",
  },
  {
    id: 3,
    name: "Mariem",
    rating: 4,
    text: "Très bon latte, bien équilibré. J’aime beaucoup les extras gourmands.",
  },
];

function Stars({ rating }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? "text-secondary" : "text-dark/20"}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function AvisPreview() {
  return (
    <section className="relative py-20 bg-secondary text-dark overflow-hidden">
      
      {/* background glow كيف hero */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_45%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary to-secondary/80" />

      <div className="relative max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <p className="text-dark/70 font-bold tracking-[0.2em] text-xs uppercase mb-3">
              Témoignages
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold text-dark">
              Avis clients
            </h2>

            <p className="text-dark/75 mt-3">
              Découvrez les retours de nos clients après leur expérience Coffee House.
            </p>
          </div>

          {/* rating */}
          <div className="bg-creamy/40 border border-dark/10 rounded-2xl px-5 py-4 backdrop-blur-md shadow-lg">
            <div className="flex items-center gap-3">
              <p className="text-2xl font-bold text-dark/80">4.9</p>
              <div>
                <Stars rating={5} />
                <p className="text-dark/60 text-sm mt-1">Basé sur 120 avis</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {avis.map((a) => (
            <div
              key={a.id}
              className="bg-creamy/40 backdrop-blur-md border border-dark/10 rounded-3xl p-6 shadow-lg transition hover:-translate-y-1"
            >
              <Stars rating={a.rating} />

              <p className="text-dark/75 mt-4 text-sm leading-relaxed">
                “{a.text}”
              </p>

              <p className="mt-5 font-semibold text-dark">{a.name}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            href="/avisClient"
            className="inline-flex items-center justify-center rounded-2xl bg-dark text-creamy px-8 py-3.5 font-semibold shadow-lg transition hover:scale-[1.02] hover:opacity-95"
          >
            Voir tous les avis
          </Link>
        </div>
      </div>
    </section>
  );
}