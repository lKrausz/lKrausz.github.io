"use client";
import React from "react";
import { useTranslation } from "react-i18next";

const Marque = () => {
  const handleClick = () => {
    const targetElement = document.getElementById("real-block");
    if (targetElement) {
      const headerOffset = 50; // Adjust this value based on your header height
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const elementStyle = window.getComputedStyle(targetElement);
      const elementMarginTop = parseInt(elementStyle.marginTop, 10) || 0;
      const elementPaddingTop = parseInt(elementStyle.paddingTop, 10) || 0;
      const offsetPosition = elementPosition - headerOffset - elementPaddingTop - elementMarginTop;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const { t } = useTranslation();

  return (
    <div className="wrap-line-text">
      <div className="marquee-container">
        <div className="marquee">
          <span onClick={handleClick}>
            {t("* Explore the Hottest New Brands –")} <b>{t("Click Here!")}</b>{" "}
            {t("* Explore the Hottest New Brands –")} <b>{t("Click Here!")}</b>{" "}
            {t("* Explore the Hottest New Brands –")} <b>{t("Click Here!")}</b>{" "}
            {t("* Explore the Hottest New Brands –")} <b>{t("Click Here!")}</b>{" "}
            {t("* Explore the Hottest New Brands –")} <b>{t("Click Here!")}</b>{" "}
            {t("* Explore the Hottest New Brands –")} <b>{t("Click Here!")}</b>
          </span>
        </div>
        <div aria-hidden="true" className="marquee">
          <span onClick={handleClick}>
            {t("* Explore the Hottest New Brands –")} <b>{t("Click Here!")}</b>{" "}
            {t("* Explore the Hottest New Brands –")} <b>{t("Click Here!")}</b>{" "}
            {t("* Explore the Hottest New Brands –")} <b>{t("Click Here!")}</b>{" "}
            {t("* Explore the Hottest New Brands –")} <b>{t("Click Here!")}</b>{" "}
            {t("* Explore the Hottest New Brands –")} <b>{t("Click Here!")}</b>{" "}
            {t("* Explore the Hottest New Brands –")} <b>{t("Click Here!")}</b>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Marque;
