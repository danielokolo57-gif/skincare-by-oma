import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/lib/cart";
import { fetchStore, type SiteSettings, type ApiProduct } from "@/lib/api";
import { DEMO_PRODUCTS } from "@/lib/demo-products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Premium Cosmetics & Skincare" },
      { name: "description", content: "Hand-curated premium cosmetics and skincare." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:wght@400;500;600&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [apiProducts, setApiProducts] = useState<ApiProduct[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetchStore()
      .then((d) => {
        if (!mounted) return;
        setSettings(d.settings);
        setApiProducts(d.products);
      })
      .finally(() => mounted && setLoaded(true));
    return () => {
      mounted = false;
    };
  }, []);

  // Show demo + api when api < 7, otherwise hide demos entirely.
  const displayProducts =
    apiProducts.length >= 7 ? apiProducts : [...DEMO_PRODUCTS, ...apiProducts];

  const safe: SiteSettings = settings ?? {
    website_name: "Loading…",
    email: "",
    phone_number: "",
    location: "",
    country: "",
    currency: "USD",
  };

  return (
    <CartProvider>
      <div id="home" className="min-h-screen bg-background">
        <Navbar siteName={safe.website_name} />
        <main>
          <Hero
            onShop={() => {
              document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
            }}
          />
          {loaded ? (
            <ProductGrid products={displayProducts} currency={safe.currency} />
          ) : (
            <section className="mx-auto max-w-7xl px-6 py-32 text-center text-muted-foreground">
              Loading the collection…
            </section>
          )}
          <About siteName={safe.website_name} />
          <Contact settings={safe} />
        </main>
        <Footer settings={safe} />
        <CartDrawer settings={safe} />
      </div>
    </CartProvider>
  );
}
