"use client";
import { useState, useEffect } from "react";
import useSWR from "swr";
import Loader from "../../../Loader";
import { shuffle } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import Card from "../../../slider/Card";
import { useLanguage } from "../../../switcher/LanguageContext";
import { getBrands } from "../../../getBrands/getBrands2";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";

// import "./styled.component.css"

export default function Popular_offers() {
  const [newUrl, setNewUrl] = useState("");
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState([]);
  const [currentBrandIndex, setCurrentBrandIndex] = useState(0);
  const [fade, setFade] = useState(true); // State to manage fade effect
  const { language } = useLanguage();
  const { t } = useTranslation();

  const settings = {
    infinite: true,
    speed: 500,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

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

  const categoryBrands = { key1: "Hottest", key2: "1" };
  const { data, error } = useSWR(
    ["brands", language],
    () => getBrands(language),
    { initialData: brands }
  );
  useEffect(() => {
    if (data) {
      const filteredData = data.filter(
        (rowData) => rowData[categoryBrands.key1] === categoryBrands.key2
      );
      setBrands(filteredData);
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

  const projects = [
    {
      name: "Graph API",
      initials: "GA",
      href: "#",
      members: 16,
      bgColor: "bg-pink-600",
    },
    {
      name: "Component Design",
      initials: "CD",
      href: "#",
      members: 12,
      bgColor: "bg-purple-600",
    },
    {
      name: "Templates",
      initials: "T",
      href: "#",
      members: 16,
      bgColor: "bg-yellow-500",
    },
    {
      name: "React Components",
      initials: "RC",
      href: "#",
      members: 8,
      bgColor: "bg-green-500",
    },
  ];

  return (
    <>
      <div className="fivehot">
        <div className="main__container">
          {loading ? (
            <Loader />
          ) : (
            <div>
              <div className="fivehot-banner">
                <h3>
                  5 <span className="span-orange">{t("HOTTEST")}</span> <span>{t("casinos")}</span>
                </h3>
                <p className="!text-xl mt-5">
                  {t("Discover 5 hottest casino brands trending right now!")}
                </p>
              </div>
              <ul
                role="list"
                className="grid grid-cols-1 gap-5 sm:gap-6 ul-list"
              >
                {brands.slice(0, 5).map((rowData, index) => (
                  <Link
                    className=""
                    href={`${rowData.GoBig}/${newUrl}&creative_id=XXL_Top_New_Releases`}
                    target="_blank"
                  >
                    <li
                      key={index}
                      className="col-span-1"
                    >
                      <div className="li-img">
                        <Image
                          src={`/brands/${rowData.CasinoBrand}.png`}
                          alt={rowData.CasinoBrand}
                          width={58}
                          height={58}
                          loading="lazy"
                        />
                      </div>
                      <div className="flex items-center flex-col w-full">
                        <div className="flex-1 px-4 text-sm h-full w-full">
                          <a
                            href={`${rowData.GoBig}/${newUrl}&creative_id=XXL_Top_New_Releases`}
                            className="font-medium"
                          >
                            {rowData.CasinoBrand}
                          </a>
                          <p className="!m-0">
                            {" "}
                            {rowData.OurOfferContent}
                          </p>
                        </div>
                        <div className="flex-shrink-0 pr-2 flex justify-end w-full">
                          <a
                            type="button"
                            className="inline-flex h-8 items-center justify-center rounded-full bg-transparent lucky-btn text-white px-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            {t("Play Now")}
                          </a>
                        </div>
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
