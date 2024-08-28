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
          <h1 className="text-white">{t("Boongo Gaming: Crafting Immersive Digital Experiences through Innovative Game Design")}</h1>
          <p className="text-white mt-5">{t("Boongo Gaming has quickly distinguished itself in the competitive iGaming sector with visually appealing and feature-rich games. Known for titles like 'God's Temple' and '15 Golden Eggs,' the company excels in both innovation and quality. Their robust backend solutions further enhance the gaming experience. Whether you're a casual player or a dedicated enthusiast, Boongo Gaming offers a memorable gaming journey.")}</p>
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
