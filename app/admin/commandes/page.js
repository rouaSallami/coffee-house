"use client";

import { useEffect, useMemo, useState } from "react";

export default function AdminCommandesPage() {
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderToDelete, setOrderToDelete] = useState(null);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  const getStatusesByMode = (mode) => {
    if (mode === "livraison") {
      return [
        { key: "confirmed", label: "Commande confirmée" },
        { key: "preparing", label: "Préparation" },
        { key: "out_for_delivery", label: "En livraison" },
        { key: "delivered", label: "Livrée" },
      ];
    }

    if (mode === "emporter") {
      return [
        { key: "confirmed", label: "Commande confirmée" },
        { key: "preparing", label: "Préparation" },
        { key: "ready", label: "Prête à récupérer" },
        { key: "delivered", label: "Récupérée" },
      ];
    }

    if (mode === "surplace") {
      return [
        { key: "confirmed", label: "Commande confirmée" },
        { key: "preparing", label: "Préparation" },
        { key: "ready", label: "Prête à être servie" },
        { key: "delivered", label: "Servie" },
      ];
    }

    return [];
  };

  const getStatusLabel = (order) => {
    const statuses = getStatusesByMode(order.mode);
    return (
      statuses.find((status) => status.key === order.status)?.label ||
      order.status
    );
  };

  const statusStyles = {
    confirmed: "bg-creamy text-primary border border-primary/15",
    preparing: "bg-secondary/15 text-primary border border-secondary/30",
    out_for_delivery: "bg-beige/60 text-dark border border-dark/10",
    ready: "bg-beige/60 text-dark border border-dark/10",
    delivered: "bg-primary text-white border border-primary",
  };

  const modeStyles = {
    livraison: "bg-secondary/20 text-marron border border-secondary/30",
    emporter: "bg-creamy text-primary border border-primary/15",
    surplace: "bg-beige/60 text-dark border border-dark/10",
  };

  const filteredOrders = useMemo(() => {
    if (selectedStatus === "all") return orders;
    return orders.filter((order) => order.status === selectedStatus);
  }, [orders, selectedStatus]);

  const handleUpdateStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );

    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    const updatedLastOrder = updatedOrders[0] || null;
    if (updatedLastOrder) {
      localStorage.setItem("lastOrder", JSON.stringify(updatedLastOrder));
    } else {
      localStorage.removeItem("lastOrder");
    }

    window.dispatchEvent(new Event("orderUpdated"));

    if (selectedOrder && selectedOrder.id === orderId) {
      const updatedSelectedOrder = updatedOrders.find(
        (order) => order.id === orderId
      );
      setSelectedOrder(updatedSelectedOrder || null);
    }
  };

  const handleDeleteOrder = (orderId) => {
    const updatedOrders = orders.filter((order) => order.id !== orderId);

    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    const updatedLastOrder = updatedOrders[0] || null;
    if (updatedLastOrder) {
      localStorage.setItem("lastOrder", JSON.stringify(updatedLastOrder));
    } else {
      localStorage.removeItem("lastOrder");
    }

    window.dispatchEvent(new Event("orderUpdated"));

    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(null);
    }

    setOrderToDelete(null);
  };

  return (
    <>
      <div>
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
            Administration
          </p>

          <h1 className="mt-2 text-4xl font-bold text-dark">
            Gestion des commandes
          </h1>

          <p className="mt-3 text-dark/80">
            Consultez, filtrez et gérez les commandes de votre boutique.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedStatus("all")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              selectedStatus === "all"
                ? "bg-primary text-white"
                : "border border-dark/10 bg-base text-dark hover:bg-white"
            }`}
          >
            Toutes
          </button>

          <button
            onClick={() => setSelectedStatus("confirmed")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              selectedStatus === "confirmed"
                ? "bg-primary text-white"
                : "border border-dark/10 bg-base text-dark hover:bg-white"
            }`}
          >
            Confirmées
          </button>

          <button
            onClick={() => setSelectedStatus("preparing")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              selectedStatus === "preparing"
                ? "bg-primary text-white"
                : "border border-dark/10 bg-base text-dark hover:bg-white"
            }`}
          >
            Préparation
          </button>

          <button
            onClick={() => setSelectedStatus("ready")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              selectedStatus === "ready"
                ? "bg-primary text-white"
                : "border border-dark/10 bg-base text-dark hover:bg-white"
            }`}
          >
            Prêtes
          </button>

          <button
            onClick={() => setSelectedStatus("out_for_delivery")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              selectedStatus === "out_for_delivery"
                ? "bg-primary text-white"
                : "border border-dark/10 bg-base text-dark hover:bg-white"
            }`}
          >
            Livraison
          </button>

          <button
            onClick={() => setSelectedStatus("delivered")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              selectedStatus === "delivered"
                ? "bg-primary text-white"
                : "border border-dark/10 bg-base text-dark hover:bg-white"
            }`}
          >
            Terminées
          </button>
        </div>

        <div className="rounded-3xl border border-dark/10 bg-base p-8 shadow-sm">
          {filteredOrders.length === 0 ? (
            <p className="text-dark/60">Aucune commande trouvée.</p>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => {
                const totalItems =
                  order.items?.reduce((sum, item) => sum + item.qty, 0) || 0;

                const formattedDate = order.createdAt
                  ? new Date(order.createdAt).toLocaleString("fr-FR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Date indisponible";

                return (
                  <div
                    key={order.id}
                    className="rounded-2xl border border-dark/10 bg-white/40 p-5 shadow-sm"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h2 className="text-lg font-bold text-dark">
                            Commande #{order.id}
                          </h2>

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              modeStyles[order.mode] ||
                              "bg-creamy text-primary border border-primary/15"
                            }`}
                          >
                            {order.mode}
                          </span>

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              statusStyles[order.status] ||
                              "bg-creamy text-primary border border-primary/15"
                            }`}
                          >
                            {getStatusLabel(order)}
                          </span>
                        </div>

                        <div className="mt-3 space-y-1 text-sm text-dark/70">
                          <p>Client : {order.customer?.name}</p>
                          <p>Total : {Number(order.total).toFixed(2)} DT</p>
                          <p>
                            Articles : {totalItems} article
                            {totalItems > 1 ? "s" : ""}
                          </p>
                          <p>Date : {formattedDate}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="rounded-xl border border-dark/10 bg-base px-4 py-2 text-sm font-semibold text-dark transition hover:bg-white"
                        >
                          Voir détails
                        </button>

                        <button
                          onClick={() => setOrderToDelete(order)}
                          className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {getStatusesByMode(order.mode).map((status) => {
                        const isActive = order.status === status.key;

                        return (
                          <button
                            key={status.key}
                            onClick={() =>
                              handleUpdateStatus(order.id, status.key)
                            }
                            disabled={isActive}
                            className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                              isActive
                                ? "bg-primary text-white cursor-not-allowed opacity-90"
                                : "border border-dark/10 bg-base text-dark hover:bg-white"
                            }`}
                          >
                            {status.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-dark/10 bg-base p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-dark">
                  Commande #{selectedOrder.id}
                </h2>

                <p className="mt-2 text-dark/70">
                  {selectedOrder.customer?.name}
                </p>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-xl border border-dark/10 bg-white px-4 py-2 text-sm font-semibold text-dark transition hover:bg-base"
              >
                Fermer
              </button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-dark/10 bg-white/40 p-4">
                <p className="text-sm text-dark/60">Mode</p>
                <p className="mt-1 font-bold text-dark capitalize">
                  {selectedOrder.mode}
                </p>
              </div>

              <div className="rounded-2xl border border-dark/10 bg-white/40 p-4">
                <p className="text-sm text-dark/60">Statut</p>
                <p className="mt-1 font-bold text-primary">
                  {getStatusLabel(selectedOrder)}
                </p>
              </div>

              <div className="rounded-2xl border border-dark/10 bg-white/40 p-4">
                <p className="text-sm text-dark/60">Téléphone</p>
                <p className="mt-1 font-bold text-dark">
                  {selectedOrder.customer?.phone || "—"}
                </p>
              </div>

              <div className="rounded-2xl border border-dark/10 bg-white/40 p-4">
                <p className="text-sm text-dark/60">Total</p>
                <p className="mt-1 font-bold text-primary">
                  {Number(selectedOrder.total).toFixed(2)} DT
                </p>
              </div>

              {selectedOrder.customer?.address && (
                <div className="rounded-2xl border border-dark/10 bg-white/40 p-4 md:col-span-2">
                  <p className="text-sm text-dark/60">Adresse</p>
                  <p className="mt-1 font-bold text-dark">
                    {selectedOrder.customer.address}
                  </p>
                </div>
              )}

              {selectedOrder.customer?.instructions && (
                <div className="rounded-2xl border border-dark/10 bg-white/40 p-4 md:col-span-2">
                  <p className="text-sm text-dark/60">Instructions</p>
                  <p className="mt-1 text-dark">
                    {selectedOrder.customer.instructions}
                  </p>
                </div>
              )}

              {selectedOrder.customer?.pickupTime && (
                <div className="rounded-2xl border border-dark/10 bg-white/40 p-4 md:col-span-2">
                  <p className="text-sm text-dark/60">Heure de retrait</p>
                  <p className="mt-1 font-bold text-dark">
                    {selectedOrder.customer.pickupTime}
                  </p>
                </div>
              )}

              {selectedOrder.customer?.note && (
                <div className="rounded-2xl border border-dark/10 bg-white/40 p-4 md:col-span-2">
                  <p className="text-sm text-dark/60">Note</p>
                  <p className="mt-1 text-dark">
                    {selectedOrder.customer.note}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 rounded-2xl border border-dark/10 bg-white/40 p-5">
              <h3 className="text-lg font-bold text-dark">
                Produits commandés
              </h3>

              <div className="mt-4 space-y-4">
                {selectedOrder.items?.map((item, index) => (
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

                      <p className="whitespace-nowrap font-bold text-primary">
                        {(item.totalPrice * item.qty).toFixed(2)} DT
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {getStatusesByMode(selectedOrder.mode).map((status) => {
                const isActive = selectedOrder.status === status.key;

                return (
                  <button
                    key={status.key}
                    onClick={() => {
                      handleUpdateStatus(selectedOrder.id, status.key);
                    }}
                    disabled={isActive}
                    className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      isActive
                        ? "bg-primary text-white cursor-not-allowed opacity-90"
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
      )}

      {orderToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-dark/10 bg-base p-6 shadow-xl">
            <h2 className="text-xl font-bold text-dark">
              Confirmer la suppression
            </h2>

            <p className="mt-3 text-dark/75 leading-7">
              Êtes-vous sûr de vouloir supprimer la commande{" "}
              <span className="font-semibold text-primary">
                #{orderToDelete.id}
              </span>{" "}
              ?
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setOrderToDelete(null)}
                className="flex-1 rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm font-semibold text-dark transition hover:bg-base"
              >
                Annuler
              </button>

              <button
                onClick={() => handleDeleteOrder(orderToDelete.id)}
                className="flex-1 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
              >
                Oui, supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}