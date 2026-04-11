export default function OrdersHeader({
  title = "Gestion des commandes",
  description = "Consultez, recherchez, filtrez et gérez les commandes de votre boutique.",
}) {
  return (
    <div className="mb-8">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
        Administration
      </p>

      <h1 className="mt-2 text-4xl font-bold text-dark">
        {title}
      </h1>

      <p className="mt-3 text-dark/80">
        {description}
      </p>
    </div>
  );
}