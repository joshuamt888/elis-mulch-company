import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PriceMulchForm from "@/components/estimate/PriceMulchForm";
import Link from "next/link";
import { AREAS } from "@/lib/areas";
import { REVIEWS, GBP } from "@/components/garden/SocialProof";

const Stars = () => (
  <div className="pm-stars" role="img" aria-label="5 out of 5 stars">
    {[0, 1, 2, 3, 4].map((i) => (<svg key={i} viewBox="0 0 20 20" aria-hidden><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>))}
  </div>
);

export const metadata: Metadata = {
  title: "Price Mulch | Mulch Company MN",
  description:
    "Get a free in-person mulch estimate, request installation, or ask a question. Mulch Company MN is based in Chanhassen and serves the Twin Cities metro. Call (952) 314-4797.",
  alternates: { canonical: "/estimate" },
};

export default function EstimatePage() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-B8WJQTDVKX"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-B8WJQTDVKX');
        `}
      </Script>
      <Header />
      <main className="pm">
        <section className="pm-hero">
          <p className="pm-eyebrow">Price mulch</p>
          <h1>
            Let&apos;s price your <em>yard.</em>
          </h1>
          <p className="pm-sub">Tell us what you need. We visit, measure and quote it in person, free. Call, email, or fill in the form.</p>
          <div className="pm-stats">
            <a href="tel:9523144797" className="pm-stat"><b>(952) 314-4797</b><span>Call us</span></a>
            <div className="pm-stat"><b>5.0</b><span>rating on Google</span></div>
            <div className="pm-stat"><b>Mon&ndash;Fri</b><span>8 AM &ndash; 6 PM</span></div>
            <Link href="/#areas" className="pm-stat"><b>{AREAS.length}</b><span>cities served</span></Link>
          </div>
        </section>

        <section className="pm-grid">
          <aside className="pm-side">
            <div className="pm-card">
              <h2>Talk to us</h2>
              <a className="pm-row" href="tel:9523144797">
                <svg viewBox="0 0 24 24" aria-hidden><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" /></svg>
                <span><strong>(952) 314-4797</strong><em>Call or text</em></span>
              </a>
              <a className="pm-row" href="mailto:info@mulchcompanymn.com">
                <svg viewBox="0 0 24 24" aria-hidden><path d="M3 6h18v12H3zM3 7l9 6 9-6" /></svg>
                <span><strong>info@mulchcompanymn.com</strong><em>Email</em></span>
              </a>
              <div className="pm-row">
                <svg viewBox="0 0 24 24" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
                <span><strong>Mon&ndash;Fri, 8 AM &ndash; 6 PM</strong><em>Hours</em></span>
              </div>
              <div className="pm-row">
                <svg viewBox="0 0 24 24" aria-hidden><path d="M12 21s-7-5.2-7-11a7 7 0 0114 0c0 5.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
                <span><strong>Chanhassen, MN</strong><em>Based here, serving {AREAS.length} cities. <Link href="/#areas">See them all</Link></em></span>
              </div>
            </div>

            <div className="pm-card">
              <h2>What happens next</h2>
              <ol className="pm-steps">
                <li><b>1</b><span><strong>We visit and quote</strong>We come out, assess your beds in person and give you an exact price. No guesswork.</span></li>
                <li><b>2</b><span><strong>We schedule your install</strong>We confirm your install week and set everything up.</span></li>
                <li><b>3</b><span><strong>We handle the rest</strong>Our crew installs fresh mulch on schedule. You never lift a finger.</span></li>
              </ol>
            </div>

            <figure className="pm-card pm-quote">
              <Stars />
              <blockquote>&ldquo;{REVIEWS[0].text}&rdquo;</blockquote>
              <figcaption>{REVIEWS[0].name} &middot; <a href={GBP} target="_blank" rel="noopener noreferrer">Google review</a></figcaption>
            </figure>
          </aside>

          <div className="pm-main">
            <div className="pm-card pm-form">
              <h2>Request your quote</h2>
              <p className="pm-form-sub">Free, in person, no obligation. Fully insured and locally owned.</p>
              <PriceMulchForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
