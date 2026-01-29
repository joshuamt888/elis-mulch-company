import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mulch Delivery & Installation Victoria, MN",
  description:
    "Premium mulch delivery and installation in Victoria, Minnesota. Bulk mulch, cedar, hardwood, playground chips. Same-day delivery available. Free estimates.",
  alternates: { canonical: "https://mulchcompanymn.com/victoria-mulch-delivery" },
  robots: { index: true, follow: true },
};

const nearbyAreas = [
  { name: "Chanhassen", href: "/chanhassen-mulch-delivery" },
  { name: "Eden Prairie", href: "/eden-prairie-mulch-delivery" },
  { name: "Chaska", href: "/chaska-mulch-delivery" },
  { name: "Shakopee", href: "/shakopee-mulch-delivery" },
  { name: "Waconia", href: "/waconia-mulch-delivery" },
  { name: "Excelsior", href: "/excelsior-mulch-delivery" },
  { name: "Minnetonka", href: "/minnetonka-mulch-delivery" },
  { name: "Shorewood", href: "/shorewood-mulch-delivery" },
  { name: "Prior Lake", href: "/prior-lake-mulch-delivery" },
  { name: "Savage", href: "/savage-mulch-delivery" },
  { name: "Carver", href: "/carver-mulch-delivery" },
];

export default function VictoriaMulchDeliveryPage() {
  return (
    <>
      <Header />

      <section className="relative h-[60vh] min-h-[400px]">
        <Image
          src="/images/hero/hero-1.webp"
          alt="Mulch delivery in Victoria, MN"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#1a1208]/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <h1 className="text-white text-4xl md:text-5xl font-outfit font-bold max-w-4xl">
            Mulch Delivery &amp; Installation in Victoria, MN
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">
            Premium mulch products delivered and installed across Victoria.
            Locally owned, same-day delivery available.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              href="/estimate"
              className="bg-forest hover:bg-forest-light text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Get a Free Quote
            </Link>
            <a
              href="tel:6125550100"
              className="border-2 border-white text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Call (612) 555-0100
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold text-sand text-center mb-12">
            Our Mulch Services in Victoria
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white shadow-sm border border-soil-dark/50 rounded-xl p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-sand mb-3">Mulch Installation</h3>
              <p className="text-sand/70 mb-4">
                Many Victoria homeowners are landscaping new construction or refreshing mature beds. Our installation crews bring expertise and efficiency to every Victoria project, large or small.
              </p>
              <Link href="/services/mulch-installation" className="text-forest font-semibold hover:text-forest-light transition-colors">
                Learn More →
              </Link>
            </div>
            <div className="bg-white shadow-sm border border-soil-dark/50 rounded-xl p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-sand mb-3">Mulch Delivery</h3>
              <p className="text-sand/70 mb-4">
                Victoria&apos;s small-town feel and newer developments deserve reliable service. We deliver premium mulch throughout the community, from established properties to brand-new homes along Highway 5.
              </p>
              <Link href="/services/mulch-delivery" className="text-forest font-semibold hover:text-forest-light transition-colors">
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-soil py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold text-sand text-center mb-12">
            Why Victoria Homeowners Trust Mulch Company MN
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Based Right Here",
                desc: "We're based in Chanhassen, right next door to Victoria. Your neighbor is your mulch company.",
              },
              {
                title: "Same-Day Delivery",
                desc: "Order before noon and receive your mulch the same day — perfect for Victoria's weekend projects.",
              },
              {
                title: "Premium Products",
                desc: "Double-shredded hardwood, cedar, and playground chips. Top-quality products for Victoria's beautiful properties.",
              },
              {
                title: "Full Installation Available",
                desc: "We'll spread it for you. Save hours of labor and enjoy Victoria's small-town charm instead.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <svg className="mx-auto mb-4 h-10 w-10 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <h3 className="text-sand font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sand/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h2 className="text-2xl font-outfit font-bold text-sand mb-8">We Also Serve</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {nearbyAreas.map((area) => (
              <Link
                key={area.href}
                href={area.href}
                className="bg-soil hover:bg-forest hover:text-white text-sand font-medium px-4 py-2 rounded-full transition-colors text-sm"
              >
                {area.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold text-white mb-4">
            Ready for Fresh Mulch in Victoria?
          </h2>
          <p className="text-white/80 text-lg mb-8">Get a free estimate today.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/estimate"
              className="bg-forest hover:bg-forest-light text-white font-semibold px-6 py-3 rounded-lg border-2 border-white transition-colors"
            >
              Get a Free Quote
            </Link>
            <a
              href="tel:6125550100"
              className="border-2 border-white text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Call (612) 555-0100
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
