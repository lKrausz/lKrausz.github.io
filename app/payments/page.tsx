import { Metadata } from "next";

import FilteredPayments from "@/components/Brands_payments/FilteredPayments";

import Payments from "@/components/Brands_payments/Payments";

export const metadata: Metadata = {
  title: "Payments | Bonus topbon.us",
  description:
    "Navigate the complexities of casino payment methods with ease, thanks to Bonus topbon.us's comprehensive Payments guide. From credit cards and e-wallets to cryptocurrencies, we cover all the options, detailing the pros and cons to help you make informed decisions. Learn about processing times, fees, and security measures so you can deposit and withdraw funds with confidence. Your seamless gaming experience starts with choosing the right payment method, and we're here to guide you every step of the way!",
};

export default async function Bonuses() {
  return (
    <div className="page-bonuses">
      <Payments />
      {/* <TopBrands /> */}
      <FilteredPayments />
      {/* <GuideSlotsPage /> */}
    </div>
  );
}
