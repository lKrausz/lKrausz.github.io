"use client";
import { useState, useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/components/i18n";
import { Navigation } from "./Navigation";

import Image from "next/image";
import Img from "@/public/logo3.png";
// import SearchComponent from "@/components/SearchComponent";
import LanguageSwitcher from "@/components/switcher/LanguageSwitcher";
import BrandsSwitcher from "@/components/switcher/BrandsSwitcher";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import MenuPages from "@/components/header/MenuPages";
import { getUserData } from "@/components/getUser/getUser";
import { navItems } from "@/components/header/NavItems";
import MenuLanguages from "@/components/header/MenuLanguages";

import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Badge from "@mui/material/Badge";

const TheHeader = () => {
  const { t } = useTranslation();
  const items = navItems(t);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const urlParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );
  const [load, setLoad] = useState(false);

  const [keywordValue, setKeywordValue] = useState(null);
  const idUserParam = urlParams.get("keyword");
  const userData = keywordValue !== null ? keywordValue : idUserParam;
  const [dataUser, setDataUser] = useState();

  const [d, setD] = useState(null);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== "https://topbon.us") {
        console.error(
          "Received message from an unauthorized origin:",
          event.origin
        );
        return;
      }

      const jsonData = event.data;
      console.log("Raw data from iframe:", jsonData);
      setD(typeof jsonData === jsonData.includes("Json") ? jsonData : JSON.stringify(jsonData));
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);
  console.log("SETDSETDSETD", d);

  // useEffect(() => {
  //   if(d && d.includes("Json")) {
  //     console.log("SET", "upload")
  //   }
  // }, [d])

  useEffect(() => {
    async function updateUserData(data) {
      localStorage.setItem("user_id", data);
      setUser(data);
      const dataUser = await getUserData(data);
      // const dataUser = "test_oleh"
      console.log("userData", dataUser);
      // if (dataUser) {
      //   setDataUser(dataUser);
      //   setLoad(true);
      // }
      if (dataUser || (d && d.includes("Json"))) {
        setDataUser(dataUser); // Это может быть не нужно, если dataUser не изменился
        setLoad(true);
      }
    }
    if(d && d.includes("Json")) {
      console.log("SET", "upload")
    }
    if (idUserParam !== null) {
      updateUserData(idUserParam);
    } else if (keywordValue !== null) {
      updateUserData(keywordValue);
    } else if (typeof window !== "undefined") {
      const keyword = localStorage.getItem("savedUrl");
      if (keyword) {
        const pairs = keyword.split("&");
        const keywordPair = pairs.find((pair) => pair.startsWith("?keyword="));
        if (keywordPair) {
          const keywordValue2 = keywordPair.split("=")[1];
          updateUserData(keywordValue2);
          setKeywordValue(userData);
          setIsLoading(true);
        }
      }
    }
  }, [d]); 

  return (
    <header className="header">
      <div className="header__bg">
        <div className="header__container ">
          <div className="logo">
            <Link href="/">
              <Image src={Img} alt="logo" width={130} loading="lazy" />
            </Link>
          </div>

          {/* <div className="search-container flex items-end justify-center ml-auto">
            <SearchComponent />
          </div> */}
          <div className="account-items ml-auto flex items-center">
            <div className="flex flex-col">
              {load ? (
                <Badge badgeContent={`${dataUser.balance}$`} color="secondary">
                  <Link href={`/personal?tab=wallet`} className="balance flex">
                    <>
                      <AccountBalanceWalletOutlinedIcon
                        className="mr-2"
                        size={18}
                      />{" "}
                      <span>My Wallet</span>
                    </>
                  </Link>
                </Badge>
              ) : (
                "..."
              )}
            </div>
            <div className="flex flex-col ml-8">
              {load ? (
                <Badge badgeContent={`${dataUser.tickets}`} color="primary">
                  <Link href={`/fortune`} className="spins flex">
                    <>
                      <CurrencyExchangeOutlinedIcon
                        className="mr-2"
                        size={18}
                      />
                      <span>Fortune Wheel</span>
                    </>
                  </Link>
                </Badge>
              ) : (
                "..."
              )}
            </div>
            <div className="flex flex-col ml-8">
              {load && (
                <Link href={`/personal?tab=cards`} className="cards-shop flex">
                  <>
                    <ShoppingBagOutlinedIcon className="mr-2" size={18} />
                    <span>Cards Shop</span>
                  </>
                </Link>
              )}
            </div>
          </div>

          <I18nextProvider i18n={i18n}>
            <MenuLanguages />
            <div className="d-none">
              <div className="somelng">
                <LanguageSwitcher />{" "}
              </div>
              <BrandsSwitcher />
            </div>
          </I18nextProvider>

          <MenuPages userId={user} t={t} />

          <div className="mobile-none">
            <button
              className={`burger-icon ${isMobileMenuOpen ? "open" : ""}`}
              onClick={toggleMobileMenu}
            >
              <div className="burger-lines">
                <div className="line line1"></div>
                <div className="line line2"></div>
                <div className="line line3"></div>
              </div>
            </button>
            <div className="menu-mobile">
              <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
                <Navigation
                  navLinks={items.map((item) => ({
                    ...item,
                    label: item.label,
                    // label: t(item.label),
                  }))}
                  onLinkClick={closeMobileMenu}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header__container menu-desctop">
        <Navigation
          navLinks={items.map((item) => ({
            ...item,
            label: item.label,
          }))}
        />
      </div>
    </header>
  );
};

export { TheHeader };
