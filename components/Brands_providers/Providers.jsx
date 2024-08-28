"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
// import Img from "@/public/providersRobot.png";
import Img from "@/public/newimages/wheel_inner_pages.png";

import "@/app/filteredComponents.css"


const Payments = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-16">
      <div className="main__container flex justify-between items-center inner-top-block h-full relative">
        <div className="flex flex-col lg:basis-[60%] inner-text-block ">
          <h1 className="text-white">{t("Easily Find Your Ideal Online Casino: Sorted by Game Developers for Tailored Gaming Experiences")}</h1>
          <p className="text-white mt-5">{t("To make your hunt easier, we've sorted our casino offerings by game developer. This enables you to effortlessly locate a gaming site that provides the exact games you wish to play. From state-of-the-art video slots and electrifying live casino experiences to traditional table games, we've got all your preferences accounted for. Browse our detailed list of game providers to find casinos backed by premier software developers, guaranteeing high-quality visuals, captivating gameplay, and engaging features.")}</p>
          {/* <Subscribe /> */}
        </div>
        <div >
          <Image src={Img} alt="Chip" width={450} loading="lazy" className="absolute bottom-0 right-0 inner-image -z-10 opacity-30 lg:opacity-100" />
        </div>
      </div>
    </div>
  );
};

export default Payments;
