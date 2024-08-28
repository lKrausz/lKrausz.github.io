import { Metadata } from "next";

import FilteredPayments from "@/components/Brands_payments/FilteredPayments";

import Mastercard from "@/components/Brands_payments/Mastercard";

export const metadata: Metadata = {
  title: "Mastercard payments | Bonus topbon.us",
  description:
    "Unlock a world of convenience and security with Mastercard payments, meticulously detailed in our comprehensive guide at Bonus topbon.us. As one of the most widely accepted payment methods, Mastercard offers quick deposits, robust security protocols, and global accessibility. Our guide covers everything you need to know, from setting up your account to understanding transaction fees and withdrawal times. We also provide a list of top-rated casinos that accept Mastercard, allowing you to game with complete peace of mind. Master the art of secure and convenient gaming by learning all about Mastercard payments with our expert advice!",
};

export default async function Bonuses() {
  return (
    <div className="page-bonuses">
      <Mastercard />
      {/* <TopBrands /> */}
      <FilteredPayments />
      {/* <GuideSlotsPage /> */}
    </div>
  );
}
