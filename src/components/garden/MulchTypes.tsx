import Link from "next/link";

const TYPES = [
  { name: "Hardwood Mulch", d: "A classic shredded-wood look for beds, trees and shrubs." },
  { name: "Cedar Mulch", d: "A warm, golden-brown mulch with a natural cedar look." },
  { name: "Black Mulch", d: "A deep, dark finish that makes green plants and stone edging stand out." },
  { name: "Brown Mulch", d: "A rich brown that blends naturally with the soil around it." },
  { name: "Red Mulch", d: "A bold red-brown that brightens beds and walkways." },
  { name: "Playground Mulch", d: "Wood chips for play areas, installed to cover the whole space evenly." },
];

export default function MulchTypes({ city }: { city?: string }) {
  return (
    <section className="mt" id="mulch-types">
      <h2>
        Mulch Types <em>We Install</em>
      </h2>
      <p className="mt-sub">We install all major mulch types{city ? ` in ${city}` : ""}. Your quote includes a recommendation for your landscape.</p>
      <div className="mt-grid">
        {TYPES.map((t) => (
          <div key={t.name} className="mt-card">
            <h3>{t.name}</h3>
            <p>{t.d}</p>
          </div>
        ))}
      </div>
      <p className="mt-more"><Link href="/our-colors">See every color we offer &rarr;</Link></p>
    </section>
  );
}
