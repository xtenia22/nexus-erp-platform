import { Product } from "@/types/product";

export async function getHealth() {
  const response = await fetch("http://localhost:3001/api/health");
  
  if (!response.ok) {
    throw new Error("API Request failed");
  }
  
  return response.json();
}

export async function getProducts(): Promise<Product[]> {
  const response = await fetch("http://localhost:3001/api/products");

  if (!response.ok) {
    throw new Error("Products request failed");
  }

  return response.json();
}