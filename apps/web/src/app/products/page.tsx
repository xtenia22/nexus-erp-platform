
import { ProductCard } from "@/components/catalog/product-card";
import { getProducts } from "@/services/api";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-slate-400">
            Catálogo
          </p>

          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            Productos
          </h1>

          <p className="max-w-2xl text-slate-300">
            Listado de productos obtenido desde la API del backend.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}