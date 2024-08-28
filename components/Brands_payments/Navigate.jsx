import React from "react";
import Image from "next/image";

import Visa from "@/public/payments/visa.png";
import Bitcoin from "@/public/payments/bitcoin.png";
import Ecopayz from "@/public/payments/ecopayz.png";
import Mastercard from "@/public/payments/mastercard.png";
import Muchbetter from "@/public/payments/muchbetter.png";
import Neosurf from "@/public/payments/neosurf.png";
import Neteller from "@/public/payments/neteller.png";
import Paysafecard from "@/public/payments/paysafecard.png";
import Skrill from "@/public/payments/skrill.png";
import Trustly from "@/public/payments/trustly.png";
import Applepay from "@/public/payments/applepay.png";
import Maestro from "@/public/payments/maestro.png";
import Paypal from "@/public/payments/paypal.png";
import Pix from "@/public/payments/pix.png";

import AllPaymentsImg from "@/public/payments/allpaymentmethods.png";

const useNavigateBrands = () => {
  return [
    {
      currentTab: 1,
      currentCategories: 85,
      currentText: "All Payments",
      icon: (
        <Image
          className="mr-1"
          src={AllPaymentsImg}
          alt="payments"
          width={60}
          height={38}
          loading="lazy"
        />
      ),
      segment: "CurrentStatus",
      value: "Ongoing",
      slug: "payments",
    },
    {
      currentTab: 2,
      currentCategories: 207,
      currentText: "Apple pay",
      icon: (
        <Image
          className="mr-1"
          src={Applepay}
          alt="apple-pay"
          width={60}
          height={38}
          loading="lazy"
        />
      ),
      segment: "CurrentStatus",
      value: "Ongoing",
      slug: "apple-pay",
    },
    {
      currentTab: 3,
      currentCategories: 88,
      currentText: "Bitcoin",
      icon: (
        <Image
          className="mr-1"
          src={Bitcoin}
          alt="bitcoin"
          width={60}
          height={38}
          loading="lazy"
        />
      ),
      segment: "CurrentStatus",
      value: "Ongoing",
      slug: "bitcoin-casino",
    },
    {
      currentTab: 4,
      currentCategories: 151,
      currentText: "Ecopayz",
      icon: (
        <Image
          className="mr-1"
          src={Ecopayz}
          alt="ecopayz"
          width={60}
          height={38}
          loading="lazy"
        />
      ),
      segment: "CurrentStatus",
      value: "Ongoing",
      slug: "ecopayz",
    },
    {
      currentTab: 5,
      currentCategories: 208,
      currentText: "Maestro",
      icon: (
        <Image
          className="mr-1"
          src={Maestro}
          alt="maestro"
          width={60}
          height={38}
          loading="lazy"
        />
      ),
      segment: "CurrentStatus",
      value: "Ongoing",
      slug: "maestro",
    },
    {
      currentTab: 6,
      currentCategories: 135,
      currentText: "Mastercard",
      icon: (
        <Image
          className="mr-1"
          src={Mastercard}
          alt="mastercard"
          width={60}
          height={38}
          loading="lazy"
        />
      ),
      segment: "CurrentStatus",
      value: "Ongoing",
      slug: "mastercard",
    },
    {
      currentTab: 8,
      currentCategories: 181,
      currentText: "Muchbetter",
      icon: (
        <Image
          className="mr-1"
          src={Muchbetter}
          alt="muchbetter"
          width={60}
          height={38}
          loading="lazy"
        />
      ),
      segment: "CurrentStatus",
      value: "Ongoing",
      slug: "muchbetter",
    },
    {
      currentTab: 9,
      currentCategories: 158,
      currentText: "Neosurf",
      icon: (
        <Image
          className="mr-1"
          src={Neosurf}
          alt="neosurf"
          width={60}
          height={38}
          loading="lazy"
        />
      ),
      segment: "CurrentStatus",
      value: "Ongoing",
      slug: "neosurf",
    },
    {
      currentTab: 10,
      currentCategories: 89,
      currentText: "Neteller",
      icon: (
        <Image
          className="mr-1"
          src={Neteller}
          alt="neteller"
          width={60}
          height={38}
          loading="lazy"
        />
      ),
      segment: "CurrentStatus",
      value: "Ongoing",
      slug: "neteller-casino",
    },
    {
      currentTab: 11,
      currentCategories: 90,
      currentText: "PayPal",
      icon: (
        <Image
          className="mr-1"
          src={Paypal}
          alt="paypal"
          width={60}
          height={38}
          loading="lazy"
        />
      ),
      segment: "CurrentStatus",
      value: "Ongoing",
      slug: "paypal-casino",
    },
    {
      currentTab: 12,
      currentCategories: 92,
      currentText: "Paysafecard",
      icon: (
        <Image
          className="mr-1"
          src={Paysafecard}
          alt="paysafecard"
          width={60}
          height={38}
          loading="lazy"
        />
      ),
      segment: "CurrentStatus",
      value: "Ongoing",
      slug: "paysafecard-casino",
    },
    {
      currentTab: 13,
      currentCategories: 136,
      currentText: "Pix",
      icon: (
        <Image
          className="mr-1"
          src={Pix}
          alt="pix"
          width={60}
          height={38}
          loading="lazy"
        />
      ),
      segment: "CurrentStatus",
      value: "Ongoing",
      slug: "pix",
    },

    {
      currentTab: 14,
      currentCategories: 91,
      currentText: "Skrill",
      icon: (
        <Image
          className="mr-1"
          src={Skrill}
          alt="skrill"
          width={60}
          height={38}
          loading="lazy"
        />
      ),
      segment: "CurrentStatus",
      value: "Ongoing",
      slug: "skrill-casino",
    },
    {
      currentTab: 15,
      currentCategories: 171,
      currentText: "Trustly",
      icon: (
        <Image
          className="mr-1"
          src={Trustly}
          alt="trustly"
          width={60}
          height={38}
          loading="lazy"
        />
      ),
      segment: "CurrentStatus",
      value: "Ongoing",
      slug: "trustly",
    },
    {
      currentTab: 16,
      currentCategories: 134,
      currentText: "Visa",
      icon: (
        <Image
          className="mr-1"
          src={Visa}
          alt="visa"
          width={60}
          height={38}
          loading="lazy"
        />
      ),
      segment: "CurrentStatus",
      value: "Ongoing",
      slug: "visa",
    },
  ];
};

export default useNavigateBrands;
