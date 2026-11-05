import { CITY_HISTORY } from "@/lib/cityHistory";

/** A short, sourced history of the city: origin line, a three-step timeline, and where it stands today. */
export default function CityHistory({ slug, name }: { slug: string; name: string }) {
  const h = CITY_HISTORY[slug];
  if (!h) return null;
  return (
    <section className="ch">
      <div className="ch-head">
        <span className="eyebrow">Local history</span>
        <h2>
          {name}, <em>then and now.</em>
        </h2>
        <p>{h.origin}</p>
      </div>
      <ol className="ch-list">
        {h.timeline.map((t) => (
          <li key={t.year} className="ch-item">
            <span className="ch-y">{t.year}</span>
            <p className="ch-t">{t.text}</p>
          </li>
        ))}
      </ol>
      <p className="ch-now">{h.now}</p>
    </section>
  );
}
