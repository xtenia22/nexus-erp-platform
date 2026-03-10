import { getHealth } from "@/services/api";

export default async function HomePage() {
  const health = await getHealth();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-16">
        <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
          Nexus ERP Platform
        </h1>

        <p className="mb-6 text-slate-300">
          Conexión Frontend → Backend funcionando.
        </p>

        <div className="rounded-xl bg-slate-900 p-6">
          <p className="mb-2 text-sm text-slate-400">Estado de la API</p>

          <pre className="text-green-400">
            {JSON.stringify(health, null, 2)}
          </pre>
        </div>
      </section>
    </main>
  );
}