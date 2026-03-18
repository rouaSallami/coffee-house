"use client";

import { useEffect, useState } from "react";
import { CheckCircle, ClipboardList, Phone, MapPin, Coffee } from "lucide-react";

export default function AdminPage() {
  const [order, setOrder] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

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
    window.dispatchEvent(new Event("cartUpdated"));
    setOrder(updatedOrder);

    const statusLabel =
      statuses.find((status) => status.key === newStatus)?.label || newStatus;

    setSuccessMessage(`Statut mis à jour : ${statusLabel}`);

    setTimeout(() => {
      setSuccessMessage("");
    }, 2000);
  };

  const clearOrder = () => {
    localStorage.removeItem("lastOrder");
    window.dispatchEvent(new Event("cartUpdated"));
    setSuccessMessage("Commande terminée avec succès");
    setOrder(null);

    setTimeout(() => {
      setSuccessMessage("");
    }, 2000);
  };

  if (!order) {
    return (
      <div className="min-h-screen mt-16 bg-[#f3ede6]">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="bg-[#faf7f2] border border-[#e8ddd2] rounded-3xl p-12 shadow-sm text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#ead8c4] text-[#7a4b2f] flex items-center justify-center mx-auto mb-5">
              <ClipboardList size={28} />
            </div>

            <h1 className="text-3xl font-bold text-[#2f1c14]">
              Aucune commande pour le moment
            </h1>

            <p className="text-[#6f5a4f] mt-3">
              Dès qu’une commande est enregistrée, elle apparaîtra ici.
            </p>
          </div>
        </div>
      </div>
    );
  }

  let statuses = [];

  if (order.mode === "livraison") {
    statuses = [
      { key: "confirmed", label: "Commande confirmée" },
      { key: "preparing", label: "Préparation" },
      { key: "out_for_delivery", label: "En livraison" },
      { key: "delivered", label: "Livrée" },
    ];
  }

  if (order.mode === "emporter") {
    statuses = [
      { key: "confirmed", label: "Commande confirmée" },
      { key: "preparing", label: "Préparation" },
      { key: "ready", label: "Prête à récupérer" },
      { key: "delivered", label: "Récupérée" },
    ];
  }

  if (order.mode === "surplace") {
    statuses = [
      { key: "confirmed", label: "Commande confirmée" },
      { key: "preparing", label: "Préparation" },
      { key: "ready", label: "Prête à être servie" },
      { key: "delivered", label: "Servie" },
    ];
  }

  const currentStatusLabel =
    statuses.find((status) => status.key === order.status)?.label || order.status;

  const statusStyles = {
    confirmed: "bg-[#f7f1ea] text-[#7a4b2f] border border-[#e7d8ca]",
    preparing: "bg-[#f4e3cf] text-[#8a552e] border border-[#dfba94]",
    out_for_delivery: "bg-[#eee0d2] text-[#6d4731] border border-[#d4b7a1]",
    ready: "bg-[#eee0d2] text-[#6d4731] border border-[#d4b7a1]",
    delivered: "bg-[#2f1c14] text-white border border-[#2f1c14]",
  };

  const modeStyles = {
    livraison: "bg-[#fbede1] text-[#b2612d] border border-[#ecd0b4]",
    emporter: "bg-[#f3ece4] text-[#7a4b2f] border border-[#ddd0c3]",
    surplace: "bg-[#eee4da] text-[#5d3b2c] border border-[#d3c0b1]",
  };

  const formattedDate = order.createdAt
    ? new Date(order.createdAt).toLocaleString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Date indisponible";

  const totalItems = order.items?.reduce((sum, item) => sum + item.qty, 0) || 0;

  const orderSummary =
    order.items?.map((item) => item.coffeeName).join(", ") || "Aucun produit";

  const progressSteps = statuses.length;
  const currentStep =
    statuses.findIndex((status) => status.key === order.status) + 1;
  const progress = Math.min((currentStep / progressSteps) * 100, 100);

  const currentStatusIndex = statuses.findIndex(
    (status) => status.key === order.status
  );

  return (
    <div className="min-h-screen mt-16 bg-[#f3ede6]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#a77752] mb-2">
              Dashboard
            </p>
            <h1 className="text-4xl font-bold text-[#2f1c14]">
              Page d’administration
            </h1>
            <p className="text-[#6f5a4f] mt-2">
              Gérez la commande en cours et suivez son avancement.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <span
              className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold ${
                modeStyles[order.mode] ||
                "bg-[#f3ece4] text-[#7a4b2f] border border-[#ddd0c3]"
              }`}
            >
              Mode : {order.mode}
            </span>

            <span
              className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold ${
                statusStyles[order.status] ||
                "bg-[#faf7f2] text-[#2f1c14] border border-[#e8ddd2]"
              }`}
            >
              {currentStatusLabel}
            </span>
          </div>
        </div>

        {/* Top stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#faf7f2] rounded-3xl border border-[#e8ddd2] p-5 shadow-sm">
            <p className="text-sm text-[#7b685d] mb-1">Commande</p>
            <p className="font-bold text-[#2f1c14] text-lg">#{order.id}</p>
          </div>

          <div className="bg-[#faf7f2] rounded-3xl border border-[#e8ddd2] p-5 shadow-sm">
            <p className="text-sm text-[#7b685d] mb-1">Produits</p>
            <p className="font-bold text-[#2f1c14] text-lg">
              {totalItems} article{totalItems > 1 ? "s" : ""}
            </p>
          </div>

          <div className="bg-[#faf7f2] rounded-3xl border border-[#e8ddd2] p-5 shadow-sm">
            <p className="text-sm text-[#7b685d] mb-1">Total</p>
            <p className="font-bold text-[#2f1c14] text-lg">
              {Number(order.total).toFixed(2)} DT
            </p>
          </div>

          <div className="bg-[#faf7f2] rounded-3xl border border-[#e8ddd2] p-5 shadow-sm">
            <p className="text-sm text-[#7b685d] mb-1">Date</p>
            <p className="font-bold text-[#2f1c14] text-sm">{formattedDate}</p>
          </div>
        </div>

        <div className="grid xl:grid-cols-[1.15fr_0.85fr] gap-8">
          {/* Left column */}
          <div className="space-y-8">
            {/* Informations */}
            <div className="bg-[#faf7f2] rounded-3xl p-8 border border-[#e8ddd2] shadow-sm">
              <h2 className="text-2xl font-bold text-[#2f1c14] mb-6">
                Informations de la commande
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-[#f6f1eb] border border-[#ebe0d6] p-4">
                  <p className="text-sm text-[#7b685d] mb-1">Nom client</p>
                  <p className="font-semibold text-[#2f1c14]">
                    {order.customer?.name}
                  </p>
                </div>

                {order.customer?.phone && (
                  <div className="rounded-2xl bg-[#f6f1eb] border border-[#ebe0d6] p-4">
                    <p className="text-sm text-[#7b685d] mb-1 flex items-center gap-2">
                      <Phone size={15} /> Téléphone
                    </p>
                    <p className="font-semibold text-[#2f1c14]">
                      {order.customer.phone}
                    </p>
                  </div>
                )}

                {order.customer?.address && (
                  <div className="rounded-2xl bg-[#f6f1eb] border border-[#ebe0d6] p-4 md:col-span-2">
                    <p className="text-sm text-[#7b685d] mb-1 flex items-center gap-2">
                      <MapPin size={15} /> Adresse
                    </p>
                    <p className="font-semibold text-[#2f1c14]">
                      {order.customer.address}
                    </p>
                  </div>
                )}

                <div className="rounded-2xl bg-[#f6f1eb] border border-[#ebe0d6] p-4 md:col-span-2">
                  <p className="text-sm text-[#7b685d] mb-1">Résumé</p>
                  <p className="text-[#2f1c14]">{orderSummary}</p>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="bg-[#faf7f2] rounded-3xl p-8 border border-[#e8ddd2] shadow-sm">
              <h2 className="text-2xl font-bold text-[#2f1c14] mb-6">
                Progression de la commande
              </h2>

              <div className="mb-6">
                <div className="w-full h-4 bg-[#eadfd3] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#7a4b2f] rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-sm text-[#7b685d] mt-3">
                  {progress}% complété
                </p>
              </div>

              <div className="flex items-start">
                {statuses.map((status, index) => {
                  const isCompleted = index <= currentStatusIndex;
                  const isLast = index === statuses.length - 1;
                  const nextCompleted = index < currentStatusIndex;

                  return (
                    <div key={status.key} className="flex-1 flex items-start">
                      <div className="flex flex-col items-center min-w-[75px]">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border transition ${
                            isCompleted
                              ? "bg-[#2f1c14] text-white border-[#2f1c14]"
                              : "bg-[#faf7f2] text-[#8b7a70] border-[#ddd0c5]"
                          }`}
                        >
                          {index + 1}
                        </div>

                        <p
                          className={`text-xs text-center mt-2 leading-5 ${
                            isCompleted
                              ? "text-[#2f1c14] font-semibold"
                              : "text-[#8b7a70]"
                          }`}
                        >
                          {status.label}
                        </p>
                      </div>

                      {!isLast && (
                        <div className="flex-1 pt-5 px-2">
                          <div
                            className={`h-1 rounded-full transition ${
                              nextCompleted ? "bg-[#2f1c14]" : "bg-[#e2d7cd]"
                            }`}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Produits */}
            <div className="bg-[#faf7f2] rounded-3xl p-8 border border-[#e8ddd2] shadow-sm">
              <h2 className="text-2xl font-bold text-[#2f1c14] mb-6">
                Détails des produits
              </h2>

              {order.items?.length === 0 ? (
                <p className="text-[#6f5a4f]">Aucun produit.</p>
              ) : (
                <div className="space-y-4">
                  {order.items?.map((item, index) => (
                    <div
                      key={`${item.id}-${index}`}
                      className="rounded-2xl border border-[#ebe0d6] bg-[#f6f1eb] p-5"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h3 className="font-bold text-[#2f1c14] flex items-center gap-2">
                            <Coffee size={16} />
                            {item.coffeeName}
                          </h3>

                          <div className="text-sm text-[#6f5a4f] mt-3 space-y-1.5">
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

                        <p className="font-bold text-[#2f1c14] whitespace-nowrap">
                          {(item.totalPrice * item.qty).toFixed(2)} DT
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-8">
            <div className="bg-[#faf7f2] rounded-3xl p-8 border border-[#e8ddd2] shadow-sm">
              <h2 className="text-2xl font-bold text-[#2f1c14] mb-6">
                Modifier le statut
              </h2>

              {successMessage && (
                <div className="mb-5 flex items-center gap-2 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                  <CheckCircle size={18} className="text-green-600" />
                  {successMessage}
                </div>
              )}

              <div className="grid gap-4">
                {statuses.map((status) => {
                  const isActive = order.status === status.key;

                  return (
                    <button
                      key={status.key}
                      onClick={() => updateStatus(status.key)}
                      disabled={isActive}
                      className={`w-full rounded-2xl px-5 py-4 font-semibold transition border ${
                        isActive
                          ? "bg-[#2f1c14] text-white border-[#2f1c14] cursor-not-allowed opacity-85"
                          : "bg-[#f6f1eb] text-[#2f1c14] border-[#e6dad0] hover:bg-[#efe7de]"
                      }`}
                    >
                      {status.label}
                    </button>
                  );
                })}

                <button
                  onClick={clearOrder}
                  className="w-full mt-2 rounded-2xl px-5 py-4 font-semibold transition border bg-[#fbede6] text-[#b45a3c] border-[#efd0c2] hover:bg-[#f8e4da]"
                >
                  Terminer la commande
                </button>
              </div>
            </div>

            <div className="bg-[#faf7f2] rounded-3xl p-8 border border-[#e8ddd2] shadow-sm">
              <h2 className="text-2xl font-bold text-[#2f1c14] mb-4">
                Notes utiles
              </h2>

              <div className="space-y-3 text-sm text-[#6f5a4f] leading-6">
                <p>• Vérifiez le mode de réception avant de changer le statut.</p>
                <p>• Utilisez “Terminer la commande” une fois la commande achevée.</p>
                <p>• Les changements sont visibles côté client dans le suivi.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}