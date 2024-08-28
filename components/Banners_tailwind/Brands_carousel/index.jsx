"use client";
import { useState, useEffect } from "react";
import useSWR from "swr";
import Loader from "../../Loader";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../../switcher/LanguageContext";
import { getBrands } from "../../getBrands/getBrands2";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import "./styled.component.css"

export default function Brands_carousel({target, creative, categoryBrands}) {
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
        dots: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        autoplay: false,
        speed: 1000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: false,
                }
            }
        ]
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

    // const categoryBrands = { key1: "Segment2", key2: "Sandbox" };
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
            <div className="sm:mt-10 sm:mb-10 mt-5 mb-5 mob-mt10">
                <div className="main__container">
                    {loading ? (
                        <Loader />
                    ) : (
                        <div >
                            <div className="w-full brand_carousel rounded-md">
                                <Slider {...settings}>
                                    {brands.length > 0 &&
                                        brands.map((rowData, index) => (
                                            <div
                                                key={index}
                                                className="overflow-hidden rounded-xl flex flex-col justify-between"
                                            >
                                                <div className="mx-auto max-w-7xl flex flex-col ">
                                                    <div className="mx-auto max-w-2xl lg:mx-0 flex flex-row card-sl">
                                                        <div>
                                                            <Link
                                                                className="mt-3"
                                                                href={`${rowData.GoBig}/${newUrl}&creative_id=${creative}`}
                                                                target="_blank"
                                                            >

                                                                <Image
                                                                    src={`/brands/${rowData.CasinoBrand}.png`}
                                                                    alt={rowData.CasinoBrand}
                                                                    width={300}
                                                                    height={100}
                                                                    loading="lazy"
                                                                    className={`${target}`}
                                                                />
                                                            </Link>
                                                            <Link
                                                                className="relative btn-play btn-blick overflow-hidden"
                                                                href={`${rowData.GoBig}/${newUrl}&creative_id=${creative}`}
                                                                target="_blank"
                                                            >
                                                                {t("Play Now")}
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </Slider>
                            </div>

                        </div>
                    )}
                </div>
            </div>

        </>
    );
}
