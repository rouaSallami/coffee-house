"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MesCommandesPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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
          console.error("Load orders error:", data);
          setOrders([]);
          return;
        }

        const safeOrders = Array.isArray(data) ? data : data.orders || [];
        setOrders(safeOrders);
      } catch (error) {
        console.error("Load orders error:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

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
          <h1 className="text-3xl font-bold mb-4">Mes commandes</h1>
          <p className="text-dark/70">Aucune commande trouvée.</p>
        </div>
      </div>
    );
  }

  const statusStyles = {
    confirmed: "bg-creamy text-primary border border-primary/15",
    preparing: "bg-secondary/15 text-primary border border-secondary/30",
    ready: "bg-beige/60 text-dark border border-dark/10",
    out_for_delivery: "bg-beige/60 text-dark border border-dark/10",
    delivered: "bg-primary text-white border border-primary",
  };

  return (
    <div className="relative min-h-screen bg-secondary pt-20 text-dark">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_45%)]" />

      <div className="relative mx-auto max-w-5xl px-6 py-10">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-dark/70">
            Historique
          </p>

          <h1 className="mt-3 text-4xl font-bold">
            Mes commandes
          </h1>

          <p className="mt-3 text-dark/70">
            Consultez toutes vos commandes et suivez leur état.
          </p>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-3xl border border-dark/10 bg-white/30 p-6 shadow-xl backdrop-blur-md"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div>
                  <p className="text-sm text-dark/60">
                    Commande #{order.id}
                  </p>
                  <p className="font-bold text-lg capitalize">
                    {order.mode}
                  </p>
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

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
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

              <div className="flex justify-end">
                <Link
                  href={`/suivi-commande/${order.id}`}
                  className="rounded-2xl bg-primary px-5 py-2 font-semibold text-white shadow-md transition hover:opacity-95"
                >
                  Suivre
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}