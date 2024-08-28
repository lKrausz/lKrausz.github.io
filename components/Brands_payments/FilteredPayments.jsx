"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useNavigateBrands from "./Navigate";
import AllPayments from "./AllPayments";
import { useLanguage } from "@/components/switcher/LanguageContext";
import classNames from "classnames";
import "../../app/filteredComponents.css"

const FilteredPayments = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [isLoader, setIsLoader] = useState(false);

  const [currentTab, setCurrentTab] = useState(1);

  const navigateBrands = useNavigateBrands();


  const handleTabChange = (tabNumber) => {
    setCurrentTab(tabNumber);
    setIsLoader(true);
    setTimeout(() => {
      setIsLoader(false);
    }, 500);
  };
  return (
    <div className="main pt-10 pb-10 custom-bonuses ">
      <div className="main__container">
        {/*  Tailwind tab bar */}
        <h2 className="text-white">
          {t("Catalog of all offered Online Casinos by Payment Methods in 2024")}
        </h2>
        <p className="mt-3 pb-4 text-white">
          {t("Looking for online casinos with specific payment methods? Explore our current database of numerous casino offers for you to choose from.")}
        </p>
        <div>
          <nav aria-label="Tabs" className="isolate payments-tabs flex flex-wrap justify-start">
            {navigateBrands.map((item) => (
              <button
                key={item.currentTab}
                className={classNames(
                  currentTab === item.currentTab
                    ? 'decoration-2 underline-offset-8 '
                    : 'text-gray-500',
                  'group relative overflow-hidden text-center text-sm font-medium flex justify-center flex-row items-center !px-0 !py-2 basis-[20%] sm:basis-[16%] md:basis-[10%] transition-colors duration-300 ease-in-out',
                )}
                onClick={() => handleTabChange(item.currentTab)}
              >
                {item.icon}
              </button>
            ))}
          </nav>
        </div>

        <div className="overlay-filter filter-brands">
          {navigateBrands.map((item) => {
            return (
              currentTab === item.currentTab && (
                <AllPayments
                  key={`${item.currentTab}-${language}`}
                  creative={item.currentText}
                  isLoader={isLoader}
                  segment={item.segment}
                  value={item.value}
                  target={item.target}
                  currentText={item.currentText}
                />
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FilteredPayments;
