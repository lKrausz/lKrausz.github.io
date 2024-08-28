"use client";
import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
const LazySlider = dynamic(() => import("react-slick"), {
  ssr: false,
  loading: () => <p>Download...</p>,
});
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getBrands } from "@/components/getBrands/getBrands";
import { useLanguage } from "@/components/switcher/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import Loader from "../Loader";
import { getUserData } from "@/components/getUser/getUser";
import { useTranslation } from "react-i18next";

import Slider from "react-slick";

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

const BRAND_CATEGORIES = { key1: "CurrentStatus", key2: "Ongoing" };
const BRAND_CATEGORIES2 = { key1: "FirstPriority", key2: "1" };

const UserBrands = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [otherBrands, setOtherBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [userId, setUserId] = useState("");
  const [savedUrl, setSavedUrl] = useState("");
  const [countryBrand, setCountryBrand] = useState("ALL");

  const { language } = useLanguage();
  const { t } = useTranslation();

  const loadLocalStorageData = useCallback(() => {
    setUserId(localStorage.getItem("user_id") || "");
    setSavedUrl(localStorage.getItem("savedUrl") || "");
    setCountryBrand(localStorage.getItem("country_brands") || "ALL");
  }, []);

  useEffect(() => {
    loadLocalStorageData();

    const handleStorageChange = (e: StorageEvent) => {
      if (
        e.key === "user_id" ||
        e.key === "savedUrl" ||
        e.key === "country_brands"
      ) {
        loadLocalStorageData();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [loadLocalStorageData]);

  useEffect(() => {
    if (userId) {
      fetchBrands();
    }
  }, [userId, language]);

  const fetchBrands = useCallback(async () => {
    if (!userId) {
      console.error("No user ID found, unable to fetch brands.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const data = await getUserData(userId);
      if (!data) {
        console.error("Received null data from getUserData");
        setIsLoading(false);
        return;
      }

      const userLeads: LeadOrSale[] = JSON.parse(data.leads || "[]");
      const userSales: LeadOrSale[] = JSON.parse(data.sales || "[]");

      const leadsIds = userLeads.map((lead) => lead.campaignId);
      const salesIds = userSales.map((sale) => sale.campaignId);

      const brandsData: Brand[] = await getBrands(BRAND_CATEGORIES, language);
      const brandsData2: Brand[] = await getBrands(BRAND_CATEGORIES2, language);

      const leadsOnlyBrands = brandsData.filter((brand) =>
        leadsIds.includes(brand.KeitaroGoBigID)
      );

      setBrands(leadsOnlyBrands);
      console.log("ALLLL", brandsData, leadsOnlyBrands);

      setOtherBrands(
        brandsData.filter((brand) => !leadsIds.includes(brand.KeitaroGoBigID))
      );
    } catch (error) {
      console.error("Error loading brands:", error);
    } finally {
      setIsLoading(false);
    }
  }, [language, userId]);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!userId) {
    return null;
  }

  const chunkBrands = (brands: Brand[], chunkSize: number) => {
    const chunks = [];
    for (let i = 0; i < brands.length; i += chunkSize) {
      chunks.push(brands.slice(i, i + chunkSize));
    }
    return chunks;
  };



  const settings = {
    infinite: true,
    dots: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    speed: 1000,
    autoplaySpeed: 2000,
    arrows: true,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: false,
        },
      },
    ],
  };

  return (
    <div className="main__container">
      {brands.length > 0 ? (
        <div className="flex flex-col mt-10 mob-mt10">
          <div className="w-full brand_carousel rounded-md">
            {isLoading && <Loader />}
            {brands.length > 5 && !isMobile ? (
              <Slider {...settings}>
                {brands.map((chunk, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-xl flex flex-col justify-between card-rel"
                  >
                    <div className="mx-auto max-w-7xl flex flex-col ">
                      <div className="mx-auto max-w-2xl lg:mx-0 flex flex-row card-sl">
                        <div>
                          <Link
                            className="mt-3"
                            href={`${chunk.GoBig}/&creative_id=`}
                            target="_blank"
                          >
                            <Image
                              src={`/brands/${chunk.CasinoBrand}.png`}
                              alt={chunk.CasinoBrand}
                              width={300}
                              height={100}
                              loading="lazy"
                            />
                          </Link>
                          <Link
                            className="relative btn-play btn-blick overflow-hidden"
                            href={`${chunk.GoBig}/&creative_id=`}
                            target="_blank"
                          >
                            Play Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            ) : (
              <>
                {isMobile && brands.length > 1 ? (
                  <Slider {...settings}>
                    {brands.map((chunk, index) => (
                     <div
                     key={index}
                     className="overflow-hidden rounded-xl flex flex-col justify-between card-rel"
                   >
                     <div className="mx-auto max-w-7xl flex flex-col ">
                       <div className="mx-auto max-w-2xl lg:mx-0 flex flex-row card-sl">
                         <div>
                           <Link
                             className="mt-3"
                             href={`${chunk.GoBig}/&creative_id=`}
                             target="_blank"
                           >
                             <Image
                               src={`/brands/${chunk.CasinoBrand}.png`}
                               alt={chunk.CasinoBrand}
                               width={300}
                               height={100}
                               loading="lazy"
                             />
                           </Link>
                           <Link
                             className="relative btn-play btn-blick overflow-hidden"
                             href={`${chunk.GoBig}/&creative_id=`}
                             target="_blank"
                           >
                             Play Now
                           </Link>
                         </div>
                       </div>
                     </div>
                   </div>
                    ))}
                  </Slider>
                ) : (
                  <div className="flex flex-wrap">
                    {brands.map((brand) => (
                      <div
                        key={brand.CasinoBrand}
                        className="overflow-hidden rounded-xl flex flex-col justify-between card-not-slider"
                      >
                        <div className="mx-auto max-w-7xl flex flex-col ">
                          <div className="mx-auto max-w-2xl lg:mx-0 flex flex-row card-sl">
                            <div>
                              <Link
                                className="mt-3"
                                href={`${brand.GoBig}/&creative_id=`}
                                target="_blank"
                              >
                                <Image
                                  src={`/brands/${brand.CasinoBrand}.png`}
                                  alt={brand.CasinoBrand}
                                  width={300}
                                  height={100}
                                  loading="lazy"
                                />
                              </Link>
                              <Link
                                className="relative btn-play btn-blick overflow-hidden"
                                href={`${brand.GoBig}/&creative_id=`}
                                target="_blank"
                              >
                                Play Now
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default UserBrands;
