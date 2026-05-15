"use client";

import { useMemo, useState, useEffect } from "react";
import { ProductCard } from "@/components/catalog/product-card";
import { Product } from "@/types/product";
import { getAssetUrl } from "@/lib/assets";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProductCardSkeleton } from "@/components/catalog/product-card-skeleton";
import {
  getModels,
  getProducts,
   type CategoryTreeItem,
} from "@/services/api";


import { CategorySidebar } from "@/components/catalog/category-sidebar";
import { FilterPanel } from "@/components/catalog/filter-panel";
import { companyStyles } from "@/companyLayer/company.styles";
import { company } from "@/companyLayer/company.config";


type ProductCatalogProps = {
  products: Product[];
  categoryTreeInitial: CategoryTreeItem[];
  brandsInitial: any[];
};

export function ProductCatalog({products,categoryTreeInitial, brandsInitial,}: ProductCatalogProps) {
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

  const [brands, setBrands] = useState<any[]>(brandsInitial);
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
 
  const [categoryTree, setCategoryTree] =  useState<CategoryTreeItem[]>(categoryTreeInitial);

  const [isVehicleFiltersOpen, setIsVehicleFiltersOpen] = useState(false);
  const [isMoreFiltersOpen, setIsMoreFiltersOpen] = useState(false);

  const catalogLabels = company.content.catalog;

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
    <div className="flex flex-col gap-4 lg:grid lg:grid-cols-[260px_1fr] lg:gap-8">

    <div className="hidden lg:block">
    <CategorySidebar
            variant="desktop"
            categoryTree={categoryTree}
            selectedCategoryId={selectedCategoryId}
            selectedProductLineId={selectedProductLineId}
            expandedGroups={expandedGroups}
            onToggleGroup={toggleGroup}
            onSelectCategory={(categoryId) => {
              setSelectedCategoryId(categoryId);
              setSelectedProductLineId(null);
            }}
            onSelectProductLine={(productLineId) => {
              setSelectedCategoryId(null);
              setSelectedProductLineId(productLineId);
            }}
            onClearCategory={() => {
              setSelectedCategoryId(null);
              setSelectedProductLineId(null);
            }}
          />
        </div>
      <section>
      <FilterPanel
          searchTerm={searchTerm}
          minPrice={minPrice}
          maxPrice={maxPrice}
          
          brands={brands}
          models={models}
          selectedBrand={selectedBrand}
          selectedModel={selectedModel}
          selectedYear={selectedYear}
          isFiltering={isFiltering}
          isVehicleFiltersOpen={isVehicleFiltersOpen}
          isMoreFiltersOpen={isMoreFiltersOpen}
          hasActiveFilters={hasActiveFilters}
          onSearchChange={setSearchTerm}
          onMinPriceChange={setMinPrice}
          onMaxPriceChange={setMaxPrice}
          
          onBrandChange={(brandId) => {
            setSelectedBrand(brandId);
            setSelectedModel(null);
          }}
          onModelChange={setSelectedModel}
          onYearChange={setSelectedYear}
          onToggleVehicleFilters={() =>
            setIsVehicleFiltersOpen((prev) => !prev)
          }
          onToggleMoreFilters={() =>
            setIsMoreFiltersOpen((prev) => !prev)
          }
          onClearFilters={clearFilters}
        />

        <div className="mb-4 lg:hidden">
            <CategorySidebar
              variant="mobile"  
              categoryTree={categoryTree}
              selectedCategoryId={selectedCategoryId}
              selectedProductLineId={selectedProductLineId}
              expandedGroups={expandedGroups}
              onToggleGroup={toggleGroup}
              onSelectCategory={(categoryId) => {
                setSelectedCategoryId(categoryId);
                setSelectedProductLineId(null);
              }}
              onSelectProductLine={(productLineId) => {
                setSelectedCategoryId(null);
                setSelectedProductLineId(productLineId);
              }}
              onClearCategory={() => {
                setSelectedCategoryId(null);
                setSelectedProductLineId(null);
              }}
            />
          </div>

      <div className="mb-3 flex items-center justify-between gap-3">
          <p className="min-w-0 text-xs text-slate-400 md:text-sm">
            <span className="hidden sm:inline">
              {catalogLabels.resultsSummary.showing}{" "}
            </span>

            <span className="font-medium text-slate-200">
              {catalogProducts.length}
            </span>{" "}
            {catalogLabels.resultsSummary.of}{" "}
            <span className="font-medium text-slate-200">
              {totalProducts}
            </span>{" "}
            <span className="hidden sm:inline">
              {catalogLabels.resultsSummary.results}
            </span>
          </p>

          <div className="flex shrink-0 items-center gap-2">
            <label
              htmlFor="sort-by"
              className="hidden text-xs text-slate-400 sm:block md:text-sm"
            >
              {catalogLabels.sorting.label}:
            </label>

            <select
              id="sort-by"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="w-[135px] rounded-xl border border-slate-700 bg-slate-950 px-2.5 py-2 text-xs text-slate-100 outline-none transition focus:border-slate-500 md:w-[170px] md:px-3 md:text-sm"
            >
              <option value="">{catalogLabels.sorting.defaultOption}</option>
              <option value="name-asc">{catalogLabels.sorting.nameAsc}</option>
              <option value="name-desc">{catalogLabels.sorting.nameDesc}</option>
              <option value="price-asc">{catalogLabels.sorting.priceAsc}</option>
              <option value="price-desc">{catalogLabels.sorting.priceDesc}</option>
            </select>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="mb-4 flex flex-wrap gap-1.5 lg:mb-6 lg:gap-2">
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition hover:opacity-90 lg:gap-2 lg:px-3 lg:text-sm"
                  style={{
                    borderColor: companyStyles.primaryColor,
                    color: companyStyles.primaryColor,
                  }}
              >
               { catalogLabels.activeFilters.searchPrefix}: {searchTerm}
                <span className="text-[10px] opacity-70 lg:text-xs">✕</span>
              </button>
            )}

            {activeCategory && (
              <button
                type="button"
                onClick={() => setSelectedCategoryId(null)}
                className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition hover:opacity-90 lg:gap-2 lg:px-3 lg:text-sm"
                  style={{
                    borderColor: companyStyles.primaryColor,
                    color: companyStyles.primaryColor,
                  }}
              >
                {catalogLabels.activeFilters.categoryPrefix}: {activeCategory.name}
               <span className="text-[10px] opacity-70 lg:text-xs">✕</span>
              </button>
            )}

            {activeProductLine && (
              <button
                type="button"
                onClick={() => setSelectedProductLineId(null)}
               className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition hover:opacity-90 lg:gap-2 lg:px-3 lg:text-sm"
                style={{
                  borderColor: companyStyles.primaryColor,
                  color: companyStyles.primaryColor,
                }}
              >
                {catalogLabels.activeFilters.productLinePrefix}: {activeProductLine.name}
                <span className="text-[10px] opacity-70 lg:text-xs">✕</span>
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
               className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition hover:opacity-90 lg:gap-2 lg:px-3 lg:text-sm"
                style={{
                  borderColor: companyStyles.primaryColor,
                  color: companyStyles.primaryColor,
                }}
              >
                {brands.find((b) => b.id === selectedBrand)?.name}
                <span className="text-[10px] opacity-70 lg:text-xs">✕</span>
              </button>
            )}

            {selectedModel && (
              <button
                type="button"
                onClick={() => setSelectedModel(null)}
                className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition hover:opacity-90 lg:gap-2 lg:px-3 lg:text-sm"
                    style={{
                      borderColor: companyStyles.primaryColor,
                      color: companyStyles.primaryColor,
                    }}
              >
                {models.find((m) => m.id === selectedModel)?.name}
               <span className="text-[10px] opacity-70 lg:text-xs">✕</span>
              </button>
            )}

            {selectedYear && (
              <button
                type="button"
                onClick={() => setSelectedYear(null)}
              className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition hover:opacity-90 lg:gap-2 lg:px-3 lg:text-sm"
                  style={{
                    borderColor: companyStyles.primaryColor,
                    color: companyStyles.primaryColor,
                  }}
              >
                {catalogLabels.activeFilters.yearPrefix}: {selectedYear}
                <span className="text-[10px] opacity-70 lg:text-xs">✕</span>
              </button>
            )}

            {minPrice && (
              <button
                type="button"
                onClick={() => setMinPrice("")}
             className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition hover:opacity-90 lg:gap-2 lg:px-3 lg:text-sm"
                style={{
                  borderColor: companyStyles.primaryColor,
                  color: companyStyles.primaryColor,
                }}
              >
                {catalogLabels.activeFilters.minPricePrefix}: {minPrice}
               <span className="text-[10px] opacity-70 lg:text-xs">✕</span>
              </button>
            )}

            {maxPrice && (
              <button
                type="button"
                onClick={() => setMaxPrice("")}
              className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition hover:opacity-90 lg:gap-2 lg:px-3 lg:text-sm"
                style={{
                  borderColor: companyStyles.primaryColor,
                  color: companyStyles.primaryColor,
                }}
              >
                {catalogLabels.activeFilters.maxPricePrefix}: {maxPrice}
                <span className="text-[10px] opacity-70 lg:text-xs">✕</span>
              </button>
            )}

            {sortBy && (
              <button
                type="button"
                onClick={() => setSortBy("")}
                className="flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition hover:opacity-90 lg:gap-2 lg:px-3 lg:text-sm"
                style={{
                  borderColor: companyStyles.primaryColor,
                  color: companyStyles.primaryColor,
                }}
              >
                {catalogLabels.activeFilters.sortApplied}
               <span className="text-[10px] opacity-70 lg:text-xs">✕</span>
              </button>
            )}
          </div>
        )}

        {isFiltering ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                  {catalogLabels.pagination.previous}
                </button>

                <span className="text-sm text-slate-300">
                  {catalogLabels.pagination.pageLabel} {currentPage}{" "}
                  {catalogLabels.pagination.ofLabel} {totalPages}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-200 disabled:opacity-40 hover:bg-slate-800"
                >
                  {catalogLabels.pagination.next}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-slate-300">
            {catalogLabels.emptyState.message}

            <div className="mt-4">
              <button
                onClick={clearFilters}
                className="rounded-lg bg-slate-700 px-4 py-2 text-sm hover:bg-slate-600"
              >
                {catalogLabels.emptyState.clearFilters}
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}