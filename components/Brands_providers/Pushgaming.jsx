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
             <h1 className="text-white">{t("Push Gaming: Revolutionizing iGaming with Cutting-Edge Concepts")}</h1>
          <p className="text-white mt-5">{t("In the ever-competitive realm of iGaming, Push Gaming stands out for groundbreaking slots like 'Jammin' Jars' and 'Wild Swarm,' the company excels in delivering games with exceptional visuals and intricate gameplay features. Push Gaming's focus on mobile-optimized, HTML5-based games ensures a seamless experience across devices. Their capacity to marry traditional gaming elements with novel twists makes them a sought-after provider, continually pushing the envelope in terms of what is possible in the iGaming world.")}</p>
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
