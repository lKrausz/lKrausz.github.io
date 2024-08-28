import { Metadata } from "next";

import FilteredProviders from "@/components/Brands_providers/FilteredProviders";

import Pushgaming from "@/components/Brands_providers/Pushgaming";

export const metadata: Metadata = {
  title: "Push Gaming | Bonus topbon.us",
  description:
    "Explore the dynamic world of Push Gaming with our comprehensive guide at Bonus topbon.us. Renowned for creating high-quality, mobile-optimized casino games, Push Gaming is a force to be reckoned with in the online gaming landscape. Our guide delves into their most popular titles, unique features, and innovative gameplay mechanics. Plus, discover a curated list of top-rated casinos that offer Push Gaming’s diverse game portfolio. Whether you're a casual player or a seasoned enthusiast, our guide gives you the insights you need to fully enjoy the captivating offerings of Push Gaming.",
};

export default async function Bonuses() {
  return (
    <div className="page-bonuses">
      <Pushgaming />
      {/* <TopBrands /> */}
      <FilteredProviders />
      {/* <GuideSlotsPage /> */}
    </div>
  );
}
