import { Metadata } from "next";

import FilteredProviders from "@/components/Brands_providers/FilteredProviders";
import Providers from "@/components/Brands_providers/Providers";

export const metadata: Metadata = {
  title: "Game Providers | Bonus topbon.us",
  description:
    "Navigate the extensive world of casino game providers with our definitive guide at Bonus topbon.us. We take you behind the scenes, exploring the leading names in the industry as well as emerging developers shaping the future of online gaming. Our comprehensive guide covers their specialties, most popular titles, unique features, and innovative gameplay mechanics. Also, discover a curated selection of trustworthy casinos where you can experience games from these top providers. Whether you're a newbie or a seasoned gamer, our guide equips you with the essential knowledge to choose the right provider for your gaming preferences.",
};

export default async function Casinos() {
  return (
    <div className="page-bonuses">
      <Providers />
      {/* <TopBrands /> */}
      <FilteredProviders />
      {/* <GuideSlotsPage /> */}
    </div>
  );
}
