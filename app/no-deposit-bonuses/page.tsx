import { Metadata } from "next";

import FilteredBonuses from "@/components/Brands_bonuses/FilteredBonuses";

import NoDepositBonuses from "@/components/Brands_bonuses/NoDepositBonuses";

export const metadata: Metadata = {
  title: "Bonuses | Bonus topbon.us",
  description:
    "Unlock a world of rewards with our comprehensive guide to casino bonuses on Bonus topbon.us. From welcome bonuses to no-deposit offers and free spins, our guide helps you navigate the diverse landscape of casino incentives. Learn how to maximize your gameplay by understanding bonus types, terms, and wagering requirements. Plus, discover a curated list of top casinos offering the most lucrative bonuses in the industry. Enhance your gaming experience and get more value for your money by mastering the art of casino bonuses with our expert insights!",
};

export default async function Bonuses() {
  return (
    <div className="page-bonuses">
      <NoDepositBonuses />
      {/* <TopBrands /> */}
      <FilteredBonuses />
      {/* <GuideSlotsPage /> */}
    </div>
  );
}
