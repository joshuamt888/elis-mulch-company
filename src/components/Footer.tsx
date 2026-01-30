import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1208] border-t border-bark/20 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Company Info */}
          <div>
            <div className="mb-3">
              <Image src="/images/logos/main-logo.webp" alt="Mulch Company" width={80} height={80} />
            </div>
            <p className="text-[#c4b49a] text-sm leading-relaxed">
              Subscription-based mulch installation serving Chanhassen and the western Twin Cities metro. Professional service, hassle-free yards.
            </p>
          </div>

          {/* Our Service */}
          <div>
            <h3 className="text-[#d4c5a9] font-outfit font-semibold text-lg mb-3">Our Service</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services/mulch-installation"
                  className="text-[#c4b49a] hover:text-white transition-colors text-sm"
                >
                  Professional Mulch Installation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[#d4c5a9] font-outfit font-semibold text-lg mb-3">Contact</h3>
            <ul className="space-y-2 text-[#c4b49a] text-sm">
              <li>
                <a href="tel:6125550100" className="hover:text-white transition-colors">
                  (612) 555-0100
                </a>
              </li>
              <li>
                <a href="mailto:info@mulchcompanymn.com" className="hover:text-white transition-colors">
                  info@mulchcompanymn.com
                </a>
              </li>
              <li>Chanhassen, MN</li>
              <li>Licensed &amp; Insured</li>
            </ul>
          </div>
        </div>

        {/* Follow Us */}
        <div className="border-t border-bark/20 pt-8 text-center">
          <h4 className="text-[#d4c5a9] font-outfit font-semibold text-sm mb-4">Follow Us</h4>
          <div className="flex items-center justify-center gap-4 mb-6">
            <a href="#" aria-label="Facebook" className="text-[#c4b49a] hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="text-[#c4b49a] hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a href="#" aria-label="Google" className="text-[#c4b49a] hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
              </svg>
            </a>
          </div>

          {/* Copyright */}
          <p className="text-[#c4b49a] text-xs mb-2">
            &copy; {year} Mulch Company. All rights reserved.{" "}
            &middot;{" "}
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>{" "}
            &middot;{" "}
            <Link href="/sitemap" className="hover:text-white transition-colors">
              Sitemap
            </Link>
          </p>

        </div>
      </div>

      {/* Agency Credit */}
      <div className="bg-[#0f0a04] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-2">
          <span className="text-[#c4b49a]/50 text-xs">Website & SEO by</span>
          <a
            href="https://www.steadyscaling.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/images/logos/steady-scaling-logo.webp"
              alt="Steady Scaling"
              width={20}
              height={20}
              className="rounded-sm"
            />
            <span className="text-[#c4b49a]/70 text-xs font-medium">Steady Scaling</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
