"use client";
import { useState, useEffect } from "react";
import { getBrands } from "@/components/getBrands/getBrands";
import { useLanguage } from "@/components/switcher/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import Loader from "../Loader";
import { updateUserStatus } from "./UpdateUserStatus";
import { getUserData } from "@/components/getUser/getUser";
import { useTranslation } from "react-i18next";

export type Brand = {
  id_brand: string;
  CasinoBrand: string;
  GoBig: string;
  OurOfferContent: string;
  KeitaroGoBigID: string;
  KeitaroR2dID: string;
};

interface LeadOrSale {
  campaignId: string;
  status: string;
  timestamp: string;
  paymentMethod: string;
  paymentSumIn: string;
  paymentAddress: string;
  USD: string;
}

const BRAND_CATEGORIES = { key1: "Segment2", key2: "Sandbox" };
const BRAND_CATEGORIES2 = { key1: "FirstPriority", key2: "1" };

const UserBrands_tw = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [otherBrands, setOtherBrands] = useState<Brand[]>([]);

  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [isShow, setIshow] = useState(false);
  const { t } = useTranslation();

  // const savedUrl = localStorage.getItem("savedUrl") || "";
  let savedUrl = "";
  if (typeof window !== "undefined") {
    savedUrl = localStorage.getItem("savedUrl") || "";
  }

  // const userId = localStorage.getItem("user_id");
  let userId = "";
  if (typeof window !== "undefined") {
    userId = localStorage.getItem("user_id") || "";
  }

  const fetchBrands = async () => {
    if (userId === "null") {
      console.error("No user ID found, unable to fetch brands.");
      setIsLoading(false);
      return;
    }
    if (!userId) {
      console.error("No user ID found, unable to fetch brands.");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const data = await getUserData(userId);
    if (!data) {
      console.error("Received null data from getUserData");
      setIsLoading(false);
      return;
    }

    // Преобразование строк JSON в массивы объектов
    const userLeads: LeadOrSale[] = JSON.parse(data.leads || "[]");
    const userSales: LeadOrSale[] = JSON.parse(data.sales || "[]");

    // Создание массивов идентификаторов кампаний из лидов и продаж
    const leadsIds = userLeads.map((lead) => lead.campaignId);
    const salesIds = userSales.map((sale) => sale.campaignId);

    try {
      const brandsData: Brand[] = await getBrands(BRAND_CATEGORIES, language);
      const brandsData2: Brand[] = await getBrands(BRAND_CATEGORIES2, language);

      // Фильтрация брендов по лидам, которые не пересекаются с продажами
      const leadsOnlyBrands = brandsData.filter(
        (brand) =>
          leadsIds.includes(brand.KeitaroGoBigID) &&
          !salesIds.includes(brand.KeitaroGoBigID)
      );

      // Обновление состояния с брендами только из лидов
      setBrands(leadsOnlyBrands);

      // Остальные бренды, которые могут быть использованы в другом контексте
      setOtherBrands(
        // brandsData.filter((brand) => !leadsIds.includes(brand.KeitaroGoBigID))
        brandsData2
      );
    } catch (error) {
      console.error("Error loading brands:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchBrands();
    }
  }, [language, isShow, userId]);

  if (userId === "null") {
    return null;
  }

  return userId ? (
    <div className="flex flex-col">
      {isLoading && <Loader />}
      {brands.length > 0 ? (
        <>
          <div className="text-blue-600 text-md ">
            {t(
              "You Already Made Registration Here, Make First Deposit & Get Up To $20!"
            )}
          </div>
          <p className="mt-3">
            {t(
              "Select a brand from the list below, make your first deposit and receive up to $20 in rewards!"
            )}
          </p>
          <div className="flex flex-wrap px-0 py-6">
            {brands.map((brand) => (
              <BrandCard
                brand={brand}
                savedUrl={savedUrl}
                key={brand.id_brand}
                t={t}
              />
            ))}
          </div>
          <span className="descriptions">
            {t(
              "You will get 50 Free Spins for every First Deposit from our website. Spin these spins and get up to $20 on your crypto wallet/PayPal. To qualify for withdrawals, ensure your first deposits is at least Є25 or the equivalent on other currencies and was made after requesting a withdrawal."
            )}
          </span>
        </>
      ) : (
        <>
          <div className="text-blue-600 text-md">{t("Make First Deposit On One Brand Below & Get Up To $20!")}</div>
          <p className="mt-3">
            {t(
              "Select a brand from the list below, make your first deposit and receive up to $20 in rewards!"
            )}
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-5">
            {otherBrands.map((brand) => (
              <BrandCard
                brand={brand}
                savedUrl={savedUrl}
                key={brand.id_brand}
                t={t}
                register={() => {
                  updateUserStatus(
                    localStorage.getItem("user_id") || "",
                    brand.KeitaroGoBigID,
                    "lead",
                    () => {
                      fetchBrands(); // Эта функция вызовется после успешного обновления статуса
                      setIshow((prev) => !prev); // Это изменит состояние isShow
                    }
                  );
                }}
              />
            ))}
          </div>
          <span className="descriptions">
            {t(
              "You will get 50 Free Spins for every First Deposit from our website. Spin these spins and get up to $20 on your crypto wallet/PayPal. To qualify for withdrawals, ensure your first deposits is at least Є25 or the equivalent on other currencies and was made after requesting a withdrawal."
            )}
          </span>
        </>
      )}
    </div>
  ) : null;
};

const BrandCard: React.FC<{
  brand: Brand;
  savedUrl: string;
  register?: () => void;
  t: Function;
}> = ({ brand, savedUrl, register, t }) => (
  <div
    key={brand.CasinoBrand}
    className="relative flex items-center space-x-3 rounded-lg border border-gray-300 px-3 py-2 shadow-sm"
  >
    <div className="w-16 h-16 flex items-center justify-center rounded-md bg-indigo-200">
      <img
        alt=""
        src={`/brands/${brand.CasinoBrand}.png`}
        className="w-14"
      />
    </div>
    <div className="h-16 flex-1">
      <a href={`${brand.GoBig}/${savedUrl}`} className="focus:outline-none">
        <span aria-hidden="true" className="absolute inset-0" />
        <div className="text-sm font-bold text-gray-900 pb-1">{brand.CasinoBrand}</div>
        <p className=" text-sm text-gray-500">
          {brand.OurOfferContent}
        </p>
      </a>
    </div>
  </div>
);

export default UserBrands_tw;
