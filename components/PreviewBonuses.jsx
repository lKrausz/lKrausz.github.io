"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Img from "@/public/bonuses2.png";



const PreviewBonuses = () => {
  const { t } = useTranslation();
  return (
    <div className="bonuses">
      <div className="main__container flex justify-between items-center">
        <div className="flex flex-col basis-[60%]">
          <h1 className="text-white">Promoting a responsible approach to gambling</h1>
          <p className="text-white mt-5">Looking for exciting online casino bonuses and promotions? Look no further! Our extensive and regularly updated database offers a vast selection of enticing casino bonus offers that cater to all players&#39; preferences. Whether you&#39;re into free spins, deposit bonuses, or cashback rewards, we&#39;ve got you covered with the best deals available in the gambling world. Don&#39;t miss out on these exclusive offers – start exploring now and boost your gaming experience with lucrative bonuses!</p>
          {/* <Subscribe /> */}
        </div>
        <div className="basis-[40%] flex justify-center">
          <Image src={Img} alt="Beep" width={242} loading="lazy" />
        </div>
      </div>
    </div>
  );
};

export default PreviewBonuses;
