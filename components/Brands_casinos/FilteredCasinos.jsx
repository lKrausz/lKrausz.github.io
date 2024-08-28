// TopBrands.jsx (Клієнтський компонент)
"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useNavigateBrands from "./Navigate";
import AllCasinos from "./AllCasinos";
import { useLanguage } from "@/components/switcher/LanguageContext";
import classNames from "classnames";
import "../../app/filteredComponents.css"

const FilteredCasinos = () => {
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
          {t("Comprehensive Compilation of 2024 Online Casino Selection")}
        </h2>
        <p className="mt-3 pb-4 text-white">
          {t("In Search of an Online Casino? Navigate through our up-to-date repository housing a myriad of casinos awaiting your consideration.")}
        </p>
        <div className="">
          <nav aria-label="Tabs" className="isolate isolate-tabs flex divide-x overflow-x-auto">
            {navigateBrands.map((item) => (
              <button
                key={item.currentTab}
                className={classNames(
                  currentTab === item.currentTab
                    ? 'decoration-2 underline-offset-8 '
                    : 'text-gray-500',
                  'group relative flex-1 overflow-hidden px-4 py-4 text-center text-sm font-medium flex justify-center flex-row items-center p-2 min-w-40 transition-colors duration-300 ease-in-out',
                )}
                onClick={() => handleTabChange(item.currentTab)}
              >
                {item.icon}
                {item.currentText2}
              </button>
            ))}
          </nav>
        </div>

        <div className="overlay-filter filter-brands">
          {navigateBrands.map((item) => {
            return (
              currentTab === item.currentTab && (
                <AllCasinos
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

export default FilteredCasinos;
