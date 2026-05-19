const ENDPOINT =
  "https://ctzluwfqilwgelexslco.supabase.co/functions/v1/products-api?project_id=skincare-by-oma-9246";

export interface SiteSettings {
  website_name: string;
  email: string;
  phone_number: string;
  location: string;
  country: string;
  currency: string;
}

export interface ApiProduct {
  id: string | number;
  name?: string;
  title?: string;
  price?: number | string;
  image?: string;
  image_url?: string;
  images?: string[];
  description?: string;
}

export interface StoreData {
  settings: SiteSettings;
  products: ApiProduct[];
  error?: string;
}

const FALLBACK: SiteSettings = {
  website_name: "Our Store",
  email: "",
  phone_number: "",
  location: "",
  country: "",
  currency: "USD",
};

export async function fetchStore(): Promise<StoreData> {
  try {
    const res = await fetch(ENDPOINT, { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const p = json.project ?? {};
    const settings: SiteSettings = {
      website_name: p.website_name || FALLBACK.website_name,
      email: p.email || "",
      phone_number: p.phone_number || "",
      location: p.location || "",
      country: p.country || "",
      currency: p.currency || "USD",
    };
    const products: ApiProduct[] = Array.isArray(json.data) ? json.data : [];
    return { settings, products };
  } catch (e) {
    console.error("Store fetch failed:", e);
    return { settings: FALLBACK, products: [], error: String(e) };
  }
}

const SYMBOLS: Record<string, string> = {
  NGN: "₦", USD: "$", EUR: "€", GBP: "£", GHS: "₵", KES: "KSh",
  ZAR: "R", INR: "₹", JPY: "¥", CAD: "C$", AUD: "A$",
};

export function currencySymbol(code: string): string {
  return SYMBOLS[code?.toUpperCase()] ?? `${code} `;
}

export function formatPrice(amount: number, code: string): string {
  const sym = currencySymbol(code);
  return `${sym}${amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}
