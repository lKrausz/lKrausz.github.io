"use client";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { getBrands } from "@/components/getBrands/getBrands2";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/components/switcher/LanguageContext";
import Loader from "../Loader";

const Fortunes = ({ banner, target, creative }) => {
  const [brands, setBrands] = useState([]);
  const [visibleBrands, setVisibleBrands] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useLanguage();
  const categoryBrands = { key1: "FirstPriority", key2: "1" };

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
      console.log("FILTER", filteredData);
      setBrands(filteredData);
    }
  }, [data, categoryBrands.key1, categoryBrands.key2]);

  const { t } = useTranslation();

  const [newUrl, setNewUrl] = useState("");
  useEffect(() => {
    const savedUrl = localStorage.getItem("savedUrl");
    if (savedUrl) {
      setNewUrl(savedUrl);
    }
  }, []);

  const loadMoreBrands = () => {
    setVisibleBrands((prev) => prev + 5);
  };

  const hasMoreBrands = brands.length > visibleBrands;

  console.log("aaaaaa", brands);

  return (
    <div className="flex flex-col container-fortune">
      <div id="banner-wheel" className="banner-wheel">
        <h3>{t("FORTUNE WHEEL BRANDS")}</h3>
        <p>{t("Pick a brand below, make first deposit and win real cash")}</p>
        {banner && (
          <Link
            target="_blank"
            className="btn btn-thirdy target-spin-the-roulette"
            href={`/fortune`}
          >
            {t("Spin the Roulette")}
          </Link>
        )}
      </div>
      <p className="text-center mt-3">
        {t(
          "To qualify for withdrawals, ensure your first deposit is at least €25 or the equivalent in other currencies and was made after requesting a withdrawal."
        )}
      </p>
      <div className="flex flex-wrap px-0 py-6">
        {isLoading ? (
          <Loader />
        ) : (
          brands.slice(0, visibleBrands).map((brand) => (
            <div key={brand.id_brand} className="card-brand mb-3 basis-[19%]">
              <div className="brandImage p-3">
                <Link
                  target="_blank"
                  className={target}
                  href={`${brand.GoBig}/${newUrl}&creative_id=${target}`}
                >
                  <Image
                    src={`/brands/${brand.CasinoBrand}.png`}
                    alt={brand.CasinoBrand}
                    width={150}
                    height={75}
                    className={target}
                  />
                </Link>
              </div>
              <div className="brandContent p-3">
                <div className="review-bonus">{brand.OurOfferContent}</div>
                <div className="buttons">
                  <Link
                    target="_blank"
                    className={`btn btn-primary ${target}`}
                    href={`${brand.GoBig}/${newUrl}&creative_id=${target}`}
                  >
                    {t("Play Now")}
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {hasMoreBrands && (
        <button
          className="btn-primary btn-more text-lg max-w-sm p-3 ml-auto mr-auto mt-4 font-semibold text-white flex justify-center items-center"
          onClick={loadMoreBrands}
        >
          {t("Load More Brands")}
        </button>
      )}
    </div>
  );
};

export default Fortunes;
