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

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <HeroSlideshow />
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 pt-20">
          <h1 className="text-white text-5xl md:text-6xl font-outfit font-bold leading-tight mb-6">
            Professional Mulch Installation Near You in Chanhassen, MN
          </h1>
          <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto">
            Your local mulch company in Minnesota. Subscription-based mulch installation for homes and businesses across the western Twin Cities metro — cedar, hardwood, black mulch and more.
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
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-outfit font-bold text-sand mb-4">
              How It Works
            </h2>
            <p className="text-sand/70 text-lg">
              Three simple steps to a beautiful, maintenance-free yard.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "1",
                title: "Schedule a Quote",
                description:
                  "We visit your property and assess your mulch needs. No guesswork, no online calculators — just an honest, in-person evaluation.",
              },
              {
                step: "2",
                title: "Choose Your Plan",
                description:
                  "Pick a subscription plan that fits your property and budget. We'll recommend the right mulch type and schedule for your landscape.",
              },
              {
                step: "3",
                title: "We Handle the Rest",
                description:
                  "Our crew installs fresh mulch on schedule. You never lift a finger. Your yard stays beautiful year after year.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative bg-white shadow-md border border-soil-dark/50 rounded-xl p-8 pt-12 text-center"
              >
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-forest text-white font-bold text-lg shadow-md">
                  {item.step}
                </div>
                <h3 className="text-xl font-outfit font-bold text-sand mb-3">
                  {item.title}
                </h3>
                <p className="text-sand/70 leading-relaxed">
                  {item.description}
                </p>
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
              Why Chanhassen Trusts Mulch Company
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {[
              {
                title: "Set It & Forget It",
                description:
                  "Subscribe once, we handle your mulch installation on a recurring schedule. No reminders, no rebooking — it just happens.",
                icon: (
                  <svg className="w-10 h-10 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: "In-Person Quotes",
                description:
                  "We visit your property to give you an accurate, fair price. No guessing, no online estimates that miss the mark.",
                icon: (
                  <svg className="w-10 h-10 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                ),
              },
              {
                title: "Professional Installation",
                description:
                  "Expert crew, even coverage, clean edges, zero mess. We treat your yard like our own.",
                icon: (
                  <svg className="w-10 h-10 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: "Locally Owned",
                description:
                  "Based in Chanhassen, serving the western metro. Your neighbors are our neighbors.",
                icon: (
                  <svg className="w-10 h-10 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" />
                  </svg>
                ),
              },
            ].map((item) => (
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

      {/* Mulch Types We Install */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-outfit font-bold text-sand mb-4">
              Mulch Types We Install
            </h2>
            <p className="text-sand/70 text-lg max-w-2xl mx-auto">
              Looking for mulch near you? We install all major mulch types — your in-person quote includes a recommendation based on your landscape, soil, and aesthetic preferences.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: "Hardwood Mulch",
                desc: "Double-shredded hardwood mulch is the most popular choice for garden beds and landscaping. Rich dark brown color, stays in place, and breaks down slowly to enrich your soil.",
                image: "/images/hero/hero-4.webp",
              },
              {
                name: "Cedar Mulch",
                desc: "Cedar mulch offers a warm reddish tone and naturally repels insects. Retains its color longer than standard hardwood and adds a clean, aromatic finish to any landscape.",
                image: "/images/hero/hero-7.webp",
              },
              {
                name: "Black Mulch",
                desc: "Black mulch provides a bold, modern contrast against green foliage and colorful flowers. A popular choice for front yard landscaping and commercial properties.",
                image: "/images/hero/hero-4.webp",
              },
              {
                name: "Brown Mulch",
                desc: "Classic brown mulch blends naturally with most landscapes. Available in standard and double-shredded varieties for a clean, uniform appearance.",
                image: "/images/hero/hero-5.webp",
              },
              {
                name: "Red Mulch",
                desc: "Red mulch adds vibrant color to garden beds and retains its hue throughout the season. An eye-catching choice for curb appeal and decorative landscaping.",
                image: "/images/hero/hero-9.webp",
              },
              {
                name: "Playground Mulch",
                desc: "Safety-certified playground wood chips designed for fall zones and play areas. Soft, durable, and meets safety depth requirements for homes, parks, and schools.",
                image: "/images/hero/hero-6.webp",
              },
            ].map((mulch) => (
              <div key={mulch.name} className="bg-white shadow-sm border border-soil-dark/50 rounded-xl overflow-hidden">
                <div className="relative h-40">
                  <Image
                    src={mulch.image}
                    alt={mulch.name + " installation near Chanhassen Minnesota"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-outfit font-bold text-sand text-lg mb-2">{mulch.name}</h3>
                  <p className="text-sand/70 text-sm leading-relaxed">{mulch.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sand/60 text-sm mt-8">
            Not sure which mulch is right for your yard? We&apos;ll recommend the best option during your free in-person quote.
          </p>
        </div>
      </section>

      {/* Transformation Section */}
      <section className="bg-soil py-20">
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
            Fresh mulch instantly upgrades your curb appeal, suppresses weeds, and retains soil moisture. With a subscription plan, your yard looks this good every season.
          </p>
          <Link
            href="/estimate"
            className="inline-block bg-forest hover:bg-forest-light text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            Get Your Free Estimate
          </Link>
        </div>
      </section>

      {/* Service Areas */}
      <section className="bg-soil py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-outfit font-bold text-sand mb-4">
            Serving the Western Twin Cities Metro
          </h2>
          <p className="text-sand/70 text-lg mb-10">
            Based in Chanhassen, we provide professional mulch installation across the western suburbs.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {serviceAreas.map((area) => (
              <Link
                key={area.slug}
                href={`/${area.slug}-mulch-delivery`}
                className="bg-white hover:bg-forest hover:text-white text-sand font-medium px-4 py-2 rounded-full transition-colors"
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
