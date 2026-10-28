export default function Why({ title, items, intro, cols }: { title: string; items: { title: string; desc: string }[]; intro?: string; cols?: number }) {
  return (
    <section className="why">
      <h2>{title}</h2>
      {intro && <p className="why-intro">{intro}</p>}
      <div className="why-grid" style={cols ? { gridTemplateColumns: `repeat(${cols}, 1fr)` } : undefined}>
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
