"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  name: yup
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères.")
    .required("Le nom est obligatoire."),
  comment: yup
    .string()
    .min(10, "Votre avis doit contenir au moins 10 caractères.")
    .required("Le commentaire est obligatoire."),
});

function Stars({ value, onChange }) {
  return (
    <div className="flex gap-1 text-2xl cursor-pointer">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onChange(star)}
          className={star <= value ? "text-primary" : "text-dark/20"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function LaisserAvis() {
  const [rating, setRating] = useState(5);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log({ ...data, rating });

    setSuccess(true);
    reset();
    setRating(5);

    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <section
      className="relative py-24 px-6 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bg-coffee.png')" }}
    >
      <div className="max-w-6xl mx-auto flex justify-center">

        <div className="relative w-full max-w-xl">

          {/* glow */}
          <div className="absolute -inset-2 bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20 blur-2xl opacity-40 rounded-3xl"></div>

          {/* card */}
          <div className="relative bg-white/55 backdrop-blur-md border border-dark/10 rounded-3xl p-8 md:p-10 shadow-xl">

            <h2 className="text-3xl font-bold text-center text-dark">
              Laisser un avis
            </h2>

            <p className="text-dark/70 text-center mt-2">
              Votre avis nous aide à nous améliorer.
            </p>

            {/* Stars */}
            <div className="flex justify-center mt-6">
              <Stars value={rating} onChange={setRating} />
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">

              {/* Name */}
              <div>
                <input
                  {...register("name")}
                  placeholder="Votre nom"
                  className="w-full px-4 py-3 rounded-xl bg-white/85 border border-dark/10 focus:outline-none focus:border-primary transition"
                />

                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Comment */}
              <div>
                <textarea
                  {...register("comment")}
                  placeholder="Votre avis..."
                  rows={5}
                  className="w-full text-black px-4 py-3 rounded-xl bg-white/85 border border-dark/10 focus:outline-none focus:border-primary transition"
                />

                {errors.comment && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.comment.message}
                  </p>
                )}
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-2xl font-semibold transition hover:scale-[1.02] hover:shadow-lg"
              >
                Envoyer mon avis
              </button>

              {success && (
                <p className="text-green-600 text-center font-semibold mt-2">
                  Merci pour votre avis ! ⭐
                </p>
              )}
            </form>

          </div>
        </div>

      </div>
    </section>
  );
}