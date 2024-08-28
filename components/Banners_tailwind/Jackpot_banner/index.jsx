"use client";
import React, { useEffect, useState } from "react";
import Brands_carousel from "../Brands_carousel";
import Counter from "./calc";
import "./styled.component.css";
import useSWR from "swr";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/components/switcher/LanguageContext";

export default function Jackpot_banner() {
  const [currentValue, setCurrentValue] = useState(0);
  const targetValue = 2924899349;
  const duration = 3000;
  const { t } = useTranslation();

  useEffect(() => {
    const startTime = performance.now();

    const updateCounter = (time) => {
      const elapsedTime = time - startTime;
      if (elapsedTime < duration) {
        setCurrentValue(Math.floor(targetValue * (elapsedTime / duration)));
        requestAnimationFrame(updateCounter);
      } else {
        setCurrentValue(targetValue);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [targetValue, duration]);

  const [brands, setBrands] = useState([]);

  const target = "target-fw-jackpot";
  const creative = "NEW_JACKPOT";
  const { language } = useLanguage();

  const categoryBrands = { key1: "High_hybrid", key2: "1" };

  const { data, error } = useSWR(
    ["brands", language],
    () => getBrands(language),
    { initialData: brands }
  );

  useEffect(() => {
    if (data) {
      // Фильтрация по первому столбцу
      const filteredData1 = data.filter(
        (rowData) => rowData[categoryBrands.key1] === categoryBrands.key2
      );
  
      // Фильтрация по второму столбцу (добавьте нужные ключи)
      const filteredData2 = data.filter(
        (rowData) => rowData["Networks"] === "1"
      );
  
      // Объединение данных из двух фильтраций
      const combinedData = [...filteredData1, ...filteredData2];
  
      setBrands(combinedData);
    }
  }, [data, categoryBrands.key1, categoryBrands.key2]);
  
  return (
    <>
      <div className="main__container !mt-10">
        <div className="">
          <div className="flex flex-col items-center justify-center gap-x-6 banner-jack px-6 py-2.5 sm:px-3.5">
            <h3 className="text-xl sm:text-xl leading-6 text-white uppercase">
              {t("HIT THE")} <span>{t("JACKPOT!")}</span>
            </h3>
            {/* <p>$360 000</p> */}
            <p><Counter /></p>
          </div>
        </div>
      </div>
      <Brands_carousel creative={creative} target={target} categoryBrands={categoryBrands} />
    </>
  );
}
