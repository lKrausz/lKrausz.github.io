"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
// import Img from "@/public/live.png";
import Img from "@/public/newimages/wheel_inner_pages.png";


import "@/app/filteredComponents.css"



const LiveCasinos = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-16">
      <div className="main__container flex justify-between items-center inner-top-block h-full relative">
        <div className="flex flex-col lg:basis-[60%] inner-text-block ">
          <h1 className="text-white">{t("Premier Live Dealer Casinos of the Year 2024")}</h1>
          <p className="text-white mt-5">{t("Explore this compilation of top-notch live dealer casinos for an immersive gaming experience and discover prime online casinos hosting captivating live casino games catered to your preferences.")}</p>
          {/* <Subscribe /> */}
        </div>
        <div className="">
          <Image src={Img} alt="Chip" width={450} loading="lazy" className="absolute bottom-0 right-0 inner-image -z-10 opacity-30 lg:opacity-100" />
        </div>
      </div>
    </div>
  );
};

export default LiveCasinos;
