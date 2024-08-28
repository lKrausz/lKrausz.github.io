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
          <h1 className="text-white">{t("Two Decades of Gaming Excellence: Exploring Amusnet Interactive's Innovative Portfolio")}</h1>
          <p className="text-white mt-5">{t("Spanning over 20 years, Amusnet Interactive has amassed a significant following thanks to its relentless focus on game innovation, including the integration of in-game jackpots across several of its offerings. Notable Amusnet Interactive titles encompass Supreme Hot, Burning Hot, Ultimate Hot, and Shining Crown. Dive into the exhilarating gameplay and compelling elements presented by Amusnet Interactive's remarkable range of games.")}</p>
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
