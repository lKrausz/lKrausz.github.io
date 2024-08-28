import { Metadata } from "next";

import FilteredPayments from "@/components/Brands_payments/FilteredPayments";

import Visa from "@/components/Brands_payments/Visa";

export const metadata: Metadata = {
  title: "Visa payments | Bonus topbon.us",
  description:
    "Master the world of Visa payments in online casinos with Bonus topbon.us's detailed guide. Trusted worldwide, Visa offers speedy transactions, top-notch security, and wide acceptance. Our in-depth analysis covers everything you need to know, from setting up your account to withdrawal speeds. Plus, discover which top-rated casinos accept Visa, so you can play with peace of mind. Get ready to make your casino experience even more convenient with our expert insights on Visa payments!",
};

export default async function Bonuses() {
  return (
    <div className="page-bonuses">
      <Visa />
      {/* <TopBrands /> */}
      <FilteredPayments />
      {/* <GuideSlotsPage /> */}
    </div>
  );
}
