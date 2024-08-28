import { Metadata } from "next";

import FilteredPayments from "@/components/Brands_payments/FilteredPayments";

import BitcoinCasinos from "@/components/Brands_payments/BitcoinCasinos";

export const metadata: Metadata = {
  title: "Bitcoin payments | Bonus topbon.us",
  description:
    "Step into the cutting-edge world of Bitcoin payments with our thorough guide at Bonus topbon.us. As cryptocurrencies gain momentum, Bitcoin offers unparalleled privacy and low fees, making it an exciting option for online casino enthusiasts. Our comprehensive guide demystifies the process of using Bitcoin for casino gaming, from setting up a wallet to executing secure transactions. We also list top-rated casinos that embrace Bitcoin payments, allowing you to game with both innovation and security on your side. Unleash the full potential of your gaming experience by mastering Bitcoin payments with our expert advice!",
};

export default async function Bonuses() {
  return (
    <div className="page-bonuses">
      <BitcoinCasinos />
      {/* <TopBrands /> */}
      <FilteredPayments />
      {/* <GuideSlotsPage /> */}
    </div>
  );
}
