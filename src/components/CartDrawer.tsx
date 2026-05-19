import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/api";
import type { SiteSettings } from "@/lib/api";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";

function buildWhatsAppUrl(phone: string, message: string) {
  const num = phone.replace(/[^0-9]/g, "");
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}

export default function CartDrawer({ settings }: { settings: SiteSettings }) {
  const { items, open, setOpen, setQty, remove, total, clear } = useCart();
  const cur = settings.currency;

  function order() {
    if (items.length === 0) return;
    const lines = items
      .map((i) => `• ${i.name} × ${i.qty} — ${formatPrice(i.price * i.qty, cur)}`)
      .join("\n");
    const msg = `Hello ${settings.website_name}, I'd like to order:\n\n${lines}\n\nTotal: ${formatPrice(total, cur)}`;
    if (!settings.phone_number) {
      alert("WhatsApp number not available right now. Please try again later.");
      return;
    }
    window.open(buildWhatsAppUrl(settings.phone_number, msg), "_blank");
  }

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-background shadow-2xl transition-transform duration-500 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <p className="font-serif text-xl">Your Bag ({items.length})</p>
          <button onClick={() => setOpen(false)} aria-label="Close" className="rounded-full p-2 hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
              <p className="mt-4 font-serif text-lg">Your bag is empty</p>
              <p className="mt-1 text-sm text-muted-foreground">Add a few favorites to get started.</p>
            </div>
          ) : (
            <ul className="divide-y divide-border">
              {items.map((i) => (
                <li key={i.id} className="flex gap-4 py-4">
                  <img src={i.image} alt={i.name} className="h-20 w-20 rounded-lg object-cover" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium leading-tight">{i.name}</p>
                      <button onClick={() => remove(i.id)} aria-label="Remove">
                        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                      </button>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{formatPrice(i.price, cur)}</p>
                    <div className="mt-3 inline-flex items-center rounded-full border border-border">
                      <button
                        onClick={() => setQty(i.id, i.qty - 1)}
                        className="grid h-7 w-7 place-items-center rounded-l-full hover:bg-muted"
                        aria-label="Decrease"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-sm">{i.qty}</span>
                      <button
                        onClick={() => setQty(i.id, i.qty + 1)}
                        className="grid h-7 w-7 place-items-center rounded-r-full hover:bg-muted"
                        aria-label="Increase"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border px-6 py-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Subtotal</p>
              <p className="font-serif text-2xl">{formatPrice(total, cur)}</p>
            </div>
            <button
              onClick={order}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-medium uppercase tracking-wider text-primary-foreground transition hover:bg-[var(--gold)] hover:text-primary-foreground"
            >
              Order via WhatsApp
            </button>
            <button
              onClick={clear}
              className="mt-2 w-full rounded-full py-2 text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground"
            >
              Clear bag
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
