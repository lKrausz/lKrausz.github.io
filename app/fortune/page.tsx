"use client";
import { useState, useEffect } from "react";
import Fortunes from "@/components/fortune";
import { getUserData } from "@/components/getUser/getUser";
import Brands_carousel from "@/components/Banners_tailwind/Brands_carousel";

import { useTranslation } from "react-i18next";
interface UserData {
  winbalance?: string; // "?" указывает, что свойство необязательное
  // Добавьте другие свойства здесь по необходимости
}

export default function Fortune() {
  const [iframeWidth, setIframeWidth] = useState("1170px");
  const [iframeHeight, setIframeHeight] = useState("658px");
  const [userData, setUserData] = useState(null);
  const { t } = useTranslation();
  const banner = false;


  useEffect(() => {

    const updateIframeSize = () => {
      const screenWidth = window.innerWidth;
      setIframeWidth(screenWidth <= 767 ? "100%" : "1170px");
      setIframeHeight(screenWidth <= 767 ? "100%" : "658px");
    };

    window.addEventListener("resize", updateIframeSize);
    updateIframeSize();

    return () => window.removeEventListener("resize", updateIframeSize);
  }, []);


  const categoryBrands = { key1: "FirstPriority", key2: "1" };
  const target = "target-fw-brands-wheel-page";
  const creative = "FW_Brands_Wheel_Page";
  return (
    <div className="page-fortune main__container">
      {/* <button onClick={() => updateUserDataIfNeeded(userData)}>On</button> */}
      <div className="pt-10 pb-10">
        <iframe
          id="myIframe"
          src="/wheelNew2/index.html"
          width={iframeWidth}
          height={iframeHeight}
        />
      </div>

      {/* <Fortunes banner={banner} target={target} creative={creative} /> */}
      <Brands_carousel target={target} creative={creative} categoryBrands={categoryBrands} />
    </div>
  );
}
