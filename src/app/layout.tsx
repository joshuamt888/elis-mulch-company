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
    "Professional mulch installation and delivery in Chanhassen & western Twin Cities metro. Cedar, hardwood, playground chips. Free estimates.",
  keywords:
    "mulch installation Chanhassen, mulch delivery Minnesota, cedar mulch, hardwood mulch, playground mulch, landscape supply",
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
      "Professional mulch installation and delivery in Chanhassen & western Twin Cities metro. Cedar, hardwood, playground chips. Free estimates.",
    siteName: "Mulch Company MN",
  },
  twitter: {
    card: "summary",
    title: "Mulch Installation Chanhassen MN | Mulch Company MN",
    description:
      "Professional mulch installation and delivery in Chanhassen & western Twin Cities metro. Cedar, hardwood, playground chips. Free estimates.",
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
          "Premium mulch delivery and installation serving Chanhassen and the western Twin Cities metro. Quality products, professional service.",
      },
      {
        "@type": "WebSite",
        "@id": "https://mulchcompanymn.com/#website",
        url: "https://mulchcompanymn.com",
        name: "Mulch Company MN",
        description:
          "Premium mulch delivery, installation & landscape supply in Chanhassen, MN.",
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
          "Professional mulch installation & delivery serving Chanhassen and the western Twin Cities metro. Cedar, hardwood, playground chips. Professional service, competitive pricing.",
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
          "Mulch Delivery",
          "Cedar Mulch",
          "Hardwood Mulch",
          "Playground Mulch",
          "Landscape Supply",
        ],
        priceRange: "$$",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Mulch Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: "Mulch Installation" },
            },
            {
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: "Mulch Delivery" },
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
