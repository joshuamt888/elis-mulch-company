import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSlideshow from "@/components/HeroSlideshow";

const serviceAreas = [
  { name: "Chanhassen", slug: "chanhassen" },
  { name: "Eden Prairie", slug: "eden-prairie" },
  { name: "Chaska", slug: "chaska" },
  { name: "Shakopee", slug: "shakopee" },
  { name: "Victoria", slug: "victoria" },
  { name: "Waconia", slug: "waconia" },
  { name: "Excelsior", slug: "excelsior" },
  { name: "Minnetonka", slug: "minnetonka" },
  { name: "Shorewood", slug: "shorewood" },
  { name: "Prior Lake", slug: "prior-lake" },
  { name: "Savage", slug: "savage" },
  { name: "Carver", slug: "carver" },
];

export default function Home() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <HeroSlideshow />
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-white text-3xl sm:text-5xl md:text-6xl font-outfit font-bold leading-tight mb-4">
            Professional Mulch Installation in Chanhassen, MN
          </h1>
          <p className="text-white/90 text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
            Subscription-based service for homes and businesses. Cedar, hardwood, black mulch and more.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              href="/estimate"
              className="bg-forest hover:bg-forest-light text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Get a Free Quote
            </Link>
            <a
              href="tel:6125550100"
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Call (612) 555-0100
            </a>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-white/70 text-sm">
            <span>Subscription Plans Available</span>
            <span className="hidden sm:inline">&middot;</span>
            <span>Free In-Person Quotes</span>
            <span className="hidden sm:inline">&middot;</span>
            <span>Locally Owned</span>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold text-sand text-center mb-10">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Schedule a Quote", desc: "We visit your property and assess your needs in person. No guesswork." },
              { step: "2", title: "Choose Your Plan", desc: "Pick a subscription plan that fits your property and budget." },
              { step: "3", title: "We Handle the Rest", desc: "Our crew installs fresh mulch on schedule. You never lift a finger." },
            ].map((item) => (
              <div key={item.step} className="relative bg-white shadow-md border border-soil-dark/50 rounded-xl p-8 pt-12 text-center">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-forest text-white font-bold text-lg shadow-md">
                  {item.step}
                </div>
                <h3 className="text-xl font-outfit font-bold text-sand mb-2">{item.title}</h3>
                <p className="text-sand/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-soil py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold text-sand text-center mb-10">
            Why Chanhassen Trusts Mulch Company
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { title: "Set It & Forget It", desc: "Recurring mulch installation on your schedule." },
              { title: "In-Person Quotes", desc: "We visit your property for accurate pricing." },
              { title: "Pro Installation", desc: "Even coverage, clean edges, zero mess." },
              { title: "Locally Owned", desc: "Based in Chanhassen, serving the western metro." },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="text-sand font-bold mb-1">{item.title}</h3>
                <p className="text-sand/70 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mulch Types */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold text-sand text-center mb-4">
            Mulch Types We Install
          </h2>
          <p className="text-sand/70 text-center mb-10 max-w-2xl mx-auto">
            We install all major mulch types — your quote includes a recommendation for your landscape.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: "Hardwood Mulch", image: "/images/hero/hero-4.webp" },
              { name: "Cedar Mulch", image: "/images/hero/hero-7.webp" },
              { name: "Black Mulch", image: "/images/hero/hero-8.webp" },
              { name: "Brown Mulch", image: "/images/hero/hero-5.webp" },
              { name: "Red Mulch", image: "/images/hero/hero-9.webp" },
              { name: "Playground Mulch", image: "/images/hero/hero-6.webp" },
            ].map((mulch) => (
              <div key={mulch.name} className="relative rounded-xl overflow-hidden group h-32 sm:h-40">
                <Image
                  src={mulch.image}
                  alt={mulch.name + " installation near Chanhassen Minnesota"}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white font-outfit font-bold text-sm sm:text-lg">{mulch.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas + CTA */}
      <section className="bg-soil py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold text-sand mb-4">
            Serving the Western Twin Cities Metro
          </h2>
          <p className="text-sand/70 mb-8">
            Based in Chanhassen, installing mulch across the western suburbs.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {serviceAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/${area.slug}-mulch-delivery`}
                className="bg-white hover:bg-forest hover:text-white text-sand font-medium px-4 py-2 rounded-full transition-colors text-sm"
              >
                {area.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-forest py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold text-white mb-4">
            Ready for a Hassle-Free Yard?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Schedule your free in-person quote today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/estimate"
              className="bg-white text-forest hover:bg-soil px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Request a Quote
            </Link>
            <a
              href="tel:6125550100"
              className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
