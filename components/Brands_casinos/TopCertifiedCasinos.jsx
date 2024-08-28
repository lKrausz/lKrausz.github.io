"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
// import Img from "@/public/certified.png";
import Img from "@/public/newimages/wheel_inner_pages.png";


import "@/app/filteredComponents.css"


const TopCertifiedCasinos = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-16">
    <div className="main__container flex justify-between items-center inner-top-block h-full relative">
      <div className="flex flex-col lg:basis-[60%] inner-text-block ">
             <h1 className="text-white">{t("Premier Accredited Casinos in 2024")}</h1>
          <p className="text-white mt-5">{t("Gaming constitutes a substantial sector, and with the assistance of authorized internet-based casinos, you can relish your preferred pastime with serenity, assured of its oversight by official governmental bodies. Cutting-edge security protocols ensure the confidentiality of all personal data!")}</p>
          {/* <Subscribe /> */}
        </div>
        <div className="">
        <Image src={Img} alt="Chip" width={400} loading="lazy" className="absolute bottom-0 right-0 inner-image -z-10 opacity-30 lg:opacity-100"/>
        </div>
      </div>
    </div>
  );
};

export default TopCertifiedCasinos;
