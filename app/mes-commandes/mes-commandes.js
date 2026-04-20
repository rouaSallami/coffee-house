"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { handleInactiveAccount } from "../../lib/handleInactiveAccount";

export default function MesCommandesPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exitingOrderId, setExitingOrderId] = useState(null);

  const isStillActiveForClient = (order) => {
    if (!order?.completed_at) return true;

    const completedAt = new Date(order.completed_at).getTime();
    const now = Date.now();
    const diffMinutes = (now - completedAt) / (1000 * 60);

    return diffMinutes < 15;
  };

 const loadOrders = async () => {
  try {
    const token = sessionStorage.getItem("token");

    const res = await fetch("/backend/orders", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    let data = {};
    let rawText = "";

    try {
      rawText = await res.text();
      data = rawText ? JSON.parse(rawText) : {};
    } catch {
      data = {};
    }

    if (handleInactiveAccount(data)) {
      return;
    }

    if (!res.ok) {
      console.log("LOAD ORDERS STATUS:", res.status);
      console.log("LOAD ORDERS RAW RESPONSE:", rawText);
      setOrders([]);
      toast.error(data.message || `Erreur ${res.status}`);
      return;
    }

    const safeOrders = Array.isArray(data) ? data : data.orders || [];

    const activeOrders = safeOrders.filter(
      (order) => !Boolean(order.is_archived)
    );

    setOrders(activeOrders);
  } catch (error) {
    console.error("Load orders error:", error);
    setOrders([]);
  } finally {
    setLoading(false);
  }
};


  

  useEffect(() => {
    loadOrders();
  }, []);


  

  const handleCancelOrder = (orderId) => {
  toast(
    (t) => (
      <div className="w-full max-w-sm rounded-2xl bg-white p-4 shadow-lg border border-dark/10">
        <p className="text-sm font-semibold text-dark text-center">
          Êtes-vous sûr de vouloir annuler cette commande ?
        </p>

        <div className="mt-4 flex justify-center gap-3">
          {/* ❌ bouton fermer */}
          <button
            onClick={() => toast.dismiss(t.id)}
            className="rounded-xl border border-dark/10 px-4 py-2 text-sm font-semibold text-dark transition hover:bg-base"
          >
            Annuler
          </button>

          {/* ✅ confirmer */}
          <button
            onClick={async () => {
              toast.dismiss(t.id);

              try {
                const token = sessionStorage.getItem("token");

                const res = await fetch(`/backend/orders/${orderId}/cancel`, {
                  method: "PATCH",
                  headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                });

                const data = await res.json();

                if (!res.ok) {
                  toast.error(data.message || "Erreur lors de l’annulation");
                  return;
                }


                const safeOrders = Array.isArray(data) ? data : data.orders || [];


const activeOrders = safeOrders.filter(
  (order) => !Boolean(order.is_archived)
);

setOrders(activeOrders);

                if (handleInactiveAccount(data)) {
  return;
}

                setOrders((prev) =>
                  prev.map((order) =>
                    order.id === orderId
                      ? {
                          ...order,
                          status: data?.order?.status || "cancelled",
                          completed_at:
                            data?.order?.completed_at ||
                            new Date().toISOString(),
                          is_archived: Boolean(data?.order?.is_archived),
                        }
                      : order
                  )
                );

                setExitingOrderId(orderId);

                setTimeout(() => {
                  setOrders((prev) =>
                    prev.filter((o) => o.id !== orderId)
                  );
                  setExitingOrderId(null);
                }, 650);

                toast.success("Commande annulée avec succès");
              } catch (error) {
                console.error(error);
                toast.error("Erreur serveur");
              }
            }}
            className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Confirmer
          </button>
        </div>
      </div>
    ),
    {
      duration: 6000,
      position: "top-center", // ✅ centré
    }
  );
};

  const visibleOrders = useMemo(() => orders, [orders]);

  if (loading) {
    return (
      <div className="relative min-h-screen mt-16 bg-base text-dark">
        <div className="flex items-center justify-center py-40">
          <p className="text-lg font-semibold">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!visibleOrders.length) {
    return (
      <div className="relative min-h-screen mt-16 bg-base text-dark">
        <div className="flex flex-col items-center justify-center py-40 text-center">
          <h1 className="mb-4 text-3xl font-bold">Mes commandes</h1>
          <p className="text-dark/70">Aucune commande en cours.</p>

          <Link
            href="/historique-commandes"
            className="mt-6 rounded-2xl bg-primary px-5 py-3 font-semibold text-white shadow-md transition hover:opacity-95"
          >
            Voir l’historique
          </Link>
        </div>
      </div>
    );
  }

  const statusStyles = {
    pending: "bg-creamy text-primary border border-primary/15",
    confirmed: "bg-creamy text-primary border border-primary/15",
    preparing: "bg-secondary/15 text-primary border border-secondary/30",
    ready: "bg-beige/60 text-dark border border-dark/10",
    out_for_delivery: "bg-beige/60 text-dark border border-dark/10",
    delivered: "bg-primary text-white border border-primary",
    cancelled: "bg-red-50 text-red-600 border border-red-200",
  };

  return (
    <div className="relative min-h-screen bg-secondary pt-20 text-dark">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_45%)]" />

      <div className="relative mx-auto max-w-5xl px-6 py-10">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-dark/70">
            En cours
          </p>

          <h1 className="mt-3 text-4xl font-bold">Mes commandes</h1>

          <p className="mt-3 text-dark/70">
            Consultez vos commandes actives et suivez leur état.
          </p>

          <Link
            href="/historique-commandes"
            className="mt-5 inline-block rounded-2xl border border-dark/10 bg-white/40 px-5 py-3 font-semibold text-dark shadow-sm transition hover:bg-white/60"
          >
            Aller à l’historique
          </Link>
        </div>

        <div className="space-y-6">
          {visibleOrders.map((order) => (
            <div
              key={order.id}
              className={`rounded-3xl border border-dark/10 p-6 shadow-xl backdrop-blur-md transition-all duration-500 ${
                exitingOrderId === order.id
                  ? "translate-x-6 scale-[0.98] opacity-0 blur-[1px]"
                  : "bg-white/30"
              }`}
            >
              <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm text-dark/60">Commande #{order.id}</p>
                  <p className="text-lg font-bold capitalize">{order.mode}</p>
                </div>

                <span
                  className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                    statusStyles[order.status] ||
                    "bg-creamy text-primary border border-primary/15"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="mb-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-dark/60">Date</p>
                  <p className="font-semibold">
                    {order.created_at
                      ? new Date(order.created_at).toLocaleString("fr-FR")
                      : "Date indisponible"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-dark/60">Total</p>
                  <p className="font-semibold">
                    {Number(order.total_price || 0).toFixed(2)} DT
                  </p>
                </div>
              </div>

              {order.completed_at && (
                <div className="mb-4 rounded-2xl border border-dark/10 bg-white/40 px-4 py-3 text-sm text-dark/70">
                  Cette commande quittera cette page 15 minutes après sa finalisation.
                </div>
              )}

              <div className="flex flex-wrap justify-end gap-3">
                <Link
                  href={`/suivi-commande/${order.id}`}
                  className="rounded-2xl bg-primary px-5 py-2 font-semibold text-white shadow-md transition hover:opacity-95"
                >
                  Suivre
                </Link>

                {order.status === "pending" && (
                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    className="rounded-2xl bg-red-500 px-5 py-2 font-semibold text-white shadow-md transition hover:opacity-90"
                  >
                    Annuler
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}