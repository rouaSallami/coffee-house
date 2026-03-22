export default function AdminAlertsCard({ adminAlerts }) {
  return (
    <div className="rounded-3xl border border-dark/10 bg-base p-5 shadow-sm sm:p-6">
      <h2 className="text-lg font-bold text-dark sm:text-xl">
        Alertes administrateur
      </h2>

      <p className="mt-1 text-sm text-dark/60">
        Points qui méritent votre attention aujourd’hui.
      </p>

      <div className="mt-5 space-y-3">
        {adminAlerts.length > 0 ? (
          adminAlerts.map((alert, index) => (
            <div
              key={`${alert.title}-${index}`}
              className={`rounded-2xl border p-4 ${
                alert.tone === "red"
                  ? "border-red-200 bg-red-50"
                  : alert.tone === "blue"
                  ? "border-blue-200 bg-blue-50"
                  : "border-amber-200 bg-amber-50"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-dark">{alert.title}</p>
                  <p className="mt-1 text-sm text-dark/65">{alert.description}</p>
                </div>

                <span className="rounded-full bg-white/80 px-3 py-1 text-sm font-bold text-dark shadow-sm">
                  {alert.value}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
            <p className="text-sm font-semibold text-green-700">
              Tout est en ordre
            </p>
            <p className="mt-1 text-sm text-green-600">
              Aucun point critique n’a été détecté pour le moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}