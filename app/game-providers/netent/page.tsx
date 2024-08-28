import { Metadata } from "next";

import FilteredProviders from "@/components/Brands_providers/FilteredProviders";

import Netent from "@/components/Brands_providers/Netent";

export const metadata: Metadata = {
  title: "NeTent | Bonus topbon.us",
  description:
    "Discover the magic of NetEnt games with our comprehensive guide at Bonus topbon.us. A pioneering force in the online casino world, NetEnt is known for its graphically stunning slots, innovative features, and immersive live casino games. Our in-depth guide takes you through their classic and newest titles, special gameplay mechanics, and the key elements that make NetEnt a favorite among players. Plus, find a curated selection of premium casinos offering NetEnt games for a top-tier gaming experience. Whether you're new to NetEnt or a seasoned aficionado, our guide provides everything you need to enjoy their offerings to the fullest.",
};

export default async function Bonuses() {
  return (
    <div className="page-bonuses">
      <Netent />
      {/* <TopBrands /> */}
      <FilteredProviders />
      {/* <GuideSlotsPage /> */}
    </div>
  );
}
