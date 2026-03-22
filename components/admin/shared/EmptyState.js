export default function EmptyState({
  title = "Aucune donnée disponible",
  description = "Il n’y a rien à afficher pour le moment.",
  action = null,
}) {
  return (
    <div className="rounded-2xl border border-dashed border-dark/10 bg-white/30 px-4 py-10 text-center">
      <h3 className="text-sm font-semibold text-dark">{title}</h3>
      <p className="mt-2 text-sm text-dark/65">{description}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}