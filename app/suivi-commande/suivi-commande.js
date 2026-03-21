"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function SuiviCommande() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrder = () => {
      const storedOrder = JSON.parse(localStorage.getItem("lastOrder"));
      setOrder(storedOrder || null);
      setLoading(false);
    };

    loadOrder();

    window.addEventListener("cartUpdated", loadOrder);

    return () => {
      window.removeEventListener("cartUpdated", loadOrder);
    };
  }, []);

  if (loading) {
    return (
      <div className="relative min-h-screen mt-16 overflow-hidden bg-base text-dark">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(198,154,107,0.10),_transparent_40%)]" />
        <div className="max-w-3xl mx-auto px-6 py-20 relative">
          <div className="rounded-3xl border border-primary/10 bg-white/70 backdrop-blur-sm shadow-lg p-10 text-center">
            <p className="text-dark/80 text-lg font-medium">Chargement...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="relative min-h-screen mt-16 overflow-hidden bg-base text-dark">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(198,154,107,0.10),_transparent_40%)]" />
        <div className="max-w-3xl mx-auto px-6 py-20 relative">
          <div className="rounded-3xl border border-primary/10 bg-white/70 backdrop-blur-sm shadow-lg p-10 text-center">
            <h1 className="text-3xl font-bold text-dark mb-4 font-heading">
              Aucune commande en cours
            </h1>

            <p className="text-dark/70 mb-8">
              Vous n’avez pas de commande active pour le moment.
            </p>

            <Link
              href="/nosCafes"
              className="inline-block rounded-2xl bg-primary text-white px-6 py-3 font-semibold transition hover:opacity-95 shadow-md"
            >
              Commander un café
            </Link>
          </div>
        </div>
      </div>
    );
  }

  let steps = [];

  if (order.mode === "livraison") {
    steps = [
      { key: "confirmed", label: "Commande confirmée" },
      { key: "preparing", label: "Préparation" },
      { key: "out_for_delivery", label: "En livraison" },
      { key: "delivered", label: "Livrée" },
    ];
  }

  if (order.mode === "emporter") {
    steps = [
      { key: "confirmed", label: "Commande confirmée" },
      { key: "preparing", label: "Préparation" },
      { key: "ready", label: "Prête à récupérer" },
      { key: "delivered", label: "Récupérée" },
    ];
  }

  if (order.mode === "surplace") {
    steps = [
      { key: "confirmed", label: "Commande confirmée" },
      { key: "preparing", label: "Préparation" },
      { key: "ready", label: "Prête à être servie" },
      { key: "delivered", label: "Servie" },
    ];
  }

  const currentIndex = steps.findIndex((step) => step.key === order.status);

  const currentStatusLabel =
    steps.find((step) => step.key === order.status)?.label || order.status;

  const statusStyles = {
    confirmed: "bg-creamy text-primary border border-primary/15",
    preparing: "bg-secondary/15 text-primary border border-secondary/30",
    out_for_delivery: "bg-beige/60 text-dark border border-dark/10",
    ready: "bg-beige/60 text-dark border border-dark/10",
    delivered: "bg-primary text-white border border-primary",
  };

  let infoLabel = "";
  let infoValue = "";

  if (order.mode === "livraison") {
    infoLabel = "Temps estimé";
    infoValue = "25 à 35 min";
  }

  if (order.mode === "emporter") {
    infoLabel = "Heure de retrait";
    infoValue = order.customer?.pickupTime || "Dès que la commande est prête";
  }

  if (order.mode === "surplace") {
    infoLabel = "Service estimé";
    infoValue = "10 à 15 min";
  }

  const formattedDate = order.createdAt
    ? new Date(order.createdAt).toLocaleString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Date indisponible";

  const totalItems =
    order.items?.reduce((sum, item) => sum + item.qty, 0) || 0;

  const orderSummary =
    order.items?.map((item) => item.coffeeName).join(", ") || "Aucun produit";

  return (
   <div className="relative min-h-screen overflow-hidden bg-secondary pt-20 text-dark">
  {/* Background */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_45%)]" />
  <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary to-secondary/80" />

  <div className="relative max-w-4xl mx-auto px-6 py-8 md:py-10">
    {/* Header */}
    <div className="text-center mb-8 md:mb-10">
      <p className="text-dark/70 text-sm font-semibold uppercase tracking-[0.2em]">
        Votre commande
      </p>

      <h1 className="text-3xl font-bold text-dark mt-4 font-heading md:text-4xl">
        Suivi de votre commande
      </h1>

      <p className="text-dark/75 mt-3 max-w-2xl mx-auto leading-7">
        Suivez l’avancement de votre commande en temps réel.
      </p>
    </div>

    {/* Card */}
    <div className="rounded-3xl border border-dark/10 bg-white/30 backdrop-blur-md p-6 md:p-8 shadow-xl">
      {/* Top */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
        <div>
          <p className="text-sm uppercase tracking-wider text-dark/60 font-semibold">
            Numéro de commande
          </p>
          <h2 className="text-3xl font-bold text-marron mt-1">
            {order.id}
          </h2>
        </div>

        <div className="text-left md:text-right">
          <p className="text-sm text-dark/60">Statut actuel</p>
          <span
            className={`mt-2 inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold shadow-sm ${
              statusStyles[order.status] ||
              "bg-creamy text-primary border border-primary/15"
            }`}
          >
            {currentStatusLabel}
          </span>
        </div>
      </div>

      {/* Infos */}
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="rounded-2xl border border-dark/10 bg-white/40 p-4 shadow-sm">
          <p className="text-sm text-dark2/60 mb-1">Date</p>
          <p className="font-bold text-primary">{formattedDate}</p>
        </div>

        <div className="rounded-2xl border border-dark/10 bg-white/40 p-4 shadow-sm">
          <p className="text-sm text-dark2/60 mb-1">Mode</p>
          <p className="font-bold text-primary capitalize">{order.mode}</p>
        </div>

        <div className="rounded-2xl border border-dark/10 bg-white/40 p-4 shadow-sm">
          <p className="text-sm text-dark2/60 mb-1">{infoLabel}</p>
          <p className="font-bold text-primary">{infoValue}</p>
        </div>

        <div className="rounded-2xl border border-dark/10 bg-white/40 p-4 shadow-sm">
          <p className="text-sm text-dark2/60 mb-1">Total</p>
          <p className="font-bold text-primary">
            {Number(order.total).toFixed(2)} DT
          </p>
        </div>
      </div>

      {/* Résumé */}
      <div className="mb-8 rounded-2xl border border-dark/10 bg-white/40 p-4 shadow-sm">
        <p className="text-primary font-semibold mb-1">Résumé :</p>
        <p className="text-dark2/85 leading-7">{orderSummary}</p>
      </div>

      {/* Steps */}
      <div className="relative pl-6 space-y-5">
        <div className="absolute left-[18px] top-0 h-full w-[2px] bg-dark/10" />

        {steps.map((step, index) => {
          const isActive = index <= currentIndex;

          return (
            <div
              key={step.key}
              className={`flex items-center gap-4 ${
                isActive ? "text-dark2" : "text-dark/45"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold shadow-sm z-10 ${
                  isActive
                    ? "bg-primary text-dark2"
                    : "bg-white/60 text-dark2 border border-dark/10"
                }`}
              >
                {index + 1}
              </div>

              <p className="font-semibold">{step.label}</p>
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Link
          href="/nosCafes"
          className="inline-flex justify-center rounded-2xl border border-dark/15 bg-white/40 text-dark2 px-5 py-3 font-semibold transition hover:bg-white/55"
        >
          Commander autre chose
        </Link>

        <Link
          href="/contact"
          className="inline-flex justify-center rounded-2xl bg-primary text-white px-5 py-3 font-semibold transition hover:opacity-95 shadow-md"
        >
          Nous contacter
        </Link>
      </div>
    </div>
  </div>
</div>
  );
}