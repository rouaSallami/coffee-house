export default function DeliveryBadge() {
  return (
    <div className="mt-6 w-fit rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-white backdrop-blur-sm">
      <p className="text-sm font-semibold">🚚 Livraison</p>

      <div className="mt-2 flex flex-wrap gap-2">
        {["Lac", "Marsa", "Centre Ville"].map((z) => (
          <span key={z} className="rounded-full bg-white/15 px-3 py-1 text-xs">
            📍 {z}
          </span>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-xs text-white/85">
        <div>⏱️ 30–45 min</div>
        <div>💵 Dès 5 DT</div>
      </div>
    </div>
  );
}
