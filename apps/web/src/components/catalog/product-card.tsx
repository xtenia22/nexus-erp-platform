import Link from "next/link";
import { Product } from "@/types/product";
import { getAssetUrl } from "@/lib/assets";
import { company } from "@/companyLayer/company.config";


type ProductCardProps = {
  product: Product;
};

function formatYearRange(product: Product) {
  if (!product.yearFrom && !product.yearTo) {
    return  company.content.productCard.unspecifiedYears;
  }

  if (product.yearFrom && !product.yearTo) {
    return `${product.yearFrom}+`;
  }

  return `${product.yearFrom ?? ""} - ${product.yearTo ?? ""}`;
}

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = getAssetUrl(product.image1Url);

  return (
    <Link href={`/products/${product.id}`} className="group block h-full">
      <article className="h-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-sm transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-[1.01] group-hover:border-slate-600 group-hover:bg-slate-800/70 group-hover:shadow-xl group-hover:shadow-black/20">
        <div className="relative aspect-[16/10] overflow-hidden border-b border-slate-800 bg-slate-950">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-slate-500">
             {company.content.productCard.noImage}
            </div>
          )}
        </div>

        <div className="space-y-2 p-3 lg:p-4">
          <div className="flex flex-wrap gap-1.5">
            <span className="rounded-full border border-slate-700 px-2 py-0.5 text-[11px] text-slate-300">
              {product.category}
            </span>

            <span className="rounded-full border border-slate-700 px-2 py-0.5 text-[11px] text-slate-300">
              {product.code}
            </span>
          </div>

          <h2 className="line-clamp-2 text-sm font-semibold leading-tight text-slate-100 lg:text-base">
            {product.name}
          </h2>

          <p className="line-clamp-1 text-xs text-slate-400 lg:text-sm">
            {product.brand} / {product.model}
          </p>

          <p className="text-xs text-slate-500 lg:text-sm">
            {company.content.productCard.yearsLabel}: {formatYearRange(product)}
          </p>

          <div className="flex items-center justify-between gap-3 pt-1">
            <p className="text-base font-bold text-green-400 lg:text-lg">
              $ {product.price}
            </p>

            <span className="text-xs font-medium text-slate-400 transition group-hover:text-slate-100 lg:text-sm">
              {company.content.productCard.detailCta} →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}