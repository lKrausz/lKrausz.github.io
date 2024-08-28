import { Metadata } from "next";

import FilteredPayments from "@/components/Brands_payments/FilteredPayments";

import Skrill from "@/components/Brands_payments/Skrill";

export const metadata: Metadata = {
  title: "Skrill payments | Bonus topbon.us",
  description:
    "Experience the convenience and flexibility of using Skrill for your online casino activities with our comprehensive guide on Bonus topbon.us. Skrill stands out for its ease of use, quick transaction times, and robust security features. Our in-depth guide explores how to set up and manage your Skrill account, as well as its pros and cons for online gaming. Additionally, discover which top-tier casinos accept Skrill, ensuring you have a smooth and secure gameplay experience. Maximize your gaming potential by leveraging the advantages of Skrill payments with our expert insights!",
};

export default async function Bonuses() {
  return (
    <div className="page-bonuses">
      <Skrill />
      {/* <TopBrands /> */}
      <FilteredPayments />
      {/* <GuideSlotsPage /> */}
    </div>
  );
}
