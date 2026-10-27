import Link from "next/link";

const AREAS = ["Chanhassen", "Eden Prairie", "Chaska", "Shakopee", "Victoria", "Waconia", "Excelsior", "Minnetonka", "Shorewood", "Prior Lake", "Savage", "Carver"];
const slug = (n: string) => n.toLowerCase().replace(/\s+/g, "-");

export default function Areas() {
  return (
    <section className="areas" id="areas">
      <p className="eyebrow">Where we mulch</p>
      <h2>
        Serving the western <em>Twin Cities</em>.
      </h2>
      <p className="areas-sub">Based in Chanhassen, installing mulch across the western suburbs.</p>
      <div className="areas-chips">
        {AREAS.map((a) => (
          <Link key={a} href={`/${slug(a)}-mulch-delivery`} className="chip">{a}</Link>
        ))}
      </div>
    </section>
  );
}
