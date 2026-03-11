export default function ProductNotFoundPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded-2xl border border-red-900 bg-slate-900 p-8">
          <h1 className="mb-4 text-3xl font-bold">
            Producto no encontrado
          </h1>

          <p className="text-slate-300">
            El producto que intentaste abrir no existe o no está disponible.
          </p>
        </div>
      </section>
    </main>
  );
}