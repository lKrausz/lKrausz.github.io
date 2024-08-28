import { Metadata } from "next";

import FilteredCasinos from "@/components/Brands_casinos/FilteredCasinos";

import TopCertifiedCasinos from "@/components/Brands_casinos/TopCertifiedCasinos";

export const metadata: Metadata = {
  title: "Top Certified Casinos | XXLCasinoList",
  description:
    "Explore the crème de la crème of the gaming industry with our list of Top Certified Casinos at XXLCasinoList. We've scrutinized countless platforms to bring you a curated list of casinos that are not only exciting but also 100% secure and certified. With rigorous standards for quality, fair play, and customer service, these casinos set the benchmark in the industry. Get ready for a trustworthy and exhilarating gaming experience with our handpicked selections!",
};

export default async function Bonuses() {
  return (
    <div className="page-bonuses">
      <TopCertifiedCasinos />
      {/* <TopBrands /> */}
      <FilteredCasinos />
      {/* <GuideSlotsPage /> */}
    </div>
  );
}
