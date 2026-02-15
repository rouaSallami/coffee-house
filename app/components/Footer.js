import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark text-white ">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">

        {/* Logo / About */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Nom du Café</h2>
          <p className="text-sm text-gray-300">
            Votre moment café parfait ☕
            Venez découvrir nos spécialités
            dans une ambiance chaleureuse.
          </p>
        </div>

        {/* Liens rapides */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
          <ul className="space-y-2 text-gray-300">

            <li>
              <Link href="/" className="hover:text-accent transition-colors">
                Accueil
              </Link>
            </li>

            <li>
              <Link href="/nosCafés" className="hover:text-accent transition-colors">
                Nos cafés
              </Link>
            </li>

            <li>
              <Link href="/aPropos" className="hover:text-accent transition-colors">
                À propos
              </Link>
            </li>

            <li>
              <Link href="/contact" className="hover:text-accent transition-colors">
                Contact
              </Link>
            </li>

          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <p className="text-gray-300 text-sm">
            📍 Tunis, Tunisie <br />
            📞 +216 00 000 000 <br />
            ✉ contact@cafe.com
          </p>
        </div>

      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} Nom du Café. Tous droits réservés.
      </div>
    </footer>
  );
}
