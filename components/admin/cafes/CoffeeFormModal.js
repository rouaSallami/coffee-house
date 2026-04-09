import { coffeeCategories } from "@/lib/admin/cafes/constants";
import { isCoffeeFormValid } from "@/lib/admin/cafes/cafesUtils";

export default function CoffeeFormModal({
  title,
  coffee,
  setCoffee,
  onClose,
  onSubmit,
  submitLabel,
}) {
  if (!coffee) return null;

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...coffee.ingredients];
    updatedIngredients[index] = value;
    setCoffee({ ...coffee, ingredients: updatedIngredients });
  };

  const addIngredient = () => {
    setCoffee({
      ...coffee,
      ingredients: [...coffee.ingredients, ""],
    });
  };

  const removeIngredient = (index) => {
    const updatedIngredients = coffee.ingredients.filter((_, i) => i !== index);
    setCoffee({
      ...coffee,
      ingredients: updatedIngredients.length > 0 ? updatedIngredients : [""],
    });
  };

  const handleSizeChange = (index, field, value) => {
    const updatedSizes = [...coffee.sizes];
    updatedSizes[index] = {
      ...updatedSizes[index],
      [field]: value,
    };

    setCoffee({ ...coffee, sizes: updatedSizes });
  };

  const addSize = () => {
    setCoffee({
      ...coffee,
      sizes: [
        ...coffee.sizes,
        {
          key: Date.now() + Math.random(),
          label: "",
          price: 0,
        },
      ],
    });
  };

  const removeSize = (index) => {
    const updatedSizes = coffee.sizes.filter((_, i) => i !== index);

    setCoffee({
      ...coffee,
      sizes:
        updatedSizes.length > 0
          ? updatedSizes
          : [{ key: Date.now(), label: "M", price: 0 }],
    });
  };

  const isValid = isCoffeeFormValid(coffee);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 backdrop-blur-sm sm:p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-dark/10 bg-base p-4 shadow-xl sm:rounded-3xl sm:p-6">
        <h2 className="text-lg font-bold text-dark sm:text-xl">
          {title}
        </h2>

        <div className="mt-5 space-y-4">
          <input
            type="text"
            placeholder="Nom du café"
            value={coffee.name}
            onChange={(e) => setCoffee({ ...coffee, name: e.target.value })}
            className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none"
          />

          <select
            value={coffee.category}
            onChange={(e) => setCoffee({ ...coffee, category: e.target.value })}
            className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none"
          >
            <option value="">Choisir une catégorie</option>
            {coffeeCategories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>

          <textarea
            placeholder="Description"
            value={coffee.description}
            onChange={(e) => setCoffee({ ...coffee, description: e.target.value })}
            className="h-28 w-full resize-none rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none"
          />

          <input
  type="file"
  accept="image/*"
  onChange={(e) =>
    setCoffee({
      ...coffee,
      imageFile: e.target.files?.[0] || null,
    })
  }
  className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none"
/>

{coffee.imageFile && (
  <p className="text-xs text-dark/60">
    Image: {coffee.imageFile.name}
  </p>
)}

          <label className="flex items-center gap-3 rounded-xl border border-dark/10 bg-white px-4 py-3">
            <input
              type="checkbox"
              checked={coffee.isNew}
              onChange={(e) => setCoffee({ ...coffee, isNew: e.target.checked })}
            />
            <span className="text-sm text-dark">Marquer comme nouveau</span>
          </label>

          <div className="rounded-2xl border border-dark/10 bg-white p-3 sm:p-4">
            <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-sm font-semibold text-dark">
                Ingrédients
              </h3>
              <button
                type="button"
                onClick={addIngredient}
                className="w-full rounded-lg bg-primary/10 px-3 py-2 text-xs font-semibold text-primary sm:w-auto"
              >
                + Ajouter
              </button>
            </div>

            <div className="space-y-2">
              {coffee.ingredients.map((ingredient, index) => (
                <div key={index} className="flex flex-col gap-2 sm:flex-row">
                  <input
                    type="text"
                    placeholder="Ex: Espresso"
                    value={ingredient}
                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                    className="flex-1 rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100 sm:w-auto"
                  >
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-dark/10 bg-white p-3 sm:p-4">
            <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-sm font-semibold text-dark">
                Tailles et prix
              </h3>
              <button
                type="button"
                onClick={addSize}
                className="w-full rounded-lg bg-primary/10 px-3 py-2 text-xs font-semibold text-primary sm:w-auto"
              >
                + Ajouter taille
              </button>
            </div>

            <div className="space-y-3">
              {coffee.sizes.map((size, index) => (
                <div
                  key={size.key}
                  className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3"
                >
                  <input
                    type="text"
                    placeholder="Label (S, M, L...)"
                    value={size.label}
                    onChange={(e) =>
                      handleSizeChange(index, "label", e.target.value)
                    }
                    className="rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none"
                  />

                  <input
                    type="number"
                    placeholder="Prix"
                    value={size.price}
                    onChange={(e) =>
                      handleSizeChange(index, "price", e.target.value)
                    }
                    className="rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm text-dark outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => removeSize(index)}
                    className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                  >
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
          </div>

          {!isValid && (
            <p className="text-sm text-red-600">
              Remplissez le nom, la catégorie et la description avant de continuer.
            </p>
          )}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={onClose}
            className="w-full rounded-xl border border-dark/10 bg-white px-4 py-3 text-sm font-semibold text-dark transition hover:bg-base"
          >
            Annuler
          </button>

          <button
            onClick={onSubmit}
            disabled={!isValid}
            className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  );
}