import { Metadata } from "next";

import FilteredProviders from "@/components/Brands_providers/FilteredProviders";

import Evolution from "@/components/Brands_providers/Evolution";

export const metadata: Metadata = {
  title: "Evolution | Bonus topbon.us",
  description:
    "Dive into the immersive world of live casino gaming with Evolution, the industry leader, through our complete guide at Bonus topbon.us. Specializing in real-time casino experiences, Evolution has set the standard for live dealer games, from blackjack and roulette to unique game-show inspired titles. Our in-depth guide uncovers the hallmarks of Evolution games, their state-of-the-art technology, and the unique features that make them a player favorite. Plus, discover a curated list of premier online casinos that feature Evolution's award-winning live games. Whether you're a live casino rookie or a seasoned veteran, our guide equips you with everything you need to make the most of your Evolution gaming experience.",
};

export default async function Bonuses() {
  return (
    <div className="page-bonuses">
      <Evolution />
      {/* <TopBrands /> */}
      <FilteredProviders />
      {/* <GuideSlotsPage /> */}
    </div>
  );
}
