import Link from "next/link";

export default function GroupOrders() {
  return (
    <section
      className="relative py-20 bg-secondary/50 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bg-coffee.png')" }}
    >
      <div className="max-w-5xl mx-auto px-6 text-center">

        <div className="bg-dark/30 backdrop-blur-md border border-beige/20 rounded-3xl px-8 py-12 shadow-xl">

          <h2 className="text-3xl sm:text-4xl font-bold text-dark">
            Un événement à organiser ?
          </h2>

          <p className="text-dark/80 mt-4 max-w-2xl mx-auto leading-7">
            Réunions, événements, camping ou groupes d’amis.
            Commandez plusieurs cafés et boissons pour tout votre groupe.
            Nous préparons votre commande à l’avance.
          </p>

          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-2xl px-8 py-3.5 font-semibold shadow-lg bg-primary text-creamy hover:bg-secondary hover:text-dark"
            >
              Nous contacter
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}