export function AboutSection() {
  return (
    <section id="about" className="border-b border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-slate-400">
            Empresa
          </p>

          <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-50 md:text-4xl">
            Una base pública para presentar tu marca y tu propuesta comercial
          </h2>

          <p className="leading-8 text-slate-300">
            Esta sección servirá para contar quiénes son, qué fabrican o venden,
            qué diferencia a la empresa y cómo conectar esa identidad con el catálogo
            y la experiencia digital.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="mb-3 text-xl font-semibold text-slate-100">
              Trayectoria
            </h3>
            <p className="text-slate-300">
              Espacio ideal para presentar historia, confianza y experiencia.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="mb-3 text-xl font-semibold text-slate-100">
              Productos
            </h3>
            <p className="text-slate-300">
              Catálogo pensado para mostrar líneas, categorías y destacados.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="mb-3 text-xl font-semibold text-slate-100">
              Operación comercial
            </h3>
            <p className="text-slate-300">
              Usuarios, pedidos y funciones privadas para clientes autorizados.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}