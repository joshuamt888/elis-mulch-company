import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AddToCalendar from "@/components/estimate/AddToCalendar";

export const metadata: Metadata = {
  title: "Payment Confirmed | Mulch Company MN",
  description: "Your mulch installation has been scheduled. Thank you!",
  robots: { index: false, follow: false },
};

export default function EstimateSuccessPage() {
  return (
    <>
      <Header />
      <main className="bg-[#faf7f2] min-h-screen pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl shadow-lg border border-sand/10 p-8 sm:p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blossom/10 rounded-full mb-6">
              <svg
                className="w-8 h-8 text-bark"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-outfit font-bold text-sand mb-3">
              You&apos;re All Set!
            </h1>
            <p className="text-bark mb-4 leading-relaxed text-lg">
              Your payment has been received and your mulch installation is
              scheduled.
            </p>
            <p className="text-bark mb-8 leading-relaxed">
              We&apos;ll reach out to confirm the exact install day during your
              selected week. Check your email for a receipt from Square.
            </p>

            <AddToCalendar />

            <div className="mt-8">
              <Link
                href="/"
                className="inline-block bg-blossom hover:bg-blossom-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
