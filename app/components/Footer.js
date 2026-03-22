import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock3,
  ChevronRight,
  Coffee,
  Truck,
  ShieldCheck,
} from "lucide-react";

export default function Footer() {
  const usefulLinks = [
    { href: "/", label: "Accueil" },
    { href: "/nosCafes", label: "Nos cafés" },
    { href: "/aPropos", label: "À propos" },
    { href: "/contact", label: "Contact" },
  ];

  const clientLinks = [
    { href: "/favoris", label: "Favoris" },
    { href: "/panier", label: "Panier" },
    { href: "/mesRecompenses", label: "Mes récompenses" },
    { href: "/suivi-commande", label: "Suivi commande" },
    { href: "/login", label: "Se connecter" },
    { href: "/register", label: "S'inscrire" },
  ];

  const footerLinkClass =
    "group inline-flex items-center gap-2 text-sm text-dark/75 transition-all duration-300 hover:translate-x-1 hover:text-primary";

  return (
    <footer className="relative overflow-hidden border-t border-dark/10 bg-beige text-dark">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,94,60,0.08),transparent_35%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.35),transparent_30%)]" />

      <div className="relative mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          <div className="xl:col-span-1">
            <div className="rounded-[28px] border border-dark/10 bg-white/40 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div className="mb-4 inline-flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Coffee size={20} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold font-heading text-dark">
                    Coffee House
                  </h2>
                  <p className="text-xs uppercase tracking-[0.18em] text-dark/45">
                    Premium Coffee
                  </p>
                </div>
              </div>

              <p className="max-w-sm text-sm leading-6 text-dark/75">
                Savourez des cafés artisanaux, des recettes signature et une
                expérience chaleureuse pensée pour chaque instant.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 rounded-2xl bg-white/35 px-4 py-3 text-sm text-dark2/75">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Coffee size={16} />
                  </div>
                  <span>Commande simple et rapide</span>
                </div>

                <div className="flex items-center gap-3 rounded-2xl bg-white/35 px-4 py-3 text-sm text-dark2/75">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Truck size={16} />
                  </div>
                  <span>Livraison disponible</span>
                </div>

                <div className="flex items-center gap-3 rounded-2xl bg-white/35 px-4 py-3 text-sm text-dark2/75">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <ShieldCheck size={16} />
                  </div>
                  <span>Programme de fidélité</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-dark/10 bg-white/35 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <h3 className="mb-5 text-lg font-semibold text-dark">
              Liens utiles
            </h3>

            <ul className="space-y-3">
              {usefulLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLinkClass}>
                    <ChevronRight
                      size={15}
                      className="text-primary transition-transform duration-300 group-hover:translate-x-1"
                    />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[28px] border border-dark/10 bg-white/35 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <h3 className="mb-5 text-lg font-semibold text-dark">
              Espace client
            </h3>

            <ul className="space-y-3">
              {clientLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={footerLinkClass}>
                    <ChevronRight
                      size={15}
                      className="text-primary transition-transform duration-300 group-hover:translate-x-1"
                    />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[28px] border border-dark/10 bg-white/35 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <h3 className="mb-5 text-lg font-semibold text-dark">Contact</h3>

            <div className="space-y-4 text-sm text-dark/75">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="font-medium text-dark">Adresse</p>
                  <p>Tunis, Tunisie</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="font-medium text-dark">Téléphone</p>
                  <p>+216 00 000 000</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="font-medium text-dark">Email</p>
                  <p>contact@coffeehouse.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Clock3 size={16} />
                </div>
                <div>
                  <p className="font-medium text-dark">Horaires</p>
                  <p>Tous les jours : 08:00 - 22:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-dark/10 pt-5">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-dark/60 md:text-left">
              © {new Date().getFullYear()} Coffee House. Tous droits réservés.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-dark2/65">
              <span className="rounded-full border border-dark/10 bg-white/50 px-4 py-2">
                Paiement à la livraison
              </span>
              <span className="rounded-full border border-dark/10 bg-white/50 px-4 py-2">
                Livraison rapide
              </span>
              <span className="rounded-full border border-dark/10 bg-white/50 px-4 py-2">
                Support client
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}