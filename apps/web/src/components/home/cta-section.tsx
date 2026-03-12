import Link from "next/link";

export function CtaSection() {
  return (
    <section className="bg-slate-950">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 md:p-12">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-slate-400">
              Próximo paso
            </p>

            <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-50 md:text-4xl">
              Prepará la plataforma para clientes, roles y operaciones privadas
            </h2>

            <p className="mb-8 leading-8 text-slate-300">
              Esta home será la base pública. Luego vamos a sumar login,
              permisos, usuarios autorizados y funcionalidades comerciales.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="rounded-xl bg-white px-5 py-3 font-medium text-slate-900 transition hover:opacity-90"
              >
                Explorar catálogo
              </Link>

              <Link
                href="#"
                className="rounded-xl border border-slate-700 px-5 py-3 font-medium text-slate-100 transition hover:bg-slate-800"
              >
                Próximamente: acceso privado
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}