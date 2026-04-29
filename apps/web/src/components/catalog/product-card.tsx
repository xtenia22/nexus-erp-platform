import Link from "next/link";
import { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group block">
      <article className="h-full rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm transition group-hover:-translate-y-1 group-hover:border-slate-600 group-hover:bg-slate-800">
        <p className="mb-2 text-sm text-slate-400">ID: {product.id}</p>

        <h2 className="mb-3 text-xl font-semibold text-slate-100">
          {product.name}
        </h2>

        <p className="mb-4 text-lg font-medium text-green-400">
          USD {product.price}
        </p>

        <p className="text-sm text-slate-400 transition group-hover:text-slate-200">
          Ver detalle →
        </p>
      </article>
    </Link>
  );
}