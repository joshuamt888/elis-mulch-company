import Link from "next/link";
import { AREAS, areaHref } from "@/lib/areas";

const HALF = Math.ceil(AREAS.length / 2);
const COLS = [AREAS.slice(0, HALF), AREAS.slice(HALF)];

/** Every city we serve, in two columns. */
export default function Areas() {
  return (
    <section className="areas" id="areas">
      <p className="eyebrow">Where we mulch</p>
      <h2>
        Serving the <em>Twin Cities.</em>
      </h2>
      <p className="areas-sub">Based in Chanhassen, installing mulch across the metro. Pick your city.</p>
      <div className="areas-cols">
        {COLS.map((col, c) => (
          <ul key={c} className="areas-col">
            {col.map((a, i) => (
              <li key={a.slug}>
                <Link href={areaHref(a.slug)} className="areas-row">
                  <span className="areas-n">{String(c * HALF + i + 1).padStart(2, "0")}</span>
                  <span className="areas-name">{a.name}</span>
                  {a.slug === "chanhassen" && <span className="areas-tag">Home base</span>}
                  <span className="areas-go" aria-hidden>&rarr;</span>
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
