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
  User,
  Lock,
  Camera,
} from "lucide-react";
import toast from "react-hot-toast";
import { getUserData } from "../lib/storage";
import { handleInactiveAccount } from "../../lib/handleInactiveAccount";



export default function MonComptePage() {
  const [user, setUser] = useState(null);
  const [points, setPoints] = useState(0);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  

  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  const [profileSaving, setProfileSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);

  const [avatarPreview, setAvatarPreview] = useState(null);
const [avatarSaving, setAvatarSaving] = useState(false);

  useEffect(() => {
    const loadAccountData = async () => {
      try {
        const token = sessionStorage.getItem("token");

        if (!token) {
          setUser(null);
          setPoints(0);
          return;
        }

        const [profileRes, rewardsRes] = await Promise.all([
          fetch("/backend/profile", {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          }),
          fetch("/backend/rewards/me", {
            method: "GET",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          }),
        ]);

        const profileData = await profileRes.json();
        const rewardsData = await rewardsRes.json();

        if (handleInactiveAccount(profileData) || handleInactiveAccount(rewardsData)) {
  return;
}

        if (profileRes.ok) {
          const currentUser = profileData.user || null;
          setUser(currentUser);

          setAvatarPreview(currentUser?.avatar ? `http://localhost:8000/storage/${currentUser.avatar}` : null);

          setProfileForm({
            name: currentUser?.name || "",
            email: currentUser?.email || "",
            phone: currentUser?.phone || "",
          });
          sessionStorage.setItem("user", JSON.stringify(currentUser));
        } else {
          setUser(null);
        }

        if (rewardsRes.ok) {
          setPoints(Number(rewardsData.current_points || 0));
        } else {
          setPoints(0);
        }

        const storedCart = getUserData("cart", []);
        setCart(Array.isArray(storedCart) ? storedCart : []);

        const storedFavorites = getUserData("favoriteCoffees", []);
        setFavorites(Array.isArray(storedFavorites) ? storedFavorites : []);
      } catch (error) {
        console.error("Account load error:", error);
        setUser(null);
        setPoints(0);
      } finally {
        setLoading(false);
      }
    };

    loadAccountData();
  }, []);

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.qty || 0), 0);
  }, [cart]);

  const userInitial = useMemo(() => {
    if (!user?.name) return "C";
    return user.name.charAt(0).toUpperCase();
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    try {
      setProfileSaving(true);
      const token = sessionStorage.getItem("token");

      const res = await fetch("/backend/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileForm),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Erreur lors de la mise à jour du profil");
        return;
      }

      setUser(data.user);
      sessionStorage.setItem("user", JSON.stringify(data.user));
      toast.success("Profil mis à jour ✅");
    } catch (error) {
      console.error(error);
      toast.error("Erreur serveur");
    } finally {
      setProfileSaving(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      setPasswordSaving(true);
      const token = sessionStorage.getItem("token");

      const res = await fetch("/backend/profile/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(passwordForm),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Erreur lors du changement du mot de passe");
        return;
      }

      setPasswordForm({
        current_password: "",
        password: "",
        password_confirmation: "",
      });

      toast.success("Mot de passe mis à jour 🔐");
    } catch (error) {
      console.error(error);
      toast.error("Erreur serveur");
    } finally {
      setPasswordSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      const token = sessionStorage.getItem("token");

      if (token) {
        await fetch("/backend/logout", {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      sessionStorage.removeItem("isAuthenticated");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");

      window.dispatchEvent(new Event("authChanged"));
      window.dispatchEvent(new Event("cartUpdated"));
      window.dispatchEvent(new Event("favoritesUpdated"));

      window.location.href = "/login";
    }
  };

  if (loading) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-secondary text-dark">
        <div className="relative mx-auto max-w-6xl px-6 py-24 text-center">
          <p className="text-lg font-semibold text-primary">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-secondary text-dark">
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center">
          <h1 className="text-4xl font-bold text-primary">Mon compte</h1>
          <p className="mt-4 text-dark/70">
            Connectez-vous pour accéder à votre espace client.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-secondary text-dark">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(111,78,55,0.10),_transparent_35%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(185,140,92,0.10),_transparent_30%)]" />

      <div className="relative mx-auto max-w-6xl px-6 py-24">
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

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.35fr_0.9fr] items-start">
          <div className="space-y-8">
            <div className="rounded-[32px] border border-primary/10 bg-accent p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-5">
                  <div className="relative">
  {avatarPreview ? (
    <img
      src={avatarPreview}
      alt="Avatar"
      className="h-24 w-24 rounded-[28px] object-cover shadow-lg"
    />
  ) : (
    <div className="flex h-24 w-24 items-center justify-center rounded-[28px] bg-gradient-to-br from-primary to-dark2 text-3xl font-bold text-white shadow-lg">
      {userInitial}
    </div>
  )}

  <label className="absolute -bottom-2 -right-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl border border-primary/10 bg-white text-primary shadow-md transition hover:scale-105">
    <Camera size={18} />
    <input
      type="file"
      accept="image/*"
      className="hidden"
      onChange={async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
          setAvatarSaving(true);

          const token = sessionStorage.getItem("token");
          const formData = new FormData();
          formData.append("avatar", file);

          const res = await fetch("/backend/profile/avatar", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          });

          const data = await res.json();

          if (!res.ok) {
            toast.error(data.message || "Erreur lors de l’upload de la photo");
            return;
          }

          setUser(data.user);
          if (data.avatar_url) {
            setAvatarPreview(data.avatar_url);
          } else if (data.user?.avatar) {
            setAvatarPreview(`http://localhost:8000/storage/${data.user.avatar}`);
          }

          sessionStorage.setItem("user", JSON.stringify(data.user));
          toast.success("Photo mise à jour avec succès");
        } catch (error) {
          console.error(error);
          toast.error("Erreur serveur");
        } finally {
          setAvatarSaving(false);
        }
      }}
    />
  </label>
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
                <div className="rounded-3xl border border-primary/10 bg-secondary/10 p-5">
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

                <div className="rounded-3xl border border-primary/10 bg-secondary/10 p-5">
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

            <form
              onSubmit={handleProfileSubmit}
              className="rounded-[32px] border border-primary/10 bg-accent p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-primary/10 p-2 text-primary">
                  <User size={18} />
                </div>
                <h3 className="text-2xl font-bold text-primary">Modifier mon profil</h3>
              </div>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block font-semibold text-primary">Nom</label>
                  <input
                    name="name"
                    value={profileForm.name}
                    onChange={handleProfileChange}
                    className="w-full rounded-2xl border border-primary/10 bg-white/70 px-4 py-3 text-dark outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-primary">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={profileForm.email}
                    onChange={handleProfileChange}
                    className="w-full rounded-2xl border border-primary/10 bg-white/70 px-4 py-3 text-dark outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-primary">Téléphone</label>
                  <input
                    name="phone"
                    value={profileForm.phone}
                    onChange={handleProfileChange}
                    className="w-full rounded-2xl border border-primary/10 bg-white/70 px-4 py-3 text-dark outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={profileSaving}
                  className="rounded-2xl bg-primary px-6 py-3 font-semibold text-white shadow-md transition hover:opacity-95 disabled:opacity-60"
                >
                  {profileSaving ? "Enregistrement..." : "Enregistrer les modifications"}
                </button>
              </div>
            </form>

            <form
              onSubmit={handlePasswordSubmit}
              className="rounded-[32px] border border-primary/10 bg-accent p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-primary/10 p-2 text-primary">
                  <Lock size={18} />
                </div>
                <h3 className="text-2xl font-bold text-primary">Changer le mot de passe</h3>
              </div>

              <div className="mt-6 grid gap-5">
                <div>
                  <label className="mb-2 block font-semibold text-primary">
                    Mot de passe actuel
                  </label>
                  <input
                    name="current_password"
                    type="password"
                    value={passwordForm.current_password}
                    onChange={handlePasswordChange}
                    className="w-full rounded-2xl border border-primary/10 bg-white/70 px-4 py-3 text-dark outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-primary">
                    Nouveau mot de passe
                  </label>
                  <input
                    name="password"
                    type="password"
                    value={passwordForm.password}
                    onChange={handlePasswordChange}
                    className="w-full rounded-2xl border border-primary/10 bg-white/70 px-4 py-3 text-dark outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-primary">
                    Confirmation du nouveau mot de passe
                  </label>
                  <input
                    name="password_confirmation"
                    type="password"
                    value={passwordForm.password_confirmation}
                    onChange={handlePasswordChange}
                    className="w-full rounded-2xl border border-primary/10 bg-white/70 px-4 py-3 text-dark outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={passwordSaving}
                  className="rounded-2xl bg-dark px-6 py-3 font-semibold text-accent shadow-md transition hover:opacity-95 disabled:opacity-60"
                >
                  {passwordSaving ? "Mise à jour..." : "Mettre à jour le mot de passe"}
                </button>
              </div>
            </form>
          </div>

          <div className="rounded-[32px] border border-primary/10 bg-accent p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] sticky top-24">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-primary">Mon résumé</h3>
              <div className="h-10 w-10 rounded-2xl bg-primary/10" />
            </div>

            <p className="mt-2 text-sm leading-6 text-dark/60">
              Un aperçu rapide de vos avantages et de votre activité récente.
            </p>

            <div className="mt-7 space-y-4">
              <div className="rounded-3xl border border-primary/10 bg-secondary/10 p-5">
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

              <div className="rounded-3xl border border-primary/10 bg-secondary/10 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-primary/10 p-2 text-primary">
                      <ShoppingCart size={18} />
                    </div>
                    <span className="font-semibold text-dark">Articles panier</span>
                  </div>
                  <span className="text-2xl font-bold text-primary">{cartCount}</span>
                </div>
              </div>

              <div className="rounded-3xl border border-primary/10 bg-secondary/10 p-5">
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
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-dark px-6 py-4 font-semibold text-accent shadow-md transition duration-300 hover:scale-[1.01] hover:opacity-95"
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