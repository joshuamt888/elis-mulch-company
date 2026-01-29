import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Mulch Company MN. Learn how we collect and use data with Google Analytics, Microsoft Clarity, and Google Search Console.",
  alternates: { canonical: "https://mulchcompanymn.com/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />

      <main className="pt-28 pb-20 bg-white min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-outfit font-bold text-sand mb-4">Privacy Policy</h1>
          <p className="text-sand/50 mb-10">Last updated: January 29, 2026</p>

          <div className="space-y-10 text-sand/80 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-sand mb-4">Overview</h2>
              <p>
                Mulch Company MN (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy. This
                policy explains what data we collect, how we use it, and your rights regarding that data. By
                using our website, you agree to the practices described in this policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sand mb-4">Data We Collect</h2>

              <h3 className="text-xl font-semibold text-sand mt-6 mb-3">Analytics Data</h3>
              <p>We use the following analytics tools to understand how visitors use our site:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong className="text-sand">Google Analytics 4 (GA4)</strong> — Collects anonymous data
                  about page views, session duration, traffic sources, and general user behavior. This helps us
                  understand which pages are most useful and improve our website experience.
                </li>
                <li>
                  <strong className="text-sand">Microsoft Clarity</strong> — Records anonymous session replays
                  and heatmaps to show how users interact with our pages. This helps us identify usability
                  issues. No personal information is captured in recordings.
                </li>
                <li>
                  <strong className="text-sand">Google Search Console</strong> — Provides data about how our
                  site appears in Google search results, including search queries, click-through rates, and
                  indexing status. This data is used to improve our search visibility and does not collect
                  personal user information.
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-sand mt-6 mb-3">Contact Information</h3>
              <p>
                When you request an estimate, fill out a contact form, call us, or email us directly, we
                collect the information you provide — including your name, phone number, email address, property
                address, and project details. We use this information only to respond to your inquiry, prepare
                estimates, and schedule services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sand mb-4">Cookies</h2>
              <p>
                Our site uses cookies for analytics purposes. These cookies help us understand how visitors
                interact with our website. By using this site, you consent to the use of these cookies.
              </p>
              <p className="mt-3">Cookies we use:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong className="text-sand">Google Analytics cookies</strong> — Track anonymous usage data
                  including pages visited, time on site, and traffic sources
                </li>
                <li>
                  <strong className="text-sand">Microsoft Clarity cookies</strong> — Enable anonymous session
                  recording and heatmap functionality
                </li>
              </ul>
              <p className="mt-3">
                You can disable cookies in your browser settings, though this may affect site functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sand mb-4">How We Use Your Data</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To respond to your estimate requests and inquiries</li>
                <li>To schedule and coordinate mulch installation services</li>
                <li>To improve our website and user experience</li>
                <li>To understand how our site is used and optimize our content</li>
                <li>To send occasional service updates or seasonal promotions (you can opt out at any time)</li>
              </ul>
              <p className="mt-3">
                We do not sell, trade, or rent your personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sand mb-4">Third-Party Services</h2>
              <p>We use the following third-party services:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <strong className="text-sand">Google Analytics</strong> —{" "}
                  <a href="https://policies.google.com/privacy" className="text-forest hover:underline" target="_blank" rel="noopener noreferrer">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <strong className="text-sand">Google Search Console</strong> —{" "}
                  <a href="https://policies.google.com/privacy" className="text-forest hover:underline" target="_blank" rel="noopener noreferrer">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <strong className="text-sand">Microsoft Clarity</strong> —{" "}
                  <a href="https://privacy.microsoft.com/en-us/privacystatement" className="text-forest hover:underline" target="_blank" rel="noopener noreferrer">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <strong className="text-sand">Vercel</strong> (hosting) —{" "}
                  <a href="https://vercel.com/legal/privacy-policy" className="text-forest hover:underline" target="_blank" rel="noopener noreferrer">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sand mb-4">Data Security</h2>
              <p>
                We implement reasonable security measures to protect your personal information. Our website is
                served over HTTPS, and we use trusted third-party services with their own security practices.
                However, no method of transmission over the internet is 100% secure, and we cannot guarantee
                absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sand mb-4">Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Request information about what data we have about you</li>
                <li>Request deletion of your personal data</li>
                <li>Opt out of marketing communications at any time</li>
                <li>Opt out of analytics tracking by using browser extensions or settings</li>
              </ul>
              <p className="mt-4">To opt out of analytics tracking, you can install these browser extensions:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>
                  <a href="https://tools.google.com/dlpage/gaoptout" className="text-forest hover:underline" target="_blank" rel="noopener noreferrer">
                    Google Analytics Opt-out Browser Add-on
                  </a>
                </li>
                <li>
                  <a href="https://microsoftedge.microsoft.com/addons/detail/microsoft-clarity/gnldpbnocfnlkkicnaplmkaphfdnlplb" className="text-forest hover:underline" target="_blank" rel="noopener noreferrer">
                    Microsoft Clarity Block Extension
                  </a>
                  {" "}(or use your browser&apos;s built-in tracking protection)
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sand mb-4">Contact</h2>
              <p>
                If you have questions about this privacy policy, contact us at:{" "}
                <a href="mailto:info@mulchcompanymn.com" className="text-forest hover:underline">
                  info@mulchcompanymn.com
                </a>{" "}
                or call us at{" "}
                <a href="tel:6125550100" className="text-forest hover:underline">
                  (612) 555-0100
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sand mb-4">Changes</h2>
              <p>
                We may update this policy from time to time. Changes will be posted on this page with an
                updated revision date. Your continued use of our website after changes are posted constitutes
                acceptance of the updated policy.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-soil-dark">
            <Link href="/" className="text-forest hover:underline font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
