"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
// import Img from "@/public/fastest.png";
import Img from "@/public/newimages/wheel_inner_pages.png";


import "@/app/filteredComponents.css"

const FastWithdrawalCasinos = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-16">
      <div className="main__container flex justify-between items-center inner-top-block h-full relative">
        <div className="flex flex-col lg:basis-[60%] inner-text-block ">
        
          <h1 className="text-white">{t("2024's Swiftest Payout Casino and Betting Platforms")}</h1>
          <p className="text-white mt-5">{t("The most advantageous aspect of rapid payout casinos is their swift and unwavering dispensation of your earnings. We've meticulously crafted this inventory to aid you in locating the supreme casinos offering expedited withdrawal processes, particularly when your earnings surge swiftly and substantially. Simply initiate a withdrawal and envisage the exhilarating possibilities for allocating those funds!")}</p>
          {/* <Subscribe /> */}
        </div>
        <div className="">
        <Image src={Img} alt="Chip" width={450} loading="lazy" className="absolute bottom-0 right-0 inner-image -z-10 opacity-30 lg:opacity-100"/>
        </div>
      </div>
    </div>
  );
};

export default FastWithdrawalCasinos;
