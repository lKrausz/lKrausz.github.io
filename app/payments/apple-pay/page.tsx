import { Metadata } from "next";

import FilteredPayments from "@/components/Brands_payments/FilteredPayments";

import ApplePay from "@/components/Brands_payments/ApplePay";

export const metadata: Metadata = {
  title: "ApplePay payments | Bonus topbon.us",
  description:
    "Unlock the seamless convenience of ApplePay payments for your online casino activities with our complete guide at Bonus topbon.us. Ideal for iPhone and Apple Watch users, ApplePay offers instant deposits, robust security, and a user-friendly interface. Our guide breaks down how to set up and use ApplePay for casino gaming, highlighting both its advantages and any limitations. Additionally, find a curated list of premium casinos that accept ApplePay, ensuring you game with peace of mind. Elevate your casino experience to the next level with the simplicity and security of ApplePay payments, guided by our expert insights!",
};

export default async function Bonuses() {
  return (
    <div className="page-bonuses">
      <ApplePay />
      {/* <TopBrands /> */}
      <FilteredPayments />
      {/* <GuideSlotsPage /> */}
    </div>
  );
}
