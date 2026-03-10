"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CoffeeOrderPage() {
  const { coffeeId } = useParams();

  
  const [coffee, setCoffee] = useState(null);
  const [size, setSize] = useState(null);
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
      console.log("addons:", data);
      setAddonsList(data);
    });
}, []);

  useEffect(() => {
    fetch("/api/coffees")
      .then((res) => res.json())
      .then((data) => {
        const c = data.find((item) => item.id == coffeeId);
        setCoffee(c);
      });
  }, [coffeeId]);

  if (!coffee) return <p>Loading...</p>;

  
const addonsTotal = addons.reduce((sum, a) => sum + a.price, 0);
const totalPrice = (size?.price || 0) + addonsTotal;

const handleAddToCart = () => {
  const cartItem = {
    id: Date.now(),
    coffeeId: coffee.id,
    coffeeName: coffee.name,
    image: coffee.image,
    size,
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

  router.push("/panier");
};

  return (
    <div className="bg-accent min-h-screen mt-16">
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="text-dark/70 text-sm font-semibold uppercase tracking-widest">
            Personnalisation
          </p>

          <h1 className="text-4xl font-bold text-dark mt-2">
            {step === 1 && "Choisir la taille"}
            {step === 2 && "Choisir le contenant"}
            {step === 3 && "Choisir le niveau de sucre"}
          </h1>

          <p className="text-dark/70 mt-3">
            {step === 1 &&
              "Sélectionnez la taille de votre café avant de passer à l’étape suivante."}
            {step === 2 &&
              "Choisissez le contenant qui vous convient."}
            {step === 3 &&
              "Choisissez le niveau de sucre souhaité."}
          </p>
        </div>

        {/* Coffee Info */}
        <div className="bg-base rounded-3xl p-6 shadow-md border border-dark/10 mb-10 text-center">
          <h2 className="text-2xl font-bold text-dark">{coffee.name}</h2>
          <p className="text-dark/60 mt-2">
            {step === 1 && "Choisissez la taille qui vous convient."}
            {step === 2 && "Choisissez le contenant pour votre commande."}
            {step === 3 && "Définissez votre niveau de sucre."}
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
                    className={`rounded-2xl border p-6 text-center transition ${
                      size?.key === s.key
                        ? "border-dark bg-dark text-white"
                        : "border-dark/10 bg-base text-dark hover:border-dark/30"
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
                  className="bg-dark text-white px-6 py-3 rounded-2xl font-semibold hover:opacity-90 transition"
                >
                  Suivant
                </button>
              </div>
            )}
          </>
        )}

        {/* Step 2: Contenant */}
        {step === 2 && (
          <>
            <div className="flex justify-center mt-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl w-full">
                {containers.map((item) => (
                  <button
                    key={item}
                    onClick={() => setContainer(item)}
                    className={`rounded-2xl border p-6 text-center transition ${
                      container === item
                        ? "border-dark bg-dark text-white"
                        : "border-dark/10 bg-base text-dark hover:border-dark/30"
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
                className="border border-dark text-dark px-6 py-3 rounded-2xl font-semibold hover:bg-dark/5 transition"
              >
                Retour
              </button>

              {container && (
                <button
                  onClick={() => setStep(3)}
                  className="bg-dark text-white px-6 py-3 rounded-2xl font-semibold hover:opacity-90 transition"
                >
                  Suivant
                </button>
              )}
            </div>
          </>
        )}

        {/* Step 3: Sugar */}
{step === 3 && (
  <>
    <div className="flex justify-center mt-10">
      <div className="bg-base rounded-3xl p-8 shadow-md border border-dark/10 w-full max-w-2xl">
        <div className="text-center">
          <p className="text-dark text-lg font-semibold">
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
        onClick={() => setStep(2)}
        className="border border-dark text-dark px-6 py-3 rounded-2xl font-semibold hover:bg-dark/5 transition"
      >
        Retour
      </button>

      <button
        onClick={() => setStep(4)}
        className="bg-dark text-white px-6 py-3 rounded-2xl font-semibold hover:opacity-90 transition"
      >
        Suivant
      </button>
    </div>
  </>
)}

{/* Step 4: Add-ons */}
{step === 4 && (
  <>
    <div className="flex justify-center mt-10">
      {addonsList.length === 0 ? (
        <p className="text-dark/70">Chargement des add-ons...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-2xl w-full">
          {addonsList.map((addon) => {
            const selected = addons.some((a) => a.id === addon.id);

            return (
  <button
    key={addon.id}
    onClick={() => toggleAddon(addon)}
    className={`rounded-2xl border p-6 text-center transition ${
      selected
        ? "border-dark bg-dark text-white"
        : "border-dark/10 bg-base text-dark hover:border-dark/30"
    }`}
  >
    <div className="flex flex-col items-center gap-1">
      
      <div className="relative w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden">
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

    <div className="mt-10 flex justify-center gap-4">
      <button
        onClick={() => setStep(3)}
        className="border border-dark text-dark px-6 py-3 rounded-2xl font-semibold hover:bg-dark/5 transition"
      >
        Retour
      </button>

      <button
        onClick={() => setStep(5)}
        className="border border-dark text-dark px-6 py-3 rounded-2xl font-semibold hover:bg-dark/5 transition"
      >
        Ignorer
      </button>

      <button
        onClick={() => setStep(5)}
        className="bg-dark text-white px-6 py-3 rounded-2xl font-semibold hover:opacity-90 transition"
      >
        Suivant
      </button>
    </div>
  </>
)}


{/* Step 5: Note */}
{step === 5 && (
  <>
    <div className="flex justify-center mt-10">
      <div className="bg-base rounded-3xl p-8 shadow-md border border-dark/10 w-full max-w-2xl">

        <p className="text-dark font-semibold mb-4">
          Ajouter une note à votre commande
        </p>

        <textarea
          placeholder="Ex: sans mousse, très chaud..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full h-32 p-4 rounded-xl border border-dark/10 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
        />

      </div>
    </div>

    <div className="mt-10 flex justify-center gap-4">
      <button
        onClick={() => setStep(4)}
        className="border border-dark text-dark px-6 py-3 rounded-2xl font-semibold hover:bg-dark/5 transition"
      >
        Retour
      </button>

      <button
        onClick={() => setStep(6)}
        className="bg-dark text-white px-6 py-3 rounded-2xl font-semibold hover:opacity-90 transition"
      >
        Suivant
      </button>
    </div>
  </>
)}


{/* Step 6: Résumé */}
{step === 6 && (
  <>
    <div className="flex justify-center mt-10">
      <div className="bg-base rounded-3xl p-8 shadow-md border border-dark/10 w-full max-w-2xl">

        <h3 className="text-xl font-bold text-dark mb-6">
          Résumé de votre commande
        </h3>

        <div className="space-y-3 text-dark">

          <div className="flex justify-between">
            <span>Café</span>
            <span className="font-semibold">{coffee.name}</span>
          </div>

          <div className="flex justify-between">
            <span>Taille</span>
            <span>{size?.label}</span>
          </div>

          <div className="flex justify-between">
            <span>Contenant</span>
            <span>{container}</span>
          </div>

          <div className="flex justify-between">
            <span>Sucre</span>
            <span>{sugar}%</span>
          </div>

          <div className="flex justify-between">
            <span>Add-ons</span>
            <span>
              {addons.length > 0
                ? addons.map((a) => a.name).join(", ")
                : "Aucun"}
            </span>
          </div>

          {note && (
            <div className="flex justify-between">
              <span>Note</span>
              <span>{note}</span>
            </div>
          )}

          <div className="border-t pt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>{totalPrice} DT</span>
          </div>

        </div>

      </div>
    </div>

    <div className="mt-10 flex justify-center gap-4">

      <button
        onClick={() => setStep(5)}
        className="border border-dark text-dark px-6 py-3 rounded-2xl font-semibold hover:bg-dark/5 transition"
      >
        Retour
      </button>

      <button
  onClick={handleAddToCart}
  className="bg-dark text-white px-6 py-3 rounded-2xl font-semibold hover:opacity-90 transition"
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