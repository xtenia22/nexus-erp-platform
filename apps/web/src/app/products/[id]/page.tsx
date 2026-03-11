import { notFound } from "next/navigation";
import { getProductById } from "@/services/api";

type ProductDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-4xl px-6 py-16">
        <p className="mb-4 text-sm text-slate-400">Producto / Detalle</p>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <p className="mb-2 text-sm text-slate-400">ID: {product.id}</p>

          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            {product.name}
          </h1>

          <p className="text-2xl font-semibold text-green-400">
            USD {product.price}
          </p>
        </div>
      </section>
    </main>
  );
}