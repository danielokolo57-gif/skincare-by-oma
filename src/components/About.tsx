export default function About({ siteName }: { siteName: string }) {
  return (
    <section id="about" className="relative overflow-hidden bg-[var(--secondary)] py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2 md:gap-20">
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-[var(--shadow-luxe)]">
          <img
            src="images/hero5.jpg"
            alt={`${siteName} model`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-[var(--rose)]">Our Story</span>
          <h2 className="mt-3 text-4xl font-medium md:text-5xl">
            Beauty, reimagined for you.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-foreground/80">
            At <span className="font-medium text-foreground">{siteName}</span>, we are dedicated to
            providing premium cosmetic products that enhance natural beauty. From silky serums to
            buildable color, every formula is hand-selected to be gentle, effective, and a joy to use.
          </p>
          <p className="mt-4 text-base leading-relaxed text-foreground/80">
            We believe self-care is a daily ritual — one that should feel as luxurious as it looks. Welcome
            to a collection made for the way you live, glow, and shine.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-6 border-t border-border pt-8">
            <div>
              <p className="font-serif text-3xl">100%</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">Cruelty Free</p>
            </div>
            <div>
              <p className="font-serif text-3xl">5k+</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">Happy Clients</p>
            </div>
            <div>
              <p className="font-serif text-3xl">★ 4.9</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">Avg Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
