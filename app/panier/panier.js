"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function PanierPage() {
  const [cart, setCart] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleRemoveItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleClearCart = () => {
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
    window.dispatchEvent(new Event("cartUpdated"));
    setShowConfirm(false);
  };

  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.totalPrice * item.qty, 0);
  }, [cart]);

  const handleIncreaseQty = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleDecreaseQty = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 1 }
        : item
    );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="relative min-h-screen mt-16 overflow-hidden bg-secondary text-dark">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_45%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary to-secondary/80" />

      <div className="relative max-w-5xl mx-auto px-6 py-16">
        <div className="mb-12 text-center">
          <p className="text-dark/70 text-sm font-semibold uppercase tracking-[0.2em]">
            Votre commande
          </p>

          <h1 className="text-4xl font-bold text-dark mt-3 font-heading">
            Panier
          </h1>

          <p className="text-dark/75 mt-4 max-w-2xl mx-auto leading-7">
            Vérifiez vos articles avant de passer à la commande.
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="rounded-3xl border border-dark/10 bg-white/30 backdrop-blur-md shadow-xl p-10 text-center">
            <p className="text-marron text-lg font-semibold">
              Votre panier est vide.
            </p>

            <p className="text-dark/70 mt-2">
              Ajoutez vos cafés préférés pour commencer votre commande.
            </p>

            <div className="mt-6">
              <Link
                href="/nosCafes"
                className="inline-flex justify-center rounded-2xl bg-primary text-white px-6 py-3 font-semibold transition hover:opacity-95 shadow-md"
              >
                Découvrir nos cafés
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl border border-dark/10 bg-white/30 backdrop-blur-md shadow-xl p-6"
                >
                  <div className="flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
                    <div className="flex gap-4">
                      <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-creamy2 shadow-sm shrink-0 border border-dark/5">
                        <Image
                          src={item.image}
                          alt={item.coffeeName}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div>
                        <h2 className="text-xl font-bold text-marron">
                          {item.coffeeName}
                        </h2>

                        <div className="mt-2 space-y-1 text-sm text-dark/75">
                          <p>Taille: {item.size?.label}</p>
                          <p>Contenant: {item.container}</p>
                          <p>Sucre: {item.sugar}%</p>
                          <p>
                            Add-ons:{" "}
                            {item.addons?.length > 0
                              ? item.addons.map((a) => a.name).join(", ")
                              : "Aucun"}
                          </p>
                          {item.note && <p>Note: {item.note}</p>}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-4">
                      <p className="text-lg font-bold text-accent">
                        {(item.totalPrice * item.qty).toFixed(2)} DT
                      </p>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleDecreaseQty(item.id)}
                          className="w-10 h-10 rounded-full border border-dark/10 bg-white/40 text-dark2 font-bold shadow-sm hover:bg-white/55 transition"
                        >
                          -
                        </button>

                        <span className="min-w-6 text-center font-semibold text-dark2">
                          {item.qty}
                        </span>

                        <button
                          onClick={() => handleIncreaseQty(item.id)}
                          className="w-10 h-10 rounded-full border border-dark/10 bg-white/40 text-dark2 font-bold shadow-sm hover:bg-white/55 transition"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="rounded-xl border border-dark/10 bg-white/40 text-dark2 px-4 py-2 text-sm font-semibold transition hover:bg-white/55"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-3xl border border-dark/10 bg-white/30 backdrop-blur-md shadow-xl p-6">
              <div className="flex items-center justify-between text-xl font-bold text-accent">
                <span>Total</span>
                <span>{total.toFixed(2)} DT</span>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-end">
                <button
  onClick={() => setShowConfirm(true)}
  className="inline-flex items-center justify-center rounded-2xl border border-red-200 bg-red-50 px-6 py-3 font-semibold text-red-600 shadow-sm transition hover:bg-red-100 hover:shadow-md"
>
  Vider le panier
</button>

                <Link
                  href="/nosCafes"
                  className="inline-flex justify-center rounded-2xl border border-dark/15 bg-white/40 text-primary px-6 py-3 font-semibold transition hover:bg-white/55"
                >
                  Continuer vos achats
                </Link>

                <Link
                  href="/checkout"
                  className="inline-flex justify-center rounded-2xl bg-primary text-white px-6 py-3 font-semibold transition hover:opacity-95 shadow-md"
                >
                  Commander
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-accent/85 rounded-3xl p-6 shadow-2xl max-w-sm w-full text-center">
            <h2 className="text-lg font-bold text-dark/95 mb-4">
              Êtes-vous sûr ?
            </h2>

            <p className="text-dark/85 mb-6">
              Cette action va vider complètement votre panier.
            </p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-5 py-2 rounded-xl bg-gray-200 text-dark2 font-semibold hover:bg-gray-300 transition"
              >
                Non
              </button>

              <button
                onClick={handleClearCart}
                className="px-5 py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
              >
                Oui
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}