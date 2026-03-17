import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service for Mulch Company MN. Review our service terms, payment policies, and scheduling conditions.",
  alternates: { canonical: "https://mulchcompanymn.com/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <>
      <Header />

      <main className="pt-28 pb-20 bg-white min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-outfit font-bold text-sand mb-4">Terms of Service</h1>
          <p className="text-bark-light mb-10">Last updated: February 19, 2026</p>

          <div className="space-y-10 text-bark leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-sand mb-4">Agreement to Terms</h2>
              <p>
                By accessing or using the Mulch Company MN website and services (&quot;Services&quot;), you agree to
                be bound by these Terms of Service. If you do not agree, please do not use our Services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sand mb-4">Services Provided</h2>
              <p>
                Mulch Company MN provides professional mulch installation services in the western Twin Cities metro
                area, including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Mulch delivery and professional installation</li>
                <li>Free in-person property estimates</li>
                <li>Online material calculators and estimating tools</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sand mb-4">Scheduling &amp; Install Weeks</h2>
              <p>
                When you purchase mulch installation through our website, you select an install week. We will contact
                you to confirm the exact install day within your selected week. Install dates are subject to weather
                conditions and scheduling availability.
              </p>
              <p className="mt-3">
                Free in-person estimates are scheduled for a specific date and 30-minute time window. We will arrive
                at the property address you provide during the scheduled time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sand mb-4">Payments &amp; Pricing</h2>
              <p>
                We invoice manually after confirming your installation details. Prices include mulch
                materials and a flat delivery fee. Payment is due upon completion of service unless otherwise agreed.
              </p>
              <p className="mt-3">
                Pricing is subject to change without notice, but any price confirmed at the time of your purchase
                will be honored for that order.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sand mb-4">Cancellations &amp; Refunds</h2>
              <p>
                If you need to cancel or reschedule your installation, please contact us as soon as possible at{" "}
                <a href="tel:9523144797" className="text-bark hover:underline">(952) 314-4797</a> or{" "}
                <a href="mailto:info@mulchcompanymn.com" className="text-bark hover:underline">info@mulchcompanymn.com</a>.
                Refund eligibility depends on the timing of the cancellation and whether materials have already been
                ordered or delivered.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sand mb-4">Property Access &amp; Conditions</h2>
              <p>
                By scheduling an installation, you confirm that you have the authority to authorize work at the
                specified property. You agree to provide reasonable access to the work area. We are not responsible
                for damage to underground utilities, irrigation systems, or other features not disclosed prior to
                installation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sand mb-4">Limitation of Liability</h2>
              <p>
                Mulch Company MN is not liable for indirect, incidental, or consequential damages arising from the
                use of our Services. Our total liability shall not exceed the amount paid for the specific service in
                question.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sand mb-4">Accuracy of Information</h2>
              <p>
                You agree to provide accurate and complete information when using our forms, including your name,
                contact information, and property address. Inaccurate information may result in service delays or
                cancellation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sand mb-4">Privacy</h2>
              <p>
                Your use of our Services is also governed by our{" "}
                <Link href="/privacy" className="text-bark hover:underline">
                  Privacy Policy
                </Link>
                , which describes how we collect, use, and protect your personal information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sand mb-4">Contact</h2>
              <p>
                If you have questions about these terms, contact us at:{" "}
                <a href="mailto:info@mulchcompanymn.com" className="text-bark hover:underline">
                  info@mulchcompanymn.com
                </a>{" "}
                or call us at{" "}
                <a href="tel:9523144797" className="text-bark hover:underline">
                  (952) 314-4797
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-sand mb-4">Changes</h2>
              <p>
                We may update these terms from time to time. Changes will be posted on this page with an updated
                revision date. Your continued use of our Services after changes are posted constitutes acceptance of
                the updated terms.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-soil-dark">
            <Link href="/" className="text-bark hover:underline font-medium">
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
