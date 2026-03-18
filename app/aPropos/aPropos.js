"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Coffee,
  HeartHandshake,
  Truck,
  Award,
  Clock3,
  MapPin,
} from "lucide-react";

const VALUES = [
  {
    icon: Coffee,
    title: "Qualité artisanale",
    text: "Nous sélectionnons nos cafés avec soin pour offrir une saveur riche et équilibrée dans chaque tasse.",
  },
  {
    icon: HeartHandshake,
    title: "Service chaleureux",
    text: "Notre priorité est de proposer une expérience agréable et simple à chaque client.",
  },
  {
    icon: Truck,
    title: "Livraison rapide",
    text: "Nous préparons et livrons vos commandes rapidement pour que votre café arrive toujours parfait.",
  },
];

const HIGHLIGHTS = [
  "Cafés classiques et signatures",
  "Personnalisation de la commande",
  "Programme de fidélité",
  "Expérience simple et moderne",
];

export default function AProposPage() {
  return (
    <div className="relative min-h-screen mt-16 overflow-hidden bg-secondary text-dark">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_45%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary to-secondary/80" />

      <div className="relative max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <section className="text-center">
          <p className="text-dark/70 text-sm font-semibold uppercase tracking-[0.22em]">
            Coffee House
          </p>

          <h1 className="mt-3 text-4xl md:text-5xl font-bold text-dark font-heading">
            À propos de nous
          </h1>

          <p className="mt-4 max-w-3xl mx-auto text-dark/75 leading-8">
            Chez Coffee House, nous croyons que le café est bien plus qu’une
            simple boisson. C’est un moment de plaisir, de détente et de partage.
            Notre objectif est d’offrir une expérience café moderne, chaleureuse
            et accessible à tous.
          </p>
        </section>

        {/* Story + Image */}
        <section className="mt-14">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="rounded-3xl border border-dark/10 bg-white/35 backdrop-blur-md shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary font-heading mb-4">
                Notre histoire
              </h2>

              <div className="space-y-4 text-dark/70 leading-7">
                <p>
                  Coffee House est né d’une passion pour le café et d’une envie
                  de créer une expérience simple et agréable pour tous les
                  amateurs de café.
                </p>

                <p>
                  Nous avons conçu une carte équilibrée avec des cafés
                  classiques, des recettes signatures et des options
                  personnalisables pour répondre aux goûts de chacun.
                </p>

                <p>
                  Notre mission est d’offrir un café de qualité, un service
                  rapide et une expérience fluide du choix jusqu’à la livraison.
                </p>
              </div>
            </div>

            <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-lg border border-dark/10">
              <Image
                src="/images/about.jpg"
                alt="Ambiance Coffee House"
                fill
                className="object-cover transition duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
            </div>
          </div>

          {/* Chiffres */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 text-center">
            <div className="rounded-3xl border border-dark/10 bg-white/35 backdrop-blur-md shadow-lg p-6">
              <p className="text-3xl font-bold text-primary">500+</p>
              <p className="text-sm text-dark/70 mt-2">Clients satisfaits</p>
            </div>

            <div className="rounded-3xl border border-dark/10 bg-white/35 backdrop-blur-md shadow-lg p-6">
              <p className="text-3xl font-bold text-primary">20+</p>
              <p className="text-sm text-dark/70 mt-2">Cafés différents</p>
            </div>

            <div className="rounded-3xl border border-dark/10 bg-white/35 backdrop-blur-md shadow-lg p-6">
              <p className="text-3xl font-bold text-primary">5</p>
              <p className="text-sm text-dark/70 mt-2">Ans d'expérience</p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="mt-8">
          <div className="rounded-3xl border border-dark/10 bg-white/30 backdrop-blur-md shadow-xl p-8">
            <h2 className="text-2xl font-bold text-primary font-heading mb-4">
              Notre mission
            </h2>

            <p className="text-dark/70 leading-7">
              Proposer un café de qualité dans une expérience moderne,
              simple et rapide. Nous souhaitons créer un moment agréable
              pour chaque client, que ce soit sur place ou à la livraison.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {HIGHLIGHTS.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-dark/10 bg-creamy/75 p-4 shadow-sm"
                >
                  <p className="font-medium text-primary">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mt-14">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-dark font-heading">
              Nos valeurs
            </h2>

            <p className="mt-3 text-dark/70">
              Les principes qui guident notre service et notre qualité.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {VALUES.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-dark/10 bg-white/35 backdrop-blur-md shadow-lg p-7"
                >
                  <div className="w-14 h-14 rounded-2xl bg-creamy text-primary flex items-center justify-center mb-5 shadow-sm">
                    <Icon size={24} />
                  </div>

                  <h3 className="text-xl font-bold text-primary mb-3">
                    {item.title}
                  </h3>

                  <p className="text-dark/70 leading-7">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Informations */}
        <section className="mt-14">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-3xl border border-dark/10 bg-white/35 backdrop-blur-md shadow-lg p-6">
              <div className="w-12 h-12 rounded-2xl bg-creamy text-primary flex items-center justify-center mb-4 shadow-sm">
                <Award size={22} />
              </div>

              <h3 className="text-lg font-bold text-primary mb-2">
                Expérience de qualité
              </h3>

              <p className="text-dark/70 leading-7">
                Nous mettons l’accent sur la qualité du café et une expérience
                simple et agréable pour chaque commande.
              </p>
            </div>

            <div className="rounded-3xl border border-dark/10 bg-white/35 backdrop-blur-md shadow-lg p-6">
              <div className="w-12 h-12 rounded-2xl bg-creamy text-primary flex items-center justify-center mb-4 shadow-sm">
                <Clock3 size={22} />
              </div>

              <h3 className="text-lg font-bold text-primary mb-2">
                Horaires
              </h3>

              <p className="text-dark/70 leading-7">
                Ouvert tous les jours de
                <span className="font-semibold text-primary"> 08:00 </span>
                à
                <span className="font-semibold text-primary"> 22:00</span>.
              </p>
            </div>

            <div className="rounded-3xl border border-dark/10 bg-white/35 backdrop-blur-md shadow-lg p-6">
              <div className="w-12 h-12 rounded-2xl bg-creamy text-primary flex items-center justify-center mb-4 shadow-sm">
                <MapPin size={22} />
              </div>

              <h3 className="text-lg font-bold text-primary mb-2">
                Localisation
              </h3>

              <p className="text-dark/70 leading-7">
                Nous opérons principalement à Tunis avec un service
                de livraison rapide dans plusieurs zones.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-14">
          <div className="rounded-3xl border border-dark/10 bg-white/30 backdrop-blur-md shadow-lg p-8 md:p-10 text-center">
            <h2 className="text-3xl font-bold text-dark font-heading">
              Découvrez nos cafés
            </h2>

            <p className="mt-4 text-dark/70 max-w-2xl mx-auto leading-7">
              Explorez notre menu et personnalisez votre café selon vos envies.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/nosCafes"
                className="inline-flex justify-center rounded-2xl bg-dark text-accent px-6 py-3 font-semibold transition hover:scale-[1.02] hover:opacity-95 shadow-md min-w-45"
              >
                Voir nos cafés
              </Link>

              <Link
                href="/contact"
                className="inline-flex justify-center rounded-2xl border border-dark/15 bg-accent/35 text-primary px-6 py-3 font-semibold transition hover:scale-[1.02] hover:opacity-95 shadow-md transition min-w-45"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}