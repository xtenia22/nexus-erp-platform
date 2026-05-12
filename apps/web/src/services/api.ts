import { Product } from "@/types/product";



function getApiUrl() {
  if (typeof window === "undefined") {
    return process.env.API_URL || "http://api:3001/api";
  }

  return (
    process.env.NEXT_PUBLIC_API_URL ||
    `${window.location.protocol}//${window.location.hostname}:3001/api`
  );
}

type ProductFilters = {
  search?: string;
  categoryId?: number | null;
  productLineId?: number | null;
  brand?: number | null;
  model?: number | null;
  year?: number | null;
  min?: string;
  max?: string;
  sort?: string;
  page?: number;
  limit?: number;
};

export async function getHealth() {
  const response = await fetch(`${getApiUrl()}/health`);

  if (!response.ok) {
    throw new Error("API Request failed");
  }

  return response.json();
}

export async function getProducts(filters: ProductFilters = {}) {
  const params = new URLSearchParams();

  if (filters.search) params.set("search", filters.search);
  if (filters.brand) params.set("brand", String(filters.brand));
  if (filters.model) params.set("model", String(filters.model));
  if (filters.year) params.set("year", String(filters.year));
  if (filters.categoryId) params.set("categoryId", String(filters.categoryId));
  if (filters.productLineId) params.set("productLineId", String(filters.productLineId));
  if (filters.min) params.set("min", filters.min);
  if (filters.max) params.set("max", filters.max);
  if (filters.sort) params.set("sort", filters.sort);
  if (filters.page) params.set("page", String(filters.page));
  if (filters.limit) params.set("limit", String(filters.limit));


  const queryString = params.toString();

  const response = await fetch(
    `${getApiUrl()}/products${queryString ? `?${queryString}` : ""}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("No se pudieron obtener los productos");
  }

  return response.json();
}

export async function getProductById(id: string): Promise<Product | null> {
  const response = await fetch(`${getApiUrl()}/products/${id}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Product request failed");
  }

  return response.json();
}

export async function getBrands() {
  const response = await fetch(`${getApiUrl()}/products/brands`);

  if (!response.ok) {
    throw new Error("Brands request failed");
  }

  return response.json();
}

export async function getModels(brandId: number) {
  if (!brandId) return [];

  const response = await fetch(`${getApiUrl()}/products/models?brandId=${brandId}`);

  if (!response.ok) {
    throw new Error("Models request failed");
  }

  return response.json();
}

export type CategoryTreeItem = {
  id : number;
  erpId: number;
  name: string;
  imageUrl: string | null;
  children: {
    id: number;
    erpId: number;
    name: string;
  }[];
};

export async function getCategories(): Promise<CategoryTreeItem[]> {
 
  const response = await fetch(`${getApiUrl()}/products/categories`, {
   cache:"no-store",
  });

  if (!response.ok) {
    throw new Error("Categories request failed");
  }

  return response.json();
}

