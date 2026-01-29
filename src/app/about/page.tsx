import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About Mulch Company MN | Chanhassen MN",
  description:
    "Mulch Company MN is a locally owned mulch delivery and installation company serving Chanhassen and the western Twin Cities metro. Meet the team behind your yard's best look.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    title: "Local First",
    description:
      "We live here, we work here, we care about this community.",
  },
  {
    title: "No Shortcuts",
    description:
      "Every yard gets our full attention — proper depth, clean edges, zero mess.",
  },
  {
    title: "Fair Pricing",
    description:
      "Honest quotes, no hidden fees, competitive with the big guys.",
  },
];

const cities = [
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

export default function AboutPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center text-center text-white">
        <Image
          src="/images/hero/hero-5.webp"
          alt="Front yard shrubs with fresh mulch"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About Mulch Company MN
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-white/90">
            Locally owned. Community driven. Mulch obsessed.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-sand mb-6">
              Our Story
            </h2>
            <p className="text-sand/80 leading-relaxed text-lg">
              Mulch Company MN was founded by two brothers — Eli and
              Owen — right here in Chanhassen, Minnesota. What started as a side
              hustle hauling mulch for neighbors turned into a full-service mulch
              delivery and installation company serving the entire western Twin
              Cities metro.
            </p>
            <p className="text-sand/80 leading-relaxed text-lg mt-4">
              We&apos;re not a big box store. We&apos;re not a franchise.
              We&apos;re your neighbors — and we take pride in making your yard
              look incredible.
            </p>
          </div>
          <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden">
            <Image
              src="/images/hero/hero-3.webp"
              alt="Hands spreading mulch in a garden bed"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-soil py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-sand text-center mb-12">
            What We Stand For
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-2xl p-8 shadow-sm"
              >
                <h3 className="text-xl font-bold text-sand mb-3">
                  {value.title}
                </h3>
                <p className="text-sand/70 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-sand mb-8">
            Where We Work
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {cities.map((city) => {
              const slug = city.toLowerCase().replace(/\s+/g, "-");
              return (
                <Link
                  key={city}
                  href={`/${slug}-mulch-delivery`}
                  className="px-5 py-2 rounded-full bg-soil text-sand font-medium hover:bg-forest hover:text-white transition-colors"
                >
                  {city}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to get started?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/estimate"
              className="px-8 py-3 bg-white text-forest font-semibold rounded-lg hover:bg-soil transition-colors"
            >
              Get a Free Estimate
            </Link>
            <a
              href="tel:+16125551234"
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Call Us Today
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
