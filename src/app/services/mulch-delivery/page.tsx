import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mulch Delivery Chanhassen MN",
  description:
    "Bulk mulch delivery in Chanhassen & the western Twin Cities metro. Same-day and next-day delivery available. Call for a free quote.",
  alternates: {
    canonical: "/services/mulch-delivery",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const deliveryCities = [
  "Chanhassen",
  "Eden Prairie",
  "Chaska",
  "Shakopee",
  "Victoria",
  "Waconia",
  "Excelsior",
  "Minnetonka",
  "Shorewood",
  "Prior Lake",
  "Savage",
  "Carver",
];

const steps = [
  {
    number: "1",
    title: "Order",
    description:
      "Give us a call or fill out our online form. Let us know the type and amount of mulch you need.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    number: "2",
    title: "Schedule",
    description:
      "Pick a delivery window that works for you. We offer same-day and next-day delivery throughout the season.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    number: "3",
    title: "Delivery",
    description:
      "We drop the mulch right where you need it — driveway, side yard, or directly next to your garden beds.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2-1 2 1 2-1 2 1zM13 6h5l4 6v4a1 1 0 01-1 1h-1M6 19a2 2 0 104 0H6zm10 0a2 2 0 104 0h-4z" />
      </svg>
    ),
  },
];

const products = [
  {
    name: "Double-Shredded Hardwood Mulch",
    description:
      "Our most popular option. Finely shredded for a clean, uniform look that stays in place and breaks down slowly to enrich your soil.",
    image: "/images/hero/hero-4.webp",
    alt: "Close-up texture of double-shredded hardwood mulch",
  },
  {
    name: "Cedar Mulch",
    description:
      "Naturally aromatic and insect-resistant. Cedar mulch adds a warm reddish tone to your landscape and lasts longer than standard hardwood.",
    image: "/images/hero/hero-7.webp",
    alt: "Wheelbarrow filled with red cedar mulch overhead view",
  },
  {
    name: "Playground Wood Chips",
    description:
      "Certified-safe wood chips designed for playground areas. Provides cushioning and meets safety depth requirements for fall zones.",
    image: null,
    alt: "",
  },
  {
    name: "Colored Mulch",
    description:
      "Available in black, brown, and red. Color-enhanced mulch keeps its vibrant appearance longer and adds a bold accent to any landscape design.",
    image: null,
    alt: "",
  },
];

const faqs = [
  {
    question: "How much mulch do I need?",
    answer:
      "A good rule of thumb is 1 cubic yard covers roughly 100 square feet at 3 inches deep. Measure your beds and give us a call — we're happy to help you calculate the right amount so you don't over- or under-order.",
  },
  {
    question: "Do you offer same-day delivery?",
    answer:
      "Yes, we offer same-day mulch delivery for orders placed before noon, subject to availability. Next-day delivery is available for all orders. We'll confirm your delivery window when you schedule.",
  },
  {
    question: "What's the minimum order?",
    answer:
      "Our minimum delivery is 2 cubic yards. This is enough to cover roughly 200 square feet at the recommended 3-inch depth, which works well for most small to mid-sized garden bed projects.",
  },
  {
    question: "Where do you deliver?",
    answer:
      "We deliver throughout the western Twin Cities metro, including Chanhassen, Eden Prairie, Chaska, Shakopee, Victoria, Waconia, Excelsior, Minnetonka, Shorewood, Prior Lake, Savage, and Carver. Contact us if your city isn't listed — we may still be able to serve you.",
  },
];

export default function MulchDeliveryPage() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px]">
        <Image
          src="/images/hero/hero-1.webp"
          alt="Bulk black mulch pile delivered to a residential driveway"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#1a1208]/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="font-outfit text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Mulch Delivery in Chanhassen &amp; the Western Metro
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90 sm:text-xl">
            Bulk mulch delivered to your driveway — on your schedule.
          </p>
        </div>
      </section>

      {/* How Mulch Delivery Works */}
      <section className="bg-white px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-outfit text-3xl font-bold text-sand sm:text-4xl text-center">
            How Mulch Delivery Works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sand/80">
            Getting mulch delivered to your property is simple. We handle the heavy lifting so you can focus on your project.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative bg-white shadow-sm border border-soil-dark/50 rounded-xl p-8 pt-10 text-center"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-forest text-sm font-bold text-white shadow-md">
                  {step.number}
                </div>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-forest/10">
                  {step.icon}
                </div>
                <h3 className="font-outfit mt-3 text-xl font-semibold text-sand">
                  {step.title}
                </h3>
                <p className="mt-2 text-sand/80">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Deliver */}
      <section className="bg-soil px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-outfit text-3xl font-bold text-sand sm:text-4xl text-center">
            What We Deliver
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sand/80">
            We carry a full range of mulch products to suit every landscape need — from garden beds to playgrounds.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {products.map((product) => (
              <div
                key={product.name}
                className="bg-white shadow-sm border border-soil-dark/50 rounded-xl overflow-hidden"
              >
                {product.image && (
                  <div className="relative h-56">
                    <Image
                      src={product.image}
                      alt={product.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-outfit text-xl font-semibold text-sand">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-sand/80">{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Area */}
      <section className="bg-white px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-outfit text-3xl font-bold text-sand sm:text-4xl text-center">
            Delivery Area
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sand/80">
            We deliver bulk mulch across the western Twin Cities metro. If your city isn&apos;t listed, give us a call — we may still be able to reach you.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {deliveryCities.map((city) => (
              <span
                key={city}
                className="inline-block rounded-full bg-forest/10 px-5 py-2 text-sm font-medium text-forest"
              >
                {city}
              </span>
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
            Ready to Get Mulch Delivered?
          </h2>
          <p className="mt-4 text-lg text-white/90">
            Contact us today for a free quote. We&apos;ll help you figure out how much you need and get it delivered fast.
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
