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
          className={star <= value ? "text-accent" : "text-white/20"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function AvisForm() {
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

    // 🔥 بعد backend:
    // await fetch("/api/avis", { method: "POST", body: JSON.stringify(...) })

    setSuccess(true);
    reset();
    setRating(5);

    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="bg-cover bg-center py-10"style={{ backgroundImage: "url('/images/bg-coffee.png')" }}>
    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-white max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-center">Laisser un avis</h2>
      <p className="text-white/70 text-center mt-2">
        Votre avis nous aide à nous améliorer.
      </p>

      {/* Rating */}
      <div className="flex justify-center mt-6">
        <Stars value={rating} onChange={setRating} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">

        {/* Name */}
        <div>
          <input
            {...register("name")}
            placeholder="Votre nom"
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 focus:outline-none focus:border-accent"
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">
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
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 focus:outline-none focus:border-accent"
          />
          {errors.comment && (
            <p className="text-red-400 text-sm mt-1">
              {errors.comment.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-accent text-dark py-3 rounded-xl font-semibold hover:opacity-90 transition"
        >
          Envoyer mon avis
        </button>

        {success && (
          <p className="text-dark text-center font-semibold mt-2">
            Merci pour votre avis ! ⭐
          </p>
        )}
      </form>
    </div>
    </div>
  );
}
