import Link from "next/link";

/** The one pink call-to-action band on a page. */
export default function CtaBand({ title, text, primary, secondary }: { title: string; text?: string; primary: string; secondary: string }) {
  return (
    <section className="cv-cta">
      <h2>{title}</h2>
      {text && <p>{text}</p>}
      <div className="btns">
        <Link href="/estimate" className="btn cv-cta-btn">{primary}</Link>
        <a href="tel:+19523144797" className="btn cv-cta-ghost">{secondary}</a>
      </div>
    </section>
  );
}
