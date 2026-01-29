import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import MobileCallBar from "@/components/MobileCallBar";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mulchcompanymn.com"),
  title: {
    default: "Mulch Installation Chanhassen MN | Mulch Company MN",
    template: "%s | Mulch Company MN",
  },
  description:
    "Professional mulch installation near you in Chanhassen & the western Twin Cities. Cedar, hardwood & black mulch. Subscription plans available. Free in-person quotes.",
  keywords:
    "mulch near me, mulch installation near me, mulch company near me, mulch installation Chanhassen, cedar mulch near me, black mulch near me, hardwood mulch near me, mulch for sale near me, landscape mulch near me, mulch installation cost, mulch company MN",
  icons: {
    icon: [
      { url: "/images/logos/favicon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/images/logos/favicon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mulchcompanymn.com",
    title: "Mulch Installation Chanhassen MN | Mulch Company MN",
    description:
      "Subscription-based professional mulch installation in Chanhassen & western Twin Cities metro. Free in-person quotes. Locally owned.",
    siteName: "Mulch Company MN",
  },
  twitter: {
    card: "summary",
    title: "Mulch Installation Chanhassen MN | Mulch Company MN",
    description:
      "Subscription-based professional mulch installation in Chanhassen & western Twin Cities metro. Free in-person quotes. Locally owned.",
  },
  alternates: {
    canonical: "https://mulchcompanymn.com",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://mulchcompanymn.com/#organization",
        name: "Mulch Company MN",
        url: "https://mulchcompanymn.com",
        description:
          "Subscription-based professional mulch installation serving Chanhassen and the western Twin Cities metro.",
      },
      {
        "@type": "WebSite",
        "@id": "https://mulchcompanymn.com/#website",
        url: "https://mulchcompanymn.com",
        name: "Mulch Company MN",
        description:
          "Professional mulch installation with subscription plans in Chanhassen, MN.",
        publisher: {
          "@id": "https://mulchcompanymn.com/#organization",
        },
        inLanguage: "en-US",
      },
      {
        "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
        "@id": "https://mulchcompanymn.com/#localbusiness",
        name: "Mulch Company MN",
        description:
          "Subscription-based professional mulch installation serving Chanhassen and the western Twin Cities metro. Free in-person quotes, recurring service plans.",
        url: "https://mulchcompanymn.com",
        telephone: "(612) 555-0100",
        slogan: "Your Yard, Our Mulch",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Chanhassen",
          addressRegion: "MN",
          addressCountry: "US",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 44.8622,
          longitude: -93.5308,
        },
        areaServed: [
          { "@type": "Place", name: "Chanhassen, MN" },
          { "@type": "Place", name: "Eden Prairie, MN" },
          { "@type": "Place", name: "Chaska, MN" },
          { "@type": "Place", name: "Shakopee, MN" },
          { "@type": "Place", name: "Victoria, MN" },
          { "@type": "Place", name: "Waconia, MN" },
          { "@type": "Place", name: "Excelsior, MN" },
          { "@type": "Place", name: "Minnetonka, MN" },
          { "@type": "Place", name: "Shorewood, MN" },
          { "@type": "Place", name: "Prior Lake, MN" },
          { "@type": "Place", name: "Savage, MN" },
          { "@type": "Place", name: "Carver, MN" },
          { "@type": "Place", name: "Minnesota" },
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "(612) 555-0100",
          contactType: "customer service",
          areaServed: "US",
          availableLanguage: "English",
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "08:00",
            closes: "18:00",
          },
        ],
        knowsAbout: [
          "Mulch Installation",
          "Subscription Mulch Service",
          "Landscape Maintenance",
          "Professional Mulching",
        ],
        priceRange: "$$",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Mulch Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: "Subscription Mulch Installation" },
            },
          ],
        },
        paymentAccepted: "Cash, Credit Card, Check, Venmo",
        currenciesAccepted: "USD",
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        {children}
        <MobileCallBar />
      </body>
    </html>
  );
}
