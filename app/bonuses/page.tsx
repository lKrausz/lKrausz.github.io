import { Metadata } from "next";

import FilteredBonuses from "@/components/Brands_bonuses/FilteredBonuses";

export const metadata: Metadata = {
  title: "Bonuses | Bonus topbon.us",
  description:
    "Discover a world of exciting possibilities with casino bonuses at Bonus topbon.us. Our platform is your gateway to understanding and maximizing the value of casino bonuses. From welcome offers to no-deposit bonuses, free spins to loyalty rewards, we delve into the diverse range of bonuses available in the online gaming realm. Our comprehensive guides provide insights into bonus types, terms, and wagering requirements, helping you make the most of your gameplay. With our curated list of top casinos offering the most generous and reputable bonuses, you're empowered to enhance your gaming adventure and reap the benefits of Bonus topbon.us's expertise",
};

export default async function Bonuses() {
  return (
    <div className="page-bonuses">
      <div className="main__container">
        <FilteredBonuses />
      </div>
      {/* <PreviewBonuses /> */}
      {/* <TopBrandsOriginal /> */}
      {/* <GuideSlotsPage /> */}
    </div>
  );
}
