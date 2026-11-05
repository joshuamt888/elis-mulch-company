import Link from "next/link";

/** Plain-language paragraph under the color board: carries the "near me" mulch terms in natural sentences. */
export default function MulchWords({ city }: { city?: string }) {
  const where = city ? `in ${city}` : "across the Twin Cities";
  return (
    <section className="mw">
      <p>
        Looking for black mulch, cedar mulch or red mulch near you {where}? We install hardwood, cedar, black, brown and red mulch, plus playground mulch for play areas, and our crew
        brings it and spreads it for you. Not sure how much you need? Try the{" "}
        <Link href="/tools/mulch-calculator">free mulch calculator</Link>, or see{" "}
        <Link href="/our-colors">every mulch color we offer</Link>. Your quote is free and in person.
      </p>
    </section>
  );
}
