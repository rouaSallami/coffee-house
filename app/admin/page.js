"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const storedOrder = JSON.parse(localStorage.getItem("lastOrder"));
    if (storedOrder) {
      setOrder(storedOrder);
    }
  }, []);

  const updateStatus = (newStatus) => {
    if (!order) return;

    const updatedOrder = {
      ...order,
      status: newStatus,
    };

    localStorage.setItem("lastOrder", JSON.stringify(updatedOrder));
    setOrder(updatedOrder);
  };
  const clearOrder = () => {
  localStorage.removeItem("lastOrder");
  window.dispatchEvent(new Event("cartUpdated"));
  setOrder(null);
};

  if (!order) {
    return (
      <div className="bg-accent min-h-screen mt-16 flex items-center justify-center">
        <p className="text-dark text-lg font-semibold">
          Aucune commande pour le moment.
        </p>
      </div>
    );
  }

  const statuses = [
    { key: "confirmed", label: "Commande confirmée" },
    { key: "preparing", label: "Préparation" },
    { key: "out_for_delivery", label: "En livraison" },
    { key: "delivered", label: "Livrée" },
  ];

  return (
    <div className="bg-accent min-h-screen mt-16">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-dark mb-10 text-center">
          Page d’administration
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-base rounded-3xl p-8 border border-dark/10 shadow-md">
            <h2 className="text-2xl font-bold text-dark mb-6">
              Informations de la commande
            </h2>

            <div className="space-y-3 text-dark">
              <p>
                <span className="font-bold">Numéro de commande :</span> {order.id}
              </p>
              <p>
                <span className="font-bold">Statut actuel :</span>{" "}
                {statuses.find((s) => s.key === order.status)?.label || order.status}
              </p>
              <p>
                <span className="font-bold">Mode de réception :</span> {order.mode}
              </p>
              <p>
                <span className="font-bold">Nom :</span> {order.customer?.name}
              </p>

              {order.customer?.phone && (
                <p>
                  <span className="font-bold">Téléphone :</span> {order.customer.phone}
                </p>
              )}

              {order.customer?.address && (
                <p>
                  <span className="font-bold">Adresse :</span> {order.customer.address}
                </p>
              )}

              <p>
                <span className="font-bold">Total :</span>{" "}
                {Number(order.total).toFixed(2)} DT
              </p>
            </div>
          </div>

          <div className="bg-base rounded-3xl p-8 border border-dark/10 shadow-md">
            <h2 className="text-2xl font-bold text-dark mb-6">
              Modifier le statut de la commande
            </h2>

            <div className="grid gap-4">
              {statuses.map((status) => (
                <button
                  key={status.key}
                  onClick={() => updateStatus(status.key)}
                  className={`w-full rounded-2xl px-5 py-4 font-semibold transition border ${
                    order.status === status.key
                      ? "bg-dark text-white border-dark"
                      : "bg-white text-dark border-dark/10 hover:border-dark/30"
                  }`}
                >
                  {status.label}
                </button>
              ))}
              <button
  onClick={clearOrder}
  className="w-full mt-4 rounded-2xl px-5 py-4 font-semibold transition border bg-white text-dark border-dark/10 hover:border-dark/30"
>
  Terminer la commande
</button>
            </div>
          </div>
        </div>

        <div className="bg-base rounded-3xl p-8 border border-dark/10 shadow-md mt-8">
          <h2 className="text-2xl font-bold text-dark mb-6">
            Détails des produits
          </h2>

          {order.items?.length === 0 ? (
            <p className="text-dark/70">Aucun produit.</p>
          ) : (
            <div className="space-y-4">
              {order.items?.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="border-b border-dark/10 pb-4"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="font-bold text-dark">{item.coffeeName}</h3>

                      <div className="text-sm text-dark/70 mt-2 space-y-1">
                        <p>Taille : {item.size?.label}</p>
                        <p>Contenant : {item.container}</p>
                        <p>Sucre : {item.sugar}%</p>
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

                    <p className="font-bold text-dark whitespace-nowrap">
                      {(item.totalPrice * item.qty).toFixed(2)} DT
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}