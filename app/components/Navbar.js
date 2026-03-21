"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  User,
  ShoppingCart,
  Heart,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { getUserData } from "../lib/storage";

export default function Navbar() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [mountedMenu, setMountedMenu] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [favCount, setFavCount] = useState(0);
  const [hasOrder, setHasOrder] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = getUserData("cart", []);
      const count = cart.reduce((sum, item) => sum + (item.qty || 0), 0);
      setCartCount(count);
    };

    const updateFavCount = () => {
      const favs = getUserData("favoriteCoffees", []);
      setFavCount(favs.length);
    };

    const checkOrder = () => {
      const order = localStorage.getItem("lastOrder");
      setHasOrder(!!order);
    };

    const checkAuth = () => {
      const auth = localStorage.getItem("isAuthenticated") === "true";
      setIsAuthenticated(auth);
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    updateCartCount();
    updateFavCount();
    checkOrder();
    checkAuth();
    handleScroll();

    window.addEventListener("cartUpdated", updateCartCount);
    window.addEventListener("favoritesUpdated", updateFavCount);
    window.addEventListener("orderUpdated", checkOrder);
    window.addEventListener("authChanged", checkAuth);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("favoritesUpdated", updateFavCount);
      window.removeEventListener("orderUpdated", checkOrder);
      window.removeEventListener("authChanged", checkAuth);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setMountedMenu(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      const timer = setTimeout(() => setMountedMenu(false), 320);
      return () => clearTimeout(timer);
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");

    setIsAuthenticated(false);
    setOpen(false);

    window.dispatchEvent(new Event("authChanged"));
    window.location.href = "/login";
  };

  const closeMenu = () => setOpen(false);
  const openMenu = () => setOpen(true);

  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/nosCafes", label: "Nos cafés" },
    { href: "/aPropos", label: "A propos" },
    { href: "/contact", label: "Contact" },
    { href: "/avisClient", label: "Avis" },
    { href: "/mesRecompenses", label: "Récompenses" },
    ...(hasOrder ? [{ href: "/suivi-commande", label: "Suivi commande" }] : []),
  ];

  const isActiveLink = (href) => pathname === href;

  const desktopLinkClass = (href) =>
    `relative rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
      isActiveLink(href)
        ? "bg-primary text-white shadow-lg shadow-primary/20"
        : "text-dark/85 hover:bg-white/80 hover:text-primary hover:shadow-sm"
    }`;

  const mobileLinkClass = (href, isOpen) =>
    `group flex items-center justify-between rounded-2xl px-4 py-3.5 font-semibold transition-all duration-500 ${
      isActiveLink(href)
        ? "bg-primary text-white shadow-lg shadow-primary/20"
        : "text-dark hover:bg-white/75 hover:text-primary"
    } ${isOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`;

  const iconButtonClass = (active) =>
    `relative rounded-2xl p-2.5 transition-all duration-300 ${
      active
        ? "bg-primary text-white shadow-md shadow-primary/20"
        : "text-dark hover:-translate-y-0.5 hover:bg-white/80 hover:shadow-sm"
    }`;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-dark/10 bg-beige/80 shadow-[0_10px_35px_rgba(0,0,0,0.08)] backdrop-blur-xl"
            : "border-b border-dark/10 bg-beige/55 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="group flex items-center gap-3 transition-all duration-300 hover:scale-[1.01]"
          >
            <div className="relative">
              <Image
                src="/images/logo.jpg"
                alt="Logo"
                width={48}
                height={48}
                className="rounded-full border border-dark/10 shadow-sm transition-all duration-300 group-hover:rotate-3 group-hover:shadow-md"
              />
              <span className="absolute -inset-1 -z-10 rounded-full bg-primary/15 blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            <div className="leading-tight">
              <h1 className="text-lg font-bold text-dark">Coffee House</h1>
              <p className="text-[11px] uppercase tracking-[0.18em] text-dark/45">
                Premium Coffee
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-2 rounded-full border border-dark/10 bg-white/35 px-2 py-2 shadow-sm backdrop-blur lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={desktopLinkClass(link.href)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            <Link
              href="/panier"
              className={iconButtonClass(pathname === "/panier")}
              aria-label="Panier"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[19px] rounded-full bg-red-500 px-1.5 py-0.5 text-center text-[10px] font-bold text-white shadow-md">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              href="/favoris"
              className={iconButtonClass(pathname === "/favoris")}
              aria-label="Favoris"
            >
              <Heart size={20} />
              {favCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[19px] rounded-full bg-red-500 px-1.5 py-0.5 text-center text-[10px] font-bold text-white shadow-md">
                  {favCount}
                </span>
              )}
            </Link>

            <Link
              href="/login"
              className={iconButtonClass(pathname === "/login")}
              aria-label="Compte"
            >
              <User size={20} />
            </Link>

            <div className="ml-1">
              <ThemeToggle />
            </div>

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="rounded-2xl p-2.5 text-red-500 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-50"
                aria-label="Déconnexion"
              >
                <LogOut size={20} />
              </button>
            )}
          </div>

          <button
            onClick={openMenu}
            className="group rounded-2xl border border-dark/10 bg-white/80 p-2.5 text-dark shadow-sm transition-all duration-300 hover:scale-105 hover:bg-white active:scale-95 lg:hidden"
            aria-label="Open menu"
          >
            <Menu
              size={20}
              className="transition-transform duration-300 group-hover:rotate-90"
            />
          </button>
        </div>
      </nav>

      {mountedMenu && (
        <>
          <div
            className={`fixed inset-0 z-40 bg-black/45 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
              open ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeMenu}
          />

          <div
            className={`fixed right-0 top-0 z-50 h-full w-[86%] max-w-sm border-l border-dark/10 bg-beige/95 shadow-2xl backdrop-blur-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
              open ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex h-full flex-col p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-dark">Menu</h2>
                  <p className="mt-1 text-sm text-dark/55">
                    Discover your coffee world
                  </p>
                </div>

                <button
                  onClick={closeMenu}
                  className="rounded-2xl border border-dark/10 bg-white/80 p-2 text-dark transition-all duration-300 hover:rotate-90 hover:bg-white"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-8 flex flex-col gap-2">
                {navLinks.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className={mobileLinkClass(item.href, open)}
                    style={{
                      transitionDelay: open ? `${index * 70}ms` : "0ms",
                    }}
                  >
                    <span>{item.label}</span>
                    <ChevronRight
                      size={16}
                      className={`transition-all duration-300 ${
                        isActiveLink(item.href)
                          ? "text-white"
                          : "text-dark/40 group-hover:translate-x-1"
                      }`}
                    />
                  </Link>
                ))}
              </div>

              <div
                className={`mt-auto rounded-[30px] border border-dark/10 bg-white/45 p-4 shadow-sm transition-all duration-500 ${
                  open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
                style={{
                  transitionDelay: open ? "260ms" : "0ms",
                }}
              >
                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-dark/45">
                    Quick Access
                  </p>
                </div>

                <div className="flex items-center gap-3 border-b border-dark/10 pb-4">
                  <Link
                    href="/panier"
                    onClick={closeMenu}
                    className={iconButtonClass(pathname === "/panier")}
                    aria-label="Panier"
                  >
                    <ShoppingCart size={18} />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 min-w-[19px] rounded-full bg-red-500 px-1.5 py-0.5 text-center text-[10px] font-bold text-white shadow-md">
                        {cartCount}
                      </span>
                    )}
                  </Link>

                  <Link
                    href="/favoris"
                    onClick={closeMenu}
                    className={iconButtonClass(pathname === "/favoris")}
                    aria-label="Favoris"
                  >
                    <Heart size={18} />
                    {favCount > 0 && (
                      <span className="absolute -top-1 -right-1 min-w-[19px] rounded-full bg-red-500 px-1.5 py-0.5 text-center text-[10px] font-bold text-white shadow-md">
                        {favCount}
                      </span>
                    )}
                  </Link>

                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className={iconButtonClass(pathname === "/login")}
                    aria-label="Compte"
                  >
                    <User size={18} />
                  </Link>

                  <div className="ml-1">
                    <ThemeToggle />
                  </div>
                </div>

                {isAuthenticated && (
                  <button
                    onClick={handleLogout}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 font-semibold text-red-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-100"
                  >
                    <LogOut size={18} />
                    Déconnexion
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}