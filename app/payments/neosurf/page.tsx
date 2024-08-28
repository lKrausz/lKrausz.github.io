import { Metadata } from "next";

import FilteredPayments from "@/components/Brands_payments/FilteredPayments";

import NeoSurf from "@/components/Brands_payments/NeoSurf";

export const metadata: Metadata = {
  title: "Neosurf payments | Bonus topbon.us",
  description:
    "Uncover the simplicity and convenience of using Neosurf for your online casino transactions with our complete guide at Bonus topbon.us. Popular for its prepaid vouchers, Neosurf offers an accessible and anonymous way to fund your casino accounts. Our comprehensive guide takes you through the entire process, from purchasing Neosurf vouchers to redeeming them online. We also list top-tier casinos that accept Neosurf, ensuring that your gameplay is as secure as it is entertaining. Dive into a hassle-free casino experience by mastering Neosurf payments with our expert advice!",
};

export default async function Bonuses() {
  return (
    <div className="page-bonuses">
      <NeoSurf />
      {/* <TopBrands /> */}
      <FilteredPayments />
      {/* <GuideSlotsPage /> */}
    </div>
  );
}
