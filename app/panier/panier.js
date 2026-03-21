"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Sparkles, Trash2, ChevronRight } from "lucide-react";
import { getUserData, setUserData } from "../lib/storage";

export default function PanierPage() {
  const [cart, setCart] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const storedCart = getUserData("cart", []);
    setCart(Array.isArray(storedCart) ? storedCart : []);
  }, []);

  const handleRemoveItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    setUserData("cart", updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleClearCart = () => {
    setCart([]);
    setUserData("cart", []);
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
    setUserData("cart", updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleDecreaseQty = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 1 }
        : item
    );

    setCart(updatedCart);
    setUserData("cart", updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-secondary pt-20 text-dark">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_42%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(139,94,60,0.10),transparent_30%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary to-secondary/85" />

      <div className="relative mx-auto max-w-5xl px-6 py-8 md:py-10">
        {/* Hero */}
        <div className="mb-8 text-center md:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-dark/10 bg-white/45 px-4 py-2 shadow-sm backdrop-blur-sm">
            <Sparkles size={15} className="text-primary" />
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-dark/70">
              Votre commande
            </p>
          </div>

          <h1 className="mt-4 font-heading text-3xl font-bold text-dark md:text-4xl">
            Panier
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-dark/75 md:text-lg">
            Vérifiez vos articles avant de passer à la commande.
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="rounded-[30px] border border-dark/10 bg-white/35 p-8 text-center shadow-2xl backdrop-blur-md md:p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-creamy text-primary shadow-sm">
              <ShoppingBag size={28} />
            </div>

            <p className="mt-5 text-xl font-bold text-primary">
              Votre panier est vide
            </p>

            <p className="mx-auto mt-2 max-w-md text-dark/70 leading-7">
              Ajoutez vos cafés préférés pour commencer votre commande.
            </p>

            <div className="mt-6">
              <Link
                href="/nosCafes"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95"
              >
                Découvrir nos cafés
                <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="rounded-[28px] border border-dark/10 bg-white/35 p-5 shadow-xl backdrop-blur-md md:p-6"
                >
                  <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    <div className="flex gap-4">
                      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-dark/5 bg-creamy2 shadow-sm">
                        <Image
                          src={item.image}
                          alt={item.coffeeName}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div>
                        <h2 className="text-xl font-bold text-primary">
                          {item.coffeeName}
                        </h2>

                        <div className="mt-2 space-y-1 text-sm leading-6 text-dark/75">
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

                    <div className="flex flex-col items-start gap-4 md:items-end">
                      <p className="text-xl font-bold text-accent">
                        {(item.totalPrice * item.qty).toFixed(2)} DT
                      </p>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleDecreaseQty(item.id)}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-dark/10 bg-white/50 font-bold text-dark shadow-sm transition hover:bg-white/70"
                        >
                          -
                        </button>

                        <span className="min-w-6 text-center font-semibold text-dark">
                          {item.qty}
                        </span>

                        <button
                          onClick={() => handleIncreaseQty(item.id)}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-dark/10 bg-white/50 font-bold text-dark shadow-sm transition hover:bg-white/70"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="inline-flex items-center justify-center rounded-xl border border-dark/10 bg-white/45 px-4 py-2 text-sm font-semibold text-dark transition hover:bg-white/65"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-[30px] border border-dark/10 bg-white/35 p-6 shadow-2xl backdrop-blur-md md:p-7">
              <div className="flex items-center justify-between text-xl font-bold text-accent">
                <span>Total</span>
                <span>{total.toFixed(2)} DT</span>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  onClick={() => setShowConfirm(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-5 py-3 font-semibold text-red-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-100"
                >
                  <Trash2 size={17} />
                  Vider le panier
                </button>

                <Link
                  href="/nosCafes"
                  className="inline-flex items-center justify-center rounded-2xl border border-dark/15 bg-white/45 px-5 py-3 font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/60"
                >
                  Continuer vos achats
                </Link>

                <Link
                  href="/checkout"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95"
                >
                  Commander
                  <ChevronRight size={18} />
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-[28px] border border-white/20 bg-accent/90 p-6 text-center shadow-2xl">
            <h2 className="mb-3 text-xl font-bold text-dark">
              Êtes-vous sûr ?
            </h2>

            <p className="mb-6 leading-7 text-dark/85">
              Cette action va vider complètement votre panier.
            </p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowConfirm(false)}
                className="rounded-xl bg-gray-200 px-5 py-2.5 font-semibold text-dark transition hover:bg-gray-300"
              >
                Non
              </button>

              <button
                onClick={handleClearCart}
                className="rounded-xl bg-red-500 px-5 py-2.5 font-semibold text-white transition hover:bg-red-600"
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