import type { ApiProduct } from "@/lib/api";
import { formatPrice } from "@/lib/api";
import { useCart } from "@/lib/cart";
import { Plus } from "lucide-react";

function productImage(p: ApiProduct): string {
  return (
    p.image ||
    p.image_url ||
    (Array.isArray(p.images) && p.images[0]) ||
    "images/demo1.jpg"
  );
}

function productPrice(p: ApiProduct): number {
  const n = typeof p.price === "string" ? parseFloat(p.price) : p.price ?? 0;
  return Number.isFinite(n as number) ? (n as number) : 0;
}

export default function ProductCard({ product, currency }: { product: ApiProduct; currency: string }) {
  const { add } = useCart();
  const name = product.name || product.title || "Untitled";
  const price = productPrice(product);
  const img = productImage(product);

  return (
    <div className="group flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
        <img
          src={img}
          alt={name}
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "images/demo1.jpg";
          }}
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        <button
          onClick={() =>
            add({ id: String(product.id), name, price, image: img })
          }
          aria-label="Add to cart"
          className="absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-full bg-background/95 text-foreground shadow-md transition hover:bg-[var(--gold)] hover:text-primary-foreground"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-serif text-base font-medium leading-tight">{name}</h3>
          {product.description && (
            <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{product.description}</p>
          )}
        </div>
        <p className="whitespace-nowrap text-sm font-medium">{formatPrice(price, currency)}</p>
      </div>
    </div>
  );
}
