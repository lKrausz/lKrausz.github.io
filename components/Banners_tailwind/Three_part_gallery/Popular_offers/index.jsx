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

import "./styled.component.css"

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
        dots: true,
        infinite: true,
        speed: 1000,
        autoplaySpeed: 2000,
        arrows: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: false,
                },
            },
            {
                breakpoint: 420,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: false,
                },
            },
        ],
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

    const categoryBrands = { key1: "Trendsetting", key2: "1" };
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

    return (
        <>
            <div className="pt-10 popular-offers">

                <div className="main__container">
                    {loading ? (
                        <Loader />
                    ) : (
                        cards2 && (
                            <div className="w-full">
                                <h2
                                    className="text-3xl font-bold tracking-tight text-white random-title"
                                >
                                    {t("POPULAR")} <span>{t("offers")}</span>
                                </h2>
                                <div className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8 hidden md:inline">
                                    <div className="cards-thr">
                                        {brands.slice(0, 6).map((rowData, index) => (
                                            <div key={"Popular_offers" + index} className="card-thr">
                                                <div className="relative">
                                                    <div className="relative flex align-center justify-center">
                                                        <Link
                                                            href={`${rowData.GoBig}/${newUrl}&creative_id=XXL_Top_New_Releases`}
                                                        >
                                                            <Image
                                                                src={`/brands/${rowData.CasinoBrand}.png`}
                                                                alt={rowData.CasinoBrand}
                                                                width={190}
                                                                height={130}
                                                                loading="lazy"
                                                                className=" w-full object-contain object-center"
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div className="relative mt-4 text-center">
                                                        <h3 className="text-lg font-semibold text-gray-900">{rowData.CasinoBrand}</h3>
                                                        <p className="mt-1 text-sm text-gray-500 h-10">{rowData.OurOfferContent}</p>
                                                    </div>

                                                </div>
                                                <div className="btn-crd">
                                                    <Link
                                                        href={`${rowData.GoBig}/${newUrl}&creative_id=XXL_Top_New_Releases`}
                                                        className="relative flex items-center justify-center px-8 py-2 text-lg font-medium rounded-full text-white btn-blick overflow-hidden"
                                                    >
                                                        {t("Play Now")}
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}

                                    </div>
                                </div>

                                <div className="md:hidden w-full mob-sl">
                                    <div className="cards-th">
                                        <Slider {...settings}>
                                            {brands.map((rowData, index) => (
                                                <div key={index} className="overflow-hidden card-thr">
                                                    <div className="pm10">
                                                        <div className="imgp">
                                                            <Link
                                                                target="_blank"
                                                                href={`${rowData.GoBig}/${newUrl}&creative_id=XXL_Top_New_Releases`}
                                                            >
                                                                <Image
                                                                    src={`/brands/${rowData.CasinoBrand}.png`}
                                                                    alt={rowData.CasinoBrand}
                                                                    width={100}
                                                                    height={100}
                                                                    loading="lazy"
                                                                    className="w-full object-contain object-center"
                                                                />
                                                            </Link>
                                                        </div>
                                                        <div className="mt-4 text-center">
                                                            <h3 className="text-lg font-semibold text-gray-900">{rowData.CasinoBrand}</h3>
                                                            <p className="mt-1 text-sm ">{rowData.OurOfferContent}</p>
                                                        </div>
                                                    </div>
                                                    <div className="mt-6">
                                                        <Link
                                                            href={`${rowData.GoBig}/${newUrl}&creative_id=XXL_Top_New_Releases`}
                                                            className=" flex items-center justify-center text-white btn-crd"
                                                        >
                                                            {t("Play Now")}
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))}
                                        </Slider>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>

        </>
    );
}
