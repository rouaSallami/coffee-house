"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock3,
  Send,
  Truck,
  Sparkles,
  ChevronRight,
} from "lucide-react";

const CONTACT_CARDS = [
  {
    icon: Phone,
    title: "Téléphone",
    text: "+216 00 000 000",
  },
  {
    icon: Mail,
    title: "Email",
    text: "contact@coffeehouse.com",
  },
  {
    icon: MapPin,
    title: "Adresse",
    text: "Tunis, Tunisie",
  },
];

const INFO_CARDS = [
  {
    icon: Clock3,
    title: "Horaires",
    text: "Tous les jours de 08:00 à 22:00",
    subtext: "Nous sommes disponibles tout au long de la journée.",
  },
  {
    icon: Truck,
    title: "Zones de livraison",
    text: "Lac, Marsa, Centre Ville",
    subtext: "Délai estimé : 30 à 45 min",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Contact form:", form);

    setSuccess(true);

    setForm({
      name: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
    });

    setTimeout(() => {
      setSuccess(false);
    }, 2500);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-secondary pt-20 text-dark">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_42%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(139,94,60,0.10),transparent_30%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary to-secondary/85" />

      <div className="relative mx-auto max-w-6xl px-6 py-8 md:py-10">
        {/* Hero */}
        <section className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-dark/10 bg-white/45 px-4 py-2 shadow-sm backdrop-blur-sm">
            <Sparkles size={15} className="text-primary" />
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-dark/70">
              Coffee House
            </p>
          </div>

          <h1 className="mt-4 font-heading text-3xl font-bold text-dark md:text-4xl lg:text-[58px]">
            Contactez-nous
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-dark/75 md:text-lg">
            Une question, une demande particulière ou une commande spéciale ?
            Notre équipe vous répond rapidement avec plaisir.
          </p>
        </section>

        {/* Main content */}
        <section className="mt-8 grid items-start gap-6 lg:grid-cols-2 md:mt-10">
          {/* Left side */}
          <div className="space-y-4">
            <div className="rounded-[28px] border border-dark/10 bg-white/40 p-6 shadow-xl backdrop-blur-md md:p-7">
              <div className="mb-5">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">
                  <Mail size={16} />
                  Nos coordonnées
                </div>

                <h2 className="font-heading text-xl font-bold text-dark md:text-2xl">
                  Restons en contact
                </h2>
              </div>

              <div className="space-y-4">
                {CONTACT_CARDS.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="flex items-start gap-4 rounded-2xl border border-dark/10 bg-white/45 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-creamy text-primary shadow-sm">
                        <Icon size={19} />
                      </div>

                      <div>
                        <p className="font-semibold text-primary">{item.title}</p>
                        <p className="mt-1 text-dark/70">{item.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[28px] border border-dark/10 bg-white/40 p-6 shadow-xl backdrop-blur-md md:p-7">
              <div className="mb-5">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">
                  <Clock3 size={16} />
                  Informations utiles
                </div>

                <h2 className="font-heading text-xl font-bold text-dark md:text-2xl">
                  Avant de nous écrire
                </h2>
              </div>

              <div className="space-y-4">
                {INFO_CARDS.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="flex items-start gap-4 rounded-2xl border border-dark/10 bg-white/45 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-creamy text-primary shadow-sm">
                        <Icon size={19} />
                      </div>

                      <div>
                        <p className="font-semibold text-primary">{item.title}</p>
                        <p className="mt-1 text-dark/70">{item.text}</p>
                        <p className="mt-1 text-sm text-dark/55">
                          {item.subtext}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[28px] border border-dark/10 bg-white/35 p-5 shadow-lg backdrop-blur-md">
              <p className="leading-7 text-dark/70">
                Vous organisez un événement, une réunion ou une commande de
                groupe ? Contactez-nous pour une demande personnalisée et une
                expérience adaptée à vos besoins.
              </p>
            </div>
          </div>

          {/* Right side */}
          <div className="rounded-[28px] border border-dark/10 bg-white/35 p-6 shadow-2xl backdrop-blur-md md:p-7">
            <div className="mb-5">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary">
                <Send size={16} />
                Formulaire de contact
              </div>

              <h2 className="font-heading text-xl font-bold text-dark md:text-2xl">
                Envoyez-nous un message
              </h2>

              <p className="mt-2 text-dark/70">
                Nous vous répondrons dans les meilleurs délais.
              </p>
            </div>

            {success && (
              <div className="mb-4 rounded-2xl border border-green-200 bg-green-50/95 px-4 py-3 text-sm font-medium text-green-700 shadow-sm">
                Votre message a été envoyé avec succès.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block font-semibold text-primary">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    required
                    className="w-full rounded-2xl border border-dark/10 bg-white/60 px-4 py-3 text-dark outline-none backdrop-blur-sm transition-all duration-300 placeholder:text-dark/40 focus:border-primary/30 focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-primary">
                    Téléphone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Votre téléphone"
                    className="w-full rounded-2xl border border-dark/10 bg-white/60 px-4 py-3 text-dark outline-none backdrop-blur-sm transition-all duration-300 placeholder:text-dark/40 focus:border-primary/30 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block font-semibold text-primary">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Votre email"
                  required
                  className="w-full rounded-2xl border border-dark/10 bg-white/60 px-4 py-3 text-dark outline-none backdrop-blur-sm transition-all duration-300 placeholder:text-dark/40 focus:border-primary/30 focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-primary">
                  Sujet
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Sujet de votre message"
                  required
                  className="w-full rounded-2xl border border-dark/10 bg-white/60 px-4 py-3 text-dark outline-none backdrop-blur-sm transition-all duration-300 placeholder:text-dark/40 focus:border-primary/30 focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="mb-2 block font-semibold text-primary">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Écrivez votre message..."
                  required
                  className="h-32 w-full resize-none rounded-2xl border border-dark/10 bg-white/60 px-4 py-3 text-dark outline-none backdrop-blur-sm transition-all duration-300 placeholder:text-dark/40 focus:border-primary/30 focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="pt-1 flex justify-center sm:justify-start">
                <button
                  type="submit"
                  className="inline-flex min-w-[190px] items-center justify-center gap-2 rounded-2xl bg-dark px-5 py-3 font-semibold text-accent shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:opacity-95"
                >
                  <Send size={18} />
                  Envoyer le message
                  <ChevronRight size={17} />
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}