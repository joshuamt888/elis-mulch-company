import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mulch Installation Chanhassen MN",
  description:
    "Professional mulch installation in Chanhassen & the western Twin Cities. Even coverage, clean edges, proper depth. Free estimates.",
  alternates: {
    canonical: "/services/mulch-installation",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const processSteps = [
  {
    number: "1",
    title: "Assess",
    description:
      "We measure your beds, calculate the cubic yards needed, and recommend the best mulch type for your landscape.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    number: "2",
    title: "Prepare",
    description:
      "We edge your beds for a clean border and remove old, decomposed mulch if needed to ensure proper depth and drainage.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
  {
    number: "3",
    title: "Install",
    description:
      "Our crew spreads mulch evenly to the ideal 2–3 inch depth, keeping it pulled back from tree trunks and plant stems.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  {
    number: "4",
    title: "Clean Up",
    description:
      "We blow off walkways, driveways, and patios so your property looks spotless when we leave. No mess, no hassle.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
];

const faqs = [
  {
    question: "How deep should mulch be?",
    answer:
      "We recommend 2 to 3 inches of mulch for most garden beds. This depth suppresses weeds effectively, retains soil moisture, and insulates plant roots without smothering them. We always keep mulch pulled back a few inches from tree trunks and plant stems to prevent rot.",
  },
  {
    question: "Do you remove old mulch first?",
    answer:
      "It depends on the condition. If the existing mulch is thin and well-decomposed, we can install directly on top. If it's built up too thick or is moldy, we'll remove or rake back the old layer first. We'll assess your beds and recommend the best approach during our initial walkthrough.",
  },
  {
    question: "How long does installation take?",
    answer:
      "Most residential mulch installations are completed in a single visit, typically within 2 to 4 hours depending on the size of the property and number of beds. Larger projects may require a half day. We'll give you a time estimate when we provide your quote.",
  },
  {
    question: "Do I need to be home?",
    answer:
      "Not necessarily. As long as we have access to the areas that need mulching and clear instructions, we can complete the work while you're away. Many of our customers schedule installation during work hours and come home to a beautifully finished landscape.",
  },
];

export default function MulchInstallationPage() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px]">
        <Image
          src="/images/hero/hero-3.webp"
          alt="Hands spreading wood chip mulch around the base of a tree"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#1a1208]/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="font-outfit text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Professional Mulch Installation in Minnesota
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90 sm:text-xl">
            We don&apos;t just deliver — we spread it perfectly for you.
          </p>
        </div>
      </section>

      {/* Why Professional Installation */}
      <section className="bg-white px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-outfit text-3xl font-bold text-sand sm:text-4xl text-center">
            Why Professional Installation?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sand/80">
            Save hours of backbreaking work and get a result that looks professionally finished. Even coverage, clean edges, and proper depth every time.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="bg-white shadow-sm border border-soil-dark/50 rounded-xl overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="/images/hero/hero-2.webp"
                  alt="Aerial view of garden bed with brown mulch and stepping stones"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-outfit text-xl font-semibold text-sand">
                  Even, Professional Coverage
                </h3>
                <p className="mt-2 text-sand/80">
                  Our crews spread mulch to a consistent 2–3 inch depth across all your beds, creating a uniform appearance that enhances your entire landscape. No thin spots, no piles — just clean, level coverage.
                </p>
              </div>
            </div>
            <div className="bg-white shadow-sm border border-soil-dark/50 rounded-xl overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="/images/hero/hero-9.webp"
                  alt="Colonial home with fresh red mulch in flower beds"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-outfit text-xl font-semibold text-sand">
                  Instant Curb Appeal
                </h3>
                <p className="mt-2 text-sand/80">
                  Fresh mulch is one of the fastest ways to transform your home&apos;s exterior. Crisp bed edges and rich color make your landscaping look brand new — without the weeks of labor it would take to do it yourself.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Installation Process */}
      <section className="bg-soil px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-outfit text-3xl font-bold text-sand sm:text-4xl text-center">
            Our Installation Process
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sand/80">
            From assessment to clean-up, we handle every step so your landscape looks its best without you lifting a finger.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <div
                key={step.number}
                className="relative bg-white shadow-sm border border-soil-dark/50 rounded-xl p-6 pt-10 text-center"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-forest text-sm font-bold text-white shadow-md">
                  {step.number}
                </div>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-forest/10">
                  {step.icon}
                </div>
                <h3 className="font-outfit mt-3 text-lg font-semibold text-sand">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-sand/80">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After */}
      <section className="bg-white px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-outfit text-3xl font-bold text-sand sm:text-4xl">
            Before &amp; After
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sand/80">
            See the difference professional mulch installation makes. Old, faded mulch replaced with fresh, vibrant coverage that transforms the entire look of a property.
          </p>
          <div className="mt-10 overflow-hidden rounded-xl border border-soil-dark/50 shadow-sm">
            <div className="relative h-72 sm:h-96">
              <Image
                src="/images/hero/hero-8.webp"
                alt="Before and after comparison of old versus fresh mulch installation"
                fill
                className="object-cover"
              />
            </div>
            <div className="bg-white p-6">
              <p className="text-sand/80">
                A typical mulch refresh: tired, thinning mulch replaced with 3 inches of fresh double-shredded hardwood. Clean edges, proper depth, and a finished look that lasts all season.
              </p>
            </div>
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
            Let Us Handle the Hard Part
          </h2>
          <p className="mt-4 text-lg text-white/90">
            Get a free quote for professional mulch installation. We&apos;ll measure your beds, recommend the right product, and get the job done right.
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
