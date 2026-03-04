"use client";

import { useEffect } from "react";

export default function PourquoiNous() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("show");
        });
      },
      { threshold: 0.15 },
    );

    els.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return (
    <section
      className="bg-cover bg-center bg-no-repeat py-32 px-6 text-white"
      style={{ backgroundImage: "url('/images/bg-coffee.png')" }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="reveal text-4xl md:text-5xl font-bold font-heading">
          Pourquoi nous ?
        </h2>

        <p className="reveal mt-5 text-white/90 max-w-2xl mx-auto text-lg">
          Une qualité constante, un service rapide et une expérience café
          unique.
        </p>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {/* Card 1 */}
          <div
            className="reveal bg-white/15 backdrop-blur-sm p-10 rounded-3xl "
            style={{ transitionDelay: "0ms" }}
          >
            <div className="text-5xl">☕</div>
            <h3 className="mt-6 font-semibold text-xl">Café premium</h3>
            <p className="mt-3 text-white/80 text-sm leading-relaxed">
              Des grains sélectionnés pour un goût riche et équilibré.
            </p>
          </div>

          {/* Card 2 */}
          <div
            className="reveal bg-white/15 backdrop-blur-sm p-10 rounded-3xl "
            style={{ transitionDelay: "300ms" }}
          >
            <div className="text-5xl">🚀</div>
            <h3 className="mt-6 font-semibold text-xl">Livraison rapide</h3>
            <p className="mt-3 text-white/80 text-sm leading-relaxed">
              30–45 minutes dans les zones disponibles.
            </p>
          </div>

          {/* Card 3 */}
          <div
            className="reveal bg-white/15 backdrop-blur-sm p-10 rounded-3xl "
            style={{ transitionDelay: "600ms" }}
          >
            <div className="text-5xl">🎁</div>
            <h3 className="mt-6 font-semibold text-xl">Récompenses</h3>
            <p className="mt-3 text-white/80 text-sm leading-relaxed">
              Des avantages exclusifs pour nos clients fidèles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
