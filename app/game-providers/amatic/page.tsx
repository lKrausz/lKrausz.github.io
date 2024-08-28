import { Metadata } from "next";

import FilteredProviders from "@/components/Brands_providers/FilteredProviders";
// import GuideSlotsPage from "@/components/GuideSlotsPage";
import Amatic from "@/components/Brands_providers/Amatic";

export const metadata: Metadata = {
  title: "Amatic | Bonus topbon.us",
  description:
    "Uncover the timeless allure of Amatic games with our expert guide at Bonus topbon.us. A veteran in the industry, Amatic has been delivering classic slots and modern casino games for decades, blending traditional appeal with innovative features. Our detailed guide dives into Amatic's renowned titles, unique gameplay mechanics, and what sets them apart in a competitive market. Plus, explore our curated list of the best casinos offering Amatic games for an authentic and reliable gaming experience. Whether you're new to Amatic or a longtime fan, our guide serves as your ultimate resource for maximizing your enjoyment.",
};

export default async function Bonuses() {
  return (
    <div className="page-bonuses">
      <Amatic />
      {/* <TopBrands /> */}
      <FilteredProviders />
      {/* <GuideSlotsPage /> */}
    </div>
  );
}
