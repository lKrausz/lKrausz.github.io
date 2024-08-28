import { Metadata } from "next";

import FilteredPayments from "@/components/Brands_payments/FilteredPayments";

import Maestro from "@/components/Brands_payments/Maestro";

export const metadata: Metadata = {
  title: "Maestro payments | Bonus topbon.us",
  description:
    "Embrace the efficiency and reliability of Maestro payments with our in-depth guide at Bonus topbon.us. A popular debit card service, Maestro offers instant deposits and robust security measures, making it a top choice for many casino players. Our comprehensive guide will walk you through setting up your Maestro account, making transactions, and understanding any associated fees. Plus, we list high-quality casinos that accept Maestro, so you can game with confidence. Get started on your seamless gaming journey by mastering Maestro payments with our expert guidance!",
};

export default async function Bonuses() {
  return (
    <div className="page-bonuses">
      <Maestro />
      {/* <TopBrands /> */}
      <FilteredPayments />
      {/* <GuideSlotsPage /> */}
    </div>
  );
}
