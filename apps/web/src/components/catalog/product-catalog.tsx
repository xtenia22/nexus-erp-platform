"use client";

import { useMemo, useState, useEffect } from "react";
import { ProductCard } from "@/components/catalog/product-card";
import { Product } from "@/types/product";
import { getBrands,getModels } from "@/services/api";
import { getAssetUrl } from "@/lib/assets";
import {usePathname,useRouter,useSearchParams} from "next/navigation";
import { ProductCardSkeleton } from "@/components/catalog/product-card-skeleton";
import { getProducts } from "@/services/api";

type ProductCatalogProps = {
  products: Product[];
};

export function ProductCatalog({ products }: ProductCatalogProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const ITEMS_PER_PAGE = 12;
 




  const [isFiltering, setIsFiltering] = useState(false);
 
  // const [searchTerm, setSearchTerm] = useState("");



  const [searchTerm, setSearchTerm] = useState(
  () => searchParams.get("search") ?? ""
  );

 const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

//  const [minPrice, setMinPrice] = useState("");

  const [minPrice, setMinPrice] = useState(
  () => searchParams.get("min") ?? ""
   );

//  const [maxPrice, setMaxPrice] = useState("");
  
  const [maxPrice, setMaxPrice] = useState(
  () => searchParams.get("max") ?? ""
  );

//  const [selectedCategory, setSelectedCategory] = useState("");

  const [selectedCategory, setSelectedCategory] = useState(
  () => searchParams.get("category") ?? ""
  );

 // const [sortBy,setSortBy]   = useState("");

  const [sortBy, setSortBy] = useState(
  () => searchParams.get("sort") ?? ""
  );

  const [currentPage, setCurrentPage] = useState(1);

  const [brands, setBrands] = useState<any[]>([]);

  const [models, setModels] = useState<any[]>([]);

//  const [selectedBrand, setSelectedBrand] = useState<number | null>(null); 
  const [selectedBrand, setSelectedBrand] = useState<number | null>(() => {
  const brand = searchParams.get("brand");
  return brand ? Number(brand) : null;
    });


//  const [selectedModel, setSelectedModel] = useState<number | null>(null);
  const [selectedModel, setSelectedModel] = useState<number | null>(() => {
  const model = searchParams.get("model");
  return model ? Number(model) : null;
    });  

  
    //const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const [selectedYear, setSelectedYear] = useState<number | null>(() => {
  const year = searchParams.get("year");
  return year ? Number(year) : null;
    });

  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [catalogProducts, setCatalogProducts] = useState(products);  
  const [totalProducts, setTotalProducts] = useState(products.length);
  const [backendTotalPages, setBackendTotalPages] = useState(1);
  

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
        category: selectedCategory,
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
  selectedCategory,
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
  if (selectedCategory) params.set("category", selectedCategory);
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
  selectedCategory,
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
  selectedCategory,
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

function splitCategoryName(category: string) {
  const parts = category.trim().split(" ");

  if (parts.length === 1) {
    return {
      parent: category,
      child: category,
    };
  }

  return {
    parent: parts[0],
    child: parts.slice(1).join(" "),
  };
}


const categoryGroups = useMemo(() => {
  const groups = new Map<
    string,
    {
      name: string;
      imageUrl: string | null;
      children: {
        name: string;
        label: string;
        imageUrl: string | null;
      }[];
    }
  >();

  products.forEach((product) => {
    const { parent, child } = splitCategoryName(product.category);
    const imageUrl = getAssetUrl(product.image1Url);

    if (!groups.has(parent)) {
      groups.set(parent, {
        name: parent,
        imageUrl,
        children: [],
      });
    }

    const group = groups.get(parent)!;

    if (!group.children.some((item) => item.name === product.category)) {
      group.children.push({
        name: product.category,
        label: child,
        imageUrl,
      });
    }
  });

  return Array.from(groups.values())
    .map((group) => ({
      ...group,
      children: group.children.sort((a, b) =>
        a.label.localeCompare(b.label)
      ),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}, [products]);



const filteredProducts = useMemo(() => {
  return catalogProducts;
}, [catalogProducts]);


const totalPages = backendTotalPages;
const paginatedProducts = catalogProducts;

useEffect(() => {
  setCurrentPage(1);
}, [searchTerm, minPrice, maxPrice, selectedCategory, sortBy, selectedBrand,  selectedModel, selectedYear,]);


  const hasActiveFilters = searchTerm || minPrice || maxPrice || selectedCategory || sortBy || selectedBrand ||  selectedModel || selectedYear;

  function clearFilters() {
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setSelectedCategory("");
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

          {selectedCategory && (
            <button
              type="button"
              onClick={() => setSelectedCategory("")}
              className="text-xs text-slate-400 hover:text-slate-200"
            >
              Todas
            </button>
          )}
        </div>

        <div className="space-y-2">
          {categoryGroups.map((group) => {
             const isExpanded = expandedGroups[group.name] ?? false;             
             const groupIsActive =
                selectedCategory === group.name ||
                group.children.some((child) => child.name === selectedCategory);

               return (
                <div key={group.name} className="rounded-xl border border-slate-800 bg-slate-950/60 p-2">
                 <button
                      type="button"
                      onClick={() => toggleGroup(group.name)}
                      className={`flex w-full items-center justify-between gap-3 rounded-lg px-2 py-2 text-left transition ${
                        groupIsActive
                          ? "bg-slate-800 text-white"
                          : "text-slate-300 hover:bg-slate-800"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 overflow-hidden rounded-full border border-slate-700 bg-slate-950">
                          {group.imageUrl ? (
                            <img
                              src={group.imageUrl}
                              alt={group.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full bg-slate-800" />
                          )}
                        </div>

                        <span className="text-sm font-semibold">{group.name}</span>
                      </div>

                      <span className="text-xs text-slate-400">
                        {isExpanded ? "▼" : "▶"}
                      </span>
                    </button>
                    {isExpanded && (
                    <div className="ml-6 mt-2 space-y-1 border-l border-slate-800 pl-3">
                      {group.children.map((child) => {
                        const isSelected = selectedCategory === child.name;

                        return (
                          <button
                            key={child.name}
                            type="button"
                            onClick={() => setSelectedCategory(child.name)}
                            className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm transition ${
                              isSelected
                                ? "bg-slate-700 text-white"
                                : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                            }`}
                          >
                            <span className="text-slate-600">└</span>
                            <span>{child.label}</span>
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
          className={`grid gap-4 md:grid-cols-2 lg:grid-cols-3 transition-all duration-200 ${
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
              placeholder="Buscar por nombre..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-slate-500"
            />
          </div>



          <div>
          <label className="block text-sm text-slate-300 mb-1">Marca</label>
          <select
            value={selectedBrand ?? ""}
            onChange={(e) => {
              const val = Number(e.target.value);
              setSelectedBrand(val || null);
              setSelectedModel(null);
            }}
            className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-slate-200"
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
          <label className="block text-sm text-slate-300 mb-1">Modelo</label>
          <select
            value={selectedModel ?? ""}
            onChange={(e) => {
              const val = Number(e.target.value);
              setSelectedModel(val || null);
            }}
            disabled={!selectedBrand}
            className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-slate-200"
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
          <label className="block text-sm text-slate-300 mb-1">Año</label>
          <select
            value={selectedYear ?? ""}
            onChange={(e) => {
              const val = Number(e.target.value);
              setSelectedYear(val || null);
            }}
            className="w-full rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-slate-200"
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
            className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      <p className="mb-4 text-sm text-slate-400">
       Mostrando {catalogProducts.length} de {totalProducts} resultados
      </p>

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

          {selectedCategory && (
            <button
              type="button"
              onClick={() => setSelectedCategory("")}
              className="flex items-center gap-2 rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-200 hover:bg-slate-700"
            >
              {selectedCategory}
              <span>✕</span>
            </button>
          )}

          {selectedBrand && (
            <button
              type="button"
              onClick={() => {
                setSelectedBrand(null);
                setSelectedModel(null);
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
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
      onClick={() => {
        setSearchTerm("");
        setMinPrice("");
        setMaxPrice("");
        setSelectedCategory("");
        setSortBy("");
        setSelectedBrand(null);
        setSelectedModel(null);
        setSelectedYear(null);
        setModels([]);
      }}
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