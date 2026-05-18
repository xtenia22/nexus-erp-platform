import { company } from "@/companyLayer/company.config";
import { Product } from "@/types/product";
import { BraccoProductCard } from "./product-card.bracco";
import { StandardProductCard } from "./product-card.standard";

type ProductCardProps = {
  product: Product;
};

const productCardByVariant = {
  "light-premium": BraccoProductCard,
  "dark-industrial": StandardProductCard,
};

export function ProductCard({ product }: ProductCardProps) {
  const productCardVariant = company.ui.components.productCard.variant;
  const ProductCardComponent =
    productCardByVariant[productCardVariant] ?? StandardProductCard;

  return <ProductCardComponent product={product} />;
}