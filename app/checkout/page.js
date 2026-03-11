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
    <div className="bg-accent min-h-screen mt-16">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-dark">Checkout</h1>
          <p className="text-dark/70 mt-3">
            Choisissez votre mode de réception et confirmez votre commande.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left side */}
          <div>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <button
                onClick={() => setMode("livraison")}
                className={`rounded-2xl p-8 border transition ${
                  mode === "livraison"
                    ? "border-dark bg-dark text-white"
                    : "border-dark/10 bg-base text-dark hover:border-dark/30"
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
                className={`rounded-2xl p-8 border transition ${
                  mode === "emporter"
                    ? "border-dark bg-dark text-white"
                    : "border-dark/10 bg-base text-dark hover:border-dark/30"
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
                className={`rounded-2xl p-8 border transition ${
                  mode === "surplace"
                    ? "border-dark bg-dark text-white"
                    : "border-dark/10 bg-base text-dark hover:border-dark/30"
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

  // ✅ Ajouter 20 points
  const currentPoints = Number(localStorage.getItem("points")) || 0;
  const newPoints = currentPoints + 20;
  localStorage.setItem("points", newPoints);

  localStorage.removeItem("cart");
  window.dispatchEvent(new Event("cartUpdated"));

  window.location.href = "/suivi-commande";
}}

              >
                <Form className="bg-base rounded-3xl p-8 border border-dark/10 shadow-md space-y-5">
                  <div>
                    <label className="block text-dark font-semibold mb-2">
                      Nom
                    </label>
                    <Field
                      name="name"
                      className="w-full rounded-xl border border-dark/10 px-4 py-3 outline-none focus:ring-2 focus:ring-accent"
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
                      <label className="block text-dark font-semibold mb-2">
                        Téléphone
                      </label>
                      <Field
                        name="phone"
                        className="w-full rounded-xl border border-dark/10 px-4 py-3 outline-none focus:ring-2 focus:ring-accent"
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
                        <label className="block text-dark font-semibold mb-2">
                          Adresse
                        </label>
                        <Field
                          name="address"
                          className="w-full rounded-xl border border-dark/10 px-4 py-3 outline-none focus:ring-2 focus:ring-accent"
                          placeholder="Votre adresse"
                        />
                        <ErrorMessage
                          name="address"
                          component="p"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      <div>
                        <label className="block text-dark font-semibold mb-2">
                          Instructions
                        </label>
                        <Field
                          as="textarea"
                          name="instructions"
                          className="w-full h-28 rounded-xl border border-dark/10 px-4 py-3 outline-none focus:ring-2 focus:ring-accent resize-none"
                          placeholder="Ex: sonner 2 fois..."
                        />
                      </div>
                    </>
                  )}

                  {mode === "emporter" && (
                    <div>
                      <label className="block text-dark font-semibold mb-2">
                        Heure de retrait
                      </label>
                      <Field
                        name="pickupTime"
                        type="time"
                        className="w-full rounded-xl border border-dark/10 px-4 py-3 outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                  )}

                  {mode === "surplace" && (
                    <div>
                      <label className="block text-dark font-semibold mb-2">
                        Note
                      </label>
                      <Field
                        as="textarea"
                        name="note"
                        className="w-full h-28 rounded-xl border border-dark/10 px-4 py-3 outline-none focus:ring-2 focus:ring-accent resize-none"
                        placeholder="Votre remarque..."
                      />
                    </div>
                  )}

                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="bg-dark text-white px-6 py-3 rounded-2xl font-semibold hover:opacity-90 transition"
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
            <div className="bg-base rounded-3xl p-8 border border-dark/10 shadow-md">
              <h2 className="text-2xl font-bold text-dark mb-6">
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
                            <h3 className="font-semibold text-dark">
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

                          <p className="font-bold text-dark">
                            {(item.totalPrice * item.qty).toFixed(2)} DT
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 mt-6 border-t border-dark/10 flex justify-between text-lg font-bold text-dark">
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