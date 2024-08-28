import { Metadata } from "next";

import FilteredCasinos from "@/components/Brands_casinos/FilteredCasinos";

export const metadata: Metadata = {
  title: "Casinos | Bonus topbon.us",
  description:
    "Embark on a thrilling journey through the diverse world of online casinos with our all-inclusive guide at Bonus topbon.us. From the industry giants to hidden gems, our comprehensive guide reviews the most trustworthy and entertaining casinos in the market. Discover what sets each casino apart in terms of game offerings, customer service, bonuses, and security features. Additionally, navigate our curated list of top-rated online casinos to find the perfect match for your gaming preferences. Whether you're a novice player taking your first steps or a seasoned veteran, our guide equips you with everything you need for an enriching gaming experience.",
};

export default async function Casinos() {
  return (
    <div className="page-bonuses">
      {/* <PreviewBonuses /> */}
      {/* <TopBrandsOriginal /> */}
      <FilteredCasinos />
      {/* <GuideSlotsPage /> */}
    </div>
  );
}
