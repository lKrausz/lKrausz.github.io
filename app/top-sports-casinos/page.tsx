import { Metadata } from "next";

import FilteredCasinos from "@/components/Brands_casinos/FilteredCasinos";

import TopSports from "@/components/Brands_casinos/TopSports";

export const metadata: Metadata = {
  title: "Top Sports Brands | Casinos topbon.us",
  description:
    "Discover the best in sports gear with our comprehensive guide to top sports brands at topbon.us. Explore how innovation and technology are transforming the sports industry by enhancing performance, comfort, and durability in athletic apparel and equipment. Our guide dives into the key features of leading sports brands, the benefits of choosing high-quality sports gear, and tips for selecting the right products for your sporting needs. Whether you're a beginner or a professional athlete, our guide is your gateway to excelling in your favorite sports with the right gear.",
};

export default async function Bonuses() {
  return (
    <div className="page-bonuses">
      <TopSports />
      {/* <TopBrands /> */}
      <FilteredCasinos />
      {/* <GuideSlotsPage /> */}
    </div>
  );
}
