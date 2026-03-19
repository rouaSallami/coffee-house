"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Phone,
  UserPlus,
} from "lucide-react";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (form.password.length < 6) {
    setError("Le mot de passe doit contenir au moins 6 caractères.");
    return;
  }

  if (form.password !== form.password_confirmation) {
    setError("La confirmation du mot de passe ne correspond pas.");
    return;
  }

  try {
    const fakeUser = {
      name: form.name,
      email: form.email,
      phone: form.phone,
    };

    localStorage.setItem("user", JSON.stringify(fakeUser));
    localStorage.setItem("isAuthenticated", "true");

    window.dispatchEvent(new Event("authChanged"));
    window.dispatchEvent(new Event("cartUpdated"));
    window.dispatchEvent(new Event("favoritesUpdated"));

    toast.success("Compte créé avec succès 🎉");

    setSuccess(true);

    setTimeout(() => {
      window.location.href = "/";
    }, 1400);
  } catch (err) {
    setError("Une erreur est survenue. Veuillez réessayer.");
  }
};

  return (
    <div className="relative min-h-screen overflow-hidden bg-secondary text-dark">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_45%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary to-secondary/80" />

      <div className="relative mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl items-center justify-center px-6 py-2">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-[32px] border border-dark/10 bg-white/30 shadow-2xl backdrop-blur-md lg:grid-cols-2">
          {/* Left */}
          <div className="hidden flex-col justify-center bg-dark2 px-10 py-12 text-white lg:flex">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/70">
              Coffee House
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-tight">
              Rejoignez notre univers café.
            </h1>

            <p className="mt-4 max-w-md text-white/75 leading-7">
              Créez votre compte pour commander plus rapidement, enregistrer vos
              favoris et profiter de vos récompenses.
            </p>

            <div className="mt-8 space-y-3 text-sm text-white/80">
              <p>✔ Inscription simple et rapide</p>
              <p>✔ Offres et récompenses personnalisées</p>
              <p>✔ Suivi facile de vos commandes</p>
            </div>
          </div>

          {/* Right */}
          <div className="px-6 py-10 sm:px-10 sm:py-12">
            <div className="mx-auto max-w-md">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-dark/60">
                Inscription
              </p>

              <h2 className="mt-3 text-3xl font-bold text-primary">
                Créer un compte
              </h2>

              <p className="mt-2 text-dark/70">
                Remplissez les informations ci-dessous pour commencer.
              </p>

              {success && (
                <div className="mt-6 rounded-2xl border border-green-200 bg-green-50/90 px-4 py-3 text-sm font-medium text-green-700 shadow-sm">
                  Compte créé avec succès. Redirection en cours...
                </div>
              )}

              {error && (
                <div className="mt-6 rounded-2xl border border-red-200 bg-red-50/90 px-4 py-3 text-sm font-medium text-red-700 shadow-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div>
                  <label className="mb-2 block font-semibold text-primary">
                    Nom complet
                  </label>
                  <div className="flex items-center gap-3 rounded-xl border border-dark/10 bg-white/60 px-4 py-3 backdrop-blur-sm transition focus-within:ring-2 focus-within:ring-primary/20">
                    <User size={18} className="text-dark2/25" />
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Votre nom complet"
                      required
                      className="w-full bg-transparent text-dark outline-none placeholder:text-dark2/25"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-primary">
                    Téléphone
                  </label>
                  <div className="flex items-center gap-3 rounded-xl border border-dark/10 bg-white/60 px-4 py-3 backdrop-blur-sm transition focus-within:ring-2 focus-within:ring-primary/20">
                    <Phone size={18} className="text-dark2/25" />
                    <input
                      type="text"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Votre téléphone"
                      className="w-full bg-transparent text-dark outline-none placeholder:text-dark2/25"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-primary">
                    Email
                  </label>
                  <div className="flex items-center gap-3 rounded-xl border border-dark/10 bg-white/60 px-4 py-3 backdrop-blur-sm transition focus-within:ring-2 focus-within:ring-primary/20">
                    <Mail size={18} className="text-dark2/25" />
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Votre email"
                      required
                      className="w-full bg-transparent text-dark outline-none placeholder:text-dark2/25"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-primary">
                    Mot de passe
                  </label>
                  <div className="flex items-center gap-3 rounded-xl border border-dark/10 bg-white/60 px-4 py-3 backdrop-blur-sm transition focus-within:ring-2 focus-within:ring-primary/20">
                    <Lock size={18} className="text-dark2/25" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Votre mot de passe"
                      required
                      className="w-full bg-transparent text-dark outline-none placeholder:text-dark2/25"
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

                <div>
                  <label className="mb-2 block font-semibold text-primary">
                    Confirmer le mot de passe
                  </label>
                  <div className="flex items-center gap-3 rounded-xl border border-dark/10 bg-white/60 px-4 py-3 backdrop-blur-sm transition focus-within:ring-2 focus-within:ring-primary/20">
                    <Lock size={18} className="text-dark2/25" />
                    <input
                      type={showPasswordConfirm ? "text" : "password"}
                      name="password_confirmation"
                      value={form.password_confirmation}
                      onChange={handleChange}
                      placeholder="Confirmez votre mot de passe"
                      required
                      className="w-full bg-transparent text-dark outline-none placeholder:text-dark2/25"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPasswordConfirm(!showPasswordConfirm)
                      }
                      className="text-dark/55 transition hover:text-dark"
                    >
                      {showPasswordConfirm ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-dark2 px-6 py-3.5 font-semibold text-white shadow-md transition hover:scale-[1.02] hover:opacity-95"
                >
                  <UserPlus size={18} />
                  Créer mon compte
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-dark/70">
                Vous avez déjà un compte ?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-primary transition hover:opacity-80"
                >
                  Se connecter
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}