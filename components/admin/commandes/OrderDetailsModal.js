import { getStatusesByMode, getStatusLabel } from "@/lib/admin/commandes/helpers";

export default function OrderDetailsModal({
  order,
  onClose,
  onUpdateStatus,
}) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-dark/10 bg-base p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-dark">
              Commande #{order.id}
            </h2>

            <p className="mt-2 text-dark/70">
              {order.customer?.name || "Client non renseigné"}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-dark/10 bg-white px-4 py-2 text-sm font-semibold text-dark transition hover:bg-base"
          >
            Fermer
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-dark/10 bg-white/40 p-4">
            <p className="text-sm text-dark/60">Mode</p>
            <p className="mt-1 font-bold capitalize text-dark">
              {order.mode}
            </p>
          </div>

          <div className="rounded-2xl border border-dark/10 bg-white/40 p-4">
            <p className="text-sm text-dark/60">Statut</p>
            <p className="mt-1 font-bold text-primary">
              {getStatusLabel(order)}
            </p>
          </div>

          <div className="rounded-2xl border border-dark/10 bg-white/40 p-4">
            <p className="text-sm text-dark/60">Téléphone</p>
            <p className="mt-1 font-bold text-dark">
              {order.customer?.phone || "—"}
            </p>
          </div>

          <div className="rounded-2xl border border-dark/10 bg-white/40 p-4">
            <p className="text-sm text-dark/60">Total</p>
            <p className="mt-1 font-bold text-primary">
  {Number(order.total || order.totalPrice || 0).toFixed(2)} DT
</p>
          </div>

          {order.customer?.address && (
            <div className="rounded-2xl border border-dark/10 bg-white/40 p-4 md:col-span-2">
              <p className="text-sm text-dark/60">Adresse</p>
              <p className="mt-1 font-bold text-dark">
                {order.customer.address}
              </p>
            </div>
          )}

          {order.customer?.instructions && (
            <div className="rounded-2xl border border-dark/10 bg-white/40 p-4 md:col-span-2">
              <p className="text-sm text-dark/60">Instructions</p>
              <p className="mt-1 text-dark">{order.customer.instructions}</p>
            </div>
          )}

          {order.customer?.pickupTime && (
            <div className="rounded-2xl border border-dark/10 bg-white/40 p-4 md:col-span-2">
              <p className="text-sm text-dark/60">Heure de retrait</p>
              <p className="mt-1 font-bold text-dark">
                {order.customer.pickupTime}
              </p>
            </div>
          )}

          {order.customer?.note && (
            <div className="rounded-2xl border border-dark/10 bg-white/40 p-4 md:col-span-2">
              <p className="text-sm text-dark/60">Note</p>
              <p className="mt-1 text-dark">{order.customer.note}</p>
            </div>
          )}
        </div>

        <div className="mt-6 rounded-2xl border border-dark/10 bg-white/40 p-5">
          <h3 className="text-lg font-bold text-dark">Produits commandés</h3>

          <div className="mt-4 space-y-4">
            {order.items?.map((item, index) => (
              
              <div
              
                key={`${item.id}-${index}`}
                className="rounded-2xl border border-dark/10 bg-base p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-dark">
                      {item.coffeeName}
                    </h4>

                    <div className="mt-2 space-y-1 text-sm text-dark/70">
                      <p>Taille : {item.size?.label || "Non précisée"}</p>
                      <p>Contenant : {item.container || "Non précisé"}</p>
                      <p>Lait : {item.milk || "Non précisé"}</p>
                      <p>Sucre : {item.sugar ?? 0}%</p>
                      <p>
                        Add-ons :{" "}
                        {item.addons?.length > 0
                          ? item.addons.map((a) => a.name).join(", ")
                          : "Aucun"}
                      </p>
                      {item.note && <p>Note : {item.note}</p>}
                      <p>Quantité : {item.qty}</p>
                    </div>
                  </div>

                  <div className="text-right">
  <p className="text-xs text-dark/60">
    {Number(item.unitPrice || 0).toFixed(2)} DT × {item.qty}
  </p>
  <p className="font-bold text-primary">
    {Number(item.subtotal || 0).toFixed(2)} DT
  </p>
</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {getStatusesByMode(order.mode).map((status) => {
  const isActive = order.status === status.key;
  const isDisabled = isActive || order.isArchived;

  return (
    <button
      key={status.key}
      onClick={() => onUpdateStatus(order.id, status.key)}
      disabled={isDisabled}
      className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
        isDisabled
          ? "cursor-not-allowed bg-primary text-white opacity-60"
          : "border border-dark/10 bg-white text-dark hover:bg-base"
      }`}
    >
      {status.label}
    </button>
  );
})}
        </div>
      </div>
    </div>
  );
}