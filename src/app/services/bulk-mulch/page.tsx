import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Bulk Mulch Supply Minnesota",
  description:
    "Bulk mulch by the cubic yard for contractors, landscapers, and large projects. Competitive pricing and flexible delivery across the western Twin Cities.",
  alternates: {
    canonical: "/services/bulk-mulch",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const products = [
  {
    name: "Double-Shredded Hardwood",
    specs: "Finely processed hardwood bark. Dark brown color, medium texture. Excellent moisture retention and weed suppression. Breaks down over 12–18 months to enrich soil.",
  },
  {
    name: "Cedar Mulch",
    specs: "Natural aromatic cedar with a warm reddish-brown hue. Naturally resists insects and fungal growth. Slower decomposition rate — lasts 2+ seasons in most climates.",
  },
  {
    name: "Playground Wood Chips",
    specs: "Engineered wood fiber meeting ASTM F1292 fall-attenuation standards. Available in bulk for playgrounds, parks, and recreational areas. Certified safe for fall heights up to 12 feet at proper depth.",
  },
  {
    name: "Colored Mulch",
    specs: "Available in black, brown, and red. Color is achieved using iron-oxide-based dyes that are non-toxic and environmentally safe. Maintains vibrant color throughout the season.",
  },
];

const benefits = [
  {
    title: "Volume Discounts",
    description:
      "The more you order, the more you save. Our tiered bulk pricing means significant savings on large orders — ideal for multi-property jobs or seasonal contracts.",
  },
  {
    title: "Contractor Pricing",
    description:
      "We offer special pricing for licensed contractors and landscaping companies. Set up a standing account and streamline ordering for the entire season.",
  },
  {
    title: "Flexible Scheduling",
    description:
      "Schedule deliveries around your project timeline. We accommodate multi-drop deliveries across different job sites and offer recurring delivery arrangements.",
  },
  {
    title: "Large Quantity Capability",
    description:
      "From 5 yards for a residential refresh to 50+ yards for commercial projects, we have the inventory and logistics to handle orders of any size.",
  },
];

const faqs = [
  {
    question: "What's the minimum bulk order?",
    answer:
      "Our minimum bulk delivery is 2 cubic yards. For contractor and commercial accounts ordering regularly, we can discuss flexible minimums based on your seasonal volume.",
  },
  {
    question: "Do you offer contractor pricing?",
    answer:
      "Yes. Licensed landscapers and contractors are eligible for our contractor pricing program. Contact us to set up an account — we'll get you set up with volume-based rates and priority scheduling.",
  },
  {
    question: "Can I pick up or do you only deliver?",
    answer:
      "We primarily offer delivery, but pickup may be arranged depending on the product and quantity. Give us a call to discuss pickup availability for your order.",
  },
  {
    question: "How do I calculate yards needed?",
    answer:
      "Multiply the length and width of the area in feet, then multiply by the desired depth in feet (3 inches = 0.25 feet). Divide the result by 27 to convert cubic feet to cubic yards. For example, a 30×10 foot bed at 3 inches deep needs about 2.8 cubic yards. We're happy to help you calculate — just call with your measurements.",
  },
];

export default function BulkMulchPage() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px]">
        <Image
          src="/images/hero/hero-4.webp"
          alt="Close-up texture of double-shredded hardwood mulch"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#1a1208]/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="font-outfit text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Bulk Mulch Supply — By the Yard
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90 sm:text-xl">
            Contractors, landscapers, and large projects. Competitive bulk pricing.
          </p>
        </div>
      </section>

      {/* Bulk Mulch for Every Project */}
      <section className="bg-white px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 md:grid-cols-2 items-center">
            <div>
              <h2 className="font-outfit text-3xl font-bold text-sand sm:text-4xl">
                Bulk Mulch for Every Project
              </h2>
              <p className="mt-4 text-sand/80">
                Whether you&apos;re a landscaper handling multiple properties or a homeowner with a large yard, we supply mulch by the cubic yard at competitive prices. Our bulk mulch is sourced from quality hardwood and cedar, processed on-site, and available for delivery throughout the western Twin Cities metro.
              </p>
              <p className="mt-4 text-sand/80">
                We work with landscape contractors, property managers, municipalities, and homeowners tackling big projects. No job is too large — we have the inventory to keep your crews moving without delays.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-block bg-forest hover:bg-forest-light text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Request Bulk Pricing
              </Link>
            </div>
            <div className="relative h-72 sm:h-96 overflow-hidden rounded-xl border border-soil-dark/50 shadow-sm">
              <Image
                src="/images/hero/hero-1.webp"
                alt="Bulk black mulch pile ready for delivery"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Available in Bulk */}
      <section className="bg-soil px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-outfit text-3xl font-bold text-sand sm:text-4xl text-center">
            Products Available in Bulk
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sand/80">
            All of our mulch products are available in bulk quantities. Each is processed for consistency and quality.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {products.map((product) => (
              <div
                key={product.name}
                className="bg-white shadow-sm border border-soil-dark/50 rounded-xl p-6"
              >
                <h3 className="font-outfit text-xl font-semibold text-sand">
                  {product.name}
                </h3>
                <p className="mt-2 text-sand/80">{product.specs}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bulk Pricing Advantages */}
      <section className="bg-white px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-outfit text-3xl font-bold text-sand sm:text-4xl text-center">
            Bulk Pricing Advantages
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sand/80">
            Ordering in bulk saves you money and simplifies your supply chain. Here&apos;s what you get when you buy mulch by the yard from Eli&apos;s Mulch Company.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-white shadow-sm border border-soil-dark/50 rounded-xl p-6"
              >
                <h3 className="font-outfit text-xl font-semibold text-sand">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sand/80">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-soil px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-outfit text-3xl font-bold text-sand sm:text-4xl text-center">
            Frequently Asked Questions
          </h2>
          <div className="mt-10 space-y-8">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-outfit text-lg font-bold text-sand">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sand/80">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-outfit text-3xl font-bold text-white sm:text-4xl">
            Need Mulch in Bulk?
          </h2>
          <p className="mt-4 text-lg text-white/90">
            Get in touch for contractor pricing, volume discounts, or to schedule your next bulk delivery. We&apos;re here to keep your projects supplied.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="bg-white hover:bg-soil text-forest font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Get a Free Quote
            </Link>
            <a
              href="tel:+16125551234"
              className="border-2 border-white text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Call Us Now
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
