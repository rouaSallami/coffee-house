import Image from "next/image";

export default function AddonCard({ addon }) {
  return (
    <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-4 text-center
                    transition-all duration-300 hover:-translate-y-1 hover:border-accent/30">
      <div className="relative w-full h-28 mb-3">
        <Image
          src={addon.image}
          alt={addon.name}
          fill
          className="rounded-xl"
        />
      </div>

      <p className="font-semibold text-sm text-white">{addon.name}</p>
      <p className="text-accent text-sm mt-1">+{addon.price} DT</p>
    </div>
  );
}
