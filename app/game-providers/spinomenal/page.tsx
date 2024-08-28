import { Metadata } from "next";

import FilteredProviders from "@/components/Brands_providers/FilteredProviders";

import Spinomenal from "@/components/Brands_providers/Spinomenal";

export const metadata: Metadata = {
  title: "Spinomenal | Bonus topbon.us",
  description:
    "Dive into the exciting universe of Spinomenal games with our detailed guide at Bonus topbon.us. Known for its innovative slots and engaging gameplay, Spinomenal is a leading name in the online casino industry. Our comprehensive overview covers everything from the developer's standout titles to the unique features that set Spinomenal games apart. Plus, find an exclusive list of premium casinos that offer Spinomenal's game portfolio, ensuring a top-notch gaming experience. Whether you're new to Spinomenal or a seasoned fan, our guide equips you with everything you need to make the most of their exhilarating games.",
};

export default async function Bonuses() {
  return (
    <div className="page-bonuses">
      <Spinomenal />
      {/* <TopBrands /> */}
      <FilteredProviders />
      {/* <GuideSlotsPage /> */}
    </div>
  );
}
