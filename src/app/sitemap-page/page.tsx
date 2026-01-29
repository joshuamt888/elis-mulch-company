import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Sitemap",
  alternates: { canonical: "/sitemap-page" },
};

const sections = [
  {
    heading: "Main Pages",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Get an Estimate", href: "/estimate" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Mulch Installation", href: "/services/mulch-installation" },
    ],
  },
  {
    heading: "Service Areas",
    links: [
      { label: "Chanhassen", href: "/chanhassen-mulch-delivery" },
      { label: "Eden Prairie", href: "/eden-prairie-mulch-delivery" },
      { label: "Chaska", href: "/chaska-mulch-delivery" },
      { label: "Shakopee", href: "/shakopee-mulch-delivery" },
      { label: "Victoria", href: "/victoria-mulch-delivery" },
      { label: "Waconia", href: "/waconia-mulch-delivery" },
      { label: "Excelsior", href: "/excelsior-mulch-delivery" },
      { label: "Minnetonka", href: "/minnetonka-mulch-delivery" },
      { label: "Shorewood", href: "/shorewood-mulch-delivery" },
      { label: "Prior Lake", href: "/prior-lake-mulch-delivery" },
      { label: "Savage", href: "/savage-mulch-delivery" },
      { label: "Carver", href: "/carver-mulch-delivery" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <>
      <Header />

      <main className="max-w-4xl mx-auto py-20 px-4">
        <h1 className="text-4xl font-bold text-sand mb-12">Sitemap</h1>

        <div className="grid md:grid-cols-3 gap-12">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-xl font-bold text-sand mb-4">
                {section.heading}
              </h2>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sand/70 hover:text-forest transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
