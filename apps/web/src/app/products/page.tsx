import { getProducts } from "@/services/api";  

export default async function ProductsPage() {
  const products = await getProducts(); 
 return ( 
 <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Productos</h1>

        <p className="mb-10 text-slate-300">
          Listado de productos obtenido desde la API del backend.
        </p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm"
            >
              <p className="mb-2 text-sm text-slate-400">
                ID: {product.id}
              </p>

              <h2 className="mb-3 text-xl font-semibold">
                {product.name}
              </h2>

              <p className="text-lg text-green-400">
                USD {product.price}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}