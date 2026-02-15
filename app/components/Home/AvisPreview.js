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
        <span key={i} className={i < rating ? "text-accent" : "text-white/20"}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function AvisPreview() {
  return (
    <section className="py-20 bg-dark text-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-bold">Avis clients</h2>
            <p className="text-white/70 mt-2">
              Ce que nos clients pensent de Coffee House.
            </p>
          </div>

          {/* Rating summary */}
          <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
            <div className="flex items-center gap-3">
              <p className="text-2xl font-bold text-accent">4.9</p>
              <div>
                <Stars rating={5} />
                <p className="text-white/60 text-sm mt-1">Basé sur 120 avis</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {avis.map((a) => (
            <div
              key={a.id}
              className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:-translate-y-1 transition"
            >
              <Stars rating={a.rating} />
              <p className="text-white/80 mt-4 text-sm leading-relaxed">
                “{a.text}”
              </p>
              <p className="mt-5 font-semibold text-white">{a.name}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            href="/avisClient"
            className="inline-flex bg-accent text-dark px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Voir tous les avis
          </Link>
        </div>
      </div>
    </section>
  );
}
