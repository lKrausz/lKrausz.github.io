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
          <h1 className="text-white">{t("Play'n GO Gaming: A Vanguard of Versatility and Innovation in iGaming")}</h1>
          <p className="text-white mt-5">{t("Cementing its status as a trendsetter in the iGaming community, Play'n GO Gaming is celebrated for its wide-ranging and inventive game portfolio. From iconic slots like 'Book of Dead' to inventive table games, the company provides an all-encompassing gaming experience. Employing cutting-edge technology and captivating narratives, Play'n GO has mastered the art of creating games that are not just visually appealing but also rich in features. Their unyielding commitment to quality and innovation makes them a preferred choice for both casual gamers and ardent casino enthusiasts, continually setting new standards in the ever-evolving gaming landscape.")}</p>
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
