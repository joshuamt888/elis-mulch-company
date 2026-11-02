export default function Why({ title, items, intro, cols }: { title: string; items: { title: string; desc: string }[]; intro?: string; cols?: number }) {
  return (
    <section className="why">
      <h2>{title}</h2>
      {intro && <p className="why-intro">{intro}</p>}
      <div className="why-grid" style={cols ? { gridTemplateColumns: `repeat(${cols}, 1fr)` } : undefined}>
        {items.map((it, i) => (
          <div key={it.title} className="why-card">
            <span className="why-n">{String(i + 1).padStart(2, "0")}</span>
            <h3>{it.title}</h3>
            <p>{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
