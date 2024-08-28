import { Metadata } from "next";

import FilteredPayments from "@/components/Brands_payments/FilteredPayments";

import Ecopayz from "@/components/Brands_payments/Ecopayz";

export const metadata: Metadata = {
  title: "Ecopayz payments | Bonus topbon.us",
  description:
    "Navigate the versatile world of EcoPayz payments with our comprehensive guide at Bonus topbon.us. EcoPayz is a secure, flexible, and international e-wallet solution, perfect for online casino enthusiasts. Our guide covers every aspect of using EcoPayz, from account setup to deposit and withdrawal processes, as well as associated fees. We also showcase top-tier casinos that accept EcoPayz, allowing you to start your gaming adventure with ultimate peace of mind. Uncover the advantages of using EcoPayz payments and elevate your online casino experience with our expert insights!",
};

export default async function Bonuses() {
  return (
    <div className="page-bonuses">
      <Ecopayz />
      {/* <TopBrands /> */}
      <FilteredPayments />
      {/* <GuideSlotsPage /> */}
    </div>
  );
}
