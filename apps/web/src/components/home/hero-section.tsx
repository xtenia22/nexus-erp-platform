import Link from "next/link";

export function HeroSection() {
  return (
    <section className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center">
        <div>
          <div className="mb-4 inline-flex rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-sm text-slate-300">
            Plataforma comercial e institucional
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-50 md:text-6xl">
            Catálogo web, cuentas de usuario y gestión comercial en un solo lugar
          </h1>

          <p className="mb-8 max-w-xl text-lg leading-8 text-slate-300">
            Una plataforma moderna para mostrar productos, presentar la empresa
            y habilitar operaciones privadas para usuarios autorizados.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/products"
              className="rounded-xl bg-white px-5 py-3 font-medium text-slate-900 transition hover:opacity-90"
            >
              Ver catálogo
            </Link>

            <Link
              href="#about"
              className="rounded-xl border border-slate-700 px-5 py-3 font-medium text-slate-100 transition hover:bg-slate-800"
            >
              Conocer más
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="mb-4 text-sm text-slate-400">Vista previa del proyecto</p>

            <div className="space-y-3">
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-slate-200">
                Catálogo público con productos y filtros
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-slate-200">
                Área privada con login y roles
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-slate-200">
                Integración con sistema empresarial vía API
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}