"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  LayoutDashboard,
  Coffee,
  Croissant,
  ClipboardList,
  Users,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const links = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/cafes",
    label: "Cafés",
    icon: Coffee,
  },
  {
    href: "/admin/addons",
    label: "Addons",
    icon: Croissant,
  },
  {
    href: "/admin/commandes",
    label: "Commandes",
    icon: ClipboardList,
  },
  {
    href: "/admin/utilisateurs",
    label: "Utilisateurs",
    icon: Users,
  },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("user");

    window.dispatchEvent(new Event("authChanged"));
    window.dispatchEvent(new Event("cartUpdated"));
    window.dispatchEvent(new Event("favoritesUpdated"));
    window.dispatchEvent(new Event("orderUpdated"));

    setMobileMenuOpen(false);
    router.push("/login");
  };

  useEffect(() => {
    const isAuthenticated =
      sessionStorage.getItem("isAuthenticated") === "true";

    const user = JSON.parse(sessionStorage.getItem("user"));

    if (!isAuthenticated || user?.role !== "admin") {
      router.push("/login");
    } else {
      setChecked(true);
    }
  }, [router]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  if (!checked) return null;

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-accent text-dark">
      <div className="flex min-h-screen w-full overflow-x-hidden">
        <aside className="hidden w-72 shrink-0 flex-col border-r border-dark/10 bg-base/80 p-6 backdrop-blur-md lg:flex">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              Coffee House
            </p>

            <h2 className="mt-2 text-3xl font-bold text-dark">
              Admin Panel
            </h2>

            <p className="mt-2 text-sm leading-6 text-dark/70">
              Gérez les cafés, les addons, les commandes et les utilisateurs.
            </p>
          </div>

          <nav className="flex flex-col gap-2">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive =
                pathname === link.href ||
                (link.href !== "/admin" && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-primary text-white shadow-sm"
                      : "text-dark/75 hover:bg-white/60 hover:text-dark"
                  }`}
                >
                  <Icon size={18} />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto space-y-4">
            <div className="rounded-3xl border border-dark/10 bg-white/40 p-5 shadow-sm">
              <p className="text-sm font-semibold text-dark">
                Espace administration
              </p>

              <p className="mt-2 text-sm leading-6 text-dark/65">
                Utilisez ce panneau pour gérer le contenu avant le branchement
                backend.
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
            >
              <LogOut size={16} />
              Déconnexion
            </button>
          </div>
        </aside>

        <div className="flex min-h-screen min-w-0 flex-1 flex-col overflow-x-hidden">
          <div className="sticky top-0 z-40 flex items-center justify-between border-b border-dark/10 bg-base/80 px-4 py-4 backdrop-blur-md lg:hidden">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">
                Coffee House
              </p>
              <h2 className="mt-1 text-xl font-bold text-dark">Admin Panel</h2>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-dark/10 bg-white/80 text-dark transition hover:bg-white"
              aria-label="Ouvrir le menu"
            >
              <Menu size={20} />
            </button>
          </div>

          {mobileMenuOpen && (
            <div
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
          )}

          <div
            className={`fixed inset-y-0 left-0 z-50 w-[85%] max-w-xs transform border-r border-dark/10 bg-base p-5 shadow-xl transition-transform duration-300 lg:hidden ${
              mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary">
                  Coffee House
                </p>
                <h2 className="mt-1 text-2xl font-bold text-dark">
                  Admin Panel
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-dark/10 bg-white text-dark transition hover:bg-base"
                aria-label="Fermer le menu"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="mt-8 flex flex-col gap-2">
              {links.map((link) => {
                const Icon = link.icon;
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/admin" && pathname.startsWith(link.href));

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                      isActive
                        ? "bg-primary text-white shadow-sm"
                        : "text-dark/75 hover:bg-white/60 hover:text-dark"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-8 space-y-4">
              <div className="rounded-3xl border border-dark/10 bg-white/40 p-4 shadow-sm">
                <p className="text-sm font-semibold text-dark">
                  Espace administration
                </p>

                <p className="mt-2 text-sm leading-6 text-dark/65">
                  Utilisez ce panneau pour gérer le contenu avant le branchement
                  backend.
                </p>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
              >
                <LogOut size={16} />
                Déconnexion
              </button>
            </div>
          </div>

          <main className="flex-1 w-full min-w-0 overflow-x-hidden px-3 py-5 sm:px-5 lg:px-8 lg:py-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}