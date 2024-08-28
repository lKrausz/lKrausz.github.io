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
          <h1 className="text-white">{t("NetEnt Gaming: Pioneering Excellence in the iGaming World")}</h1>
          <p className="text-white mt-5">{t("As one of the stalwarts in the iGaming industry, NetEnt Gaming has consistently pushed the envelope in terms of quality, innovation, and gameplay. With a broad spectrum of offerings from classic slots like 'Starburst' to groundbreaking live casino games, the company has set industry benchmarks time and again. Utilizing state-of-the-art technology and creative storytelling, NetEnt offers an unrivaled gaming experience that keeps players coming back for more. Their reputation for excellence is backed by an extensive portfolio that continually evolves, solidifying their position as a leader in digital gaming.")}</p>
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
