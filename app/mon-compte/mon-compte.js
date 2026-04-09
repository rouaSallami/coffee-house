"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Mail,
  Phone,
  Gift,
  ShoppingCart,
  Heart,
  LogOut,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { getUserData } from "../lib/storage";

export default function MonComptePage() {
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    setUser(parsedUser);

    const storedPoints = Number(sessionStorage.getItem("points")) || 0;
    setPoints(storedPoints);

    const storedCart = getUserData("cart", []);
    setCart(Array.isArray(storedCart) ? storedCart : []);

    const storedFavorites = getUserData("favoriteCoffees", []);
    setFavorites(Array.isArray(storedFavorites) ? storedFavorites : []);
  }, []);

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.qty || 0), 0);
  }, [cart]);

  const userInitial = useMemo(() => {
    if (!user?.name) return "C";
    return user.name.charAt(0).toUpperCase();
  }, [user]);

  const handleLogout = () => {
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("user");

    window.dispatchEvent(new Event("authChanged"));
    window.dispatchEvent(new Event("cartUpdated"));
    window.dispatchEvent(new Event("favoritesUpdated"));

    window.location.href = "/login";
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-secondary text-dark">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(111,78,55,0.10),_transparent_35%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(185,140,92,0.10),_transparent_30%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
            <Sparkles size={16} className="text-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Espace client premium
            </span>
          </div>

          <h1 className="mt-5 font-heading text-4xl font-bold text-primary md:text-5xl">
            Mon compte
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-dark/70 md:text-lg">
            Gérez vos informations personnelles, consultez vos récompenses et
            retrouvez un aperçu clair de votre activité Coffee House.
          </p>
        </div>

        <div className="mt-14 grid gap-8 xl:grid-cols-3">
          <div className="xl:col-span-2 space-y-8">
            <div className="rounded-[32px] border border-primary/10 bg-accent p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-[24px] bg-gradient-to-br from-primary to-dark2 text-2xl font-bold text-white shadow-lg">
                    {userInitial}
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary md:text-3xl">
                      {user?.name || "Client Coffee House"}
                    </h2>
                    <p className="mt-1 text-dark/60">
                      Bienvenue dans votre espace personnel.
                    </p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 rounded-2xl bg-primary/5 px-4 py-3 text-sm font-medium text-primary">
                  <ShieldCheck size={18} />
                  Compte sécurisé
                </div>
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-2">
                <div className="group rounded-3xl border border-primary/10 bg-secondary/10 p-5 transition duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="rounded-xl bg-primary/10 p-2 text-primary">
                      <Mail size={18} />
                    </div>
                    <p className="font-semibold text-primary">Adresse email</p>
                  </div>
                  <p className="break-all text-dark/75">
                    {user?.email || "Non renseigné"}
                  </p>
                </div>

                <div className="group rounded-3xl border border-primary/10 bg-secondary/10 p-5 transition duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="rounded-xl bg-primary/10 p-2 text-primary">
                      <Phone size={18} />
                    </div>
                    <p className="font-semibold text-primary">Téléphone</p>
                  </div>
                  <p className="text-dark/75">
                    {user?.phone || "Non renseigné"}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-amber-200 bg-secondary/10 p-7 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-amber-100 p-3 text-amber-700">
                  <Sparkles size={20} />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-amber-800">
                    Préparation pour Laravel
                  </h3>
                  <p className="mt-2 max-w-3xl leading-7 text-amber-900/80">
                    Cette page utilise actuellement les données stockées dans le
                    navigateur. Plus tard, vous pourrez brancher facilement une
                    API Laravel pour récupérer le profil, les points, le panier
                    et les favoris sans refaire toute l’interface.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-primary/10 bg-accent p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-primary">Mon résumé</h3>
              <div className="h-10 w-10 rounded-2xl bg-primary/10" />
            </div>

            <p className="mt-2 text-sm leading-6 text-dark/60">
              Un aperçu rapide de vos avantages et de votre activité récente.
            </p>

            <div className="mt-7 space-y-4">
              <div className="group rounded-3xl border border-primary/10 bg-secondary/10 p-5 transition duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-primary/10 p-2 text-primary">
                      <Gift size={18} />
                    </div>
                    <span className="font-semibold text-dark">Points fidélité</span>
                  </div>
                  <span className="text-2xl font-bold text-primary">{points}</span>
                </div>
              </div>

              <div className="group rounded-3xl border border-primary/10 bg-secondary/10 p-5 transition duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-primary/10 p-2 text-primary">
                      <ShoppingCart size={18} />
                    </div>
                    <span className="font-semibold text-dark">Articles panier</span>
                  </div>
                  <span className="text-2xl font-bold text-primary">
                    {cartCount}
                  </span>
                </div>
              </div>

              <div className="group rounded-3xl border border-primary/10 bg-secondary/10 p-5 transition duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-primary/10 p-2 text-primary">
                      <Heart size={18} />
                    </div>
                    <span className="font-semibold text-dark">Favoris</span>
                  </div>
                  <span className="text-2xl font-bold text-primary">
                    {favorites.length}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-dark/10 pt-6">
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 px-6 py-4 font-semibold text-white shadow-lg transition duration-300 hover:scale-[1.02] hover:from-red-700 hover:to-red-600"
              >
                <LogOut size={18} />
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}