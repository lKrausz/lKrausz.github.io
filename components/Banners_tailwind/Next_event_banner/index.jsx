"use client";
import React, { useEffect, useState } from "react";
import UserBrands from "@/components/Brands_home/UserBrands";
import "./styled.component.css";
import { useTranslation } from "react-i18next";

export default function Next_event_banner() {

  const categoryBrands = { key1: "Segment2", key2: "Sandbox" };
  const { t } = useTranslation();

  return (
    <>
      <div className="main__container !mt-16">
        <div className="">
          <div className="flex flex-col items-center justify-center gap-x-6 banner-event px-6 py-2.5 sm:px-3.5">
            <h3 className="text-xl sm:text-xl leading-6 text-white uppercase">
              {t("Uncover the latest casinos")}
            </h3>
            <p className="banner-event-p">{t("and be among the")} <span>{t("first to play!")}</span></p>
          </div>
        </div>
      </div>
      <UserBrands />
      {/* <Brands_carousel categoryBrands={categoryBrands} /> */}
    </>
  );
}
