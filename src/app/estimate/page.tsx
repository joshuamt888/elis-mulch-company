import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PriceMulchForm from "@/components/estimate/PriceMulchForm";

export const metadata: Metadata = {
  title: "Price Mulch | Mulch Company MN",
  description:
    "Price your mulch installation instantly. Choose your color and yards, see your total, and schedule your install online. Serving Chanhassen and the western Twin Cities metro.",
  alternates: { canonical: "/estimate" },
};

export default function EstimatePage() {
  return (
    <>
      <Header />
      <main className="bg-[#faf7f2] min-h-screen pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-outfit font-bold text-sand mb-3">
              Price Mulch
            </h1>
            <p className="text-bark text-lg max-w-md mx-auto">
              Pick your color, enter your yards, and see your total instantly.
            </p>
          </div>
          <PriceMulchForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
