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
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  

  const handleLogout = () => {
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("user");

  window.dispatchEvent(new Event("authChanged"));
  window.dispatchEvent(new Event("cartUpdated"));
  window.dispatchEvent(new Event("favoritesUpdated"));
  window.dispatchEvent(new Event("orderUpdated"));

  router.push("/login");
};

  useEffect(() => {
    const isAuthenticated =
      localStorage.getItem("isAuthenticated") === "true";

    const user = JSON.parse(localStorage.getItem("user"));

    if (!isAuthenticated || user?.role !== "admin") {
      router.push("/login");
    } else {
      setChecked(true);
    }
  }, [router]);

  if (!checked) return null;

  return (
    <div className="min-h-screen bg-accent text-dark">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 flex-col border-r border-dark/10 bg-base/80 p-6 backdrop-blur-md lg:flex">
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

        <div className="flex min-h-screen flex-1 flex-col">
          <div className="sticky top-0 z-30 border-b border-dark/10 bg-base/80 px-5 py-4 backdrop-blur-md lg:hidden">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              Coffee House
            </p>
            <h2 className="mt-1 text-xl font-bold text-dark">Admin Panel</h2>
          </div>

          <div className="border-b border-dark/10 bg-base/70 px-4 py-3 backdrop-blur-md lg:hidden">
  <div className="flex gap-2 overflow-x-auto">
    {links.map((link) => {
      const Icon = link.icon;
      const isActive =
        pathname === link.href ||
        (link.href !== "/admin" && pathname.startsWith(link.href));

      return (
        <Link
          key={link.href}
          href={link.href}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition ${
            isActive
              ? "bg-primary text-white"
              : "border border-dark/10 bg-white/70 text-dark"
          }`}
        >
          <Icon size={16} />
          {link.label}
        </Link>
      );
    })}

    <button
  type="button"
  onClick={handleLogout}
  className="inline-flex items-center justify-center rounded-full border border-red-200 bg-white/70 p-2 text-red-600 transition hover:bg-red-50"
>
  <LogOut size={16} />
</button>
  </div>
</div>

          

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}