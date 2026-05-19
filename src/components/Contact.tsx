import type { SiteSettings } from "@/lib/api";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

function waLink(num: string) {
  return `https://wa.me/${num.replace(/[^0-9]/g, "")}`;
}

export default function Contact({ settings }: { settings: SiteSettings }) {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--rose)]">Get in touch</span>
          <h2 className="mt-3 text-4xl font-medium md:text-5xl">We'd love to hear from you.</h2>
          <p className="mt-5 max-w-md text-muted-foreground">
            Questions about a product, an order, or a custom request? Reach us through any of the
            channels below.
          </p>
        </div>

        <div className="grid gap-4">
          {settings.email && (
            <a
              href={`mailto:${settings.email}`}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-[var(--gold)]"
            >
              <Mail className="mt-0.5 h-5 w-5 text-[var(--rose)]" />
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Email</p>
                <p className="mt-1 font-medium">{settings.email}</p>
              </div>
            </a>
          )}
          {settings.phone_number && (
            <a
              href={waLink(settings.phone_number)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-[var(--gold)]"
            >
              <MessageCircle className="mt-0.5 h-5 w-5 text-[var(--rose)]" />
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">WhatsApp</p>
                <p className="mt-1 font-medium">{settings.phone_number}</p>
              </div>
            </a>
          )}
          {settings.phone_number && (
            <a
              href={`tel:${settings.phone_number}`}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-[var(--gold)]"
            >
              <Phone className="mt-0.5 h-5 w-5 text-[var(--rose)]" />
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Phone</p>
                <p className="mt-1 font-medium">{settings.phone_number}</p>
              </div>
            </a>
          )}
          {(settings.location || settings.country) && (
            <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
              <MapPin className="mt-0.5 h-5 w-5 text-[var(--rose)]" />
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Location</p>
                <p className="mt-1 font-medium">
                  {[settings.location, settings.country].filter(Boolean).join(", ")}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
