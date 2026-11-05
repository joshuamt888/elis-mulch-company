import type { Metadata } from 'next'
import { crumbsLd, faqLd, colorsFaqs } from "@/lib/faq";
import { JsonLd } from "@/components/garden/JsonLd";
import Faq from "@/components/garden/Faq";
import SocialProof from "@/components/garden/SocialProof";
import PageHero from "@/components/garden/PageHero";
import BeforeAfterScroll from "@/components/garden/BeforeAfterScroll";
import HowStatic from "@/components/garden/HowStatic";
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
      <JsonLd data={[faqLd(colorsFaqs), crumbsLd([{ name: "Home", path: "/" }, { name: "Our Colors", path: "/our-colors" }])]} />
      <Header />

      <main className="gd cv">
        <PageHero h1="Our Colors" sub="Choose the perfect mulch color for your yard. Let us know your pick when you request a quote." image="/images/hero/hero-1.webp" alt="A pile of fresh black mulch on a driveway" />
        <section className="colors">
          <div className="colors-grid">
            {mulchColors.map((color) => (
              <figure key={color.name} className="colors-card">
                <div className="colors-img">
                  <Image src={color.image} alt={color.name} fill className="object-contain" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
                </div>
                <figcaption>{color.name}</figcaption>
              </figure>
            ))}
          </div>
        </section>
        <HowStatic />
        <BeforeAfterScroll />
        <SocialProof />
        <Faq items={colorsFaqs} title="Mulch color questions" />
      </main>
      <Footer ctaTitle="Ready to order?" ctaText="Pick your color and request a free quote. We'll handle delivery and installation." />
    </>
  )
}
