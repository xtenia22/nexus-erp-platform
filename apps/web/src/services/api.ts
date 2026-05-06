import { Product } from "@/types/product";

const API_URL = "http://localhost:3001/api";

type ProductFilters = {
  search?: string;
  category?: string;
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
  const response = await fetch(`${API_URL}/health`);

  if (!response.ok) {
    throw new Error("API Request failed");
  }

  return response.json();
}

export async function getProducts(filters: ProductFilters = {}) {
  const params = new URLSearchParams();

  if (filters.search) params.set("search", filters.search);
  if (filters.category) params.set("category", filters.category);
  if (filters.brand) params.set("brand", String(filters.brand));
  if (filters.model) params.set("model", String(filters.model));
  if (filters.year) params.set("year", String(filters.year));
  if (filters.min) params.set("min", filters.min);
  if (filters.max) params.set("max", filters.max);
  if (filters.sort) params.set("sort", filters.sort);
  if (filters.page) params.set("page", String(filters.page));
  if (filters.limit) params.set("limit", String(filters.limit));


  const queryString = params.toString();

  const response = await fetch(
    `${API_URL}/products${queryString ? `?${queryString}` : ""}`,
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
  const response = await fetch(`${API_URL}/products/${id}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Product request failed");
  }

  return response.json();
}

export async function getBrands() {
  const response = await fetch(`${API_URL}/products/brands`);

  if (!response.ok) {
    throw new Error("Brands request failed");
  }

  return response.json();
}

export async function getModels(brandId: number) {
  if (!brandId) return [];

  const response = await fetch(`${API_URL}/products/models?brandId=${brandId}`);

  if (!response.ok) {
    throw new Error("Models request failed");
  }

  return response.json();
}