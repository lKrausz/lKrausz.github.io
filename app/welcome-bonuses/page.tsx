import { Metadata } from "next";

import FilteredBonuses from "@/components/Brands_bonuses/FilteredBonuses";

import WelcomeBonuses from "@/components/Brands_bonuses/WelcomeBonuses";

export const metadata: Metadata = {
  title: "Welcome  Bonuses | Bonus topbon.us",
  description:
    "Discover the most rewarding welcome bonuses in the online casino world with Bonus topbon.us! We've meticulously researched and listed top welcome offers that give you a head start in your gaming journey. From free spins and match bonuses to no-deposit offers, our guide breaks down the fine print and helps you find the most lucrative deals. Boost your play and increase your chances of hitting the jackpot with our curated list of welcome bonuses!",
};

export default async function Bonuses() {
  return (
    <div className="page-bonuses">
      <WelcomeBonuses />
      {/* <TopBrands /> */}
      <FilteredBonuses />
      {/* <GuideSlotsPage /> */}
    </div>
  );
}
