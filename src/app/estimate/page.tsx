import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Get a Free Mulch Installation Quote | Chanhassen MN",
  description:
    "Request a free in-person mulch installation quote from Mulch Company MN. We visit your property and provide accurate pricing. Serving Chanhassen and the western Twin Cities metro.",
  alternates: { canonical: "/estimate" },
};

export default function EstimatePage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center text-center text-white">
        <Image
          src="/images/hero/hero-9.webp"
          alt="Colonial home with fresh red mulch"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Get Your Free Quote
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-white/90">
            We provide free in-person quotes for all mulch installation projects.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          {/* Left — Form */}
          <div>
            <p className="text-sand/80 text-lg mb-6 leading-relaxed">
              Tell us about your property and we&apos;ll schedule a visit to assess your needs and provide accurate pricing. No obligation, no pressure.
            </p>
            <form
              /* action="/api/estimate" method="POST" */
              className="space-y-5"
            >
              <div>
                <label htmlFor="name" className="block text-sand font-medium mb-1">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-soil-dark rounded-lg bg-white text-sand"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sand font-medium mb-1">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="w-full px-4 py-3 border border-soil-dark rounded-lg bg-white text-sand"
                  placeholder="(612) 555-1234"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sand font-medium mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-soil-dark rounded-lg bg-white text-sand"
                  placeholder="you@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="details"
                  className="block text-sand font-medium mb-1"
                >
                  Property Details
                </label>
                <textarea
                  id="details"
                  name="details"
                  rows={5}
                  className="w-full px-4 py-3 border border-soil-dark rounded-lg bg-white text-sand"
                  placeholder="Tell us about your property — approximate size of area, number of beds, any preferences, etc."
                />
              </div>

              <button
                type="submit"
                className="bg-forest hover:bg-forest-light text-white font-semibold w-full py-3 rounded-lg transition-colors"
              >
                Request My Free Quote
              </button>
            </form>
          </div>

          {/* Right — Contact Info */}
          <div className="space-y-8">
            <div className="bg-soil rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-sand mb-6">
                Contact Info
              </h2>

              <div className="space-y-4 text-sand/80">
                <div>
                  <h3 className="font-semibold text-sand">Phone</h3>
                  <a
                    href="tel:+16125551234"
                    className="hover:text-forest transition-colors"
                  >
                    (612) 555-1234
                  </a>
                </div>
                <div>
                  <h3 className="font-semibold text-sand">Email</h3>
                  <a
                    href="mailto:info@mulchcompanymn.com"
                    className="hover:text-forest transition-colors"
                  >
                    info@mulchcompanymn.com
                  </a>
                </div>
                <div>
                  <h3 className="font-semibold text-sand">Hours</h3>
                  <p>Mon – Fri: 8am – 6pm</p>
                </div>
              </div>
            </div>

            <div className="bg-soil rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-sand mb-4">
                What to Expect
              </h2>
              <ul className="space-y-3 text-sand/80">
                <li className="flex items-start gap-3">
                  <span className="text-forest font-bold mt-0.5">&#10003;</span>
                  We respond within 24 hours
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-forest font-bold mt-0.5">&#10003;</span>
                  Free in-person property assessment
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-forest font-bold mt-0.5">&#10003;</span>
                  Detailed written estimate
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-forest font-bold mt-0.5">&#10003;</span>
                  Subscription plan options available
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-forest font-bold mt-0.5">&#10003;</span>
                  No pressure — ever
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
