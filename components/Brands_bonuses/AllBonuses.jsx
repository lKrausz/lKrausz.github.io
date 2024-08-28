"use client";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";
import { getBrands } from "@/components/getBrands/getBrands2";
import FilterLoader from "@/components/FilterLoader";
import {
  Gift,
  ShieldPlus,
  CaretDown,
  GameController,
  CurrencyCircleDollar,
  Play,
  Prohibit,
  MinusCircle,
  DotsThreeCircle,
  Handshake,
} from "phosphor-react";
import { useLanguage } from "@/components/switcher/LanguageContext";
import dynamic from "next/dynamic";
const LazySlider = dynamic(() => import("react-slick"), {
  ssr: false,
  loading: () => <p>Download...</p>,
});
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function AllBonuses({
  creative,
  isLoader,
  segment,
  value,
  target,
  brands,
  currentText
}) {
  const { t } = useTranslation();
  const itemsPerPage = 2;
  const itemsPerPage2 = 3;

  const [visibleBrands, setVisibleBrands] = useState(itemsPerPage);
  const [visibleBrands2, setVisibleBrands2] = useState(itemsPerPage2);

  const [hasMoreBrands, setHasMoreBrands] = useState(false);
  const [openPlusesId, setOpenPlusesId] = useState(null);
  const [openWithdrawalId, setOpenWithdrawalId] = useState(null);
  const [openDepositsId, setOpenDepositsId] = useState(null);
  const [openCountriesId, setOpenCountriesId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [filteredBrands, setFilteredBrands] = useState([]);
  const [topBrands, setTopBrands] = useState([]);

  const { language } = useLanguage();
  const categoryBrandsAll = { key1: segment, key2: value };

  const categoryBrands = { key1: "Video", key2: "1" };

  const [visible, setVisible] = useState(false);
  const { data, error } = useSWR(
    ["brands", language],
    () => getBrands(language),
    { initialData: brands }
  );

  useEffect(() => {
    if (data) {
      setVisible(true);
      const filteredData = data.filter((rowData) => {
        return rowData[categoryBrandsAll.key1] === categoryBrandsAll.key2 &&
          rowData.categories &&
          rowData.categories.includes(currentText);
      });

      const topData = data.filter(
        (rowData) => rowData[categoryBrands.key1] === categoryBrands.key2
      );
      setFilteredBrands(filteredData);
      setTopBrands(topData);
    }
  }, [
    data,
    categoryBrandsAll.key1,
    categoryBrandsAll.key2,
    categoryBrands.key1,
    categoryBrands.key2, currentText
  ]);

  useEffect(() => {
    setHasMoreBrands(visibleBrands < filteredBrands.length);
  }, [visibleBrands, filteredBrands.length]);

  const loadMoreBrands = () => {
    setVisibleBrands((prevVisibleBrands) => prevVisibleBrands + itemsPerPage);
    setVisibleBrands2((prevVisibleBrands) => prevVisibleBrands + itemsPerPage2);
  };

  const [newUrl, setNewUrl] = useState("");
  useEffect(() => {
    const savedUrl = localStorage.getItem("savedUrl");

    // Установка новой ссылки в состояние
    if (savedUrl) {
      setNewUrl(savedUrl);
    }
  }, []);

  const [randomBrands, setRandomBrands] = useState([]);
  const [randomBrands2, setRandomBrands2] = useState([]);
  const [brandsGenerated, setBrandsGenerated] = useState(false);


  useEffect(() => {
    const generateRandomBrands = () => {
      if (!brandsGenerated && filteredBrands.length > 0) {
        const shuffledBrands = [...filteredBrands].sort(
          () => Math.random() - 0.5
        );
        const shuffledBrands2 = [...topBrands].sort(
          () => Math.random() - 0.5
        );

        setRandomBrands(shuffledBrands);
        setRandomBrands2(shuffledBrands2);
        setBrandsGenerated(true);
      }
    };

    generateRandomBrands();
  }, [brandsGenerated, filteredBrands]);

  const vis = randomBrands.length > 0 ? randomBrands : filteredBrands;
  const vis2 = randomBrands2.length > 0 ? randomBrands2 : topBrands;

  const [isMobile, setIsMobile] = useState(false);

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
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  const handlePlusesClick = (brandId) => {
    setOpenPlusesId((prevId) => (prevId === brandId ? null : brandId));
  };
  const handleWithdrawalClick = (brandId) => {
    setOpenWithdrawalId((prevId) => (prevId === brandId ? null : brandId));
  };
  const handleDepositsClick = (brandId) => {
    setOpenDepositsId((prevId) => (prevId === brandId ? null : brandId));
  };
  const handleCountriesClick = (brandId) => {
    setOpenCountriesId((prevId) => (prevId === brandId ? null : brandId));
  };


  return (
    <>
      {isLoader ? (
        <FilterLoader />
      ) : (
        <div className="flex flex-wrap justify-between awesome">
          <div className="flex flex-col px-0 py-6 basis-[68%] slws">
            {vis.slice(0, visibleBrands).map((brand) => {
              const advantages =
                brand.advantages !== null
                  ? brand.advantages
                    .split(",")
                    .map((advantage) => ({ advantage: advantage.trim() }))
                  : "";
              const deposits =
                brand.DepositMethods !== null
                  ? brand.DepositMethods.split(",").map((deposit) => ({
                    deposit: deposit.trim(),
                  }))
                  : "";
              const withdrawals =
                brand.WithdrawalMethods !== null
                  ? brand.WithdrawalMethods.split(",").map((withdrawal) => ({
                    withdrawal: withdrawal.trim(),
                  }))
                  : "";
              const restricted =
                brand.RestrictedCountries !== null
                  ? brand.RestrictedCountries.split(",").map((restrict) => ({
                    restrict: restrict.trim(),
                  }))
                  : "";

              const isPlusesOpen = openPlusesId === brand.id_brand;
              const isWithdrawalOpen = openWithdrawalId === brand.id_brand;
              const isDepositsOpen = openDepositsId === brand.id_brand;
              const isCountriesOpen = openCountriesId === brand.id_brand;

              return (
                <div
                  className="p-3 flex justify-between flex-wrap mb-2 card-brand-filtered w-full"
                  key={brand.id_brand}
                >
                  <div className="flex flex-col basis-[63%]">
                    <div className="flex ml-1 mb-3">
                    </div>
                    <div className="flex mb-1">
                      <Gift style={{ color: "#ff8f1f" }}
                        className="mr-1 w40"
                        size={40} />
                      <div className=" flex items-center review-bonus">
                        {brand.OurOfferContent}
                      </div>
                    </div>
                    <div className="mb-2 withdrawal withdrawal-limits flex items-center">
                      <Handshake style={{ color: "#ff8f1f" }}
                        className="mr-1 mb-1 w40"
                        size={40} />
                      <div className="title mr-2">
                        <p>
                          {t("Withdrawal Limits:")}
                          <span> {brand.WithdrawalLimits}</span>
                        </p>
                      </div>
                    </div>
                    {advantages && (
                      <div
                        onClick={() => handlePlusesClick(brand.id_brand)}
                        className="pluses custom-list-item mb-1"
                      >
                        <div className="title flex items-center">
                          <ShieldPlus style={{ color: "#fff" }} size={34} />
                          <span className="mt-1 ml-2">{t("Advantages")}</span>
                          <CaretDown
                            className="ml-auto"
                            size={20}
                            style={{ color: "#ff8f1f" }}
                          />
                        </div>
                        {isPlusesOpen && (
                          <div className="items-center ml-3">
                            <ul className="review-pros">
                              {advantages.map((advantage, index) => (
                                <li className="review-pros-item" key={index}>
                                  {advantage.advantage}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {deposits && (
                      <div
                        onClick={() => handleDepositsClick(brand.id_brand)}
                        className="withdrawal custom-list-item mb-1"
                      >
                        <div className="title flex items-center">
                          <CurrencyCircleDollar
                            style={{ color: "#fff" }}
                            size={34}
                          />
                          <span className="mt-1 ml-2">
                            {t("Payment Methods")}
                          </span>
                          <CaretDown
                            className="ml-auto"
                            size={20}
                            style={{ color: "#ff8f1f" }}
                          />
                        </div>
                        {isDepositsOpen && (
                          <div className="withdrawal flex mt-2">
                            {deposits.map((deposit, index) => (
                              <div
                                className="depimg flex items-center justify-center mr-1 mb-1 flex-wrap"
                                key={index}
                              >
                                <Image
                                  width={60}
                                  height={38}
                                  src={`/payments/${deposit.deposit}.png`}
                                  alt={`${deposit.deposit}`}
                                  loading="lazy"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    {withdrawals && (
                      <div
                        onClick={() => handleWithdrawalClick(brand.id_brand)}
                        className="withdrawal custom-list-item mb-1"
                      >
                        <div className="title flex items-center">
                          <GameController
                            style={{ color: "#fff" }}
                            size={34}
                          />
                          <span className="mt-1 ml-2">
                            {t("Game Providers")}
                          </span>
                          <CaretDown
                            className="ml-auto"
                            size={20}
                            style={{ color: "#ff8f1f" }}
                          />
                        </div>
                        {isWithdrawalOpen && (
                          <div className="withdrawal flex mt-2">
                            {withdrawals.map((withdrawal, index) => (
                              <div
                                className="depimg flex items-center justify-center mr-1 mb-1 flex-wrap"
                                key={index}
                              >
                                <Image
                                  width={60}
                                  height={38}
                                  src={`/providers/${withdrawal.withdrawal}.png`}
                                  alt={`${withdrawal.withdrawal}`}
                                  loading="lazy"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    {restricted && (
                      <div
                        onClick={() => handleCountriesClick(brand.id_brand)}
                        className="withdrawal custom-list-item mb-1"
                      >
                        <div className="title flex items-center">
                          <Prohibit style={{ color: "#fff" }} size={34} />
                          <span className="mt-1 ml-2">
                            {t("Restricted Countries")}
                          </span>
                          <CaretDown
                            className="ml-auto"
                            size={20}
                            style={{ color: "#ff8f1f" }}
                          />
                        </div>
                        {isCountriesOpen && (
                          <div className="withdrawal">
                            <div className="countries flex flex-wrap justify-between mt-1">
                              {restricted.map((restrict, index) => (
                                <div
                                  className="basis-[49%] pl-1 mb-2 flex"
                                  key={index}
                                >
                                  <MinusCircle color="#dd3333" size={18} />
                                  <span>{restrict.restrict}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="card-36">
                    <div className="brandImage p-3">
                      <Link
                        className={`${target}`}
                        key={brand.id_brand}
                        href={`${brand.GoBig}/${newUrl}&creative_id=XXL_Brand_Exit`}
                        target="_blank"
                      >
                        <Image
                          src={`/brands/${brand.CasinoBrand}.png`}
                          alt={`/brands/${brand.CasinoBrand}.png`}
                          width={250}
                          height={125}
                          loading="lazy"
                          className={`${target}`}
                        />
                      </Link>
                    </div>

                    <div className="buttons ml-auto flex items-center">
                      <div className="flex flex-col items-center w-full p-4 howUse mt-2 mb-2">
                        <span className="text-center big-p">
                          How to get <span>bonus?</span>
                        </span>
                        <p className="text-center m-0 text-slate-500 mini-p">
                          {t("Activate bonus in your casino account")}
                        </p>
                      </div>
                      <Link
                        href={`${brand.GoBig}/${newUrl}&creative_id=XXL_Brand_Exit`}
                        target="_blank"
                      >
                        <div className="btn btn-new-mini">
                          <p>{t("Play Now")}</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}

            {hasMoreBrands && (
              <div className="btn btn-new" onClick={loadMoreBrands}>
                <p>{t("Load More Brands")}</p>
              </div>
            )}
          </div>
          <div className="flex flex-col basis-[24%] py-6 slsk">
            {!isMobile ? (
              vis2.slice(0, visibleBrands2).map((item) => {
                return (
                  <div
                    className="card-brand-banner mb-2 flex flex-col items-center pb-3"
                    key={item.id_brand}
                  >
                    <div className="brandImage p-3">
                      <Link
                        className="flex justify-center flex-col items-center target-listing-brands"
                        key={item.id_brand}
                        href={`${item.GoBig}/${newUrl}&creative_id=XXL_Listing_Brands`}
                        target="_blank"
                      >
                        <Image
                          src={`/brands/${item.CasinoBrand}.png`}
                          alt={`/brands/${item.CasinoBrand}.png`}
                          width={200}
                          height={80}
                          loading="lazy"
                          className="target-listing-brands"
                        />
                        <div className="p-3 text-center flex items-center review-bonus">
                          {item.OurOfferContent}
                        </div>
                      </Link>
                    </div>
                    <Link
                      key={item.id_brand}
                      href={`${item.GoBig}/${newUrl}&creative_id=XXL_Listing_Brands`}
                      target="_blank"
                    >
                      <div className="btn btn-new-mini target-listing-brands">
                        <p>{t("Play Now")}</p>
                      </div>
                    </Link>
                  </div>
                );
              })
            ) : (
              <LazySlider {...settings}>
                {vis2.map((item) => {
                  return (
                    <div
                      className="card-brand-banner mb-2 flex flex-col items-center pb-3"
                      key={item.id_brand}
                    >
                      <div className="brandImage p-3">
                        <Link
                          className="flex justify-center flex-col items-center target-listing-brands"
                          key={item.id_brand}
                          href={`${item.GoBig}/${newUrl}&creative_id=XXL_Listing_Brands`}
                          target="_blank"
                        >
                          <Image
                            src={`/brands/${item.CasinoBrand}.png`}
                            alt={`/brands/${item.CasinoBrand}.png`}
                            width={200}
                            height={80}
                            loading="lazy"
                            className="target-listing-brands"
                          />
                          <div className="p-3 text-center flex items-center review-bonus">
                            {item.OurOfferContent}
                          </div>
                        </Link>
                      </div>
                      <Link
                        key={item.id_brand}
                        href={`${item.GoBig}/${newUrl}&creative_id=XXL_Listing_Brands`}
                        target="_blank"
                      >
                        <div className="btn btn-new-mini target-listing-brands">
                          <p>{t("Play Now")}</p>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </LazySlider>
            )}
          </div>
        </div>
      )}
    </>
  );
}
