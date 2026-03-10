export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-16">
        <div className="mb-6 inline-flex w-fit rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-sm text-slate-300">
          Proyecto personal en construcción
        </div>

        <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
          Nexus ERP Platform
        </h1>

        <p className="mb-8 max-w-2xl text-lg leading-8 text-slate-300">
          Plataforma web moderna conectada a un sistema empresarial mediante API,
          construida para aprender arquitectura, frontend, backend y buenas
          prácticas de desarrollo profesional.
        </p>

        <div className="flex flex-wrap gap-4">
          <button className="rounded-xl bg-white px-5 py-3 font-medium text-slate-900 transition hover:opacity-90">
            Ver proyecto
          </button>

          <button className="rounded-xl border border-slate-600 px-5 py-3 font-medium text-slate-100 transition hover:bg-slate-800">
            Documentación
          </button>
        </div>
      </section>
    </main>
  );
}