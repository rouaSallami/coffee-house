import { isUserFormValid } from "@/lib/admin/utilisateurs/usersUtils";

export default function UserFormModal({
  title,
  user,
  setUser,
  onClose,
  onSubmit,
  submitLabel,
}) {
  if (!user) return null;

  const isValid = isUserFormValid(user);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl border border-dark/10 bg-base p-6 shadow-xl">
        <h2 className="text-xl font-bold text-dark">{title}</h2>

        <div className="mt-5 space-y-4">
          <input
            type="text"
            placeholder="Nom"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-dark outline-none"
          />

          <input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-dark outline-none"
          />

          <input
            type="text"
            placeholder="Téléphone"
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
            className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-dark outline-none"
          />

          {!isValid && (
            <p className="text-sm text-red-600">
              Remplissez le nom, l’email et le téléphone avant de continuer.
            </p>
          )}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm font-semibold text-dark transition hover:bg-base"
          >
            Annuler
          </button>

          <button
            onClick={onSubmit}
            disabled={!isValid}
            className="flex-1 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}