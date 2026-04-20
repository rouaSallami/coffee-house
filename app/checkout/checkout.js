"use client";

import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getUserData, setUserData } from "../lib/storage";
import { Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import { handleInactiveAccount } from "../../lib/handleInactiveAccount";

export default function CheckoutPage() {
  const [mode, setMode] = useState(null);
  const [cart, setCart] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const storedCart = getUserData("cart", []);
    setCart(Array.isArray(storedCart) ? storedCart : []);
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + Number(item.totalPrice || 0) * Number(item.qty || 1),
    0
  );

  const getValidationSchema = () => {
  if (mode === "livraison") {
    return Yup.object({
      name: Yup.string().required("Le nom est requis"),
      phone: Yup.string().required("Le téléphone est requis"),
      address: Yup.string().required("L’adresse est requise"),
      instructions: Yup.string(),
    });
  }

  if (mode === "emporter") {
    return Yup.object({
      name: Yup.string().required("Le nom est requis"),
      phone: Yup.string().required("Le téléphone est requis"),
      pickupTime: Yup.string(),
    });
  }

  if (mode === "surplace") {
    return Yup.object({
      name: Yup.string().required("Le nom est requis"),
      note: Yup.string(),
    });
  }

  return Yup.object({});
};

const buildOrderNotes = (values) => {
  const notes = [];

  if (mode) notes.push(`Mode: ${mode}`);
  if (mode === "livraison" && values.address) {
    notes.push(`Adresse: ${values.address}`);
  }
  if (mode === "livraison" && values.instructions) {
    notes.push(`Instructions: ${values.instructions}`);
  }
  if (mode === "emporter" && values.pickupTime) {
    notes.push(`Heure de retrait: ${values.pickupTime}`);
  }
  if (mode === "surplace" && values.note) {
    notes.push(`Note: ${values.note}`);
  }

  return notes.join(" | ");
};

  return (
    <div className="relative min-h-screen overflow-hidden bg-secondary pt-20 text-dark">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_45%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary to-secondary/80" />

      <div className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-dark/10 bg-white/45 px-4 py-2 shadow-sm backdrop-blur-sm">
            <Sparkles size={15} className="text-primary" />
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-dark/70">
              Votre commande
            </p>
          </div>

          <h1 className="mt-3 font-heading text-4xl font-bold text-dark">
            Checkout
          </h1>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-dark/75">
            Choisissez votre mode de réception et confirmez votre commande.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <div className="mb-12 grid gap-6 md:grid-cols-3">
              <button
                type="button"
                onClick={() => setMode("livraison")}
                className={`rounded-3xl border p-8 shadow-lg transition backdrop-blur-md ${
                  mode === "livraison"
                    ? "border-primary/20 bg-primary text-white"
                    : "border-dark/10 bg-white/30 text-dark hover:bg-white/40"
                }`}
              >
                <div className="mb-3 text-4xl">🚚</div>
                <h3 className="text-lg font-bold">Livraison</h3>
                <p className="mt-2 text-sm opacity-80">
                  Nous livrons à votre adresse
                </p>
              </button>

              <button
                type="button"
                onClick={() => setMode("emporter")}
                className={`rounded-3xl border p-8 shadow-lg transition backdrop-blur-md ${
                  mode === "emporter"
                    ? "border-primary/20 bg-primary text-white"
                    : "border-dark/10 bg-white/30 text-dark hover:bg-white/40"
                }`}
              >
                <div className="mb-3 text-4xl">🥡</div>
                <h3 className="text-lg font-bold">À emporter</h3>
                <p className="mt-2 text-sm opacity-80">
                  Venez récupérer votre commande
                </p>
              </button>

              <button
                type="button"
                onClick={() => setMode("surplace")}
                className={`rounded-3xl border p-8 shadow-lg transition backdrop-blur-md ${
                  mode === "surplace"
                    ? "border-primary/20 bg-primary text-white"
                    : "border-dark/10 bg-white/30 text-dark hover:bg-white/40"
                }`}
              >
                <div className="mb-3 text-4xl">☕</div>
                <h3 className="text-lg font-bold">Sur place</h3>
                <p className="mt-2 text-sm opacity-80">
                  Consommer dans le café
                </p>
              </button>
            </div>

            {mode && (
              <Formik
                enableReinitialize
                initialValues={{
                  name: "",
                  phone: "",
                  address: "",
                  instructions: "",
                  pickupTime: "",
                  note: "",
                }}
                validationSchema={getValidationSchema()}
                onSubmit={async (values) => {
                  if (cart.length === 0) {
                    toast.error("Votre panier est vide");
                    return;
                  }

                  try {
                    setSubmitting(true);


                    const payload = {

  customer_name: values.name,
  customer_phone: values.phone,
  mode,
  notes: buildOrderNotes(values),
  items: cart.map((item) => ({
  coffee_id: item.coffeeId,
  size_name: item.size?.label || "Standard",
  unit_price: Number(item.totalPrice || 0),
  quantity: Number(item.qty || 1),
  sugar: item.sugar ?? 0,
  container: item.container || null,
  milk: item.milk || null,
  note: item.note || null,

  addons: item.addons || [],
})),
                    };

                    const token = sessionStorage.getItem("token");

const res = await fetch("/backend/orders", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(payload),
});

let data = {};
let rawText = "";

try {
  rawText = await res.text();
  data = rawText ? JSON.parse(rawText) : {};
} catch {
  data = {};
}

if (!res.ok) {
  console.log("ORDER STATUS:", res.status);
  console.log("ORDER RAW RESPONSE:", rawText);

  if (handleInactiveAccount(data)) {
    return;
  }

  toast.error(data.error || data.message || `Erreur ${res.status}`);
  return;
}

// SUCCESS
window.dispatchEvent(new Event("orderUpdated"));
setUserData("cart", []);
window.dispatchEvent(new Event("cartUpdated"));
window.location.href = "/mes-commandes";
                  } catch (error) {
                    console.error(error);
                    toast.error("Erreur serveur");
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                <Form className="space-y-5 rounded-3xl border border-dark/10 bg-white/30 p-8 shadow-xl backdrop-blur-md">
                  <div>
                    <label className="mb-2 block font-semibold text-accent">
                      Nom
                    </label>
                    <Field
                      name="name"
                      className="w-full rounded-xl border border-dark/10 bg-white/45 px-4 py-3 text-dark outline-none placeholder:text-dark/45 focus:ring-2 focus:ring-primary/20"
                      placeholder="Votre nom"
                    />
                    <ErrorMessage
                      name="name"
                      component="p"
                      className="mt-1 text-sm text-red-500"
                    />
                  </div>

{(mode === "livraison" || mode === "emporter") && (                    <div>
                      <label className="mb-2 block font-semibold text-accent">
                        Téléphone
                      </label>
                      <Field
                        name="phone"
                        className="w-full rounded-xl border border-dark/10 bg-white/45 px-4 py-3 text-dark outline-none placeholder:text-dark/45 focus:ring-2 focus:ring-primary/20"
                        placeholder="Votre téléphone"
                      />
                      <ErrorMessage
                        name="phone"
                        component="p"
                        className="mt-1 text-sm text-red-500"
                      />
                    </div>
                  )}

                  {mode === "livraison" && (
                    <>
                      <div>
                        <label className="mb-2 block font-semibold text-accent">
                          Adresse
                        </label>
                        <Field
                          name="address"
                          className="w-full rounded-xl border border-dark/10 bg-white/45 px-4 py-3 text-dark outline-none placeholder:text-dark/45 focus:ring-2 focus:ring-primary/20"
                          placeholder="Votre adresse"
                        />
                        <ErrorMessage
                          name="address"
                          component="p"
                          className="mt-1 text-sm text-red-500"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block font-semibold text-accent">
                          Instructions
                        </label>
                        <Field
                          as="textarea"
                          name="instructions"
                          className="h-28 w-full resize-none rounded-xl border border-dark/10 bg-white/45 px-4 py-3 text-dark outline-none placeholder:text-dark/45 focus:ring-2 focus:ring-primary/20"
                          placeholder="Ex: sonner 2 fois..."
                        />
                      </div>
                    </>
                  )}

                  {mode === "emporter" && (
                    <div>
                      <label className="mb-2 block font-semibold text-accent">
                        Heure de retrait
                      </label>
                      <Field
                        name="pickupTime"
                        type="time"
                        className="w-full rounded-xl border border-dark/10 bg-white/45 px-4 py-3 text-dark outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  )}

                  {mode === "surplace" && (
                    <div>
                      <label className="mb-2 block font-semibold text-accent">
                        Note
                      </label>
                      <Field
                        as="textarea"
                        name="note"
                        className="h-28 w-full resize-none rounded-xl border border-dark/10 bg-white/45 px-4 py-3 text-dark outline-none placeholder:text-dark/45 focus:ring-2 focus:ring-primary/20"
                        placeholder="Votre remarque..."
                      />
                    </div>
                  )}

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      disabled={submitting || cart.length === 0}
                      className="rounded-2xl bg-primary px-6 py-3 font-semibold text-white shadow-md transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {submitting ? "Confirmation..." : "Confirmer la commande"}
                    </button>
                  </div>
                </Form>
              </Formik>
            )}
          </div>

          <div>
            <div className="rounded-3xl border border-dark/10 bg-white/30 p-8 shadow-xl backdrop-blur-md">
              <h2 className="mb-6 text-2xl font-bold text-accent">
                Résumé de la commande
              </h2>

              {cart.length === 0 ? (
                <p className="text-dark/70">Votre panier est vide.</p>
              ) : (
                <>
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="border-b border-dark/10 pb-4"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-semibold text-accent">
                              {item.coffeeName}
                            </h3>

                            <div className="mt-1 space-y-1 text-sm text-dark/70">
                              <p>Taille: {item.size?.label}</p>
                              <p>Contenant: {item.container}</p>
                              <p>Sucre: {item.sugar}%</p>
                              <p>
                                Add-ons:{" "}
                                {item.addons?.length > 0
                                  ? item.addons.map((a) => a.name).join(", ")
                                  : "Aucun"}
                              </p>
                              {item.note && <p>Note: {item.note}</p>}
                              <p>Qté: {item.qty}</p>
                            </div>
                          </div>

                          <p className="font-bold text-accent">
                            {(
                              Number(item.totalPrice || 0) *
                              Number(item.qty || 1)
                            ).toFixed(2)}{" "}
                            DT
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex justify-between border-t border-dark/10 pt-6 text-lg font-bold text-accent">
                    <span>Total</span>
                    <span>{total.toFixed(2)} DT</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}