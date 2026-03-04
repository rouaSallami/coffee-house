"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Gift, User, MapPin } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-dark text-primary px-6 py-3 z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* Logo + اسم القهوة */}
        <Link href="/" className="flex items-center gap-3 min-w-0">
          <Image
            src="/images/logo.jpg"
            alt="Coffee House Logo"
            width={55}
            height={55}
            className="object-contain rounded-full shrink-0"
          />

          <div className="text-white font-bold tracking-wide text-sm sm:text-lg leading-tight">
            <span className="block">Coffee</span>
            <span className="hidden lg:block">House</span>
            <span className="lg:hidden inline"> House</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10 font-semibold text-base">
          <Link href="/" className="hover:text-accent transition-colors">
            Acceuil
          </Link>

          <Link
            href="/nosCafes"
            className="hover:text-accent transition-colors"
          >
            Nos cafés
          </Link>

          <Link href="/aPropos" className="hover:text-accent transition-colors">
            A propos
          </Link>

          <Link href="/contact" className="hover:text-accent transition-colors">
            Contact
          </Link>

          <Link
            href="/avisClient"
            className="hover:text-accent transition-colors"
          >
            Avis client
          </Link>

          <Link
            href="/mes-recompenses"
            className="hover:text-accent transition-colors"
          >
            Mes récompenses
          </Link>
        </div>

        {/* Desktop Icons */}
        <div className="hidden lg:flex items-center gap-2">
          <Link
            href="/mes-recompenses"
            className="p-2 rounded-lg hover:bg-white/10 transition"
            title="Mes récompenses"
          >
            <Gift
              size={18}
              className="text-white/80 hover:text-accent transition-colors"
            />
          </Link>

          <Link
            href="/login"
            className="p-2 rounded-lg hover:bg-white/10 transition"
            title="Mon compte"
          >
            <User
              size={18}
              className="text-white/80 hover:text-accent transition-colors"
            />
          </Link>

          <Link
            href="/contact"
            className="p-2 rounded-lg hover:bg-white/10 transition"
            title="Localisation"
          >
            <MapPin
              size={18}
              className="text-white/80 hover:text-accent transition-colors"
            />
          </Link>
        </div>

        {/* Mobile / Tablet Button */}
        <button
          className="lg:hidden text-3xl text-white"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile & Tablet Dropdown */}
      {open && (
        <div
          className="absolute right-4 top-20 lg:hidden
          w-64 rounded-xl bg-accent/95 backdrop-blur
          shadow-lg ring-1 ring-dark/10 p-6"
        >
          <div className="flex flex-col gap-4 font-semibold text-dark">
            <Link href="/" onClick={() => setOpen(false)}>
              Acceuil
            </Link>

            <Link href="/nosCafes" onClick={() => setOpen(false)}>
              Nos cafés
            </Link>

            <Link href="/aPropos" onClick={() => setOpen(false)}>
              A propos
            </Link>

            <Link href="/contact" onClick={() => setOpen(false)}>
              Contact
            </Link>

            <Link href="/avisClient" onClick={() => setOpen(false)}>
              Avis client
            </Link>

            <Link href="/mes-recompenses" onClick={() => setOpen(false)}>
              Mes récompenses
            </Link>

            {/* Icons Row */}
            <div className="pt-4 mt-2 border-t border-dark/20 flex items-center gap-4">
              <Gift size={18} />
              <User size={18} />
              <MapPin size={18} />
            </div>
          </div>
        </div>
      )}
      <div className="m-1 h-[1px] w-full bg-gradient-to-r from-transparent via-accent to-transparent"></div>
    </nav>
  );
}
