// TopBrands.jsx (Клієнтський компонент)
"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useNavigateBrands from "./Navigate";
import AllProviders from "./AllProviders";
import { useLanguage } from "@/components/switcher/LanguageContext";
import classNames from "classnames";
import "../../app/filteredComponents.css"

const FilteredProviders = () => {
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
    <div className="main pt-10 pb-10 custom-bonuses">
      <div className="main__container">
        {/*  Tailwind tab bar */}
        <h2 className="text-white">
          {t("Comprehensive 2024 Directory for Online Casinos Sorted by Game Providers")}
        </h2>
        <p className="text-black mt-5 text-white">
          {t("Interested in locating online casinos featuring games from particular providers? Browse our up-to-date list of diverse casino options to find your perfect match.")}
        </p>
        <div>
          <nav aria-label="Tabs" className="isolate providers-tabs flex flex-wrap justify-start">
            {navigateBrands.map((item) => (
              <button
                key={item.currentTab}
                className={classNames(
                  currentTab === item.currentTab
                    ? 'decoration-2 underline-offset-8 '
                    : 'text-gray-500',
                    'group relative overflow-hidden text-center text-sm font-medium flex justify-center flex-row items-center !px-0 !py-3 basis-[20%] sm:basis-[16%] lg:basis-[11%] transition-colors duration-300 ease-in-out',
                  )}
                onClick={() => handleTabChange(item.currentTab)}
              >
                {item.currentText}
              </button>
            ))}
          </nav>
        </div>

        <div className="overlay-filter filter-brands">
          {navigateBrands.map((item) => {
            return (
              currentTab === item.currentTab && (
                <AllProviders
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

export default FilteredProviders;
