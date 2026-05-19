import type { SiteSettings } from "@/lib/api";

export default function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="border-t border-border bg-[var(--secondary)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-serif text-2xl">{settings.website_name}</p>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Premium cosmetics and skincare, made to celebrate every shade of you.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Shop</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="#shop" className="hover:text-[var(--rose)]">Collection</a></li>
            <li><a href="#about" className="hover:text-[var(--rose)]">About</a></li>
            <li><a href="#contact" className="hover:text-[var(--rose)]">Contact</a></li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-foreground/80">
            {settings.email && <li>{settings.email}</li>}
            {settings.phone_number && <li>{settings.phone_number}</li>}
            {(settings.location || settings.country) && (
              <li>{[settings.location, settings.country].filter(Boolean).join(", ")}</li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-6 py-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {settings.website_name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
