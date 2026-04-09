import Image from "next/image";

export default function AddonCard({ addon }) {
  const imageSrc = addon.image
    ? addon.image.replace("127.0.0.1", "localhost")
    : "/images/cookie-maison1.jpg";

  return (
    <div
      className={`relative rounded-xl p-4 text-center border backdrop-blur transition-all duration-300 ${
        addon.available
          ? "bg-dark/30 border-white/10 hover:-translate-y-1 hover:border-accent/30"
          : "bg-dark/20 border-white/5 opacity-80"
      }`}
    >
      <div className="relative mb-3 h-28 w-full overflow-hidden rounded-xl">
        <div className="relative w-full h-32">
  <Image
    src={imageSrc}
    alt={addon.name}
    fill
    sizes="(max-width: 768px) 100vw, 300px"
    className="object-cover rounded-xl"
  />
</div>

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