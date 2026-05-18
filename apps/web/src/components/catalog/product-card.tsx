import { company } from "@/companyLayer/company.config";
import { Product } from "@/types/product";
import { BraccoProductCard } from "./product-card.bracco";
import { StandardProductCard } from "./product-card.standard";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const productCardVariant = company.ui.components.productCard.variant;
  const isLightPremium = productCardVariant === "light-premium";
  if (isLightPremium) {
    return <BraccoProductCard product={product} />;
  }

  return <StandardProductCard product={product} />;
}