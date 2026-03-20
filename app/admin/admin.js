"use client";

import { useEffect, useState } from "react";
import { coffees } from "../api/coffees/data";

export default function AdminDashboardPage() {
  const [lastOrder, setLastOrder] = useState(null);
  const [cafesCount, setCafesCount] = useState(0);
const [addonsCount, setAddonsCount] = useState(0);
const [ordersCount, setOrdersCount] = useState(0);
const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
  const order = JSON.parse(localStorage.getItem("lastOrder"));
  setLastOrder(order);

  setCafesCount(coffees.length);

  fetch("/api/addons")
    .then((res) => res.json())
    .then((data) => setAddonsCount(data.length))
    .catch(() => setAddonsCount(0));

  setOrdersCount(order ? 1 : 0);

  const user = JSON.parse(localStorage.getItem("user"));
  setUsersCount(user ? 1 : 0);
}, []);

  return (
    <div>
      {/* HEADER */}
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
          Administration
        </p>

        <h1 className="mt-2 text-4xl font-bold text-dark">
          Dashboard
        </h1>

        <p className="mt-3 text-dark/80">
          Bienvenue dans votre espace d’administration.
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid gap-5 mb-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-3xl border border-dark/10 bg-base p-6 shadow-sm">
          <p className="text-sm text-dark/60">Cafés</p>
          <p className="mt-2 text-2xl font-bold text-dark">{cafesCount}</p>
        </div>

        <div className="rounded-3xl border border-dark/10 bg-base p-6 shadow-sm">
          <p className="text-sm text-dark/60">Addons</p>
          <p className="mt-2 text-2xl font-bold text-dark">{addonsCount}</p>
        </div>

        <div className="rounded-3xl border border-dark/10 bg-base p-6 shadow-sm">
          <p className="text-sm text-dark/60">Commandes</p>
          <p className="mt-2 text-2xl font-bold text-dark">{ordersCount}</p>
        </div>

        <div className="rounded-3xl border border-dark/10 bg-base p-6 shadow-sm">
          <p className="text-sm text-dark/60">Utilisateurs</p>
          <p className="mt-2 text-2xl font-bold text-dark">{usersCount}</p>
        </div>
      </div>

      {/* DERNIERE COMMANDE */}
      <div className="mb-10 rounded-3xl border border-dark/10 bg-base p-8 shadow-sm">
  <h2 className="mb-6 text-xl font-bold text-dark">
    Dernière commande
  </h2>

  {!lastOrder ? (
    <p className="text-dark/60">Aucune commande.</p>
  ) : (
    <div className="grid md:grid-cols-2 gap-5">

      <div className="rounded-2xl border border-dark/10 bg-white/40 p-5">
        <p className="text-sm text-dark/60">Client</p>
        <p className="font-bold text-dark mt-1">
          {lastOrder.customer?.name}
        </p>
      </div>

      <div className="rounded-2xl border border-dark/10 bg-white/40 p-5">
        <p className="text-sm text-dark/60">ID</p>
        <p className="font-bold text-dark mt-1">
          #{lastOrder.id}
        </p>
      </div>

      <div className="rounded-2xl border border-dark/10 bg-white/40 p-5">
        <p className="text-sm text-dark/60">Total</p>
        <p className="font-bold text-primary mt-1">
          {lastOrder.total} DT
        </p>
      </div>

      <div className="rounded-2xl border border-dark/10 bg-white/40 p-5">
        <p className="text-sm text-dark/60">Statut</p>
        <p className="font-bold text-secondary mt-1">
          {lastOrder.status}
        </p>
      </div>

    </div>
  )}
</div>


<div className="mb-10 rounded-3xl border border-dark/10 bg-base p-8 shadow-sm">
  <h2 className="mb-6 text-xl font-bold text-dark">
    Actions rapides
  </h2>

  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <a
      href="/admin/cafes"
      className="rounded-2xl border border-dark/10 bg-white/40 p-5 transition hover:bg-white/60"
    >
      <p className="text-sm text-dark/60">Gestion</p>
      <p className="mt-2 text-lg font-bold text-dark">Cafés</p>
      <p className="mt-1 text-sm text-dark/70">
        Voir, ajouter et modifier les cafés
      </p>
    </a>

    <a
      href="/admin/addons"
      className="rounded-2xl border border-dark/10 bg-white/40 p-5 transition hover:bg-white/60"
    >
      <p className="text-sm text-dark/60">Gestion</p>
      <p className="mt-2 text-lg font-bold text-dark">Addons</p>
      <p className="mt-1 text-sm text-dark/70">
        Gérer les suppléments disponibles
      </p>
    </a>

    <a
      href="/admin/commandes"
      className="rounded-2xl border border-dark/10 bg-white/40 p-5 transition hover:bg-white/60"
    >
      <p className="text-sm text-dark/60">Suivi</p>
      <p className="mt-2 text-lg font-bold text-dark">Commandes</p>
      <p className="mt-1 text-sm text-dark/70">
        Consulter et suivre les commandes
      </p>
    </a>
  </div>
</div>


      {/* INFO BOX */}
      <div className="rounded-3xl border border-dark/10 bg-base p-8 shadow-sm">
        <p className="font-semibold text-dark">
          Dashboard en cours de construction...
        </p>

        <p className="mt-2 text-sm text-dark/60">
          Ici, vous allez voir les statistiques, les commandes récentes et les
          actions rapides.
        </p>
      </div>
    </div>
  );
}