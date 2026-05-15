import { ProductCatalog } from "@/components/catalog/product-catalog";
import { getProducts, getCategories, getBrands } from "@/services/api";
import {company} from "@/companyLayer/company.config";

export default async function ProductsPage() {
  const productsResponse = await getProducts();
  const products = productsResponse.items;

  const categories = await getCategories();
  const brands = await getBrands();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-slate-400">
            {company.content.catalog.eyeBrow}
          </p>

          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            {company.content.catalog.title}
          </h1>

          <p className="max-w-2xl text-slate-300">
           {company.content.catalog.subtitle}
          </p>
        </div>

        <ProductCatalog
          products={products}
          categoryTreeInitial={categories}
          brandsInitial={brands}
        />
      </section>
    </main>
  );
}