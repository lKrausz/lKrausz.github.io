import { Metadata } from "next";

import FilteredProviders from "@/components/Brands_providers/FilteredProviders";

import PragmaticPlay from "@/components/Brands_providers/PragmaticPlay";

export const metadata: Metadata = {
  title: "Pragmatic Play | Bonus topbon.us",
  description:
    "Unlock the thrilling realm of Pragmatic Play games with our all-encompassing guide at Bonus topbon.us. Pragmatic Play is a leading software provider known for its versatile portfolio, encompassing slots, live casino games, and more. Our expert guide takes you through their standout titles, special features, and gameplay mechanics that define the Pragmatic Play experience. In addition, discover a curated list of top-quality casinos where you can enjoy these games to the fullest. Whether you're a newcomer or a seasoned player, our guide provides you with all the information you need to make the most of Pragmatic Play's exciting offerings.",
};

export default async function Bonuses() {
  return (
    <div className="page-bonuses">
      <PragmaticPlay />
      {/* <TopBrands /> */}
      <FilteredProviders />
      {/* <GuideSlotsPage /> */}
    </div>
  );
}
