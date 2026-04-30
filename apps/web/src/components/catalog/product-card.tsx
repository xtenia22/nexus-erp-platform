import Link from "next/link";
import { Product } from "@/types/product";

import { getAssetUrl } from "@/lib/assets";

type ProductCardProps = {
  product: Product;
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

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = getAssetUrl(product.image1Url);
  return (
    <Link href={`/products/${product.id}`} className="group block">
      <article className="h-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-sm transition group-hover:-translate-y-1 group-hover:border-slate-600 group-hover:bg-slate-800">
        <div className="flex h-44 items-center justify-center border-b border-slate-800 bg-slate-950">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-sm text-slate-500">Sin imagen</span>
          )}
        </div>

        <div className="p-5">
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">
              {product.category}
            </span>

            <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">
              {product.code}
            </span>
          </div>

          <h2 className="mb-3 text-lg font-semibold text-slate-100">
            {product.name}
          </h2>

          <p className="mb-1 text-sm text-slate-400">
            {product.brand} / {product.model}
          </p>

          <p className="mb-4 text-sm text-slate-400">
            Años: {formatYearRange(product)}
          </p>

          <p className="mb-4 text-lg font-medium text-green-400">
            USD {product.price}
          </p>

          <p className="text-sm text-slate-400 transition group-hover:text-slate-200">
            Ver detalle →
          </p>
        </div>
      </article>
    </Link>
  );
}