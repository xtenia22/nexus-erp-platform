type FilterPanelProps = {
  searchTerm: string;
  minPrice: string;
  maxPrice: string;
  sortBy: string;

  brands: any[];
  models: any[];

  selectedBrand: number | null;
  selectedModel: number | null;
  selectedYear: number | null;

  isFiltering: boolean;
  isVehicleFiltersOpen: boolean;
  isMoreFiltersOpen: boolean;
  hasActiveFilters: string | number | boolean | null;

  onSearchChange: (value: string) => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onSortChange: (value: string) => void;

  onBrandChange: (value: number | null) => void;
  onModelChange: (value: number | null) => void;
  onYearChange: (value: number | null) => void;

  onToggleVehicleFilters: () => void;
  onToggleMoreFilters: () => void;
  onClearFilters: () => void;
};

export function FilterPanel({
  searchTerm,
  minPrice,
  maxPrice,
  brands,
  models,
  selectedBrand,
  selectedModel,
  selectedYear,
  isFiltering,
  isVehicleFiltersOpen,
  isMoreFiltersOpen,
  hasActiveFilters,
  onSearchChange,
  onMinPriceChange,
  onMaxPriceChange,
  onBrandChange,
  onModelChange,
  onYearChange,
  onToggleVehicleFilters,
  onToggleMoreFilters,
  onClearFilters,
}: FilterPanelProps) {
  return (
    <div className="mb-4 rounded-2xl border border-slate-800 bg-slate-900 p-4 lg:mb-8 lg:p-5">
      <div
        className={`grid gap-4 transition-all duration-200 ${
          isFiltering ? "opacity-50 blur-[1px]" : "opacity-100 blur-0"
        }`}
      >
        <div>
          <label
            htmlFor="product-search"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Buscar productos
          </label>

          <input
            id="product-search"
            type="text"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Buscar por nombre, código o descripción..."
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-slate-500"
          />
        </div>

        <div>
          <button
            type="button"
            onClick={onToggleVehicleFilters}
            className="flex w-full items-center justify-between rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-left text-sm font-semibold text-slate-100 transition hover:bg-slate-800"
          >
            <span>Buscar tu vehículo</span>
            <span className="text-slate-400">
              {isVehicleFiltersOpen ? "▲" : "▼"}
            </span>
          </button>

          {isVehicleFiltersOpen && (
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1 block text-sm text-slate-300">
                  Marca
                </label>
                <select
                  value={selectedBrand ?? ""}
                  onChange={(event) => {
                    const value = Number(event.target.value);
                    onBrandChange(value || null);
                  }}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-slate-200"
                >
                  <option value="">Todas</option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm text-slate-300">
                  Modelo
                </label>
                <select
                  value={selectedModel ?? ""}
                  onChange={(event) => {
                    const value = Number(event.target.value);
                    onModelChange(value || null);
                  }}
                  disabled={!selectedBrand}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-slate-200 disabled:opacity-50"
                >
                  <option value="">Todos</option>
                  {models.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm text-slate-300">
                  Año
                </label>
                <select
                  value={selectedYear ?? ""}
                  onChange={(event) => {
                    const value = Number(event.target.value);
                    onYearChange(value || null);
                  }}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-slate-200"
                >
                  <option value="">Todos</option>
                  {Array.from({ length: 25 }, (_, index) => {
                    const year = 2025 - index;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          )}
        </div>

        <div>
          <button
            type="button"
            onClick={onToggleMoreFilters}
            className="flex w-full items-center justify-between rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-left text-sm font-semibold text-slate-100 transition hover:bg-slate-800"
          >
            <span>Más filtros</span>
            <span className="text-slate-400">
              {isMoreFiltersOpen ? "▲" : "▼"}
            </span>
          </button>

          {isMoreFiltersOpen && (
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="min-price"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Precio mínimo
                </label>

                <input
                  id="min-price"
                  type="number"
                  value={minPrice}
                  onChange={(event) => onMinPriceChange(event.target.value)}
                  placeholder="Ej: 100"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-slate-500"
                />
              </div>

              <div>
                <label
                  htmlFor="max-price"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Precio máximo
                </label>

                <input
                  id="max-price"
                  type="number"
                  value={maxPrice}
                  onChange={(event) => onMaxPriceChange(event.target.value)}
                  placeholder="Ej: 1000"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-slate-500"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {hasActiveFilters && (
        <button
          type="button"
          onClick={onClearFilters}
          className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
}