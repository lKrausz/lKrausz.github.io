"use client";
import banner from "@/public/newimages/minibanner.png";
import Image from "next/image";
import "./styled.component.css";
import { useTranslation } from "react-i18next";

import Brands_carousel from "../Brands_carousel";

export default function Banner_small() {
  const categoryBrands = { key1: "Segment2", key2: "Sandbox" };
  const { t } = useTranslation();

  return (
    <>
      <div>
        <div id="real-block" className="main__container">
          <div className="">
            <div className="flex items-center px-2 py-2.5 sm:px-3.5 rounded-md mt-10 flex-col sm:flex-row new-brands">
              {/* <div className="flex flex-row items-center">
                <div className="absolute abs-p flex justify-center items-center">
                  <p>NEW</p>
                </div>
                <Image
                  src={banner}
                  alt={banner}
                  width={310}
                  height={310}
                  loading="lazy"
                  className="absolute minibanner"
                />

                <p className="!text-3xl text-white ml-2">
                  <span>TOP NEW RELEASES</span>
                </p>
              </div>
              <div className="flex ml-auto mt-2 sm:mt-0 show-more">
                <button className="btn btn-secondary2">Show more</button>
              </div> */}

              <h2
                className="text-3xl font-bold tracking-tight text-white random-title"
              >
                {t("TOP NEW")} <span>{t("releases")}</span>
              </h2>
            </div>
          </div>
        </div>
      </div>
      <Brands_carousel categoryBrands={categoryBrands} />
    </>
  );
}
