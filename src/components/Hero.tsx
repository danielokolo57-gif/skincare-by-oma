import { useEffect, useState } from "react";
import heroImages from "@/lib/hero-images";

const PHRASES = ["Discover Beauty", "Glow With Confidence", "Premium Cosmetic Collection"];

function useTyping(phrases: string[]) {
  const [pi, setPi] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const full = phrases[pi];
    const speed = del ? 40 : 90;
    const timer = setTimeout(() => {
      if (!del) {
        const next = full.slice(0, text.length + 1);
        setText(next);
        if (next === full) setTimeout(() => setDel(true), 1600);
      } else {
        const next = full.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDel(false);
          setPi((p) => (p + 1) % phrases.length);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [text, del, pi, phrases]);

  return text;
}

export default function Hero({ onShop }: { onShop: () => void }) {
  const [idx, setIdx] = useState(0);
  const text = useTyping(PHRASES);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % heroImages.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      {heroImages.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-[1600ms] ease-in-out"
          style={{
            opacity: i === idx ? 1 : 0,
            backgroundImage: `url(${src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: i === idx ? "scale(1.05)" : "scale(1)",
            transition: "opacity 1.6s ease-in-out, transform 6s ease-out",
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/70" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <span className="mb-6 inline-block rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-white/90 backdrop-blur-sm fade-slide">
          New Collection
        </span>
        <h1 className="max-w-4xl text-balance text-5xl font-medium leading-[1.05] text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]">
          <span className="gradient-gold caret-blink">{text || "\u00A0"}</span>
        </h1>
        <p className="mt-6 max-w-xl text-base text-white/85 sm:text-lg fade-slide">
          Hand-curated skincare and cosmetics, designed to celebrate every shade of you.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 fade-slide">
          <button
            onClick={onShop}
            className="rounded-full bg-white px-8 py-3.5 text-sm font-medium uppercase tracking-wider text-foreground transition hover:bg-[var(--gold)] hover:text-primary-foreground"
          >
            Shop the Collection
          </button>
          <a
            href="#about"
            className="rounded-full border border-white/40 px-8 py-3.5 text-sm font-medium uppercase tracking-wider text-white transition hover:bg-white/10"
          >
            Our Story
          </a>
        </div>

        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
          {heroImages.map((_, i) => (
            <button
              key={i}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setIdx(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === idx ? "w-8 bg-white" : "w-1.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
