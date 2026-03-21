import Image from "next/image";

export default function AddonCard({ addon }) {
  return (
    <div
      className={`relative rounded-xl p-4 text-center border backdrop-blur transition-all duration-300 ${
        addon.available
          ? "bg-dark/30 border-white/10 hover:-translate-y-1 hover:border-accent/30"
          : "bg-dark/20 border-white/5 opacity-80"
      }`}
    >
      <div className="relative w-full h-28 mb-3">
        <Image
          src={addon.image}
          alt={addon.name}
          fill
          className="rounded-xl object-cover"
        />

        {!addon.available && (
          <span className="absolute top-2 left-2 z-10 rounded-full bg-gray-600 px-3 py-1 text-xs font-semibold text-white shadow-md">
            Indisponible
          </span>
        )}
      </div>

      <p className="font-semibold text-sm text-white">{addon.name}</p>
      <p className="text-accent text-sm mt-1">+{addon.price} DT</p>
    </div>
  );
}