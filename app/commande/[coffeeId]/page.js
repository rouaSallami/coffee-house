"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { Check, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { getUserData, setUserData } from "../../lib/storage";
import { API_BASE_URL } from "../../../lib/api/config";

const STEP_TITLES = {
  1: "Choisir la taille",
  2: "Choisir le lait",
  3: "Choisir le contenant",
  4: "Choisir le niveau de sucre",
  5: "Choisir vos extras",
  6: "Ajouter une note",
  7: "Résumé de votre commande",
};

const STEP_DESCRIPTIONS = {
  1: "Sélectionnez la taille de votre café avant de passer à l’étape suivante.",
  2: "Choisissez le type de lait qui vous convient.",
  3: "Choisissez le contenant qui vous convient.",
  4: "Choisissez le niveau de sucre souhaité.",
  5: "Ajoutez des extras pour personnaliser votre café.",
  6: "Ajoutez une note si vous avez une demande particulière.",
  7: "Vérifiez les détails de votre commande avant de confirmer.",
};

const CONTAINERS = ["Gobelet", "Verre", "Cup recyclable"];

function normalizeSizes(rawSizes = []) {
  return rawSizes.map((item, index) => ({
    id: item.id ?? index + 1,
    key: item.key ?? item.id ?? index + 1,
    label: item.label ?? item.name ?? `Taille ${index + 1}`,
    price: Number(item.price ?? 0),
  }));
}

function normalizeCoffee(rawCoffee) {
  if (!rawCoffee) return null;

  return {
    ...rawCoffee,
    image: rawCoffee.image || "/images/placeholder-coffee.png",
    sizes: normalizeSizes(rawCoffee.sizes || []),
    milkOptions:
      rawCoffee.milkOptions && Array.isArray(rawCoffee.milkOptions)
        ? rawCoffee.milkOptions
        : ["Normal", "Amande", "Avoine", "Sans lactose"],
  };
}

function normalizeAddons(rawAddons = []) {
  return rawAddons.map((addon, index) => ({
    id: addon.id ?? index + 1,
    name: addon.name ?? "Extra",
    image: addon.image || "/images/placeholder-addon.png",
    price: Number(addon.price ?? 0),
    available: Boolean(Number(addon.available)),
  }));
}

function getSugarLabel(value) {
  if (value === 0) return "Sans sucre";
  if (value > 0 && value <= 25) return "Peu sucré";
  if (value > 25 && value <= 50) return "Sucre moyen";
  if (value > 50 && value <= 75) return "Assez sucré";
  return "Très sucré";
}

export default function CoffeeOrderPage() {
  const params = useParams();
  const coffeeId = params?.coffeeId;
  const router = useRouter();

  const [coffee, setCoffee] = useState(null);
  const [size, setSize] = useState(null);
  const [milk, setMilk] = useState(null);
  const [container, setContainer] = useState(null);
  const [step, setStep] = useState(1);
  const [sugar, setSugar] = useState(50);
  const [addons, setAddons] = useState([]);
  const [addonsList, setAddonsList] = useState([]);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);

  const milkOptions = useMemo(() => {
    return coffee?.milkOptions || ["Normal", "Amande", "Avoine", "Sans lactose"];
  }, [coffee]);

  useEffect(() => {
    if (!coffeeId) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        const [coffeeRes, addonsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/coffees`, {
            headers: { Accept: "application/json" },
          }),
          fetch(`${API_BASE_URL}/addons`, {
            headers: { Accept: "application/json" },
          }),
        ]);

        if (!coffeeRes.ok || !addonsRes.ok) {
          throw new Error("Erreur lors du chargement des données");
        }

        const coffeesData = await coffeeRes.json();
        const addonsData = await addonsRes.json();

        const coffees = Array.isArray(coffeesData)
          ? coffeesData
          : Array.isArray(coffeesData?.data)
          ? coffeesData.data
          : [];

        const rawAddons = Array.isArray(addonsData)
          ? addonsData
          : Array.isArray(addonsData?.data)
          ? addonsData.data
          : [];

        const foundCoffee = coffees.find(
          (item) => String(item.id) === String(coffeeId)
        );

        const normalizedCoffee = normalizeCoffee(foundCoffee);
        const normalizedAddons = normalizeAddons(rawAddons);

        setCoffee(normalizedCoffee);
        setAddonsList(normalizedAddons);

        if (normalizedCoffee?.sizes?.length > 0) {
          setSize(normalizedCoffee.sizes[0]);
        }
      } catch (error) {
        console.error(error);
        toast.error("Impossible de charger ce café");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [coffeeId]);

  const toggleAddon = (addon) => {
    if (!addon.available) return;

    const exists = addons.some((item) => item.id === addon.id);

    if (exists) {
      setAddons((prev) => prev.filter((item) => item.id !== addon.id));
    } else {
      setAddons((prev) => [...prev, addon]);
    }
  };

  const addonsTotal = addons.reduce((sum, item) => sum + Number(item.price || 0), 0);
  const totalPrice = Number((Number(size?.price || 0) + addonsTotal).toFixed(2));

  const canGoNext =
    (step === 1 && !!size) ||
    (step === 2 && !!milk) ||
    (step === 3 && !!container) ||
    step === 4 ||
    step === 5 ||
    step === 6;

  const handleNext = () => {
    if (step < 7 && canGoNext) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
  if (!coffee || !size || !milk || !container) {
    toast.error("Veuillez compléter votre commande");
    return;
  }

  const normalizedAddons = [...addons]
    .map((item) => ({
      id: item.id,
      name: item.name,
      price: Number(item.price || 0),
      image: item.image || null,
    }))
    .sort((a, b) => a.id - b.id);

  const cartItem = {
    id: Date.now(),
    coffeeId: coffee.id,
    coffeeName: coffee.name,
    image: coffee.image,
    size: {
      id: size.id,
      key: size.key,
      label: size.label,
      price: Number(size.price || 0),
    },
    milk,
    container,
    sugar,
    addons: normalizedAddons,
    note: note.trim(),
    totalPrice,
    qty: 1,
  };

  const existingCart = getUserData("cart", []);
  const safeCart = Array.isArray(existingCart) ? existingCart : [];

  const existingItemIndex = safeCart.findIndex((item) => {
    const currentAddons = Array.isArray(item.addons)
      ? [...item.addons]
          .map((addon) => addon.id)
          .sort((a, b) => a - b)
          .join("-")
      : "";

    const newAddons = normalizedAddons
      .map((addon) => addon.id)
      .sort((a, b) => a - b)
      .join("-");

    return (
      item.coffeeId === cartItem.coffeeId &&
      item.size?.label === cartItem.size.label &&
      item.milk === cartItem.milk &&
      item.container === cartItem.container &&
      Number(item.sugar) === Number(cartItem.sugar) &&
      (item.note || "").trim() === cartItem.note &&
      currentAddons === newAddons
    );
  });

  let updatedCart = [];

  if (existingItemIndex !== -1) {
    updatedCart = [...safeCart];
    updatedCart[existingItemIndex] = {
      ...updatedCart[existingItemIndex],
      qty: Number(updatedCart[existingItemIndex].qty || 1) + 1,
    };
  } else {
    updatedCart = [...safeCart, cartItem];
  }

  setUserData("cart", updatedCart);
  window.dispatchEvent(new Event("cartUpdated"));

  toast.custom(
    (t) => (
      <div
        className={`flex items-center gap-4 rounded-2xl border border-dark/10 bg-white p-4 shadow-lg transition ${
          t.visible ? "animate-enter" : "animate-leave"
        }`}
      >
        <div className="relative h-14 w-14 overflow-hidden rounded-xl">
          <Image
            src={coffee.image || "/images/placeholder-coffee.png"}
            alt={coffee.name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <p className="font-semibold text-dark">{coffee.name}</p>
          <p className="text-sm text-dark/60">Ajouté au panier 🛒</p>
        </div>
      </div>
    ),
    { duration: 1800 }
  );

  setTimeout(() => {
    router.push("/panier");
  }, 700);
};

  if (loading) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-secondary pt-20 text-dark">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_45%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary to-secondary/80" />

        <div className="relative mx-auto max-w-5xl px-6 py-8 md:py-10">
          <div className="rounded-[30px] border border-dark/10 bg-white/30 p-10 text-center shadow-xl backdrop-blur-md">
            <p className="text-lg font-medium text-dark/80">Chargement...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!coffee) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-secondary pt-20 text-dark">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_45%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary to-secondary/80" />

        <div className="relative mx-auto max-w-5xl px-6 py-8 md:py-10">
          <div className="rounded-[30px] border border-dark/10 bg-white/30 p-10 text-center shadow-xl backdrop-blur-md">
            <p className="text-lg font-medium text-dark/80">Café introuvable.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-secondary pt-18 text-dark">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_45%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary to-secondary/80" />

      <div className="relative mx-auto max-w-5xl px-6 py-8 md:py-10">
        <div className="mb-8 text-center md:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-dark/10 bg-white/45 px-4 py-2 shadow-sm backdrop-blur-sm">
            <Sparkles size={14} className="text-primary" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-dark/70">
              Personnalisation
            </span>
          </div>

          <h1 className="mt-4 text-4xl font-bold text-dark font-heading md:text-5xl">
            {STEP_TITLES[step]}
          </h1>

          <p className="mx-auto mt-3 max-w-2xl leading-7 text-dark/75">
            {STEP_DESCRIPTIONS[step]}
          </p>
        </div>

        <div className="mb-8 rounded-[30px] border border-dark/10 bg-white/30 p-5 text-center shadow-xl backdrop-blur-md md:p-6">
          <h2 className="text-2xl font-bold text-marron">{coffee.name}</h2>
          <p className="mt-2 text-dark/80">
            Prix actuel:{" "}
            <span className="font-semibold text-primary">
              {totalPrice.toFixed(2)} DT
            </span>
          </p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {[1, 2, 3, 4, 5, 6, 7].map((n) => (
            <div
              key={n}
              className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold shadow-sm ${
                step >= n
                  ? "bg-primary text-white"
                  : "border border-dark/10 bg-white/50 text-dark/50"
              }`}
            >
              {step > n ? <Check size={16} /> : n}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="mx-auto max-w-2xl">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {coffee.sizes.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setSize(item)}
                  className={`rounded-[28px] border p-6 text-center shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 ${
                    size?.key === item.key
                      ? "border-primary/20 bg-primary text-white"
                      : "border-dark/10 bg-white/30 text-dark hover:bg-white/40"
                  }`}
                >
                  <p className="text-2xl font-bold">{item.label}</p>
                  <p className="mt-2 text-sm opacity-80">{item.price} DT</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="mx-auto max-w-2xl">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {milkOptions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setMilk(item)}
                  className={`rounded-[28px] border p-6 text-center shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 ${
                    milk === item
                      ? "border-primary/20 bg-primary text-white"
                      : "border-dark/10 bg-white/30 text-dark hover:bg-white/40"
                  }`}
                >
                  <p className="text-2xl font-bold">{item}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="mx-auto max-w-2xl">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {CONTAINERS.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setContainer(item)}
                  className={`rounded-[28px] border p-6 text-center shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 ${
                    container === item
                      ? "border-primary/20 bg-primary text-white"
                      : "border-dark/10 bg-white/30 text-dark hover:bg-white/40"
                  }`}
                >
                  <p className="text-xl font-bold">{item}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="mx-auto max-w-2xl rounded-[30px] border border-dark/10 bg-white/30 p-8 shadow-xl backdrop-blur-md">
            <div className="text-center">
              <p className="text-lg font-semibold text-dark/90">Niveau de sucre</p>
              <p className="mt-3 text-dark/70">{getSugarLabel(sugar)}</p>
            </div>

            <div className="mt-8">
              <input
                type="range"
                min="0"
                max="100"
                step="25"
                value={sugar}
                onChange={(e) => setSugar(Number(e.target.value))}
                className="w-full accent-[var(--secondary)]"
              />

              <div className="mt-3 flex justify-between text-sm text-dark/60">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="mx-auto max-w-3xl">
            {addonsList.length === 0 ? (
              <p className="text-center text-dark/70">Aucun extra disponible.</p>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {addonsList.map((addon) => {
                  const selected = addons.some((item) => item.id === addon.id);

                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon)}
                      disabled={!addon.available}
                      className={`relative rounded-[28px] border p-5 text-center shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 ${
                        !addon.available
                          ? "cursor-not-allowed border-dark/10 bg-white/20 text-dark/50 opacity-70"
                          : selected
                          ? "border-primary/20 bg-primary text-white"
                          : "border-dark/10 bg-white/30 text-dark hover:bg-white/40"
                      }`}
                    >
                      {!addon.available && (
                        <span className="absolute left-4 top-4 z-10 rounded-full bg-gray-600 px-3 py-1 text-xs font-semibold text-white shadow-md">
                          Indisponible
                        </span>
                      )}

                      <div className="relative mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border border-dark/5">
                        <Image
                          src={addon.image}
                          alt={addon.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <p className="text-lg font-bold">{addon.name}</p>
                      <p className="mt-1 text-sm opacity-80">+ {addon.price} DT</p>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {step === 6 && (
          <div className="mx-auto max-w-2xl rounded-[30px] border border-dark/10 bg-white/30 p-8 shadow-xl backdrop-blur-md">
            <p className="mb-4 font-semibold text-dark/90">
              Ajouter une note à votre commande
            </p>

            <textarea
              placeholder="Ex: sans mousse, très chaud..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="h-32 w-full resize-none rounded-xl border border-dark/10 bg-white/45 p-4 text-black/80 placeholder:text-dark/45 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        )}

        {step === 7 && (
          <div className="mx-auto max-w-2xl rounded-[30px] border border-dark/10 bg-white/30 p-8 shadow-xl backdrop-blur-md">
            <h3 className="mb-6 text-xl font-bold text-accent">
              Résumé de votre commande
            </h3>

            <div className="space-y-3 text-dark">
              <div className="flex justify-between gap-4">
                <span>Café</span>
                <span className="text-right font-semibold text-primary">
                  {coffee.name}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span>Taille</span>
                <span className="text-right">{size?.label || "-"}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span>Lait</span>
                <span className="text-right">{milk || "-"}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span>Contenant</span>
                <span className="text-right">{container || "-"}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span>Sucre</span>
                <span className="text-right">{sugar}%</span>
              </div>

              <div className="flex justify-between gap-4">
                <span>Extras</span>
                <span className="text-right">
                  {addons.length > 0 ? addons.map((item) => item.name).join(", ") : "Aucun"}
                </span>
              </div>

              {note.trim() && (
                <div className="flex justify-between gap-4">
                  <span>Note</span>
                  <span className="text-right">{note.trim()}</span>
                </div>
              )}

              <div className="flex justify-between border-t border-dark/10 pt-4 text-lg font-bold text-accent">
                <span>Total</span>
                <span>{totalPrice.toFixed(2)} DT</span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {step > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-2 rounded-2xl border border-dark/15 bg-white/40 px-6 py-3 font-semibold text-dark transition hover:bg-white/55"
            >
              <ChevronLeft size={18} />
              Retour
            </button>
          )}

          {step === 5 && (
            <button
              type="button"
              onClick={() => setStep(6)}
              className="rounded-2xl border border-dark/15 bg-white/40 px-6 py-3 font-semibold text-dark transition hover:bg-white/55"
            >
              Ignorer
            </button>
          )}

          {step < 7 && (
            <button
              type="button"
              onClick={handleNext}
              disabled={!canGoNext}
              className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 font-semibold text-white shadow-md transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Suivant
              <ChevronRight size={18} />
            </button>
          )}

          {step === 7 && (
            <button
              type="button"
              onClick={handleAddToCart}
              className="rounded-2xl bg-primary px-6 py-3 font-semibold text-white shadow-md transition hover:opacity-95"
            >
              Ajouter au panier
            </button>
          )}
        </div>
      </div>
    </div>
  );
}