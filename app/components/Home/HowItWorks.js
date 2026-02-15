import { Coffee, SlidersHorizontal, ShoppingBag, MapPin } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Choisir",
      desc: "Sélectionnez votre café préféré parmi nos spécialités.",
      icon: <Coffee size={22} />,
    },
    {
      id: 2,
      title: "Personnaliser",
      desc: "Choisissez la taille, le sucre et le type de contenant.",
      icon: <SlidersHorizontal size={22} />,
    },
    {
      id: 3,
      title: "Commander",
      desc: "Validez votre commande en quelques clics simplement.",
      icon: <ShoppingBag size={22} />,
    },
    {
      id: 4,
      title: "Suivre",
      desc: "Suivez votre commande jusqu’à sa préparation.",
      icon: <MapPin size={22} />,
    },
  ];

  return (
    <section
  className="relative py-20 text-white bg-cover bg-center"
  style={{ backgroundImage: "url('/images/bg-coffee.png')" }}
>
  {/* Overlay */}
  

  <div className="relative max-w-6xl mx-auto px-6">

    {/* Title */}
    <div className="text-center mb-14">
      <h2 className="text-3xl font-bold">
        Comment ça marche ?
      </h2>
      <p className="text-white/70 mt-3">
        Commander votre café n’a jamais été aussi simple.
      </p>
    </div>

    {/* Timeline */}
    <div className="relative flex flex-col lg:flex-row items-center justify-between gap-10">

      {/* Line */}
      <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-secondary"></div>

      {steps.map((step) => (
        <div
          key={step.id}
          className="relative flex flex-col items-center text-center max-w-xs"
        >
          {/* Circle Icon */}
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-dark text-accent shadow-lg z-10">
            {step.icon}
          </div>

          {/* Step Number */}
          <span className="mt-4 text-dark font-bold text-sm tracking-widest">
            ÉTAPE {step.id}
          </span>

          {/* Title */}
          <h3 className="mt-2 text-lg font-semibold">
            {step.title}
          </h3>

          {/* Description */}
          <p className="text-white/70 text-sm mt-2">
            {step.desc}
          </p>
        </div>
      ))}
    </div>

  </div>
</section>

  );
}
