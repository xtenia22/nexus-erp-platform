import Link from "next/link";

export function CatalogSection() {
  return (
    <section className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-slate-400">
              Catálogo
            </p>

            <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-50 md:text-4xl">
              Mostrá productos, categorías y futuros filtros desde una base moderna
            </h2>

            <p className="leading-8 text-slate-300">
              El catálogo público será el punto de entrada para explorar productos,
              ver detalles, aplicar filtros y más adelante operar con usuarios logueados.
            </p>
          </div>

          <Link
            href="/products"
            className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-medium text-slate-100 transition hover:bg-slate-800"
          >
            Ir al catálogo
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="mb-2 text-sm text-slate-400">Sección futura</p>
            <h3 className="text-xl font-semibold text-slate-100">
              Búsqueda avanzada
            </h3>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="mb-2 text-sm text-slate-400">Sección futura</p>
            <h3 className="text-xl font-semibold text-slate-100">
              Filtros por categoría
            </h3>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="mb-2 text-sm text-slate-400">Sección futura</p>
            <h3 className="text-xl font-semibold text-slate-100">
              Productos destacados
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}