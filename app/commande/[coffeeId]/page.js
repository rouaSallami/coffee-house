"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CoffeeOrderPage() {
  const { coffeeId } = useParams();

  const [coffee, setCoffee] = useState(null);
  const [size, setSize] = useState(null);
  const [milk, setMilk] = useState(null);
  const [container, setContainer] = useState(null);
  const [step, setStep] = useState(1);
  const [sugar, setSugar] = useState(50);
  const [addons, setAddons] = useState([]);
  const [addonsList, setAddonsList] = useState([]);
  const [note, setNote] = useState("");
  const router = useRouter();

  const containers = ["Gobelet", "Verre", "Cup recyclable"];

  const toggleAddon = (addon) => {
    const exists = addons.find((a) => a.id === addon.id);

    if (exists) {
      setAddons(addons.filter((a) => a.id !== addon.id));
    } else {
      setAddons([...addons, addon]);
    }
  };

  useEffect(() => {
    fetch("/api/addons")
      .then((res) => res.json())
      .then((data) => {
        const extrasOnly = data.map((item) => ({
          ...item,
          price: 3,
        }));
        setAddonsList(extrasOnly);
      });
  }, []);

  useEffect(() => {
    fetch("/api/coffees")
      .then((res) => res.json())
      .then((data) => {
        const c = data.find((item) => String(item.id) === String(coffeeId));
        setCoffee(c);
      });
  }, [coffeeId]);

  if (!coffee) {
    return (
      <div className="relative min-h-screen mt-16 overflow-hidden bg-secondary text-dark">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_45%)]" />
        <div className="absolute inset-0 bg-linear-to-b from-secondary via-secondary to-secondary/80" />

        <div className="relative max-w-5xl mx-auto px-6 py-16">
          <div className="rounded-3xl border border-dark/10 bg-white/30 backdrop-blur-md shadow-xl p-10 text-center">
            <p className="text-dark/80 text-lg font-medium">Chargement...</p>
          </div>
        </div>
      </div>
    );
  }

  const addonsTotal = addons.reduce((sum, a) => sum + a.price, 0);
  const totalPrice = (size?.price || 0) + addonsTotal;

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

  const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
  existingCart.push(cartItem);
  localStorage.setItem("cart", JSON.stringify(existingCart));
  window.dispatchEvent(new Event("cartUpdated"));

  toast.custom((t) => (
  <div
    className={`flex items-center gap-4 bg-white shadow-lg rounded-2xl p-4 border border-dark/10 transition ${
      t.visible ? "animate-enter" : "animate-leave"
    }`}
  >
    {/* Image */}
    <div className="w-14 h-14 relative rounded-xl overflow-hidden">
      <Image
        src={coffee.image}
        alt={coffee.name}
        fill
        className="object-cover"
      />
    </div>

    {/* Text */}
    <div className="flex flex-col">
      <p className="font-semibold text-dark">
        {coffee.name}
      </p>
      <p className="text-sm text-dark/60">
        Ajouté au panier 🛒
      </p>
    </div>
  </div>
), { duration: 2000 });

  setTimeout(() => {
  router.push("/panier");
}, 800);
};

  return (
    <div className="relative min-h-screen mt-16 overflow-hidden bg-secondary text-dark">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_45%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary to-secondary/80" />

      <div className="relative max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-dark/70 text-sm font-semibold uppercase tracking-[0.2em]">
            Personnalisation
          </p>

          <h1 className="text-4xl font-bold text-dark mt-3 font-heading">
            {step === 1 && "Choisir la taille"}
            {step === 2 && "Choisir le lait"}
            {step === 3 && "Choisir le contenant"}
            {step === 4 && "Choisir le niveau de sucre"}
            {step === 5 && "Choisir vos extras"}
            {step === 6 && "Ajouter une note"}
            {step === 7 && "Résumé de votre commande"}
          </h1>

          <p className="text-dark/75 mt-4 max-w-2xl mx-auto leading-7">
            {step === 1 &&
              "Sélectionnez la taille de votre café avant de passer à l’étape suivante."}
            {step === 2 &&
              "Choisissez le type de lait qui vous convient."}
            {step === 3 &&
              "Choisissez le contenant qui vous convient."}
            {step === 4 &&
              "Choisissez le niveau de sucre souhaité."}
            {step === 5 &&
              "Ajoutez des extras pour personnaliser votre café."}
            {step === 6 &&
              "Ajoutez une note si vous avez une demande particulière."}
            {step === 7 &&
              "Vérifiez les détails de votre commande avant de confirmer."}
          </p>
        </div>

        {/* Coffee Info */}
        <div className="rounded-3xl p-6 shadow-xl border border-dark/10 bg-white/30 backdrop-blur-md mb-10 text-center">
          <h2 className="text-2xl font-bold text-marron">{coffee.name}</h2>
          <p className="text-dark/80 mt-2">
            {step === 1 && "Choisissez la taille qui vous convient."}
            {step === 2 && "Choisissez le lait pour votre café."}
            {step === 3 && "Choisissez le contenant pour votre commande."}
            {step === 4 && "Définissez votre niveau de sucre."}
            {step === 5 && "Sélectionnez les extras que vous préférez."}
            {step === 6 && "Ajoutez une précision si nécessaire."}
            {step === 7 && "Voici le récapitulatif final de votre commande."}
          </p>
        </div>

        {/* Step 1: Sizes */}
        {step === 1 && (
          <>
            <div className="flex justify-center mt-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl w-full">
                {coffee.sizes.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setSize(s)}
                    className={`rounded-3xl border p-6 text-center transition shadow-lg backdrop-blur-md ${
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

            {size && (
              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => setStep(2)}
                  className="rounded-2xl bg-primary text-white px-6 py-3 font-semibold transition hover:opacity-95 shadow-md"
                >
                  Suivant
                </button>
              </div>
            )}
          </>
        )}

        {/* Step 2: Milk */}
        {step === 2 && (
          <>
            <div className="flex justify-center mt-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl w-full">
                {(coffee.milkOptions || ["Normal", "Amande", "Avoine", "Sans lactose"]).map((item) => (
                  <button
                    key={item}
                    onClick={() => setMilk(item)}
                    className={`rounded-3xl border p-6 text-center transition shadow-lg backdrop-blur-md ${
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

            <div className="mt-10 flex justify-center gap-4">
              <button
                onClick={() => setStep(1)}
                className="rounded-2xl border border-dark/15 bg-white/40 text-dark px-6 py-3 font-semibold transition hover:bg-white/55"
              >
                Retour
              </button>

              {milk && (
                <button
                  onClick={() => setStep(3)}
                  className="rounded-2xl bg-primary text-white px-6 py-3 font-semibold transition hover:opacity-95 shadow-md"
                >
                  Suivant
                </button>
              )}
            </div>
          </>
        )}

        {/* Step 3: Contenant */}
        {step === 3 && (
          <>
            <div className="flex justify-center mt-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl w-full">
                {containers.map((item) => (
                  <button
                    key={item}
                    onClick={() => setContainer(item)}
                    className={`rounded-3xl border p-6 text-center transition shadow-lg backdrop-blur-md ${
                      container === item
                        ? "border-primary/20 bg-primary text-white"
                        : "border-dark/10 bg-white/30 text-dark hover:bg-white/40"
                    }`}
                  >
                    <p className="text-2xl font-bold">{item}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 flex justify-center gap-4">
              <button
                onClick={() => setStep(2)}
                className="rounded-2xl border border-dark/15 bg-white/40 text-dark px-6 py-3 font-semibold transition hover:bg-white/55"
              >
                Retour
              </button>

              {container && (
                <button
                  onClick={() => setStep(4)}
                  className="rounded-2xl bg-primary text-white px-6 py-3 font-semibold transition hover:opacity-95 shadow-md"
                >
                  Suivant
                </button>
              )}
            </div>
          </>
        )}

        {/* Step 4: Sugar */}
        {step === 4 && (
          <>
            <div className="flex justify-center mt-10">
              <div className="rounded-3xl p-8 shadow-xl border border-dark/10 bg-white/30 backdrop-blur-md w-full max-w-2xl">
                <div className="text-center">
                  <p className="text-dark/90 text-lg font-semibold">
                    Niveau de sucre
                  </p>

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

                  <div className="flex justify-between mt-3 text-sm text-dark/60">
                    <span>0%</span>
                    <span>25%</span>
                    <span>50%</span>
                    <span>75%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 flex justify-center gap-4">
              <button
                onClick={() => setStep(3)}
                className="rounded-2xl border border-dark/15 bg-white/40 text-dark px-6 py-3 font-semibold transition hover:bg-white/55"
              >
                Retour
              </button>

              <button
                onClick={() => setStep(5)}
                className="rounded-2xl bg-primary text-white px-6 py-3 font-semibold transition hover:opacity-95 shadow-md"
              >
                Suivant
              </button>
            </div>
          </>
        )}

        {/* Step 5: Extras */}
        {step === 5 && (
          <>
            <div className="flex justify-center mt-10">
              {addonsList.length === 0 ? (
                <p className="text-dark/70">Chargement des extras...</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-3xl w-full">
                  {addonsList.map((addon) => {
                    const selected = addons.some((a) => a.id === addon.id);

                    return (
                      <button
                        key={addon.id}
                        onClick={() => toggleAddon(addon)}
                        className={`rounded-3xl border p-6 text-center transition shadow-lg backdrop-blur-md ${
                          selected
                            ? "border-primary/20 bg-primary text-white"
                            : "border-dark/10 bg-white/30 text-dark hover:bg-white/40"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-1">
                          <div className="relative w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden border border-dark/5">
                            <Image
                              src={addon.image}
                              alt={addon.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <p className="text-xl font-bold">{addon.name}</p>

                          <p className="text-sm opacity-80">
                            + {addon.price} DT
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setStep(4)}
                className="rounded-2xl border border-dark/15 bg-white/40 text-dark px-6 py-3 font-semibold transition hover:bg-white/55"
              >
                Retour
              </button>

              <button
                onClick={() => setStep(6)}
                className="rounded-2xl border border-dark/15 bg-white/40 text-dark px-6 py-3 font-semibold transition hover:bg-white/55"
              >
                Ignorer
              </button>

              <button
                onClick={() => setStep(6)}
                className="rounded-2xl bg-primary text-white px-6 py-3 font-semibold transition hover:opacity-95 shadow-md"
              >
                Suivant
              </button>
            </div>
          </>
        )}

        {/* Step 6: Note */}
        {step === 6 && (
          <>
            <div className="flex justify-center mt-10">
              <div className="rounded-3xl p-8 shadow-xl border border-dark/10 bg-white/30 backdrop-blur-md w-full max-w-2xl">
                <p className="text-dark/90 font-semibold mb-4">
                  Ajouter une note à votre commande
                </p>

                <textarea
                  placeholder="Ex: sans mousse, très chaud..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full h-32 p-4 rounded-xl border border-dark/10 bg-white/45 text-black/80 placeholder:text-dark/45 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>
            </div>

            <div className="mt-10 flex justify-center gap-4">
              <button
                onClick={() => setStep(5)}
                className="rounded-2xl border border-dark/15 bg-white/40 text-dark px-6 py-3 font-semibold transition hover:bg-white/55"
              >
                Retour
              </button>

              <button
                onClick={() => setStep(7)}
                className="rounded-2xl bg-primary text-white px-6 py-3 font-semibold transition hover:opacity-95 shadow-md"
              >
                Suivant
              </button>
            </div>
          </>
        )}

        {/* Step 7: Résumé */}
        {step === 7 && (
          <>
            <div className="flex justify-center mt-10">
              <div className="rounded-3xl p-8 shadow-xl border border-dark/10 bg-white/30 backdrop-blur-md w-full max-w-2xl">
                <h3 className="text-xl font-bold text-accent mb-6">
                  Résumé de votre commande
                </h3>

                <div className="space-y-3 text-dark">
                  <div className="flex justify-between gap-4">
                    <span>Café</span>
                    <span className="font-semibold text-primary text-right">
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

                  <div className="border-t border-dark/10 pt-4 flex justify-between font-bold text-lg text-accent">
                    <span>Total</span>
                    <span>{totalPrice} DT</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 flex justify-center gap-4">
              <button
                onClick={() => setStep(6)}
                className="rounded-2xl border border-dark/15 bg-white/40 text-dark px-6 py-3 font-semibold transition hover:bg-white/55"
              >
                Retour
              </button>

              <button
                onClick={handleAddToCart}
                className="rounded-2xl bg-primary text-white px-6 py-3 font-semibold transition hover:opacity-95 shadow-md"
              >
                Ajouter au panier
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}