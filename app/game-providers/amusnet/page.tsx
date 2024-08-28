import { Metadata } from "next";

import FilteredProviders from "@/components/Brands_providers/FilteredProviders";
// import GuideSlotsPage from "@/components/GuideSlotsPage";
import Amusnet from "@/components/Brands_providers/Amusnet";

export const metadata: Metadata = {
  title: "Amusnet | Bonus topbon.us",
  description:
    "Discover the unique offerings of Amusnet with our complete guide at Bonus topbon.us. Known for its specialized focus on slot games and innovative gaming mechanics, Amusnet is a notable name in the online casino industry. Our in-depth guide reviews the brand’s key titles, distinctive features, and what makes Amusnet a standout developer. Additionally, browse our curated list of reputable online casinos that host Amusnet games for an unrivaled gaming experience. Whether you're a casual gamer or a seasoned enthusiast, our guide offers all the insights you need to fully appreciate the unique appeal of Amusnet.",
};

export default async function Bonuses() {
  return (
    <div className="page-bonuses">
      <Amusnet />
      {/* <TopBrands /> */}
      <FilteredProviders />

      {/* <GuideSlotsPage /> */}
    </div>
  );
}
