import { Metadata } from "next";

import FilteredCasinos from "@/components/Brands_casinos/FilteredCasinos";

import CryptoCasinos from "@/components/Brands_casinos/CryptoCasinos";

export const metadata: Metadata = {
  title: "Crypto Casinos | Bonus topbon.us",
  description:
    "Step into the future of online gaming with our comprehensive guide to Crypto Casinos at Bonus topbon.us. Learn how blockchain technology is revolutionizing the casino industry by offering unparalleled security, privacy, and speed. Our guide covers the basics of cryptocurrency gambling, the advantages and challenges, as well as how to get started. Moreover, we provide a curated list of trusted online casinos that accept a range of cryptocurrencies like Bitcoin, Ethereum, and more. Whether you're a crypto-curious beginner or a seasoned digital asset holder, our guide is your key to a more secure and convenient gaming experience.",
};

export default async function Bonuses() {
  return (
    <div className="page-bonuses">
      <CryptoCasinos />
      {/* <TopBrands /> */}
      <FilteredCasinos />
      {/* <GuideSlotsPage /> */}
    </div>
  );
}
