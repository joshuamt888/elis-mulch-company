/** Statement line. Static on purpose (Eli, 2026-11-16: no sections you have to scroll through). Words wrapped in *stars* use the accent. */
export default function ScrollWords({ text }: { text: string }) {
  return (
    <section className="sw">
      <p className="sw-p">
        {text.split(/(\*[^*]+\*)/).map((part, i) =>
          part.startsWith("*") ? <em key={i} className="sw-em">{part.slice(1, -1)}</em> : part
        )}
      </p>
    </section>
  );
}
