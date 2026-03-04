import Image from "next/image";
import Link from "next/link";

export default function HomeCoffeeCard({ coffee, variant = "home" }) {
  const isMenu = variant === "menu";

  return (
    <div
      className="bg-white/5 backdrop-blur-xl border border-white/10
      rounded-2xl shadow-xl p-6 flex flex-col items-center text-center
      transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative w-full h-48 overflow-hidden rounded-2xl mb-4">
        <Image
          src={coffee.image}
          alt={coffee.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-dark mb-2">{coffee.name}</h3>

      {/* Description */}
      <p className="text-gray-500 text-sm mb-4">{coffee.description}</p>

      {/* Bottom */}
      <div className="flex items-center justify-between w-full mt-auto">
        <span className="font-semibold text-secondary text-lg">
          {coffee.price} DT
        </span>

        <Link
          href={isMenu ? `/commande/${coffee.id}` : "/nosCafes"}
          className="bg-dark text-white px-4 py-2 rounded-lg text-sm hover:bg-accent hover:text-dark transition-colors"
        >
          {isMenu ? "Choisir" : "Commander"}
        </Link>
      </div>
    </div>
  );
}
