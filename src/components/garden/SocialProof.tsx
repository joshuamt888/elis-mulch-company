import Link from "next/link";

// All 13 reviews on the Google listing (pulled 2026-10-27), customer text only, never the owner's replies. Read at https://www.google.com/maps/search/?api=1&query=Mulch+Company+MN+Chanhassen
export const REVIEWS = [
 {
  "name": "Kathy Kraemer",
  "text": "Excellent work- thorough, detailed, and great customer service. We had them mulch multiple homes. I would hire them again."
 },
 {
  "name": "Luther Hippe",
  "text": "Had mulch installed for our landscaping. I didn’t do a lot of pricing comparisons with other landscaping contractors so I hope our price was fairly priced. They sure did a nice job and cleaned up after themselves."
 },
 {
  "name": "Lonnie Lassman",
  "text": "Mulch company is great! It was a very easy process and my mulch beds look great! I will be using them again. Highly recommend to anyone in the Chanhassen area."
 },
 {
  "name": "Emily Van Wyck",
  "text": "Mulch Company helped with weeding and mulching garden beds around our home - they did an awesome and were very easy to work with. I highly recommend them!"
 },
 {
  "name": "Robby Evans",
  "text": "Best mulch service in Chanhassen! From initial meeting to final walkthrough the crew was very respectful and thorough. Passing along info to my friends. Hats off to the Mulch Company!"
 },
 {
  "name": "Nick Nelson",
  "text": "Great folks. Fast est and service Will is again next year"
 },
 {
  "name": "Fritz Rile",
  "text": "I know Eli one of the owners, and these guys are incredible. Their dedication to making sure each job is done right and reasonably priced is something that is hard to find."
 },
 {
  "name": "Daniel Pothier",
  "text": "This company is new, but the owners are well known to us and highly respected in their first business. They should be your first choice in the area."
 },
 {
  "name": "Amanda Brimmer",
  "text": "Eli and crew did a fantastic job in our yard. They were able to get to our house earlier than expected, and the job was done quickly and yard left clean."
 },
 {
  "name": "Bartm224",
  "text": "Removed a bunch of old rock and replaced with Mulch and looks great."
 },
 {
  "name": "Mitchell Cummins",
  "text": "These guys mulched my whole yard in one day! We live in between Eden Prairie and Chanhassen. Owen and Eli were great to talk to on the phone in a super timely and professional matter! We will use these guys every spring!"
 },
 {
  "name": "Jindelee Pemble",
  "text": "Super quick and professional. The whole process was very simple from beginning to end. Will definitely be using them in the future!"
 },
 {
  "name": "Erik Bender",
  "text": "great team - efficient service - easy to work with"
 }
];

export const GBP = "https://www.google.com/maps/search/?api=1&query=Mulch+Company+MN+Chanhassen";

const Stars = () => (
  <div className="sp-stars" role="img" aria-label="5 out of 5 stars">
    {[0, 1, 2, 3, 4].map((i) => (
      <svg key={i} viewBox="0 0 20 20" aria-hidden><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
    ))}
  </div>
);

const G = () => (
  <svg viewBox="0 0 24 24" className="sp-g" aria-hidden>
    <path fill="#4285F4" d="M23.52 12.27c0-.82-.07-1.6-.2-2.36H12v4.47h6.47c-.28 1.5-1.13 2.78-2.4 3.63v3.02h3.88c2.27-2.09 3.57-5.17 3.57-8.76z" />
    <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.88-3.02c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.11C3.25 21.3 7.31 24 12 24z" />
    <path fill="#FBBC05" d="M5.27 14.27c-.24-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.62H1.27A11.98 11.98 0 000 12c0 1.94.46 3.77 1.27 5.38l4-3.11z" />
    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.27 6.62l4 3.11c.95-2.85 3.6-4.98 6.73-4.98z" />
  </svg>
);

const half = Math.ceil(REVIEWS.length / 2);
const ROWS = [REVIEWS.slice(0, half), REVIEWS.slice(half)];

/** Social proof: the real Google rating, then every review in two rows drifting opposite ways (still, and readable, with reduced motion). */
export default function SocialProof() {
  return (
    <section className="sp" id="reviews" aria-label="Customer reviews">
      <div className="sp-head">
        <h2>
          Every review is <em>five stars.</em>
        </h2>
        <div className="sp-score">
          <span className="sp-big">5.0</span>
          <div>
            <Stars />
            <p>rating on Google</p>
          </div>
        </div>
        <Link className="sp-link" href={GBP} target="_blank" rel="noopener noreferrer"><G /> Read them on Google</Link>
      </div>
      <div className="sp-rows">
        {ROWS.map((row, r) => (
          <div key={r} className={`sp-track ${r ? "rev" : ""}`} style={{ animationDuration: `${row.length * 11}s` }}>
            {[...row, ...row].map((t, i) => (
              <figure key={`${t.name}-${i}`} className="sp-card" aria-hidden={i >= row.length || undefined}>
                <div className="sp-top"><Stars /><G /></div>
                <blockquote>&ldquo;{t.text}&rdquo;</blockquote>
                <figcaption><span className="sp-av">{t.name.charAt(0)}</span><span><strong>{t.name}</strong><em>Google review</em></span></figcaption>
              </figure>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
