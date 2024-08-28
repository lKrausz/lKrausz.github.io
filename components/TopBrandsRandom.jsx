"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import imgrandom from "@/public/coins_banner2.jpg";
import { useLanguage } from "@/components/switcher/LanguageContext";
import { useTranslation } from "react-i18next";

export default function TopBrandsRandom() {
  const [newUrl, setNewUrl] = useState("");
  const [source, setSource] = useState("");
  const { language } = useLanguage();
  const { t } = useTranslation();
  const timeoutRef = useRef(null);
  const [redirectUrl, setRedirectUrl] = useState("");

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      if (!redirectUrl) return;
      window.location.href = `${redirectUrl}/${newUrl}&creative_id=XXL_Redirect`;
    }, 900000); // 100 секунд
  };

  useEffect(() => {
    const currentUrl = window.location.href;
    const indexOfQuestionMark = currentUrl.indexOf("?");
    const newUrl2 =
      indexOfQuestionMark !== -1
        ? currentUrl.substring(0, indexOfQuestionMark)
        : currentUrl;
    window.history.replaceState({}, document.title, newUrl2);

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
        const sourceFound = localStorage.getItem("source");
        if (!partners.includes(sourceFound)) {
          localStorage.setItem("source", "0");
          searchParams.set("source", "0");
        } else {
          setSource(sourceFound);
        }
      }
    }

    if (currentKeyword) {
      setPartnerSource(currentKeyword);
    } else {
      const savedSource = localStorage.getItem("source");
      if (savedSource) {
        setSource(savedSource);
      }
    }

    const savedUrl = localStorage.getItem("savedUrl");
    if (savedUrl) {
      setNewUrl(savedUrl);
    }

    resetTimeout();
    const events = ["mousemove", "scroll", "keydown"];
    events.forEach((event) => {
      window.addEventListener(event, resetTimeout);
    });

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetTimeout);
      });
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [language]);

  useEffect(() => {
    let url = "";
    switch (source) {
      case "partner1039":
        url = "https://info.topbon.us/partner_aurnd";
        break;
      case "partner1043":
        url = "https://info.topbon.us/rnd1043";
        break;
      case "partner1044":
        url = "https://info.topbon.us/rnd1044";
        break;
      case "CLD_VIP":
        url = "https://link.bo-nus.com/rnd_cld";
        break;
      default:
        url = "https://info.topbon.us/aurnd";
    }
    setRedirectUrl(url);
  }, [source]);

  return (
    <>
      <div className="preview2 flex flex-col">
        <div className="main__container flex items-center">
          <div className="flex flex-col">
            <h1 className="">
              {t("Feeling lucky today?")}{" "}
              <span className="text-blued">{t("Click now to play")}</span>{" "}
              {t("and see if")}{" "}
              <span className="text-blued"> {t("luck is on your side!")}</span>
            </h1>
            <Link
              target="_blank"
              className="btn btn-primary big-btn mt-3 target-try-your-luck"
              href={`${redirectUrl}/${newUrl}&creative_id=XXL_Try_Your_Luck`} 
            >
              {t("Try Your Luck")}
            </Link>
          </div>
          <Image
            className="randomimg"
            src={imgrandom}
            alt={imgrandom}
            width={300}
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
}
