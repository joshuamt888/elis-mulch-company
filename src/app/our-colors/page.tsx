import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Our Mulch Colors | Mulch Company MN',
  description:
    'Browse our full selection of mulch colors — Black, Dark Brown, Gold, Natural, Red, Western Red Cedar, and Playground Chips. Serving Chanhassen and the western Twin Cities.',
  alternates: {
    canonical: 'https://mulchcompanymn.com/our-colors',
  },
}

const mulchColors = [
  { name: 'Black Mulch', image: '/images/mulch-colors/black-mulch.png' },
  { name: 'Dark Brown Mulch', image: '/images/mulch-colors/dark-brown-mulch.png' },
  { name: 'Gold Mulch', image: '/images/mulch-colors/gold-mulch.png' },
  { name: 'Natural Mulch', image: '/images/mulch-colors/natural-mulch.png' },
  { name: 'Red Mulch', image: '/images/mulch-colors/red-mulch.png' },
  { name: 'Western Red Cedar Mulch', image: '/images/mulch-colors/western-red-cedar-mulch.png' },
  { name: 'Playground Chips', image: '/images/mulch-colors/playground-chips.png' },
]

export default function OurColorsPage() {
  return (
    <>
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-blossom text-xs font-bold uppercase tracking-[0.2em] mb-3">
            Mulch Company MN
          </p>
          <h1 className="font-outfit text-4xl md:text-5xl font-bold text-bark mb-4">
            Our Colors
          </h1>
          <p className="text-bark/60 text-lg max-w-xl mx-auto">
            Choose the perfect mulch color for your yard. Let us know your pick when you request a quote.
          </p>
        </div>

        {/* Color grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
          {mulchColors.map((color) => (
            <div
              key={color.name}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-soil-dark flex flex-col"
            >
              <div className="relative h-52 bg-soil flex items-center justify-center p-4">
                <Image
                  src={color.image}
                  alt={color.name}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
              <div className="p-4">
                <p className="font-outfit font-bold text-bark text-sm leading-tight">
                  {color.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-soil rounded-3xl p-8 md:p-12 text-center">
          <h2 className="font-outfit text-2xl md:text-3xl font-bold text-bark mb-3">
            Ready to order?
          </h2>
          <p className="text-bark/60 mb-8 max-w-md mx-auto">
            Pick your color and request a free quote. We&apos;ll handle delivery and installation.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/estimate"
              className="inline-flex items-center justify-center bg-blossom hover:bg-blossom-dark text-white font-semibold py-3.5 px-8 rounded-xl transition-colors text-base"
            >
              Price Mulch
            </Link>
            <a
              href="tel:9523144797"
              className="inline-flex items-center justify-center border-2 border-bark/20 hover:border-bark/40 text-bark font-semibold py-3.5 px-8 rounded-xl transition-colors text-base"
            >
              Call (952) 314-4797
            </a>
          </div>
        </div>

      </main>

      <Footer />
    </>
  )
}
