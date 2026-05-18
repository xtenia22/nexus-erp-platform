import { company } from "@/companyLayer/company.config";
import { companyStyles } from "@/companyLayer/company.styles";
import { Product } from "@/types/product";
import { formatPrice, formatYearRange } from "@/lib/formatters";


type ProductDetailInfoProps = {
  product: Product;
  brochureUrl: string | null;
  videoUrl: string | null;
};



type SpecRowProps = {
  label: string;
  value: string | number | null;
};

function SpecRow({ label, value }: SpecRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-800 py-2 last:border-b-0">
      <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </dt>
      <dd className="text-right text-sm font-medium text-slate-200">
        {value || "-"}
      </dd>
    </div>
  );
}


export function ProductDetailInfo({
  product,
  brochureUrl,
  videoUrl,
}: ProductDetailInfoProps) {
   const detailLabels = company.content.productDetail;
const specs = detailLabels.specLabels;
const yearRange = formatYearRange(product, detailLabels.unspecifiedYears);
  
  return (
    <div className="space-y-4 lg:space-y-5">
      <div className="flex flex-wrap gap-2">
        <span
          className="rounded-full border px-3 py-1 text-xs font-medium"
          style={{
            borderColor: companyStyles.primaryColor,
            color: companyStyles.primaryColor,
          }}
        >
          {product.category}
        </span>

        <span className="rounded-full border border-slate-700 px-3 py-1 text-xs font-medium text-slate-300">
          {product.code}
        </span>
      </div>

      <div>
        <h1 className="text-xl font-bold leading-tight text-slate-100 md:text-3xl lg:text-4xl">
          {product.name}
        </h1>
       
      </div>

    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 lg:p-5">
        <p className="text-xl font-bold text-green-400 md:text-2xl lg:text-3xl">
            $ {formatPrice(product.price)}
        </p>

        <p className="mt-2 text-xs leading-5 text-slate-400 md:text-sm">
          {company.content.productDetail.priceNote}
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-2 lg:gap-3">
        {brochureUrl && (
          <a
            href={brochureUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-slate-700 px-4 py-3 text-center text-sm font-medium text-slate-200 transition hover:bg-slate-800"
          >
            {company.content.productDetail.brochureCta}
          </a>
        )}

        {videoUrl && (
          <a
            href={videoUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl px-4 py-3 text-center text-sm font-medium text-white transition hover:opacity-90"
            style={companyStyles.primaryButton}
          >
            {company.content.productDetail.videoCta}
          </a>
        )}
      </div>


      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 lg:p-5">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            {detailLabels.specsTitle}
          </h2>

          <dl>
            <SpecRow label={specs.code} value={product.code} />
            <SpecRow label={specs.category} value={product.category} />
            <SpecRow label={specs.brand} value={product.brand} />
            <SpecRow label={specs.model} value={product.model} />
            <SpecRow label={specs.years} value={yearRange} />
          </dl>
        </div>

      
    </div>
  );
}