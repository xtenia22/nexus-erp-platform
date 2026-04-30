import { notFound } from "next/navigation";
import { getProductById } from "@/services/api";
import { getAssetUrl, isValidExternalUrl } from "@/lib/assets";
import { Product } from "@/types/product";
import { ProductGallery } from "@/components/catalog/product-gallery";

type ProductDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function formatYearRange(product: Product) {
  if (!product.yearFrom && !product.yearTo) {
    return "Años no especificados";
  }

  if (product.yearFrom && !product.yearTo) {
    return `${product.yearFrom}+`;
  }

  return `${product.yearFrom ?? ""} - ${product.yearTo ?? ""}`;
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const image1 = getAssetUrl(product.image1Url);
  const image2 = getAssetUrl(product.image2Url);
  const brochure = getAssetUrl(product.brochureUrl);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {/* IMÁGENES */}
          
          <ProductGallery
           images={[image1, image2].filter((image): image is string => Boolean(image))}
           alt={product.name}
          />

          {/* INFO */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">
                {product.category}
              </span>

              <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">
                {product.code}
              </span>
            </div>

            <h1 className="text-2xl font-semibold text-slate-100">
              {product.name}
            </h1>

            <p className="text-sm text-slate-400">
              {product.brand} / {product.model}
            </p>

            <p className="text-sm text-slate-400">
              Años: {formatYearRange(product)}
            </p>

            <p className="text-xl font-medium text-green-400">
              USD {product.price}
            </p>

            {/* ACCIONES */}
            <div className="flex flex-wrap gap-3 pt-4">
              {brochure && (
                <a
                  href={brochure}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-800"
                >
                  Descargar folleto
                </a>
              )}

              {isValidExternalUrl(product.videoUrl) && (
                <a
                  href={product.videoUrl as string}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-800"
                >
                  Ver video
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}