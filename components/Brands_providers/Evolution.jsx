"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
// import Img from "@/public/providersRobot.png";
import Img from "@/public/newimages/wheel_inner_pages.png";

import "@/app/filteredComponents.css"


const Amatic = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-16">
      <div className="main__container flex justify-between items-center inner-top-block h-full relative">
        <div className="flex flex-col lg:basis-[60%] inner-text-block ">
          <h1 className="text-white">{t("Evolution Gaming: Setting the Gold Standard in Live Casino Experiences")}</h1>
          <p className="text-white mt-5">{t("A recognized leader in the live casino arena, Evolution Gaming has earned its reputation through a commitment to unparalleled quality and innovation. Offering a rich variety of live dealer games, from classics like blackjack and roulette to unique offerings like Lightning Dice, the company consistently delivers engaging and authentic experiences. By utilizing cutting-edge streaming technology and employing professional dealers, Evolution Gaming ensures a seamless and immersive gaming atmosphere that sets them apart in the industry.")}</p>
          {/* <Subscribe /> */}
        </div>
        <div >
          <Image src={Img} alt="Chip" width={450} loading="lazy" className="absolute bottom-0 right-0 inner-image -z-10 opacity-30 lg:opacity-100" />
        </div>
      </div>
    </div>
  );
};

export default Amatic;
