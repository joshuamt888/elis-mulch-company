export default function Why({ title, items }: { title: string; items: { title: string; desc: string }[] }) {
  return (
    <section className="why">
      <h2>{title}</h2>
      <div className="why-grid">
        {items.map((it) => (
          <div key={it.title} className="why-card">
            <svg viewBox="0 0 24 24" aria-hidden><path d="M5 13l4 4L19 7" /></svg>
            <h3>{it.title}</h3>
            <p>{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
