"use client";
import { useState, useEffect } from "react";
import useSWR from "swr";
import Loader from "../../Loader";
import { shuffle } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import Card from "../../slider/Card";
import { useLanguage } from "../../switcher/LanguageContext";
import { getBrands } from "../../getBrands/getBrands2";
import { useTranslation } from "react-i18next";
import "./styled.component.css";

export default function Brands_double_carousel() {
  const [newUrl, setNewUrl] = useState("");
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState([]);
  const [currentBrandIndex, setCurrentBrandIndex] = useState(0);
  const [fade, setFade] = useState(true); // State to manage fade effect
  const { language } = useLanguage();
  const { t } = useTranslation();

  useEffect(() => {
    // Обновляем URL, удаляем параметры и устанавливаем source на основе localStorage
    const currentUrl = window.location.href;
    const indexOfQuestionMark = currentUrl.indexOf("?");
    const newUrl2 =
      indexOfQuestionMark !== -1
        ? currentUrl.substring(0, indexOfQuestionMark)
        : currentUrl;
    window.history.replaceState({}, document.title, newUrl2);

    // Работа с URL и localStorage для определения source
    const urlObj = new URL(currentUrl);
    const searchParams = new URLSearchParams(urlObj.search);
    searchParams.delete("brand");
    const currentKeyword = searchParams.get("keyword");

    const partners = ["partner1039", "partner1043", "partner1044", "CLD_VIP"];

    function setPartnerSource(keyword) {
      const partner = partners.find((p) => keyword.includes(p));
      if (partner) {
        localStorage.setItem("source", partner);
        setSource(partner);
        searchParams.set("source", partner);
      } else {
        setSource("0");
        // Получаем текущий источник и проверяем, не является ли он одним из допустимых партнеров
        const sourceFound = localStorage.getItem("source");
        if (!partners.includes(sourceFound)) {
          localStorage.setItem("source", "0");
          searchParams.set("source", "0");
        }
      }
    }

    if (currentKeyword) {
      setPartnerSource(currentKeyword);
    }

    const ad_campaign = localStorage.getItem("ad_campaign_id");

    const savedUrl = localStorage.getItem("savedUrl");
    if (savedUrl) {
      setNewUrl(savedUrl);
    }
  }, [language]);

  const categoryBrands = { key1: "High_hybrid", key2: "1" };
  const { data, error } = useSWR(
    ["brands", language],
    () => getBrands(language),
    { initialData: brands }
  );

  useEffect(() => {
    if (data) {
      const filteredData1 = data.filter(
        (rowData) => rowData[categoryBrands.key1] === categoryBrands.key2
      );

      // Фильтрация по второму столбцу (добавьте нужные ключи)
      const filteredData2 = data.filter(
        (rowData) => rowData["Networks"] === "1"
      );

      // Объединение данных из двух фильтраций
      const combinedData = [...filteredData1, ...filteredData2];

      setBrands(combinedData);
      setLoading(false);
    }
  }, [data, categoryBrands.key1, categoryBrands.key2]);

  const shuffledBrands = shuffle(brands);
  const cards2 = shuffledBrands.slice(0, 6).map((brand) => ({
    key: uuidv4(),
    content: (
      <Card
        imagen={`/brands/${brand.CasinoBrand}.png`}
        link={brand.GoBig}
        bonus={brand.OurOfferContent}
      />
    ),
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade-out
      setTimeout(() => {
        setCurrentBrandIndex((prevIndex) => (prevIndex + 1) % brands.length);
        setFade(true); // Start fade-in
      }, 500); // Duration of fade-out effect
    }, 5000000); // Change brand every 5 seconds

    return () => clearInterval(interval);
  }, [brands.length]);

  return (
    <>
      <div className="brands_rows pt-10 pb-10">
        <div className="main__container relative mt-8">
          <div className="background-slider2 absolute">
            <svg
              width="1250"
              height="559"
              viewBox="0 0 1250 559"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_9_692)">
                <path
                  d="M1225 480C1225 507.614 1202.61 530 1175 530L75 530C47.3857 530 25 507.614 25 480L25 223.395C25 195.781 47.3857 173.395 75 173.395L700.918 173.395C728.533 173.395 750.918 151.009 750.918 123.395L750.918 70.9999C750.918 43.3857 773.304 20.9999 800.918 20.9999L1175 20.9999C1202.61 20.9999 1225 43.3857 1225 70.9999L1225 480Z"
                  fill="url(#paint0_linear_9_692)"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_9_692"
                  x="0"
                  y="0"
                  width="1250"
                  height="559"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="12.5" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.13 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_9_692"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_9_692"
                    result="shape"
                  />
                </filter>
                <linearGradient
                  id="paint0_linear_9_692"
                  x1="1196.25"
                  y1="148.25"
                  x2="326.892"
                  y2="672.869"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#9D4EB3" />
                  <stop offset="0.367467" stop-color="#6C37B1" />
                  <stop offset="1" stop-color="#310877" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          {loading ? (
            <Loader />
          ) : (
            cards2 && (
              <div className="flex flex-col md:flex-row lg:space-y-0 lg:items-stretch">
                <div className="w-full md:w-1/2 mr-2">
                  <div className="mx-auto max-w-2xl pb-5 pt-5 sm:pb-5 lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8">
                    <div className="">
                      <h2 className="mt-4">
                        {t("Best Payout")}<span> {t("Casinos")}</span>
                      </h2>
                      <h3>{t("Best payout casinos")}</h3>
                      <p className="mt-4 text-gray-500">
                        {t("Enjoy high returns, fast withdrawals, and unbeatable odds. Ready to win big? Dive in now!")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className=" md:w-1/2 ml-2">
                  {brands.length > 0 && (
                    <div className="background overflow-hidden rounded-xl h-full flex justify-end items-end mt-5">
                      <div className="wrap">
                        <div className="items-wrap">
                          <div className="items marquee">
                            {brands.map((rowData, index) => (
                              <div className="item">
                                <Link
                                  className=""
                                  href={`${rowData.GoBig}/${newUrl}&creative_id=XXL_Top_New_Releases`}
                                  target="_blank"
                                >
                                  <Image
                                    src={`/brands/${rowData.CasinoBrand}.png`}
                                    alt={rowData.CasinoBrand}
                                    width={300}
                                    height={100}
                                    loading="lazy"
                                    className="target-top-new-releases"
                                  />
                                </Link>
                              </div>
                            ))}
                          </div>
                          <div aria-hidden="true" class="items marquee">
                            {brands.map((rowData, index) => (
                              <div className="item">
                                <Link
                                  className=""
                                  href={`${rowData.GoBig}/${newUrl}&creative_id=XXL_Top_New_Releases`}
                                  target="_blank"
                                >
                                  <Image
                                    src={`/brands/${rowData.CasinoBrand}.png`}
                                    alt={rowData.CasinoBrand}
                                    width={300}
                                    height={100}
                                    loading="lazy"
                                    className="target-top-new-releases"
                                  />
                                </Link>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div class="items-wrap">
                          <div class="items marquee reverce">
                            {brands.map((rowData, index) => (
                              <div className="item">
                                <Link
                                  className=""
                                  href={`${rowData.GoBig}/${newUrl}&creative_id=XXL_Top_New_Releases`}
                                  target="_blank"
                                >
                                  <Image
                                    src={`/brands/${rowData.CasinoBrand}.png`}
                                    alt={rowData.CasinoBrand}
                                    width={300}
                                    height={100}
                                    loading="lazy"
                                    className="target-top-new-releases"
                                  />
                                </Link>
                              </div>
                            ))}
                          </div>
                          <div aria-hidden="true" class="items marquee reverce">
                            {brands.map((rowData, index) => (
                              <div className="item">
                                <Link
                                  className=""
                                  href={`${rowData.GoBig}/${newUrl}&creative_id=XXL_Top_New_Releases`}
                                  target="_blank"
                                >
                                  <Image
                                    src={`/brands/${rowData.CasinoBrand}.png`}
                                    alt={rowData.CasinoBrand}
                                    width={300}
                                    height={100}
                                    loading="lazy"
                                    className="target-top-new-releases"
                                  />
                                </Link>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="items-wrap">
                          <div className="items marquee">
                            {brands.map((rowData, index) => (
                              <div className="item">
                                <Link
                                  className=""
                                  href={`${rowData.GoBig}/${newUrl}&creative_id=XXL_Top_New_Releases`}
                                  target="_blank"
                                >
                                  <Image
                                    src={`/brands/${rowData.CasinoBrand}.png`}
                                    alt={rowData.CasinoBrand}
                                    width={300}
                                    height={100}
                                    loading="lazy"
                                    className="target-top-new-releases"
                                  />
                                </Link>
                              </div>
                            ))}
                          </div>
                          <div aria-hidden="true" class="items marquee">
                            {brands.map((rowData, index) => (
                              <div className="item">
                                <Link
                                  className=""
                                  href={`${rowData.GoBig}/${newUrl}&creative_id=XXL_Top_New_Releases`}
                                  target="_blank"
                                >
                                  <Image
                                    src={`/brands/${rowData.CasinoBrand}.png`}
                                    alt={rowData.CasinoBrand}
                                    width={300}
                                    height={100}
                                    loading="lazy"
                                    className="target-top-new-releases"
                                  />
                                </Link>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div class="items-wrap">
                          <div class="items marquee reverce">
                            {brands.map((rowData, index) => (
                              <div className="item">
                                <Link
                                  className=""
                                  href={`${rowData.GoBig}/${newUrl}&creative_id=XXL_Top_New_Releases`}
                                  target="_blank"
                                >
                                  <Image
                                    src={`/brands/${rowData.CasinoBrand}.png`}
                                    alt={rowData.CasinoBrand}
                                    width={300}
                                    height={100}
                                    loading="lazy"
                                    className="target-top-new-releases"
                                  />
                                </Link>
                              </div>
                            ))}
                          </div>
                          <div aria-hidden="true" class="items marquee reverce">
                            {brands.map((rowData, index) => (
                              <div className="item">
                                <Link
                                  className=""
                                  href={`${rowData.GoBig}/${newUrl}&creative_id=XXL_Top_New_Releases`}
                                  target="_blank"
                                >
                                  <Image
                                    src={`/brands/${rowData.CasinoBrand}.png`}
                                    alt={rowData.CasinoBrand}
                                    width={300}
                                    height={100}
                                    loading="lazy"
                                    className="target-top-new-releases"
                                  />
                                </Link>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}
