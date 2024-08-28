"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
// import Img from "@/public/welcomebonus.png";
import Img from "@/public/newimages/wheel_inner_pages.png";

import "@/app/filteredComponents.css"

const WelcomeBonuses = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-16">
      <div className="main__container flex justify-between items-center inner-top-block h-full relative">
        <div className="flex flex-col lg:basis-[60%] inner-text-block ">
          <h1 className="text-white">{t("Welcome Bonuses 2024")}</h1>
          <p className="text-white mt-5">{t("If you're in search of a quality casino experience coupled with enticing bonuses, we have the perfect solution tailored for you! The welcoming bonus stands as a gesture from casinos to their fresh players, usually presented as free spins or cashback rewards. Explore our compilation of introductory bonuses from renowned online casinos, ensuring an ideal match for your preferences.")}</p>
          {/* <Subscribe /> */}
        </div>
        <div >
          <Image src={Img} alt="Chip" width={450} loading="lazy" className="absolute bottom-0 right-0 inner-image -z-10 opacity-30 lg:opacity-100" />
        </div>
      </div>
    </div>
  );
};

export default WelcomeBonuses;
