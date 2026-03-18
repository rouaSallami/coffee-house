"use client";

import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function CheckoutPage() {
  const [mode, setMode] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.totalPrice * item.qty,
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

  return (
    <div className="relative min-h-screen mt-16 overflow-hidden bg-secondary text-dark">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.16),_transparent_45%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary to-secondary/80" />

      <div className="relative max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-dark/70 text-sm font-semibold uppercase tracking-[0.2em]">
            Votre commande
          </p>

          <h1 className="text-4xl font-bold text-dark font-heading mt-3">
            Checkout
          </h1>

          <p className="text-dark/75 mt-4 max-w-2xl mx-auto leading-7">
            Choisissez votre mode de réception et confirmez votre commande.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left side */}
          <div>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <button
                onClick={() => setMode("livraison")}
                className={`rounded-3xl p-8 border transition shadow-lg backdrop-blur-md ${
                  mode === "livraison"
                    ? "border-primary/20 bg-primary text-white"
                    : "border-dark/10 bg-white/30 text-dark hover:bg-white/40"
                }`}
              >
                <div className="text-4xl mb-3">🚚</div>
                <h3 className="text-lg font-bold">Livraison</h3>
                <p className="text-sm mt-2 opacity-80">
                  Nous livrons à votre adresse
                </p>
              </button>

              <button
                onClick={() => setMode("emporter")}
                className={`rounded-3xl p-8 border transition shadow-lg backdrop-blur-md ${
                  mode === "emporter"
                    ? "border-primary/20 bg-primary text-white"
                    : "border-dark/10 bg-white/30 text-dark hover:bg-white/40"
                }`}
              >
                <div className="text-4xl mb-3">🥡</div>
                <h3 className="text-lg font-bold">À emporter</h3>
                <p className="text-sm mt-2 opacity-80">
                  Venez récupérer votre commande
                </p>
              </button>

              <button
                onClick={() => setMode("surplace")}
                className={`rounded-3xl p-8 border transition shadow-lg backdrop-blur-md ${
                  mode === "surplace"
                    ? "border-primary/20 bg-primary text-white"
                    : "border-dark/10 bg-white/30 text-dark hover:bg-white/40"
                }`}
              >
                <div className="text-4xl mb-3">☕</div>
                <h3 className="text-lg font-bold">Sur place</h3>
                <p className="text-sm mt-2 opacity-80">
                  Consommer dans le café
                </p>
              </button>
            </div>

            {mode && (
              <Formik
                initialValues={{
                  name: "",
                  phone: "",
                  address: "",
                  instructions: "",
                  pickupTime: "",
                  note: "",
                }}
                validationSchema={getValidationSchema()}
                onSubmit={(values) => {
                  const order = {
                    id: Date.now(),
                    mode,
                    customer: values,
                    items: cart,
                    total,
                    status: "confirmed",
                    createdAt: new Date().toISOString(),
                  };

                  localStorage.setItem("lastOrder", JSON.stringify(order));
                  window.dispatchEvent(new Event("cartUpdated"));

                  const currentPoints =
                    Number(localStorage.getItem("points")) || 0;
                  const newPoints = currentPoints + 20;
                  localStorage.setItem("points", newPoints);

                  localStorage.removeItem("cart");
                  window.dispatchEvent(new Event("cartUpdated"));

                  window.location.href = "/suivi-commande";
                }}
              >
                <Form className="rounded-3xl p-8 border border-dark/10 bg-white/30 backdrop-blur-md shadow-xl space-y-5">
                  <div>
                    <label className="block text-accent font-semibold mb-2">
                      Nom
                    </label>
                    <Field
                      name="name"
                      className="w-full rounded-xl border border-dark/10 bg-white/45 text-dark px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-dark/45"
                      placeholder="Votre nom"
                    />
                    <ErrorMessage
                      name="name"
                      component="p"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {(mode === "livraison" || mode === "emporter") && (
                    <div>
                      <label className="block text-accent font-semibold mb-2">
                        Téléphone
                      </label>
                      <Field
                        name="phone"
                        className="w-full rounded-xl border border-dark/10 bg-white/45 text-dark px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-dark/45"
                        placeholder="Votre téléphone"
                      />
                      <ErrorMessage
                        name="phone"
                        component="p"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  )}

                  {mode === "livraison" && (
                    <>
                      <div>
                        <label className="block text-accent font-semibold mb-2">
                          Adresse
                        </label>
                        <Field
                          name="address"
                          className="w-full rounded-xl border border-dark/10 bg-white/45 text-dark px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-dark/45"
                          placeholder="Votre adresse"
                        />
                        <ErrorMessage
                          name="address"
                          component="p"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <div>
                        <label className="block text-accent font-semibold mb-2">
                          Instructions
                        </label>
                        <Field
                          as="textarea"
                          name="instructions"
                          className="w-full h-28 rounded-xl border border-dark/10 bg-white/45 text-dark px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-dark/45 resize-none"
                          placeholder="Ex: sonner 2 fois..."
                        />
                      </div>
                    </>
                  )}

                  {mode === "emporter" && (
                    <div>
                      <label className="block text-accent font-semibold mb-2">
                        Heure de retrait
                      </label>
                      <Field
                        name="pickupTime"
                        type="time"
                        className="w-full rounded-xl border border-dark/10 bg-white/45 text-dark px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  )}

                  {mode === "surplace" && (
                    <div>
                      <label className="block text-accent font-semibold mb-2">
                        Note
                      </label>
                      <Field
                        as="textarea"
                        name="note"
                        className="w-full h-28 rounded-xl border border-dark/10 bg-white/45 text-dark px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-dark/45 resize-none"
                        placeholder="Votre remarque..."
                      />
                    </div>
                  )}

                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="rounded-2xl bg-primary text-white px-6 py-3 font-semibold transition hover:opacity-95 shadow-md"
                    >
                      Confirmer la commande
                    </button>
                  </div>
                </Form>
              </Formik>
            )}
          </div>

          {/* Right side */}
          <div>
            <div className="rounded-3xl p-8 border border-dark/10 bg-white/30 backdrop-blur-md shadow-xl">
              <h2 className="text-2xl font-bold text-accent mb-6">
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
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <h3 className="font-semibold text-accent">
                              {item.coffeeName}
                            </h3>

                            <div className="text-sm text-dark/70 mt-1 space-y-1">
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
                            {(item.totalPrice * item.qty).toFixed(2)} DT
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 mt-6 border-t border-dark/10 flex justify-between text-lg font-bold text-accent">
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