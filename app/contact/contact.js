"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock3,
  Send,
  Truck,
} from "lucide-react";

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
    <div className="relative min-h-screen mt-16 overflow-hidden bg-secondary text-dark">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_45%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary to-secondary/80" />

      <div className="relative max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <section className="text-center">
          <p className="text-dark/70 text-sm font-semibold uppercase tracking-[0.2em]">
            Coffee House
          </p>

          <h1 className="mt-3 text-4xl md:text-5xl font-bold text-dark font-heading">
            Contactez-nous
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-dark/75 leading-8">
            Une question ou une demande particulière ? Notre équipe vous répond
            rapidement.
          </p>
        </section>

        {/* Content */}
        <section className="mt-14 grid lg:grid-cols-2 gap-8 items-start">
          {/* Left side */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-dark/10 bg-white/35 backdrop-blur-md shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary font-heading mb-6">
                Nos coordonnées
              </h2>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-creamy text-primary flex items-center justify-center shrink-0 shadow-sm">
                    <Phone size={22} />
                  </div>

                  <div>
                    <p className="font-semibold text-primary">Téléphone</p>
                    <p className="text-dark/70 mt-1">+216 00 000 000</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-creamy text-primary flex items-center justify-center shrink-0 shadow-sm">
                    <Mail size={22} />
                  </div>

                  <div>
                    <p className="font-semibold text-primary">Email</p>
                    <p className="text-dark/70 mt-1">
                      contact@coffeehouse.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-creamy text-primary flex items-center justify-center shrink-0 shadow-sm">
                    <MapPin size={22} />
                  </div>

                  <div>
                    <p className="font-semibold text-primary">Adresse</p>
                    <p className="text-dark/70 mt-1">Tunis, Tunisie</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-dark/10 bg-white/35 backdrop-blur-md shadow-lg p-8">
              <h2 className="text-2xl font-bold text-primary font-heading mb-6">
                Informations utiles
              </h2>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-creamy text-primary flex items-center justify-center shrink-0 shadow-sm">
                    <Clock3 size={22} />
                  </div>

                  <div>
                    <p className="font-semibold text-primary">Horaires</p>
                    <p className="text-dark/70 mt-1">
                      Tous les jours de 08:00 à 22:00
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-creamy text-primary flex items-center justify-center shrink-0 shadow-sm">
                    <Truck size={22} />
                  </div>

                  <div>
                    <p className="font-semibold text-primary">
                      Zones de livraison
                    </p>
                    <p className="text-dark/70 mt-1">
                      Lac, Marsa, Centre Ville
                    </p>
                    <p className="text-dark/60 text-sm mt-1">
                      Délai estimé : 30 à 45 min
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="rounded-3xl border border-dark/10 bg-white/30 backdrop-blur-md shadow-xl p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-primary font-heading">
                Envoyez-nous un message
              </h2>
              <p className="text-dark/70 mt-2">
                Nous vous répondrons dans les meilleurs délais.
              </p>
            </div>

            {success && (
              <div className="mb-5 rounded-2xl border border-green-200 bg-green-50/90 px-4 py-3 text-sm font-medium text-green-700 shadow-sm">
                Votre message a été envoyé avec succès.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-primary font-semibold mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    required
                    className="w-full rounded-xl border border-dark/10 bg-white/55 px-4 py-3 text-dark placeholder:text-dark/40 outline-none backdrop-blur-sm transition focus:ring-2 focus:ring-primary/20 focus:border-primary/20"
                  />
                </div>

                <div>
                  <label className="block text-primary font-semibold mb-2">
                    Téléphone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Votre téléphone"
                    className="w-full rounded-xl border border-dark/10 bg-white/55 px-4 py-3 text-dark placeholder:text-dark/40 outline-none backdrop-blur-sm transition focus:ring-2 focus:ring-primary/20 focus:border-primary/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-primary font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Votre email"
                  required
                  className="w-full rounded-xl border border-dark/10 bg-white/55 px-4 py-3 text-dark placeholder:text-dark/40 outline-none backdrop-blur-sm transition focus:ring-2 focus:ring-primary/20 focus:border-primary/20"
                />
              </div>

              <div>
                <label className="block text-primary font-semibold mb-2">
                  Sujet
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Sujet de votre message"
                  required
                  className="w-full rounded-xl border border-dark/10 bg-white/55 px-4 py-3 text-dark placeholder:text-dark/40 outline-none backdrop-blur-sm transition focus:ring-2 focus:ring-primary/20 focus:border-primary/20"
                />
              </div>

              <div>
                <label className="block text-primary font-semibold mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Écrivez votre message..."
                  required
                  className="w-full h-36 rounded-xl border border-dark/10 bg-white/55 px-4 py-3 text-dark placeholder:text-dark/40 outline-none backdrop-blur-sm transition focus:ring-2 focus:ring-primary/20 focus:border-primary/20 resize-none"
                />
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-secondary text-white px-6 py-3 font-semibold transition hover:scale-[1.02] hover:opacity-95 shadow-md"
                >
                  <Send size={18} />
                  Envoyer le message
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Bottom note */}
        <section className="mt-10">
          <div className="rounded-3xl border border-dark/10 bg-white/30 backdrop-blur-md shadow-lg p-6 text-center">
            <p className="text-dark/70 leading-7">
              Vous organisez un événement, une réunion ou une commande de groupe
              ? Contactez-nous pour une demande personnalisée.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}