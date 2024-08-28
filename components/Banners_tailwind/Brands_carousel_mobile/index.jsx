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

export default function Brands_carousel_mobile() {
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
        dots: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
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
                breakpoint: 640,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: false,
                }
            },
            {
                breakpoint: 420,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                },
            },
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

    const categoryBrands = { key1: "Segment2", key2: "Sandbox" };
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
                            <div className="w-full brand_carousel_mobile rounded-md">
                                <Slider {...settings}>
                                    {brands.length > 0 &&
                                        brands.map((rowData, index) => (
                                            <div key={"Carousel_mobile" + index}>
                                                <div
                                                     key={"Carousel_mobile_item" + index}
                                                    className="overflow-hidden p-5 sm:py-10 rounded-xl flex-col justify-between hidden sm:flex"
                                                >
                                                    <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col">
                                                        <div className="mx-auto max-w-2xl lg:mx-0 flex flex-row">
                                                            <div>
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
                                                        </div>
                                                    </div>
                                                </div>
                                                <div key={"Carousel_mobile_item_reverse" + index} className="overflow-hidden bg-gray-300 p-5 sm:py-10 rounded-xl flex-col justify-between flex sm:hidden">
                                                    <div className="">
                                                        <div className=" ">
                                                            <Image
                                                                src={`/brands/${rowData.CasinoBrand}.png`}
                                                                alt={rowData.CasinoBrand}
                                                                width={100}
                                                                height={100}
                                                                loading="lazy"
                                                                className="w-full object-contain object-center px-10"
                                                            />
                                                        </div>
                                                        <div className=" mt-4 text-center">
                                                            <h3 className="text-lg font-semibold text-gray-900">{rowData.CasinoBrand}</h3>
                                                            <p className="mt-1 text-sm text-gray-500 h-10">{rowData.OurOfferContent}</p>
                                                        </div>
                                                    </div>
                                                    <div className="mt-6">
                                                        <a
                                                            href={`${rowData.GoBig}/${newUrl}&creative_id=XXL_Top_New_Releases`}
                                                            className=" flex items-center justify-center rounded-md border border-transparent bg-indigo-500 px-2 py-2 text-lg font-medium text-white hover:bg-indigo-600"
                                                        >
                                                            {t("Play Now")}<span className="sr-only">, {rowData.CasinoBrand}</span>
                                                        </a>
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
