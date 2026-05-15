import { notFound } from "next/navigation";
import { getProductById } from "@/services/api";
import { getAssetUrl, isValidExternalUrl } from "@/lib/assets";
import { Product } from "@/types/product";
import { ProductGallery } from "@/components/catalog/product-gallery";
import {company} from "@/companyLayer/company.config"
import { ProductDetailInfo } from "@/components/catalog/product-detail-info";

type ProductDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function formatYearRange(product: Product, unspecifiedYears: string) {
  if (!product.yearFrom && !product.yearTo) {
    return unspecifiedYears;
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
      <section className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12 lg:py-16">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          {/* IMÁGENES */}
          
          <ProductGallery
           images={[image1, image2].filter((image): image is string => Boolean(image))}
           alt={product.name}
          />

          {/* INFO */}
          <ProductDetailInfo
              product={product}
              brochureUrl={brochure}
              videoUrl={isValidExternalUrl(product.videoUrl) ? product.videoUrl : null}
            />
        </div>
      </section>
    </main>
  );
}