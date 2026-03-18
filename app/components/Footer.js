import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-beige text-dark border-t border-dark/10">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold font-heading text-dark mb-4">
              Coffee House
            </h2>

            <p className="text-sm text-dark/75 leading-6 max-w-sm">
              Savourez des cafés artisanaux, des recettes signature et une
              expérience chaleureuse pensée pour chaque instant.
            </p>

            <div className="mt-5 space-y-2 text-sm text-dark/65">
              <p>✔ Commande simple et rapide</p>
              <p>✔ Livraison disponible</p>
              <p>✔ Programme de fidélité</p>
            </div>
          </div>

          {/* Liens utiles */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-dark">
              Liens utiles
            </h3>

            <ul className="space-y-2 text-sm text-dark/75">
              <li>
                <Link href="/" className="hover:text-beige transition-colors">
                  Accueil
                </Link>
              </li>

              <li>
                <Link
                  href="/nosCafes"
                  className="hover:text-beige transition-colors"
                >
                  Nos cafés
                </Link>
              </li>

              <li>
                <Link
                  href="/aPropos"
                  className="hover:text-beige transition-colors"
                >
                  À propos
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="hover:text-beige transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Espace client */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-dark">
              Espace client
            </h3>

            <ul className="space-y-2 text-sm text-dark/75">
              <li>
                <Link
                  href="/favoris"
                  className="hover:text-beige transition-colors"
                >
                  Favoris
                </Link>
              </li>

              <li>
                <Link
                  href="/panier"
                  className="hover:text-beige transition-colors"
                >
                  Panier
                </Link>
              </li>

              <li>
                <Link
                  href="/mesRecompenses"
                  className="hover:text-beige transition-colors"
                >
                  Mes récompenses
                </Link>
              </li>

              <li>
                <Link
                  href="/suivi-commande"
                  className="hover:text-beige transition-colors"
                >
                  Suivi commande
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-dark">Contact</h3>

            <div className="space-y-2 text-sm text-dark/75 leading-6">
              <p>📍 Tunis, Tunisie</p>
              <p>📞 +216 00 000 000</p>
              <p>✉ contact@coffeehouse.com</p>
              <p>🕒 Tous les jours : 08:00 - 22:00</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-5 border-t border-dark/10 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-dark/60">
          <p>© {new Date().getFullYear()} Coffee House. Tous droits réservés.</p>

          <div className="flex items-center gap-4 text-dark/65">
            <span className="cursor-default">Paiement à la livraison</span>
            <span className="cursor-default">Livraison rapide</span>
            <span className="cursor-default">Support client</span>
          </div>
        </div>
      </div>
    </footer>
  );
}