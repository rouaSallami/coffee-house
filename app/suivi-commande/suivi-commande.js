"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

export default function SuiviCommande() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadOrder = async () => {
    try {
      const storedOrder = JSON.parse(localStorage.getItem("lastOrder"));
      const orderId = storedOrder?.id;

      if (!orderId) {
        setOrder(null);
        setLoading(false);
        return;
      }

      const res = await fetch(`/api/orders/${orderId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : null;

      if (!res.ok) {
        console.error("Load order error:", data);
        setOrder(null);
        setLoading(false);
        return;
      }

      const normalizedOrder = {
        id: data.id,
        mode: data.mode || "livraison",
        status: data.status || "confirmed",
        total: Number(data.total_price || 0),
        createdAt: data.created_at || null,
        customer: {
          name: data.customer_name || "",
          phone: data.customer_phone || "",
        },
        notes: data.notes || "",
        items: Array.isArray(data.items)
          ? data.items.map((item) => ({
              id: item.id,
              coffeeName: item.coffee?.name || "Coffee",
              qty: Number(item.quantity || 1),
            }))
          : [],
      };

      setOrder(normalizedOrder);
    } catch (error) {
      console.error("Load order error:", error);
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrder();

    const interval = setInterval(() => {
      loadOrder();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const steps = useMemo(() => {
    if (!order) return [];

    if (order.mode === "livraison") {
      return [
        { key: "confirmed", label: "Commande confirmée" },
        { key: "preparing", label: "Préparation" },
        { key: "out_for_delivery", label: "En livraison" },
        { key: "delivered", label: "Livrée" },
      ];
    }

    if (order.mode === "emporter") {
      return [
        { key: "confirmed", label: "Commande confirmée" },
        { key: "preparing", label: "Préparation" },
        { key: "ready", label: "Prête à récupérer" },
        { key: "delivered", label: "Récupérée" },
      ];
    }

    if (order.mode === "surplace") {
      return [
        { key: "confirmed", label: "Commande confirmée" },
        { key: "preparing", label: "Préparation" },
        { key: "ready", label: "Prête à être servie" },
        { key: "delivered", label: "Servie" },
      ];
    }

    return [];
  }, [order]);

  if (loading) {
    return (
      <div className="relative min-h-screen mt-16 overflow-hidden bg-base text-dark">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(198,154,107,0.10),_transparent_40%)]" />
        <div className="relative mx-auto max-w-3xl px-6 py-20">
          <div className="rounded-3xl border border-primary/10 bg-white/70 p-10 text-center shadow-lg backdrop-blur-sm">
            <p className="text-lg font-medium text-dark/80">Chargement...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="relative min-h-screen mt-16 overflow-hidden bg-base text-dark">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(198,154,107,0.10),_transparent_40%)]" />
        <div className="relative mx-auto max-w-3xl px-6 py-20">
          <div className="rounded-3xl border border-primary/10 bg-white/70 p-10 text-center shadow-lg backdrop-blur-sm">
            <h1 className="mb-4 font-heading text-3xl font-bold text-dark">
              Aucune commande en cours
            </h1>

            <p className="mb-8 text-dark/70">
              Vous n’avez pas de commande active pour le moment.
            </p>

            <Link
              href="/nosCafes"
              className="inline-block rounded-2xl bg-primary px-6 py-3 font-semibold text-white shadow-md transition hover:opacity-95"
            >
              Commander un café
            </Link>
          </div>
        </div>
      </div>
    );
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
    infoLabel = "Retrait";
    infoValue = "Dès que la commande est prête";
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
    order.items?.reduce((sum, item) => sum + Number(item.qty || 0), 0) || 0;

  const orderSummary =
    order.items?.map((item) => item.coffeeName).join(", ") || "Aucun produit";

  return (
    <div className="relative min-h-screen overflow-hidden bg-secondary pt-20 text-dark">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_45%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary to-secondary/80" />

      <div className="relative mx-auto max-w-4xl px-6 py-8 md:py-10">
        <div className="mb-8 text-center md:mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-dark/70">
            Votre commande
          </p>

          <h1 className="mt-4 font-heading text-3xl font-bold text-dark md:text-4xl">
            Suivi de votre commande
          </h1>

          <p className="mx-auto mt-3 max-w-2xl leading-7 text-dark/75">
            Suivez l’avancement de votre commande en temps réel.
          </p>
        </div>

        <div className="rounded-3xl border border-dark/10 bg-white/30 p-6 shadow-xl backdrop-blur-md md:p-8">
          <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-dark/60">
                Numéro de commande
              </p>
              <h2 className="mt-1 text-3xl font-bold text-marron">
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

          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-dark/10 bg-white/40 p-4 shadow-sm">
              <p className="mb-1 text-sm text-dark2/60">Date</p>
              <p className="font-bold text-primary">{formattedDate}</p>
            </div>

            <div className="rounded-2xl border border-dark/10 bg-white/40 p-4 shadow-sm">
              <p className="mb-1 text-sm text-dark2/60">Mode</p>
              <p className="font-bold capitalize text-primary">{order.mode}</p>
            </div>

            <div className="rounded-2xl border border-dark/10 bg-white/40 p-4 shadow-sm">
              <p className="mb-1 text-sm text-dark2/60">{infoLabel}</p>
              <p className="font-bold text-primary">{infoValue}</p>
            </div>

            <div className="rounded-2xl border border-dark/10 bg-white/40 p-4 shadow-sm">
              <p className="mb-1 text-sm text-dark2/60">Total</p>
              <p className="font-bold text-primary">
                {Number(order.total || 0).toFixed(2)} DT
              </p>
            </div>
          </div>

          <div className="mb-4 rounded-2xl border border-dark/10 bg-white/40 p-4 shadow-sm">
            <p className="mb-1 font-semibold text-primary">Résumé :</p>
            <p className="leading-7 text-dark2/85">{orderSummary}</p>
          </div>

          <div className="mb-8 rounded-2xl border border-dark/10 bg-white/40 p-4 shadow-sm">
            <p className="mb-1 text-sm text-dark2/60">Articles</p>
            <p className="font-bold text-primary">
              {totalItems} article{totalItems > 1 ? "s" : ""}
            </p>
          </div>

          <div className="relative space-y-5 pl-6">
            <div className="absolute left-[18px] top-0 h-full w-[2px] bg-dark/10" />

            {steps.map((step, index) => {
              const isActive = index <= currentIndex;

              return (
                <div
                  key={step.key}
                  className={`flex items-center gap-4 ${
                    isActive ? "text-dark2" : "text-dark/55"
                  }`}
                >
                  <div
                    className={`z-10 flex h-10 w-10 items-center justify-center rounded-full font-semibold shadow-sm ${
                      isActive
                        ? "bg-primary text-dark2"
                        : "border border-dark/10 bg-white/60 text-dark2"
                    }`}
                  >
                    {index + 1}
                  </div>

                  <p className="font-semibold">{step.label}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/nosCafes"
              className="inline-flex justify-center rounded-2xl border border-dark/15 bg-white/40 px-5 py-3 font-semibold text-dark2 transition hover:bg-white/55"
            >
              Commander autre chose
            </Link>

            <Link
              href="/contact"
              className="inline-flex justify-center rounded-2xl bg-primary px-5 py-3 font-semibold text-white shadow-md transition hover:opacity-95"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}