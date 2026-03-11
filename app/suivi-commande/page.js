"use client";

import { useEffect, useState } from "react";

export default function SuiviCommande() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const loadOrder = () => {
      const storedOrder = JSON.parse(localStorage.getItem("lastOrder"));
      if (storedOrder) {
        setOrder(storedOrder);
      }
    };

    loadOrder();

    const interval = setInterval(loadOrder, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!order) {
    return <p className="p-10">Chargement...</p>;
  }

  const steps = [
    { key: "confirmed", label: "Commande confirmée" },
    { key: "preparing", label: "Préparation" },
    { key: "out_for_delivery", label: "En livraison" },
    { key: "delivered", label: "Livrée" },
  ];

  const currentIndex = steps.findIndex((step) => step.key === order.status);

  return (
    <div className="bg-accent min-h-screen mt-16">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-dark mb-10 text-center">
          Suivi de votre commande
        </h1>

        <div className="bg-base rounded-3xl p-10 border border-dark/10 shadow-md">
          <p className="text-dark mb-6">
            Numéro de commande :
            <span className="font-bold ml-2">{order.id}</span>
          </p>

          <p className="text-dark mb-10">
            Statut actuel :
            <span className="font-bold ml-2">
              {steps.find((step) => step.key === order.status)?.label || order.status}
            </span>
          </p>

          <div className="space-y-6">
            {steps.map((step, index) => (
              <div
                key={step.key}
                className={`flex items-center gap-4 ${
                  index <= currentIndex ? "text-dark" : "text-dark/40"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index <= currentIndex
                      ? "bg-dark text-white"
                      : "bg-dark/20"
                  }`}
                >
                  {index + 1}
                </div>

                <p className="font-semibold">{step.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}