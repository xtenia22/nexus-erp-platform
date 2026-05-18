import Link from "next/link";
import { Product } from "@/types/product";
import { getAssetUrl } from "@/lib/assets";
import { company } from "@/companyLayer/company.config";
import { companyStyles } from "@/companyLayer/company.styles";
import { formatPrice, formatYearRange } from "@/lib/formatters";

type Props = {
  product: Product;
};

export function BraccoProductCard({ product }: Props) {
  const imageUrl = getAssetUrl(product.image1Url);
  const cardLabels = company.content.productCard;

  const yearRange = formatYearRange(product, cardLabels.unspecifiedYears);

  return (
    <Link href={`/products/${product.id}`} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl">
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
              {cardLabels.noImage}
            </div>
          )}

          <div
            className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm"
            style={companyStyles.primaryButton}
          >
            {product.category}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-3 lg:p-4">
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-500">
              {product.code}
            </span>

            <span className="text-[11px] font-medium text-slate-400">
              {yearRange}
            </span>
          </div>

          <h2 className="line-clamp-2 text-sm font-bold leading-tight text-slate-900 lg:text-base">
            {product.name}
          </h2>

          <p className="mt-2 line-clamp-1 text-xs font-medium text-slate-500">
            {product.brand} / {product.model}
          </p>

          <div className="mt-auto flex items-center justify-between gap-3 pt-4">
            <div>
              <p className="text-[11px] uppercase tracking-wide text-slate-400">
                Precio
              </p>

              <p
                className="text-base font-extrabold lg:text-lg"
                style={companyStyles.primaryText}
              >
                $ {formatPrice(product.price)}
              </p>
            </div>

            <span
              className="rounded-xl px-3 py-2 text-xs font-bold text-white transition group-hover:opacity-90 lg:text-sm"
              style={companyStyles.primaryButton}
            >
              {cardLabels.detailCta}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}