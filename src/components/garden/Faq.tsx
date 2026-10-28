import type { QA } from "@/lib/faq";

/** Questions as plain dropdowns. Every answer is in the HTML, so search engines read them all. */
export default function Faq({ items, title = "Questions we hear", eyebrow = "FAQ" }: { items: QA[]; title?: string; eyebrow?: string }) {
  return (
    <section className="faq" aria-label="Frequently asked questions">
      <div className="faq-in">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <div className="faq-list">
          {items.map((f) => (
            <details key={f.question} className="faq-item">
              <summary>
                <h3>{f.question}</h3>
                <span aria-hidden>+</span>
              </summary>
              <p>{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
