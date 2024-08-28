import React from "react";
import Image from "next/image";
import { DotsThreeCircle } from "phosphor-react";

// import Bgaming from "@/public/providers/bgaming.png";
// import Boongo from "@/public/providers/booongo gaming.png";
// import Amusnet from "@/public/providers/amusnet interactive.png";
// import Maskot from "@/public/providers/mascot gaming.png";
// import Netent from "@/public/providers/netent.png";
// import Playngo from "@/public/providers/play’n go.png";
// import Pushgaming from "@/public/providers/push gaming.png";
// import Spinomenal from "@/public/providers/spinomenal.png";
// import Amatic from "@/public/providers/amatic industries.png";
// import Nolimitcity from "@/public/providers/nolimit city.png";
// import Pragmatic from "@/public/providers/pragmatic play.png";
// import Evolution from "@/public/providers/evolution gaming.png";

const useNavigateBrands = () => {
  return [
    {
      currentTab: 1,
      currentCategories: 137,
      currentText: "All Providers",
      // icon: (
      //   <>
      //     <DotsThreeCircle className="mr-1" size={24} /> All
      //   </>
      // ),
      segment: "CurrentStatus",
      value: "Ongoing",
      slug: "providers",
    },
    {
      currentTab: 2,
      currentCategories: 107,
      currentText: "Amatic",
      // icon: (
      //   <Image
      //     src={Amatic}
      //     alt="amatic"
      //     width={80}
      //     height={40}
      //     loading="lazy"
      //   />
      // ),
      segment: "CurrentStatus",
      value: "Ongoing",
      slug: "amatic",
    },
    {
      currentTab: 3,
      currentCategories: 105,
      currentText: "BGaming",
      // icon: (
      //   <Image
      //     src={Bgaming}
      //     alt="bgaming"
      //     width={80}
      //     height={40}
      //     loading="lazy"
      //   />
      // ),
      segment: "CurrentStatus",
      value: "Ongoing",
      slug: "bgaming",
    },
    {
      currentTab: 4,
      currentCategories: 132,
      currentText: "Booongo",
      // icon: (
      //   <Image
      //     src={Boongo}
      //     alt="booongo"
      //     width={80}
      //     height={40}
      //     loading="lazy"
      //   />
      // ),
      segment: "CurrentStatus",
      value: "Ongoing",
      slug: "booongo",
    },

    {
      currentTab: 5,
      currentCategories: 152,
      currentText: "EGT",
      // icon: (
      //   <Image src={Amusnet} alt="egt" width={80} height={40} loading="lazy" />
      // ),
      segment: "CurrentStatus",
      value: "Ongoing",
      slug: "egt",
    },
    {
      currentTab: 6,
      currentCategories: 106,
      currentText: "Evolution",
      // icon: (
      //   <Image
      //     src={Evolution}
      //     alt="evolution"
      //     width={80}
      //     height={40}
      //     loading="lazy"
      //   />
      // ),
      segment: "CurrentStatus",
      value: "Ongoing",
      slug: "evolution",
    },
    {
      currentTab: 7,
      currentCategories: 186,
      currentText: "Mascot",
      // icon: (
      //   <Image
      //     src={Maskot}
      //     alt="mascot"
      //     width={80}
      //     height={40}
      //     loading="lazy"
      //   />
      // ),
      segment: "CurrentStatus",
      value: "Ongoing",
      slug: "mascot",
    },
    {
      currentTab: 8,
      currentCategories: 160,
      currentText: "NetEnt",
      // icon: (
      //   <Image
      //     src={Netent}
      //     alt="netEnt"
      //     width={80}
      //     height={40}
      //     loading="lazy"
      //   />
      // ),
      segment: "CurrentStatus",
      value: "Ongoing",
      slug: "netent",
    },
    {
      currentTab: 9,
      currentCategories: 130,
      currentText: "Nolimit city",
      // icon: (
      //   <Image
      //     src={Nolimitcity}
      //     alt="nolimit-city"
      //     width={80}
      //     height={40}
      //     loading="lazy"
      //   />
      // ),
      // segment: "CurrentStatus",
      value: "Ongoing",
      slug: "nolimit-city",
    },
    {
      currentTab: 10,
      currentCategories: 108,
      currentText: "Play’n go",
      // icon: (
      //   <Image
      //     src={Playngo}
      //     alt="Playn go"
      //     width={80}
      //     height={40}
      //     loading="lazy"
      //   />
      // ),
      segment: "CurrentStatus",
      value: "Ongoing",
      slug: "playn-go",
    },
    {
      currentTab: 11,
      currentCategories: 104,
      currentText: "Pragmatic Play",
      // icon: (
      //   <Image
      //     src={Pragmatic}
      //     alt="Pragmatic Play"
      //     width={80}
      //     height={40}
      //     loading="lazy"
      //   />
      // ),
      segment: "CurrentStatus",
      value: "Ongoing",
      slug: "pragmatic-play",
    },

    {
      currentTab: 12,
      currentCategories: 133,
      currentText: "Push Gaming",
      // icon: (
      //   <Image
      //     src={Pushgaming}
      //     alt="Push Gaming"
      //     width={80}
      //     height={40}
      //     loading="lazy"
      //   />
      // ),
      segment: "CurrentStatus",
      value: "Ongoing",
      slug: "push-gaming",
    },
    {
      currentTab: 13,
      currentCategories: 131,
      currentText: "Spinomenal",
      // icon: (
      //   <Image
      //     src={Spinomenal}
      //     alt="Spinomenal"
      //     width={80}
      //     height={40}
      //     loading="lazy"
      //   />
      // ),
      segment: "CurrentStatus",
      value: "Ongoing",
      slug: "spinomenal",
    },
  ];
};

export default useNavigateBrands;
