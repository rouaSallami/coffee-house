"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const isAdmin = form.email.trim().toLowerCase() === "admin@coffeehouse.com";

    const fakeUser = {
      name: isAdmin ? "Admin Coffee House" : "Client Coffee House",
      email: form.email,
      role: isAdmin ? "admin" : "user",
    };

    localStorage.setItem("user", JSON.stringify(fakeUser));
    localStorage.setItem("isAuthenticated", "true");

    window.dispatchEvent(new Event("authChanged"));
    window.dispatchEvent(new Event("cartUpdated"));
    window.dispatchEvent(new Event("favoritesUpdated"));

    setTimeout(() => {
      toast.success(
        isAdmin
          ? `Bienvenue ${fakeUser.name} 👨‍💼`
          : `Bienvenue ${fakeUser.name} ☕`
      );
    }, 1000);

    setTimeout(() => {
      window.location.href = isAdmin ? "/admin" : "/";
    }, 2000);
  } catch (err) {
    setError("Une erreur est survenue. Veuillez réessayer.");
    setLoading(false);
  }
};

  return (
    <div className="relative min-h-screen overflow-hidden bg-secondary text-dark">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_45%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary to-secondary/80" />

      <div className="relative mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl items-center justify-center px-6 py-16">
        <motion.div
  initial={{ opacity: 0, scale: 0.95, y: 30 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
  className="grid w-full max-w-5xl overflow-hidden rounded-[32px] border border-dark/10 bg-white/30 shadow-2xl backdrop-blur-md lg:grid-cols-2"
>
  
          {/* Left */}
          <div className="hidden flex-col justify-center bg-dark2 px-10 py-12 text-white lg:flex">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/70">
              Coffee House
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-tight">
              Heureux de vous revoir.
            </h1>

            <p className="mt-4 max-w-md text-white/75 leading-7">
              Connectez-vous pour accéder à votre compte, suivre vos commandes
              et retrouver vos cafés favoris.
            </p>

            <div className="mt-8 space-y-3 text-sm text-white/80">
              <p>✔ Accès rapide à votre espace client</p>
              <p>✔ Suivi de commande simplifié</p>
              <p>✔ Favoris et récompenses centralisés</p>
            </div>
          </div>

          {/* Right */}
          <div className="px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-md">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-dark/60">
                Connexion
              </p>

              <h2 className="mt-3 text-3xl font-bold text-primary">
                Se connecter
              </h2>

              <p className="mt-2 text-dark/70">
                Entrez vos informations pour accéder à votre compte.
              </p>

              

              {error && (
                <div className="mt-6 rounded-2xl border border-red-200 bg-red-50/90 px-4 py-3 text-sm font-medium text-red-700 shadow-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div>
                  <label className="mb-2 block font-semibold text-primary">
                    Email
                  </label>
                  <div className="flex items-center gap-3 rounded-xl border border-dark/10 bg-white/60 px-4 py-3 backdrop-blur-sm transition focus-within:ring-2 focus-within:ring-primary/20">
                    <Mail size={18} className="text-dark2/50" />
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Votre email"
                      required
                      className="w-full bg-transparent text-dark outline-none placeholder:text-dark2/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-primary">
                    Mot de passe
                  </label>
                  <div className="flex items-center gap-3 rounded-xl border border-dark/10 bg-white/60 px-4 py-3 backdrop-blur-sm transition focus-within:ring-2 focus-within:ring-primary/20">
                    <Lock size={18} className="text-dark2/50" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Votre mot de passe"
                      required
                      className="w-full bg-transparent text-dark outline-none placeholder:text-dark2/40"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-dark/55 transition hover:text-dark"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 text-sm">
                  <label className="flex items-center gap-2 text-dark/70">
                    <input
                      type="checkbox"
                      name="remember"
                      checked={form.remember}
                      onChange={handleChange}
                      className="accent-primary"
                    />
                    Se souvenir de moi
                  </label>

                  <Link
                    href="#"
                    className="font-medium text-primary transition hover:opacity-80"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>

                <button
  type="submit"
  disabled={loading}
  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-dark2 px-6 py-3.5 font-semibold text-white shadow-md transition hover:scale-[1.02] hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
>
  <LogIn size={18} />
  Se connecter
</button>
              </form>

              <p className="mt-6 text-center text-sm text-dark/70">
                Vous n’avez pas de compte ?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-primary transition hover:opacity-80"
                >
                  S’inscrire
                </Link>
                </p>
            </div>
          </div>
        </motion.div>
      </div>
      {loading && (
  <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <div className="flex flex-col items-center gap-4 bg-white px-6 py-5 rounded-2xl shadow-xl">
      
      <span className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-primary"></span>

      <p className="text-sm font-semibold text-dark">
        Connexion en cours...
      </p>

    </div>
  </div>
)}
    </div>
  );
}