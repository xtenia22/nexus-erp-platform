import Link from "next/link";
import { company } from "@/companyLayer/company.config";
import { companyStyles } from "@/companyLayer/company.styles";
import { getAssetUrl } from "@/lib/assets";
import { formatPrice, formatYearRange } from "@/lib/formatters";
import { Product } from "@/types/product";

type BraccoProductCardProps = {
  product: Product;
};

export function BraccoProductCard({ product }: BraccoProductCardProps) {
  const imageUrl = getAssetUrl(product.image1Url);
  const labels = company.content.productCard;
  const yearRange = formatYearRange(product, labels.unspecifiedYears);

  return (
    <Link href={`/products/${product.id}`} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-300/40">
        <div className="relative overflow-hidden border-b border-slate-100 bg-white">
          <div className="aspect-[16/10] w-full">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={product.name}
                className="h-full w-full object-contain p-1 transition duration-300 group-hover:scale-[1.04] md:p-2"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
                {labels.noImage}
              </div>
            )}
          </div>
        </div>

        <div
          className="min-h-[42px] px-4 py-2 text-[11px] font-bold uppercase leading-4 tracking-[0.14em] text-white"
          style={{
            //backgroundColor: companyStyles.primaryColor,
   
            backgroundColor: `${companyStyles.primaryColor}E6`,

            fontFamily: company.theme.typography.heading,
          }}
        >
          <span className="line-clamp-2">{product.category}</span>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-500">
              {product.code}
            </span>

            <span className="shrink-0 text-[11px] font-medium text-slate-400">
              {yearRange}
            </span>
          </div>

          <h2
            className="line-clamp-2 min-h-[44px] text-[15px] font-bold leading-snug tracking-tight text-slate-950 lg:text-base"
            style={{
              fontFamily: company.theme.typography.heading,
            }}
          >
            {product.name}
          </h2>

          <p
            className="mt-2 line-clamp-1 text-xs font-medium uppercase tracking-wide text-slate-500"
            style={{
              fontFamily: company.theme.typography.body,
            }}
          >
            {product.brand} / {product.model}
          </p>

          <div className="mt-auto pt-4">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              {labels.priceLabel ?? "Precio"}
            </p>

            <div className="flex items-end justify-between gap-3">
              <p
                className="text-xl font-extrabold leading-none"
                style={{
                  color: companyStyles.primaryColor,
                  fontFamily: company.theme.typography.heading,
                }}
              >
                $ {formatPrice(product.price)}
              </p>

              <span
                className="rounded-xl px-4 py-2 text-sm font-bold text-white transition group-hover:opacity-90"
                style={{
                  backgroundColor: companyStyles.primaryColor,
                }}
              >
                {labels.detailCta}
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}