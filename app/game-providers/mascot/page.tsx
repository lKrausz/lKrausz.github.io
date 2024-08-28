import { Metadata } from "next";

import FilteredProviders from "@/components/Brands_providers/FilteredProviders";

import Mascot from "@/components/Brands_providers/Mascot";

export const metadata: Metadata = {
  title: "Mascot | Bonus topbon.us",
  description:
    "Unearth the gaming gems of Mascot with our comprehensive guide at Bonus topbon.us. Mascot is an emerging player in the casino software industry, rapidly gaining attention for its engaging slots and well-crafted table games. Our in-depth guide delves into their standout titles, special game features, and why they are a brand to watch. Plus, browse through a curated list of top casinos that feature Mascot's diverse game portfolio for a premium gaming experience. Whether you're exploring Mascot for the first time or already a fan, our guide offers valuable insights to enhance your gaming adventure.",
};

export default async function Bonuses() {
  return (
    <div className="page-bonuses">
      <Mascot />
      {/* <TopBrands /> */}
      <FilteredProviders />
      {/* <GuideSlotsPage /> */}
    </div>
  );
}
