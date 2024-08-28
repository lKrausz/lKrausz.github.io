"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
// import Img from "@/public/allpaymentsrobot.png";
import Img from "@/public/newimages/wheel_inner_pages.png";

import "@/app/filteredComponents.css"

const Payments = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-16">
      <div className="main__container flex justify-between items-center inner-top-block h-full relative">
        <div className="flex flex-col lg:basis-[60%] inner-text-block ">
          <h1 className="text-white">{t("Discover Top-Rated Casinos Accepting Pix Payments for Quick and Secure Transactions")}</h1>
          <p className="text-white mt-5">{t("Explore our curated list of premium casinos that support Pix as a payment option. Known for its speed and security, Pix is a go-to method for deposits and withdrawals among online casino enthusiasts worldwide. It offers the advantage of sidestepping traditional banking hassles and pesky geographical limits. If you haven't set up a Pix wallet yet, it's easy to do so—then you're all set to try your luck!")}</p>
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
