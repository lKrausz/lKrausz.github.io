"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
// import Img from "@/public/depositbonus.png";
import Img from "@/public/newimages/wheel_inner_pages.png";


import "@/app/filteredComponents.css"


const DepositBonuses = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-16">
    <div className="main__container flex justify-between items-center inner-top-block h-full relative">
      <div className="flex flex-col lg:basis-[60%] inner-text-block ">
        <h1 className="text-white">{t("Finest Casino Welcome Bonuses on Your Initial 2024 Deposit")}</h1>
          <p className="text-white mt-5">{t("Select from a variety of top-tier introductory casino rewards and receive additional bonus funds incorporated into your initial payment. Exclusive registration incentive deals designed for fresh participants.")}</p>
          {/* <Subscribe /> */}

        </div>
        <div >
          <Image src={Img} alt="Chip" width={450} loading="lazy" className="absolute bottom-0 right-0 inner-image -z-10 opacity-30 lg:opacity-100" />
        </div>
      </div>
    </div>
  );
};

export default DepositBonuses;
