import React from 'react';
import {
    CurrencyBtc,
    UsersThree,
    Cardholder,
    CalendarCheck,
    Scroll,
    DribbbleLogo
} from "phosphor-react";
import { useTranslation } from "react-i18next";

const useNavigateBrands = () => {
  const { t } = useTranslation();

  return [
    {
      currentTab: 1,
      currentCategories: 19,
      currentText: "Crypto Casinos",
      segment: "CurrentStatus",
      value: "Ongoing",
      currentText2: t("Crypto Casinos"),
      icon: <CurrencyBtc className="mr-2 pb-1" size={32} />,
      slug: "crypto-casinos",
    },
    {
      currentTab: 2,
      currentCategories: 20,
      currentText: "Fast Withdrawal Casinos",
      segment: "CurrentStatus",
      value: "Ongoing",
      currentText2: t("Fast Withdrawal Casinos"),
      icon: <Cardholder className="mr-2 pb-1" size={32} />,
      slug: "fast-withdrawal-casinos",
    },
    {
      currentTab: 3,
      currentCategories: 22,
      currentText: "Live Casinos",
      segment: "CurrentStatus",
      value: "Ongoing",
      currentText2: t("Live Casinos"),
      icon: <UsersThree className="mr-2 pb-1" size={32} />,
      slug: "live-casinos",
    },
    {
      currentTab: 4,
      currentCategories: 24,
      currentText: "Newest Casinos",
      segment: "CurrentStatus",
      value: "Ongoing",
      currentText2: t("Newest Casinos"),
      icon: <CalendarCheck className="mr-2 pb-1" size={32} />,
      slug: "newest-casinos",
    },
    {
      currentTab: 5,
      currentCategories: 26,
      currentText: "Top Certified Casinos",
      segment: "CurrentStatus",
      value: "Ongoing",
      currentText2: t("Top Certified Casinos"),
      icon: <Scroll className="mr-2 pb-1" size={32} />,
      slug: "top-certified-casinos",
    },
    {
      currentTab: 6,
      currentCategories: 187,
      currentText: "Top Sports Brands",
      segment: "CurrentStatus",
      value: "Ongoing",
      currentText2: t("Top Sports Casinos"),
      icon: <DribbbleLogo className="mr-2 pb-1" size={32} />,
      slug: "top-sports-casinos",
    },
  ];

};

export default useNavigateBrands;
