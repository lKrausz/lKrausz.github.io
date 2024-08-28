"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
// import Img from "@/public/cryptoCasinos.png";
import Img from "@/public/newimages/wheel_inner_pages.png";


import "@/app/filteredComponents.css"


const TopSports = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-16">
      <div className="main__container flex justify-between items-center inner-top-block h-full relative">
        <div className="flex flex-col lg:basis-[60%] inner-text-block ">
          <h1 className="text-white">
            {t("Top Sports Betting Sites & Platforms in 2024")}
          </h1>
          <p className="text-white mt-5">
            {t(
              "Explore our compilation of premier sports betting sites, featuring platforms that offer comprehensive coverage of sporting events and competitive odds. Delve into impartial assessments, and pinpoint the ultimate sports betting destination tailored to your preferences."
            )}
          </p>

          {/* <Subscribe /> */}
        </div>
        <div className="">
        <Image src={Img} alt="Chip" width={400} loading="lazy" className="absolute bottom-0 right-0 inner-image -z-10 opacity-30 lg:opacity-100" />
        </div>
      </div>
    </div>
  );
};

export default TopSports;
