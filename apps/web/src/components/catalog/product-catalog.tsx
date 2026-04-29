"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/catalog/product-card";
import { Product } from "@/types/product";

type ProductCatalogProps = {
  products: Product[];
};

export function ProductCatalog({ products }: ProductCatalogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy,setSortBy]   = useState("");


  const categories = useMemo(() => {
    return Array.from(new Set(products.map((product) => product.category)));
  }, [products]);

  const filteredProducts = useMemo(() => {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  const searchWords = normalizedSearch
    .split(" ")
    .filter((word) => word.length > 0);

  const min = minPrice ? Number(minPrice) : null;
  const max = maxPrice ? Number(maxPrice) : null;

  const result = products.filter((product) => {
    const productName = product.name.toLowerCase();

    const matchesSearch =
      searchWords.length === 0 ||
      searchWords.every((word) => productName.includes(word));

    const matchesMinPrice = min === null || product.price >= min;
    const matchesMaxPrice = max === null || product.price <= max;

    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;

    return (
      matchesSearch &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesCategory
    );
  });

  return result.sort((a, b) => {
    switch (sortBy) {
      case "name-asc":
        return a.name.localeCompare(b.name);

      case "name-desc":
        return b.name.localeCompare(a.name);

      case "price-asc":
        return a.price - b.price;

      case "price-desc":
        return b.price - a.price;

      default:
        return 0;
    }
  });
}, [products, searchTerm, minPrice, maxPrice, selectedCategory, sortBy]);

  const hasActiveFilters = searchTerm || minPrice || maxPrice || selectedCategory || sortBy;

  function clearFilters() {
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setSelectedCategory("");
    setSortBy("");
  }

  return (
    <div>
      <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <div className="grid gap-4 md:grid-cols-5">
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
              placeholder="Buscar por nombre..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-slate-500"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Categoría
            </label>

            <select
              id="category"
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-slate-500"
            >
              <option value="">Todas</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
                htmlFor="sort-by"
                className="mb-2 block text-sm font-medium text-slate-300"
            >
                Ordenar por
            </label>

            <select
                id="sort-by"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-slate-500"
            >
                <option value="">Sin orden</option>
                <option value="name-asc">Nombre A-Z</option>
                <option value="name-desc">Nombre Z-A</option>
                <option value="price-asc">Precio menor a mayor</option>
                <option value="price-desc">Precio mayor a menor</option>
            </select>
           </div>      

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

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="mt-4 rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-800"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      <p className="mb-4 text-sm text-slate-400">
        Mostrando {filteredProducts.length} de {products.length} productos
      </p>

      {filteredProducts.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-300">
          No se encontraron productos para la búsqueda o filtros aplicados.
        </div>
      )}
    </div>
  );
}