"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HistoriqueCommandesPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const isInHistoryForClient = (order) => {
    if (!order?.completed_at) return false;

    const completedAt = new Date(order.completed_at).getTime();
    const now = Date.now();
    const diffMinutes = (now - completedAt) / (1000 * 60);

    return diffMinutes >= 15;
  };

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const token = sessionStorage.getItem("token");

        if (!token) {
          setOrders([]);
          setLoading(false);
          return;
        }

        const res = await fetch("/backend/orders", {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        });

        const text = await res.text();

        let data = [];
        try {
          data = text ? JSON.parse(text) : [];
        } catch {
          data = [];
        }

        if (!res.ok) {
          console.error("Load history orders error:", data);
          setOrders([]);
          return;
        }

        const safeOrders = Array.isArray(data) ? data : data.orders || [];
        const historyOrders = safeOrders.filter(isInHistoryForClient);

        setOrders(historyOrders);
      } catch (error) {
        console.error("Load history orders error:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const statusStyles = {
    delivered: "bg-primary text-white border border-primary",
    cancelled: "bg-red-50 text-red-600 border border-red-200",
  };

  if (loading) {
    return (
      <div className="relative min-h-screen mt-16 bg-base text-dark">
        <div className="flex items-center justify-center py-40">
          <p className="text-lg font-semibold">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="relative min-h-screen mt-16 bg-base text-dark">
        <div className="flex flex-col items-center justify-center py-40 text-center">
          <h1 className="mb-4 text-3xl font-bold">Historique des commandes</h1>
          <p className="text-dark/70">Aucune commande dans l’historique.</p>

          <Link
            href="/mes-commandes"
            className="mt-6 rounded-2xl bg-primary px-5 py-3 font-semibold text-white shadow-md transition hover:opacity-95"
          >
            Retour à mes commandes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-secondary pt-20 text-dark">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_45%)]" />

      <div className="relative mx-auto max-w-5xl px-6 py-10">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-dark/70">
            Historique
          </p>

          <h1 className="mt-3 text-4xl font-bold">Historique des commandes</h1>

          <p className="mt-3 text-dark/70">
            Retrouvez ici vos commandes terminées ou annulées.
          </p>

          <Link
            href="/mes-commandes"
            className="mt-5 inline-block rounded-2xl border border-dark/10 bg-white/40 px-5 py-3 font-semibold text-dark shadow-sm transition hover:bg-white/60"
          >
            Retour à mes commandes
          </Link>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-3xl border border-dark/10 bg-gray-100 p-6 shadow-xl opacity-75 backdrop-blur-md"
            >
              <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm text-dark/60">Commande #{order.id}</p>
                  <p className="text-lg font-bold capitalize">{order.mode}</p>
                </div>

                <span
                  className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                    statusStyles[order.status] ||
                    "bg-white text-dark border border-dark/10"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
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

              <div className="mt-5 flex justify-end">
                <Link
                  href={`/suivi-commande/${order.id}`}
                  className="rounded-2xl border border-dark/10 bg-white/70 px-5 py-2 font-semibold text-dark shadow-sm transition hover:bg-white"
                >
                  Voir
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}