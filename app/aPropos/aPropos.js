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
  Sparkles,
  ChevronRight,
} from "lucide-react";

const VALUES = [
  {
    icon: Coffee,
    title: "Qualité artisanale",
    text: "Nous sélectionnons nos cafés avec soin pour offrir une saveur riche, équilibrée et constante dans chaque tasse.",
  },
  {
    icon: HeartHandshake,
    title: "Service chaleureux",
    text: "Notre priorité est de proposer une expérience fluide, agréable et humaine à chaque client, du choix jusqu’à la réception.",
  },
  {
    icon: Truck,
    title: "Livraison rapide",
    text: "Nous préparons et livrons vos commandes rapidement pour que votre café arrive frais, soigné et prêt à être savouré.",
  },
];

const HIGHLIGHTS = [
  "Cafés classiques et signatures",
  "Personnalisation de la commande",
  "Programme de fidélité",
  "Expérience simple et moderne",
];

const STATS = [
  { value: "500+", label: "Clients satisfaits" },
  { value: "20+", label: "Cafés différents" },
  { value: "5", label: "Ans d'expérience" },
];

const INFO_CARDS = [
  {
    icon: Award,
    title: "Expérience de qualité",
    text: "Nous mettons l’accent sur la qualité du café, la régularité des recettes et une expérience agréable pour chaque commande.",
  },
  {
    icon: Clock3,
    title: "Horaires",
    text: "Ouvert tous les jours de 08:00 à 22:00 pour répondre à vos envies café à tout moment.",
  },
  {
    icon: MapPin,
    title: "Localisation",
    text: "Nous opérons principalement à Tunis avec un service de livraison rapide dans plusieurs zones.",
  },
];

export default function AProposPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-secondary pt-20 text-dark">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(139,94,60,0.10),transparent_30%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary to-secondary/90" />

      <div className="relative mx-auto max-w-6xl px-6 py-8 md:py-10">
        {/* Hero */}
        <section className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-dark/10 bg-white/45 px-4 py-2 shadow-sm backdrop-blur-sm">
            <Sparkles size={15} className="text-primary" />
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-dark/70">
              Coffee House
            </p>
          </div>

          <h1 className="mt-4 text-3xl font-bold text-dark font-heading md:text-4xl lg:text-[58px]">
            À propos de nous
          </h1>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-dark/75 md:text-lg">
            Chez Coffee House, nous croyons que le café est bien plus qu’une
            simple boisson. C’est un moment de plaisir, de détente et de
            partage. Notre objectif est d’offrir une expérience café moderne,
            chaleureuse et accessible à tous.
          </p>
        </section>

        {/* Story + image */}
        <section className="mt-8 md:mt-10">
          <div className="grid items-center gap-6 lg:grid-cols-2">
            <div className="rounded-[28px] border border-dark/10 bg-white/40 p-6 shadow-xl backdrop-blur-md md:p-7">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">
                <Coffee size={16} />
                Notre histoire
              </div>

              <h2 className="text-2xl font-bold text-dark font-heading md:text-3xl">
                Une passion pour le café et l’expérience client
              </h2>

              <div className="mt-4 space-y-3 leading-7 text-dark/70">
                <p>
                  Coffee House est né d’une passion sincère pour le café et
                  d’une envie de créer une expérience simple, chaleureuse et
                  moderne pour tous les amateurs de café.
                </p>

                <p>
                  Nous avons conçu une carte équilibrée avec des cafés
                  classiques, des recettes signatures et des options
                  personnalisables pour répondre aux goûts et aux habitudes de
                  chacun.
                </p>

                <p>
                  Notre mission est d’offrir un café de qualité, un service
                  rapide et une expérience fluide, du premier clic jusqu’à la
                  livraison.
                </p>
              </div>
            </div>

            <div className="group relative h-[360px] overflow-hidden rounded-[28px] border border-dark/10 shadow-xl md:h-[390px]">
              <Image
                src="/images/about.jpg"
                alt="Ambiance Coffee House"
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/20 bg-white/15 p-4 text-white backdrop-blur-md">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80">
                  Coffee House
                </p>
                <p className="mt-1 text-base font-bold md:text-lg">
                  Une ambiance chaleureuse, moderne et conviviale
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
            {STATS.map((item) => (
              <div
                key={item.label}
                className="rounded-[24px] border border-dark/10 bg-white/40 p-5 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <p className="text-2xl font-bold text-primary md:text-3xl">
                  {item.value}
                </p>
                <p className="mt-1 text-sm text-dark/70">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="mt-8 md:mt-10">
          <div className="rounded-[28px] border border-dark/10 bg-white/35 p-6 shadow-xl backdrop-blur-md md:p-8">
            <div className="max-w-3xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">
                <Sparkles size={16} />
                Notre mission
              </div>

              <h2 className="text-2xl font-bold text-dark font-heading md:text-3xl">
                Offrir une expérience café simple, rapide et mémorable
              </h2>

              <p className="mt-3 leading-7 text-dark/70">
                Proposer un café de qualité dans une expérience moderne, simple
                et rapide. Nous souhaitons créer un moment agréable pour chaque
                client, que ce soit sur place ou à la livraison.
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {HIGHLIGHTS.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-dark/10 bg-creamy/80 p-3.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <p className="font-medium text-primary text-sm md:text-base">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mt-8 md:mt-10">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-dark font-heading md:text-4xl">
              Nos valeurs
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-dark/70 leading-7">
              Les principes qui guident notre qualité, notre service et
              l’expérience que nous voulons offrir au quotidien.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {VALUES.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-[26px] border border-dark/10 bg-white/40 p-5 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl md:p-6"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-creamy text-primary shadow-sm transition-transform duration-300 group-hover:scale-110">
                    <Icon size={22} />
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-primary md:text-xl">
                    {item.title}
                  </h3>

                  <p className="leading-7 text-dark/70">{item.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Info cards */}
        <section className="mt-8 md:mt-10">
          <div className="grid gap-4 md:grid-cols-3">
            {INFO_CARDS.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-[24px] border border-dark/10 bg-white/40 p-5 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-creamy text-primary shadow-sm">
                    <Icon size={20} />
                  </div>

                  <h3 className="mb-2 text-lg font-bold text-primary">
                    {item.title}
                  </h3>

                  <p className="leading-7 text-dark/70">{item.text}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-8 md:mt-10">
          <div className="rounded-[28px] border border-dark/10 bg-white/35 p-6 text-center shadow-xl backdrop-blur-md md:p-8">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold text-dark font-heading md:text-4xl">
                Découvrez nos cafés
              </h2>

              <p className="mx-auto mt-3 max-w-2xl leading-7 text-dark/70">
                Explorez notre menu et personnalisez votre café selon vos
                envies. Une expérience simple, rapide et gourmande vous attend.
              </p>

              <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/nosCafes"
                  className="inline-flex min-w-[170px] items-center justify-center gap-2 rounded-2xl bg-dark px-5 py-3 font-semibold text-accent shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:opacity-95"
                >
                  Voir nos cafés
                  <ChevronRight size={18} />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex min-w-[170px] items-center justify-center rounded-2xl border border-dark/15 bg-accent/35 px-5 py-3 font-semibold text-primary shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-accent/50"
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}