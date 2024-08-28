import { Metadata } from "next";

import FilteredBonuses from "@/components/Brands_bonuses/FilteredBonuses";

import ExclusiveBonuses from "@/components/Brands_bonuses/ExclusiveBonuses";

export const metadata: Metadata = {
  title: "Exclusive  Bonuses | Bonus topbon.us",
  description:
    "Discover a world of exceptional rewards with our detailed guide to Exclusive Bonuses at Bonus topbon.us. Curated for the discerning player, our guide illuminates the types of exclusive bonuses available, from high-roller promotions to VIP packages. We outline how to qualify, what to expect, and how to maximize these premium offers. Plus, browse our handpicked list of reputable casinos that offer the most attractive and reliable exclusive bonuses. Whether you're a casual gamer or a committed enthusiast, our guide serves as your roadmap to unlocking unparalleled value and excitement in your gaming experience.",
};

export default async function Bonuses() {
  return (
    <div className="page-bonuses">
      <ExclusiveBonuses />
      {/* <TopBrands /> */}
      <FilteredBonuses />
      {/* <GuideSlotsPage /> */}
    </div>
  );
}
