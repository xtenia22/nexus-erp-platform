"use client";

import { useMemo, useState, useEffect } from "react";
import { ProductCard } from "@/components/catalog/product-card";
import { Product } from "@/types/product";
import { getAssetUrl } from "@/lib/assets";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProductCardSkeleton } from "@/components/catalog/product-card-skeleton";
import {
  getBrands,
  getModels,
  getProducts,
  getCategories,
  type CategoryTreeItem,
} from "@/services/api";

type ProductCatalogProps = {
  products: Product[];
};

export function ProductCatalog({ products }: ProductCatalogProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const ITEMS_PER_PAGE = 12;

  const [isFiltering, setIsFiltering] = useState(false);

  const [searchTerm, setSearchTerm] = useState(
    () => searchParams.get("search") ?? ""
  );

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  const [minPrice, setMinPrice] = useState(
    () => searchParams.get("min") ?? ""
  );

  const [maxPrice, setMaxPrice] = useState(
    () => searchParams.get("max") ?? ""
  );

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    () => {
      const categoryId = searchParams.get("categoryId");
      return categoryId ? Number(categoryId) : null;
    }
  );

  const [selectedProductLineId, setSelectedProductLineId] = useState<
    number | null
  >(() => {
    const productLineId = searchParams.get("productLineId");
    return productLineId ? Number(productLineId) : null;
  });

  const [sortBy, setSortBy] = useState(
    () => searchParams.get("sort") ?? ""
  );

  const [currentPage, setCurrentPage] = useState(1);

  const [brands, setBrands] = useState<any[]>([]);
  const [models, setModels] = useState<any[]>([]);

  const [selectedBrand, setSelectedBrand] = useState<number | null>(() => {
    const brand = searchParams.get("brand");
    return brand ? Number(brand) : null;
  });

  const [selectedModel, setSelectedModel] = useState<number | null>(() => {
    const model = searchParams.get("model");
    return model ? Number(model) : null;
  });

  const [selectedYear, setSelectedYear] = useState<number | null>(() => {
    const year = searchParams.get("year");
    return year ? Number(year) : null;
  });

  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {}
  );

  const [catalogProducts, setCatalogProducts] = useState(products);
  const [totalProducts, setTotalProducts] = useState(products.length);
  const [backendTotalPages, setBackendTotalPages] = useState(1);
  const [categoryTree, setCategoryTree] = useState<CategoryTreeItem[]>([]);

  const [isVehicleFiltersOpen, setIsVehicleFiltersOpen] = useState(false);
  const [isMoreFiltersOpen, setIsMoreFiltersOpen] = useState(false);

  useEffect(() => {
    if (selectedBrand || selectedModel || selectedYear) {
      setIsVehicleFiltersOpen(true);
    }
  }, [selectedBrand, selectedModel, selectedYear]);

  useEffect(() => {
    if (minPrice || maxPrice) {
      setIsMoreFiltersOpen(true);
    }
  }, [minPrice, maxPrice]);

  useEffect(() => {
    getCategories().then(setCategoryTree);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsFiltering(true);

        const data = await getProducts({
          search: debouncedSearchTerm,
          categoryId: selectedCategoryId,
          productLineId: selectedProductLineId,
          brand: selectedBrand,
          model: selectedModel,
          year: selectedYear,
          min: minPrice,
          max: maxPrice,
          sort: sortBy,
          page: currentPage,
          limit: ITEMS_PER_PAGE,
        });

        setCatalogProducts(data.items);
        setTotalProducts(data.total);
        setBackendTotalPages(data.totalPages);
      } finally {
        setTimeout(() => {
          setIsFiltering(false);
        }, 150);
      }
    }

    loadProducts();
  }, [
    debouncedSearchTerm,
    selectedCategoryId,
    selectedProductLineId,
    selectedBrand,
    selectedModel,
    selectedYear,
    minPrice,
    maxPrice,
    sortBy,
    currentPage,
  ]);

  useEffect(() => {
    getBrands().then(setBrands);
  }, []);

  useEffect(() => {
    if (!selectedBrand) {
      setModels([]);
      setSelectedModel(null);
      return;
    }

    getModels(selectedBrand).then(setModels);
  }, [selectedBrand]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (searchTerm) params.set("search", searchTerm);
    if (selectedCategoryId) {
      params.set("categoryId", String(selectedCategoryId));
    }

    if (selectedProductLineId) {
      params.set("productLineId", String(selectedProductLineId));
    }

    if (minPrice) params.set("min", minPrice);
    if (maxPrice) params.set("max", maxPrice);
    if (sortBy) params.set("sort", sortBy);
    if (selectedBrand) params.set("brand", String(selectedBrand));
    if (selectedModel) params.set("model", String(selectedModel));
    if (selectedYear) params.set("year", String(selectedYear));

    const queryString = params.toString();
    const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;

    router.replace(nextUrl, { scroll: false });
  }, [
    searchTerm,
    selectedCategoryId,
    selectedProductLineId,
    minPrice,
    maxPrice,
    sortBy,
    selectedBrand,
    selectedModel,
    selectedYear,
    pathname,
    router,
  ]);

  useEffect(() => {
    setIsFiltering(true);

    const timeout = setTimeout(() => {
      setIsFiltering(false);
    }, 180);

    return () => clearTimeout(timeout);
  }, [
    searchTerm,
    minPrice,
    maxPrice,
    selectedCategoryId,
    selectedProductLineId,
    sortBy,
    selectedBrand,
    selectedModel,
    selectedYear,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    minPrice,
    maxPrice,
    selectedCategoryId,
    selectedProductLineId,
    sortBy,
    selectedBrand,
    selectedModel,
    selectedYear,
  ]);

  function toggleGroup(groupName: string) {
    setExpandedGroups((prev) => {
      const isOpen = prev[groupName] ?? false;

      if (isOpen) {
        return {};
      }

      return {
        [groupName]: true,
      };
    });
  }

  const activeCategory = useMemo(() => {
    if (!selectedCategoryId) return null;

    return categoryTree.find((category) => category.id === selectedCategoryId);
  }, [categoryTree, selectedCategoryId]);

  const activeProductLine = useMemo(() => {
    if (!selectedProductLineId) return null;

    for (const category of categoryTree) {
      const child = category.children.find(
        (line) => line.id === selectedProductLineId
      );

      if (child) {
        return child;
      }
    }

    return null;
  }, [categoryTree, selectedProductLineId]);

  const filteredProducts = useMemo(() => {
    return catalogProducts;
  }, [catalogProducts]);

  const totalPages = backendTotalPages;
  const paginatedProducts = catalogProducts;

  const hasActiveFilters =
    searchTerm ||
    minPrice ||
    maxPrice ||
    selectedCategoryId ||
    selectedProductLineId ||
    sortBy ||
    selectedBrand ||
    selectedModel ||
    selectedYear;

  function clearFilters() {
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setSelectedCategoryId(null);
    setSelectedProductLineId(null);
    setSortBy("");
    setSelectedBrand(null);
    setSelectedModel(null);
    setModels([]);
    setSelectedYear(null);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <aside className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            Categorías
          </h2>

          {(selectedCategoryId || selectedProductLineId) && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategoryId(null);
                setSelectedProductLineId(null);
              }}
              className="text-xs text-slate-400 hover:text-slate-200"
            >
              Todas
            </button>
          )}
        </div>

        <div className="space-y-2">
          {categoryTree.map((category) => {
            const isExpanded = expandedGroups[category.name] ?? false;

            const groupIsActive =
              selectedCategoryId === category.id ||
              category.children.some(
                (child) => child.id === selectedProductLineId
              );

            return (
              <div
                key={category.id}
                className="rounded-xl border border-slate-800 bg-slate-950/60 p-2"
              >
                <button
                  type="button"
                  onClick={() => {
                    toggleGroup(category.name);
                    setSelectedCategoryId(category.id);
                    setSelectedProductLineId(null);
                  }}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg px-2 py-2 text-left transition ${
                    groupIsActive
                      ? "bg-slate-800 text-white"
                      : "text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-700 bg-slate-800 text-xs font-bold text-slate-300">
                              <span className="absolute">
                                {category.name.slice(0, 2)}
                              </span>

                              {category.imageUrl && (
                                <img
                                  src={getAssetUrl(category.imageUrl)}
                                  alt={category.name}
                                  onError={(event) => {
                                    event.currentTarget.style.display = "none";
                                  }}
                                  className="relative z-10 h-full w-full object-cover"
                                />
                              )}
                            </div>

                    <span className="text-sm font-semibold">
                      {category.name}
                    </span>
                  </div>

                  <span className="text-xs text-slate-400">
                    {isExpanded ? "▼" : "▶"}
                  </span>
                </button>

                {isExpanded && (
                  <div className="ml-6 mt-2 space-y-1 border-l border-slate-800 pl-3">
                    {category.children.map((child) => {
                      const isSelected = selectedProductLineId === child.id;

                      return (
                        <button
                          key={child.id}
                          type="button"
                          onClick={() => {
                            setSelectedCategoryId(null);
                            setSelectedProductLineId(child.id);
                          }}
                          className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm transition ${
                            isSelected
                              ? "bg-slate-700 text-white"
                              : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                          }`}
                        >
                          <span className="text-slate-600">└</span>
                          <span>{child.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>

      <section>
        <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-5">
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
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Buscar por nombre, código o descripción..."
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-slate-500"
              />
            </div>

            <div>
              <button
                type="button"
                onClick={() => setIsVehicleFiltersOpen((prev) => !prev)}
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
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setSelectedBrand(val || null);
                        setSelectedModel(null);
                      }}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-slate-200"
                    >
                      <option value="">Todas</option>
                      {brands.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name}
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
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setSelectedModel(val || null);
                      }}
                      disabled={!selectedBrand}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-slate-200 disabled:opacity-50"
                    >
                      <option value="">Todos</option>
                      {models.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name}
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
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setSelectedYear(val || null);
                      }}
                      className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-slate-200"
                    >
                      <option value="">Todos</option>
                      {Array.from({ length: 25 }, (_, i) => {
                        const year = 2025 - i;
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
                onClick={() => setIsMoreFiltersOpen((prev) => !prev)}
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
                      onChange={(event) => setMinPrice(event.target.value)}
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
                      onChange={(event) => setMaxPrice(event.target.value)}
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
              onClick={clearFilters}
              className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-slate-400">
            Mostrando {catalogProducts.length} de {totalProducts} resultados
          </p>

          <div className="flex items-center gap-2">
            <label htmlFor="sort-by" className="text-sm text-slate-400">
              Ordenar:
            </label>

            <select
              id="sort-by"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-slate-500"
            >
              <option value="">Sin orden</option>
              <option value="name-asc">Nombre A-Z</option>
              <option value="name-desc">Nombre Z-A</option>
              <option value="price-asc">Precio menor a mayor</option>
              <option value="price-desc">Precio mayor a menor</option>
            </select>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="mb-6 flex flex-wrap gap-2">
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="flex items-center gap-2 rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-200 hover:bg-slate-700"
              >
                Buscar: {searchTerm}
                <span>✕</span>
              </button>
            )}

            {activeCategory && (
              <button
                type="button"
                onClick={() => setSelectedCategoryId(null)}
                className="flex items-center gap-2 rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-200 hover:bg-slate-700"
              >
                Categoría: {activeCategory.name}
                <span>✕</span>
              </button>
            )}

            {activeProductLine && (
              <button
                type="button"
                onClick={() => setSelectedProductLineId(null)}
                className="flex items-center gap-2 rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-200 hover:bg-slate-700"
              >
                Línea: {activeProductLine.name}
                <span>✕</span>
              </button>
            )}

            {selectedBrand && (
              <button
                type="button"
                onClick={() => {
                  setSelectedBrand(null);
                  setSelectedModel(null);
                  setModels([]);
                }}
                className="flex items-center gap-2 rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-200 hover:bg-slate-700"
              >
                {brands.find((b) => b.id === selectedBrand)?.name}
                <span>✕</span>
              </button>
            )}

            {selectedModel && (
              <button
                type="button"
                onClick={() => setSelectedModel(null)}
                className="flex items-center gap-2 rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-200 hover:bg-slate-700"
              >
                {models.find((m) => m.id === selectedModel)?.name}
                <span>✕</span>
              </button>
            )}

            {selectedYear && (
              <button
                type="button"
                onClick={() => setSelectedYear(null)}
                className="flex items-center gap-2 rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-200 hover:bg-slate-700"
              >
                Año: {selectedYear}
                <span>✕</span>
              </button>
            )}

            {minPrice && (
              <button
                type="button"
                onClick={() => setMinPrice("")}
                className="flex items-center gap-2 rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-200 hover:bg-slate-700"
              >
                Min: {minPrice}
                <span>✕</span>
              </button>
            )}

            {maxPrice && (
              <button
                type="button"
                onClick={() => setMaxPrice("")}
                className="flex items-center gap-2 rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-200 hover:bg-slate-700"
              >
                Max: {maxPrice}
                <span>✕</span>
              </button>
            )}

            {sortBy && (
              <button
                type="button"
                onClick={() => setSortBy("")}
                className="flex items-center gap-2 rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-200 hover:bg-slate-700"
              >
                Orden aplicado
                <span>✕</span>
              </button>
            )}
          </div>
        )}

        {isFiltering ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-4">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-200 disabled:opacity-40 hover:bg-slate-800"
                >
                  Anterior
                </button>

                <span className="text-sm text-slate-300">
                  Página {currentPage} de {totalPages}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-200 disabled:opacity-40 hover:bg-slate-800"
                >
                  Siguiente
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-300">
            No se encontraron productos con los filtros seleccionados.

            <div className="mt-4">
              <button
                onClick={clearFilters}
                className="rounded-lg bg-slate-700 px-4 py-2 text-sm hover:bg-slate-600"
              >
                Limpiar filtros
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}