import type { ApiProduct } from "@/lib/api";
import ProductCard from "./ProductCard";

export default function ProductGrid({
  products,
  currency,
}: {
  products: ApiProduct[];
  currency: string;
}) {
  return (
    <section id="shop" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="mb-12 flex flex-col items-center text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-[var(--rose)]">The Edit</span>
        <h2 className="mt-3 text-4xl font-medium md:text-5xl">Curated Collection</h2>
        <p className="mt-4 max-w-lg text-muted-foreground">
          Premium formulations crafted with intention — clean, effective, and made to love.
        </p>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-muted-foreground">
          New arrivals are on the way — please check back soon.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={String(p.id)} product={p} currency={currency} />
          ))}
        </div>
      )}
    </section>
  );
}
