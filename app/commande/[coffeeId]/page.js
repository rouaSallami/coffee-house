"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { Check, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { getUserData, setUserData } from "../../lib/storage";

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

export default function CoffeeOrderPage() {
  const { coffeeId } = useParams();
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

  const containers = ["Gobelet", "Verre", "Cup recyclable"];

  const milkOptions = useMemo(
    () => coffee?.milkOptions || ["Normal", "Amande", "Avoine", "Sans lactose"],
    [coffee]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [coffeeRes, addonsRes] = await Promise.all([
          fetch("/api/coffees"),
          fetch("/api/addons"),
        ]);

        if (!coffeeRes.ok || !addonsRes.ok) {
          throw new Error("Erreur lors du chargement des données");
        }

        const coffees = await coffeeRes.json();
        const addonsData = await addonsRes.json();

        const foundCoffee = coffees.find(
          (item) => String(item.id) === String(coffeeId)
        );

        setCoffee(foundCoffee || null);
        setAddonsList(addonsData || []);
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

    const exists = addons.find((a) => a.id === addon.id);

    if (exists) {
      setAddons(addons.filter((a) => a.id !== addon.id));
    } else {
      setAddons([...addons, addon]);
    }
  };

  const addonsTotal = addons.reduce((sum, a) => sum + a.price, 0);
  const totalPrice = (size?.price || 0) + addonsTotal;

  const canGoNext =
    (step === 1 && size) ||
    (step === 2 && milk) ||
    (step === 3 && container) ||
    step === 4 ||
    step === 5 ||
    step === 6;

  const handleAddToCart = () => {
    const cartItem = {
      id: Date.now(),
      coffeeId: coffee.id,
      coffeeName: coffee.name,
      image: coffee.image,
      size,
      milk,
      container,
      sugar,
      addons,
      note,
      totalPrice,
      qty: 1,
    };

    const existingCart = getUserData("cart", []);
    const updatedCart = [...existingCart, cartItem];

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
              src={coffee.image}
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

  if (loading || !coffee) {
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
            Prix actuel: <span className="font-semibold text-primary">{totalPrice.toFixed(2)} DT</span>
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
              {coffee.sizes.map((s) => (
                <button
                  key={s.key}
                  onClick={() => setSize(s)}
                  className={`rounded-[28px] border p-6 text-center shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 ${
                    size?.key === s.key
                      ? "border-primary/20 bg-primary text-white"
                      : "border-dark/10 bg-white/30 text-dark hover:bg-white/40"
                  }`}
                >
                  <p className="text-2xl font-bold">{s.label}</p>
                  <p className="mt-2 text-sm opacity-80">{s.price} DT</p>
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
              {containers.map((item) => (
                <button
                  key={item}
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
              <p className="mt-3 text-dark/70">
                {sugar === 0 && "Sans sucre"}
                {sugar > 0 && sugar <= 25 && "Peu sucré"}
                {sugar > 25 && sugar <= 50 && "Sucre moyen"}
                {sugar > 50 && sugar <= 75 && "Assez sucré"}
                {sugar > 75 && "Très sucré"}
              </p>
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
              <p className="text-center text-dark/70">Chargement des extras...</p>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {addonsList.map((addon) => {
                  const selected = addons.some((a) => a.id === addon.id);

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
                <span className="text-right">{size?.label}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span>Lait</span>
                <span className="text-right">{milk}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span>Contenant</span>
                <span className="text-right">{container}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span>Sucre</span>
                <span className="text-right">{sugar}%</span>
              </div>

              <div className="flex justify-between gap-4">
                <span>Extras</span>
                <span className="text-right">
                  {addons.length > 0
                    ? addons.map((a) => a.name).join(", ")
                    : "Aucun"}
                </span>
              </div>

              {note && (
                <div className="flex justify-between gap-4">
                  <span>Note</span>
                  <span className="text-right">{note}</span>
                </div>
              )}

              <div className="flex justify-between border-t border-dark/10 pt-4 text-lg font-bold text-accent">
                <span>Total</span>
                <span>{totalPrice} DT</span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="inline-flex items-center gap-2 rounded-2xl border border-dark/15 bg-white/40 px-6 py-3 font-semibold text-dark transition hover:bg-white/55"
            >
              <ChevronLeft size={18} />
              Retour
            </button>
          )}

          {step === 5 && (
            <button
              onClick={() => setStep(6)}
              className="rounded-2xl border border-dark/15 bg-white/40 px-6 py-3 font-semibold text-dark transition hover:bg-white/55"
            >
              Ignorer
            </button>
          )}

          {step < 7 && (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canGoNext}
              className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 font-semibold text-white shadow-md transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Suivant
              <ChevronRight size={18} />
            </button>
          )}

          {step === 7 && (
            <button
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