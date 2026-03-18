"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, MapPin, ShoppingCart, Heart } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [favCount, setFavCount] = useState(0);
  const [hasOrder, setHasOrder] = useState(false);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const count = cart.reduce((sum, item) => sum + (item.qty || 0), 0);
      setCartCount(count);
    };

    const updateFavCount = () => {
      const favs = JSON.parse(localStorage.getItem("favoriteCoffees") || "[]");
      setFavCount(favs.length);
    };

    const checkOrder = () => {
      const order = localStorage.getItem("lastOrder");
      setHasOrder(!!order);
    };

    updateCartCount();
    updateFavCount();
    checkOrder();

    window.addEventListener("cartUpdated", updateCartCount);
    window.addEventListener("favoritesUpdated", updateFavCount);
    window.addEventListener("orderUpdated", checkOrder);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("favoritesUpdated", updateFavCount);
      window.removeEventListener("orderUpdated", checkOrder);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-dark/10 bg-beige/50 px-6 py-3 text-dark shadow-sm backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="group flex min-w-0 items-center gap-3">
          <Image
            src="/images/logo.jpg"
            alt="Coffee House Logo"
            width={55}
            height={55}
            className="shrink-0 rounded-full border border-dark/10 object-contain shadow-sm"
          />

          <div className="text-sm font-bold leading-tight tracking-wide text-dark sm:text-lg">
            <span className="block sm:hidden">Coffee House</span>
            <span className="hidden sm:block">Coffee</span>
            <span className="hidden sm:block">House</span>
          </div>
        </Link>

        <div className="hidden items-center gap-8 text-[15px] font-medium lg:flex">
          <Link href="/" className="transition-colors hover:text-primary">
            Accueil
          </Link>

          <Link href="/nosCafes" className="transition-colors hover:text-primary">
            Nos cafés
          </Link>

          <Link href="/aPropos" className="transition-colors hover:text-primary">
            A propos
          </Link>

          <Link href="/contact" className="transition-colors hover:text-primary">
            Contact
          </Link>

          <Link href="/avisClient" className="transition-colors hover:text-primary">
            Avis client
          </Link>

          <Link href="/mesRecompenses" className="transition-colors hover:text-primary">
            Mes récompenses
          </Link>

          {hasOrder && (
            <Link
              href="/suivi-commande"
              className="transition-colors hover:text-primary"
            >
              Suivi commande
            </Link>
          )}

          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/panier"
            className="relative rounded-xl p-2.5 transition hover:bg-dark/10"
            title="Panier"
          >
            <ShoppingCart
              size={20}
              className="text-dark/80 transition-colors hover:text-dark"
            />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-dark px-1 text-xs font-bold text-beige shadow-sm">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            href="/login"
            className="rounded-xl p-2.5 transition hover:bg-dark/10"
            title="Mon compte"
          >
            <User
              size={20}
              className="text-dark/80 transition-colors hover:text-dark"
            />
          </Link>

          <Link
            href="/contact"
            className="rounded-xl p-2.5 transition hover:bg-dark/10"
            title="Localisation"
          >
            <MapPin
              size={20}
              className="text-dark/80 transition-colors hover:text-dark"
            />
          </Link>

          <Link
            href="/favoris"
            className="relative rounded-xl p-2.5 transition hover:bg-dark/10"
            title="Favoris"
          >
            <Heart
              size={20}
              className="text-dark/80 transition-colors hover:text-dark"
            />
            {favCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-dark px-1 text-xs font-bold text-beige shadow-sm">
                {favCount}
              </span>
            )}
          </Link>
        </div>

        <button
          className="cursor-pointer p-1 text-3xl text-dark lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="absolute right-4 top-20 w-72 rounded-2xl border border-white/10 bg-dark/95 p-6 shadow-xl ring-1 ring-white/10 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-4 font-semibold text-beige">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="transition-colors hover:text-secondary"
            >
              Accueil
            </Link>

            <Link
              href="/nosCafes"
              onClick={() => setOpen(false)}
              className="transition-colors hover:text-secondary"
            >
              Nos cafés
            </Link>

            <Link
              href="/aPropos"
              onClick={() => setOpen(false)}
              className="transition-colors hover:text-secondary"
            >
              A propos
            </Link>

            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="transition-colors hover:text-secondary"
            >
              Contact
            </Link>

            <Link
              href="/avisClient"
              onClick={() => setOpen(false)}
              className="transition-colors hover:text-secondary"
            >
              Avis client
            </Link>

            <Link
              href="/mesRecompenses"
              onClick={() => setOpen(false)}
              className="transition-colors hover:text-secondary"
            >
              Mes récompenses
            </Link>

            {hasOrder && (
              <Link
                href="/suivi-commande"
                onClick={() => setOpen(false)}
                className="transition-colors hover:text-secondary"
              >
                Suivi commande
              </Link>
            )}

            <div className="flex items-center gap-4">
              <ThemeToggle />
            </div>

            <div className="mt-2 flex items-center gap-4 border-t border-white/10 pt-4">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="rounded-xl p-2.5 transition hover:bg-white/10"
              >
                <User size={18} className="text-beige/80" />
              </Link>

              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="rounded-xl p-2.5 transition hover:bg-white/10"
              >
                <MapPin size={18} className="text-beige/80" />
              </Link>

              <Link
                href="/favoris"
                onClick={() => setOpen(false)}
                className="relative rounded-xl p-2.5 transition hover:bg-white/10"
              >
                <Heart size={18} className="text-beige/80" />
                {favCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary px-1 text-[10px] font-bold text-dark shadow-sm">
                    {favCount}
                  </span>
                )}
              </Link>

              <Link
                href="/panier"
                onClick={() => setOpen(false)}
                className="relative rounded-xl p-2.5 transition hover:bg-white/10"
              >
                <ShoppingCart size={18} className="text-beige/80" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-secondary px-1 text-[10px] font-bold text-dark shadow-sm">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-dark/30 to-transparent" />
    </nav>
  );
}