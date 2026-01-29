import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSlideshow from "@/components/HeroSlideshow";

const services = [
  {
    title: "Mulch Delivery",
    image: "/images/hero/hero-1.webp",
    alt: "Bulk black mulch pile delivered to a residential driveway",
    description:
      "We deliver premium mulch by the cubic yard directly to your driveway or job site. Choose from hardwood, cedar, or playground chips with flexible scheduling.",
    href: "/services/mulch-delivery",
  },
  {
    title: "Mulch Installation",
    image: "/images/hero/hero-3.webp",
    alt: "Professional mulch installation around tree base",
    description:
      "Save yourself hours of backbreaking work. Our crew will spread your mulch evenly across your garden beds, trees, and landscaping for a perfect finish.",
    href: "/services/mulch-installation",
  },
  {
    title: "Bulk Mulch",
    image: "/images/hero/hero-4.webp",
    alt: "Double-shredded hardwood mulch texture close-up",
    description:
      "Contractors, landscapers, and large projects welcome. We supply bulk quantities at competitive prices with reliable delivery across the metro.",
    href: "/services/bulk-mulch",
  },
];

const whyUs = [
  {
    title: "Locally Owned & Operated",
    description:
      "We live and work in the western metro. Your neighbors are our neighbors.",
    icon: (
      <svg className="w-10 h-10 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" />
      </svg>
    ),
  },
  {
    title: "Same-Day Delivery Available",
    description:
      "Need mulch fast? We offer same-day delivery for orders placed before noon.",
    icon: (
      <svg className="w-10 h-10 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Quality Products",
    description:
      "Premium double-shredded hardwood, cedar, and playground-safe chips.",
    icon: (
      <svg className="w-10 h-10 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Professional Installation",
    description:
      "Don't just dump it — we'll spread it perfectly, saving you hours of work.",
    icon: (
      <svg className="w-10 h-10 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const products = [
  {
    title: "Hardwood Mulch",
    image: "/images/hero/hero-4.webp",
    alt: "Double-shredded hardwood mulch texture",
    description:
      "Double-shredded hardwood mulch. Rich dark brown color. Excellent for garden beds and landscaping.",
  },
  {
    title: "Cedar Mulch",
    image: "/images/hero/hero-7.webp",
    alt: "Red cedar mulch in wheelbarrow on garden path",
    description:
      "Natural cedar mulch with a warm red tone. Naturally repels insects and retains color longer.",
  },
  {
    title: "Playground Chips",
    image: "/images/hero/hero-6.webp",
    alt: "Kids playing on playground with wood chip mulch surface",
    description:
      "Safety-certified wood chips for playgrounds and play areas. Soft, durable, and kid-friendly.",
  },
];

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

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <HeroSlideshow />
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-white text-5xl md:text-6xl font-outfit font-bold leading-tight mb-6">
            Premium Mulch Delivery &amp; Installation in Chanhassen, MN
          </h1>
          <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto">
            Bulk mulch, cedar, hardwood &amp; playground chips delivered to your door. Serving the western Twin Cities metro.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
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
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-white/80 text-sm font-medium">
            <span>Locally Owned</span>
            <span className="hidden sm:inline" aria-hidden="true">&middot;</span>
            <span>Same-Day Delivery Available</span>
            <span className="hidden sm:inline" aria-hidden="true">&middot;</span>
            <span>Free Estimates</span>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-outfit font-bold text-sand mb-4">
              Our Mulch Services
            </h2>
            <p className="text-sand/70 text-lg">
              From delivery to installation — we handle it all.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white shadow-md border border-soil-dark/50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Image
                  src={service.image}
                  alt={service.alt}
                  width={400}
                  height={250}
                  className="w-full h-[250px] object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-outfit font-bold text-sand mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sand/70 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <Link
                    href={service.href}
                    className="text-forest font-semibold hover:text-forest-light transition-colors"
                  >
                    Learn More &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-soil py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-outfit font-bold text-sand mb-4">
              Why Chanhassen Trusts Eli&apos;s Mulch
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {whyUs.map((item) => (
              <div key={item.title} className="flex gap-5">
                <div className="shrink-0 mt-1">{item.icon}</div>
                <div>
                  <h3 className="text-sand font-bold text-lg mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sand/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transformation Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-outfit font-bold text-sand mb-10">
            See the Difference Mulch Makes
          </h2>
          <div className="max-w-4xl mx-auto mb-10">
            <Image
              src="/images/hero/hero-8.webp"
              alt="Before and after comparison of old mulch versus fresh mulch application"
              width={900}
              height={500}
              className="w-full rounded-2xl shadow-lg object-cover"
            />
          </div>
          <p className="text-sand/70 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            Fresh mulch instantly upgrades your curb appeal, suppresses weeds, and retains soil moisture. One delivery is all it takes.
          </p>
          <Link
            href="/estimate"
            className="inline-block bg-forest hover:bg-forest-light text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            Get Your Free Estimate
          </Link>
        </div>
      </section>

      {/* Products Section */}
      <section className="bg-soil py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-outfit font-bold text-sand mb-4">
              Mulch Products We Carry
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.title}
                className="bg-white shadow-md border border-soil-dark/50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Image
                  src={product.image}
                  alt={product.alt}
                  width={400}
                  height={250}
                  className="w-full h-[250px] object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-outfit font-bold text-sand mb-3">
                    {product.title}
                  </h3>
                  <p className="text-sand/70 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-outfit font-bold text-sand mb-4">
            Serving the Western Twin Cities Metro
          </h2>
          <p className="text-sand/70 text-lg mb-10">
            Based in Chanhassen, we deliver and install mulch across the western suburbs.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {serviceAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/${area.slug}-mulch-delivery`}
                className="bg-soil hover:bg-forest hover:text-white text-sand font-medium px-4 py-2 rounded-full transition-colors"
              >
                {area.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-forest py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-outfit font-bold text-white mb-4">
            Ready to Transform Your Yard?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Get a free estimate today. No pressure, no obligation.
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
