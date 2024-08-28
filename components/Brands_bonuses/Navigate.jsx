import React from 'react';
import {
  Coins,
  Crown,
  Handshake,
} from "phosphor-react";
import { useTranslation } from "react-i18next";

const useNavigateBrands = () => {
  const { t } = useTranslation();

  return [
    {
      currentTab: 2,
      currentCategories: 39,
      currentText: "Exclusive Bonuses",
      segment: "CurrentStatus",
      value: "Ongoing",
      currentText2: t("Exclusive Bonuses"),
      icon: <Crown className="mr-2 pb-1" size={32} />,
      slug: "exclusive-bonuses",
    },
    {
      currentTab: 3,
      currentCategories: 150,
      currentText: "Deposit Bonuses",
      segment: "CurrentStatus",
      value: "Ongoing",
      currentText2: t("Deposit Bonuses"),
      icon: <Coins className="mr-2 pb-1" size={32} />,
      slug: "deposit-bonuses",
    },
    {
      currentTab: 4,
      currentCategories: 35,
      currentText: "Welcome Bonuses",
      segment: "CurrentStatus",
      value: "Ongoing",
      currentText2: t("Welcome Bonuses"),
      icon: <Handshake className="mr-2 pb-1" size={32} />,
      slug: "welcome-bonuses",
    },
  ];

};

export default useNavigateBrands;
