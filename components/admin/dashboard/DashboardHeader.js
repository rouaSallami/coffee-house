import Link from "next/link";
import { Plus, ArrowRight } from "lucide-react";

export default function DashboardHeader() {
  return (
    <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
          Administration
        </p>

        <h1 className="mt-2 text-3xl font-bold text-dark sm:text-4xl">
          Dashboard
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-dark/80">
          Vue d’ensemble de votre activité et des données principales.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/admin/cafes"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95"
        >
          <Plus size={18} />
          Ajouter un café
        </Link>

        <Link
          href="/admin/commandes"
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-dark/10 bg-base px-5 py-3 text-sm font-semibold text-dark transition hover:bg-white"
        >
          Voir les commandes
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}