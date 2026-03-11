"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function PanierPage() {
  const [cart, setCart] = useState([]);

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
  const updatedCart = cart
    .map((item) =>
      item.id === id
        ? { ...item, qty: item.qty > 1 ? item.qty - 1 : 1 }
        : item
    );

  setCart(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  window.dispatchEvent(new Event("cartUpdated"));
};

  return (
    <div className="bg-accent min-h-screen mt-16">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="mb-10 text-center">
          <p className="text-dark/70 text-sm font-semibold uppercase tracking-widest">
            Votre commande
          </p>
          <h1 className="text-4xl font-bold text-dark mt-2">
            Panier
          </h1>
          <p className="text-dark/70 mt-3">
            Vérifiez vos articles avant de passer à la commande.
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="bg-base rounded-3xl p-10 text-center border border-dark/10 shadow-md">
            <p className="text-dark text-lg font-semibold">
              Votre panier est vide.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-base rounded-3xl p-6 border border-dark/10 shadow-md"
                >
                  <div className="flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
                    <div className="flex gap-4">
                      <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-white">
                        <Image
                          src={item.image}
                          alt={item.coffeeName}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div>
                        <h2 className="text-xl font-bold text-dark">
                          {item.coffeeName}
                        </h2>

                        <div className="mt-2 space-y-1 text-sm text-dark/70">
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

                    <div className="flex flex-col items-start md:items-end gap-3">
  <p className="text-lg font-bold text-dark">
    {(item.totalPrice * item.qty).toFixed(2)} DT
  </p>

  <div className="flex items-center gap-3">
    <button
      onClick={() => handleDecreaseQty(item.id)}
      className="w-9 h-9 rounded-full border border-dark text-dark font-bold"
    >
      -
    </button>

    <span className="font-semibold text-dark">{item.qty}</span>

    <button
      onClick={() => handleIncreaseQty(item.id)}
      className="w-9 h-9 rounded-full border border-dark text-dark font-bold"
    >
      +
    </button>
  </div>

  <button
    onClick={() => handleRemoveItem(item.id)}
    className="border border-dark text-dark px-4 py-2 rounded-xl text-sm font-semibold hover:bg-dark/5 transition"
  >
    Supprimer
  </button>
</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 bg-base rounded-3xl p-6 border border-dark/10 shadow-md">
              <div className="flex items-center justify-between text-xl font-bold text-dark">
                <span>Total</span>
                <span>{total} DT</span>
              </div>

              <div className="mt-6 flex justify-end">
                <Link
  href="/checkout"
  className="bg-dark text-white px-6 py-3 rounded-2xl font-semibold hover:opacity-90 transition inline-block"
>
  Commander
</Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}