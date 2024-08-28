import { Metadata } from "next";

import FilteredPayments from "@/components/Brands_payments/FilteredPayments";

import MobilePayments from "@/components/Brands_payments/MobilePayments";

export const metadata: Metadata = {
  title: "Mobile payments | Bonus topbon.us",
  description:
    "Step into the future of convenience with Mobile Payments, expertly covered in our comprehensive guide at Bonus topbon.us. From SMS payments to mobile wallets, our guide details the various mobile payment methods that make funding your casino account as easy as a tap on your screen. Learn about their advantages, security features, and any limitations, all while discovering top-rated casinos that support mobile payments. Ensure a seamless and secure gaming experience by harnessing the power of mobile payments with our expert insights!",
};

export default async function Bonuses() {
  return (
    <div className="page-bonuses">
      <MobilePayments />
      {/* <TopBrands /> */}
      <FilteredPayments />
      {/* <GuideSlotsPage /> */}
    </div>
  );
}
