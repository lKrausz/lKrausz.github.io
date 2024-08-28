"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
// import Img from "@/public/newest.png";
import Img from "@/public/newimages/wheel_inner_pages.png";


import "@/app/filteredComponents.css"

const NewestCasinos = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-16">
      <div className="main__container flex justify-between items-center inner-top-block h-full relative">
        <div className="flex flex-col lg:basis-[60%] inner-text-block ">
          <h1 className="text-white">{t("Fresh Entrants to the Online Casino Scene 2024")}</h1>
          <p className="text-white mt-5">{t("On the Hunt for Fresh 2024 Online Casino Platforms? Discover Recently Launched Casino Sites Offering Outstanding Incentives and Cutting-Edge Attributes. Constantly Refreshed for Your Exploration.")}</p>
          {/* <Subscribe /> */}
        </div>
        <div className="">
        <Image src={Img} alt="Chip" width={450} loading="lazy" className="absolute bottom-0 right-0 inner-image -z-10 opacity-30 lg:opacity-100"/>
        </div>
      </div>
    </div>
  );
};

export default NewestCasinos;
