"use client";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { I18nextProvider } from "react-i18next";
import i18n from "@/components/i18n";
import { Navigation } from "./Navigation_tw";

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

import Badge from "@mui/material/Badge";
import { updateGeo } from "@/components/getUser/updateGeo";
import ResponsiveDialog from "@/components/geo-identifier";
import BasicModal from "@/components/modal";
import KeitaroIframe from "@/components/KeitaroIframe";
import { getBrands } from "@/components/getBrands/getBrands2";
import { useLanguage } from "@/components/switcher/LanguageContext";
import { track } from "@vercel/analytics";
import Marque from "@/components/header/Marque";

import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  TicketIcon,
  XMarkIcon,
  WalletIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import "./styled.component.css";
import Mobile_tabs_navigation from "@/components/Mobile_tabs_navigation";

const Header_tailwind = () => {
  const { t } = useTranslation();
  const items = navItems(t);

  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const userNavigation = [
    {
      name: "My Profile",
      href: "/personal",
      icon: <UserIcon aria-hidden="true" className="h-6 w-6" />,
    },
    {
      name: "My Wallet",
      href: "/personal",
      icon: <WalletIcon aria-hidden="true" className="h-6 w-6" />,
    },
    // { name: 'Fortune wheel', href: '/fortune' },
    {
      name: "Card Shop",
      href: "/shop",
      icon: <ShoppingBagIcon aria-hidden="true" className="h-6 w-6" />,
    },
  ];

  const getParamsFromUrl = () => {
    let params = new URLSearchParams(window.location.search);
    if (!params.has("keyword")) {
      const hash = window.location.hash;
      if (hash.includes("?")) {
        params = new URLSearchParams(hash.split("?")[1]);
      }
    }
    return params;
  };

  let urlParams;

  if (typeof window !== "undefined") {
    urlParams = getParamsFromUrl();
  } else {
    urlParams = new URLSearchParams(); // Пустой объект для серверной стороны
  }

  const [load, setLoad] = useState(false);
  const [keywordValue, setKeywordValue] = useState(null);
  const idUserParam = urlParams.get("keyword");
  const ad_campaign = urlParams.get("ad_campaign_id");
  const userData = keywordValue !== null ? keywordValue : idUserParam;
  const [dataUser, setDataUser] = useState();
  const [d, setD] = useState(null);

  useEffect(() => {
    if (ad_campaign !== null) {
      localStorage.setItem("ad_campaign_id", ad_campaign);
    }
    async function updateUserData(data) {
      localStorage.setItem("user_id", data);

      const partners = ["partner1039", "partner1043", "partner1044", "CLD_VIP"];
      partners.forEach((partner) => {
        if (data.includes(partner)) {
          localStorage.setItem("source", partner);
        }
      });

      setUser(data);
      const dataUser = await getUserData(data);
      if (dataUser) {
        localStorage.setItem("userData", JSON.stringify(dataUser));
        setDataUser(dataUser);
        setLoad(true);
      }

      if (d && typeof d === "string" && d.includes("Json")) {
        const dataUser = await getUserData(data);
        if (dataUser) {
          setDataUser(dataUser);
          setLoad(true);
        }
      }
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

  /////////////////////////////////////

  useEffect(() => {
    const currentUrl = window.location.href;
    const urlObj = new URL(currentUrl);
    const searchParams = new URLSearchParams(urlObj.search);

    const indexOfQuestionMark = currentUrl.indexOf("?");
    const newUrl2 =
      indexOfQuestionMark !== -1
        ? currentUrl.substring(0, indexOfQuestionMark)
        : currentUrl;
    window.history.replaceState({}, document.title, newUrl2);

    const newUrlWithSource =
      "?" +
      (searchParams.toString()
        ? searchParams.toString() + "&"
        : `keyword=${localStorage.getItem("user_id")}&`) +
      `source=${localStorage.getItem("source")}` +
      `&ad_campaign_id=${localStorage.getItem("ad_campaign_id")}`;
    if (newUrlWithSource.includes("keyword")) {
      localStorage.setItem("savedUrl", newUrlWithSource);
      localStorage.setItem("token", "give");
    }
    const tokenGive = localStorage.getItem("token");
    if (tokenGive !== "give") {
      localStorage.setItem("savedUrl", newUrlWithSource);
    }
  });

  //////////////////////////////////////////////////

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== "https://topbon.us") {
        // console.error(
        //   "Received message from an unauthorized origin:",
        //   event.origin
        // );
        // return;
      }
      // console.log("Raw data from iframe:", event.data);
      const jsonData = event.data;
      setD(typeof jsonData === "string" ? jsonData : "");
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const { language } = useLanguage();
  const [brands, setBrands] = useState([]);
  const { data, error } = useSWR(
    ["brands", language],
    () => getBrands(language),
    { initialData: brands }
  );
  const [links, setLinks] = useState([]); // Инициализируем пустым массивом

  useEffect(() => {
    if (data) {
      setBrands(data); // Обновляем состояние brands данными из запроса
      setLinks(data.map((brand) => brand.GoBig)); // Обновляем состояние links на основе данных
    }
  }, [data]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [showResponsiveDialog, setShowResponsiveDialog] = useState(false);
  const [showBasicModal, setShowBasicModal] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!showResponsiveDialog) {
        setShowBasicModal(true);
      }
    }, 20000);

    return () => clearInterval(interval);
  }, [showResponsiveDialog]);

  return (
    <>
      <Marque />
      <header className="">
        {load ? (
          dataUser.geo_approve === null || dataUser.geo_approve === "" ? (
            <ResponsiveDialog />
          ) : (
            <div></div>
          )
        ) : (
          ""
        )}
        <div className="main__container">
          <nav
            aria-label="Global"
            className="mx-auto max-w-7xl flex items-center sm:justify-between px-2 sm:px-6 lg:px-8"
          >
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-start rounded-md p-2.5 text-white"
              >
                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-shrink-0 items-center h-20 ml-2 md:ml-10 lg:ml-0 justify-center">
              <Link href="/">
                <Image src={Img} alt="logo" width={150} loading="lazy" />
              </Link>
            </div>
            <div className="hidden xl:flex flex items-center justify-center">
              <Navigation
                navLinks={items.map((item) => ({
                  ...item,
                  label: item.label,
                }))}
              />
            </div>
            <div className="absolute right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="hidden md:flex relative rounded-full p-1 text-white hover:text-gray-400 transition-colors duration-300 ease-in-ou mr-5"
              >
                {load ? (
                  <Link
                    href={`/personal`}
                    className=" flex justify-center items-center text-xl"
                  >
                    <>
                      <CurrencyDollarIcon
                        aria-hidden="true"
                        className="h-8 w-8 text-white transition-colors duration-300 ease-in-out hover:text-gray-400 mr-2"
                      />
                      {`${dataUser.balance}$`}
                    </>
                  </Link>
                ) : (
                  ""
                )}
              </button>
              <Link href={`/fortune`} className="hidden md:flex">
                <button
                  type="button"
                  className="relative rounded-full p-1 text-white hover:text-gray-400 transition-colors duration-300 ease-in-ou mr-5"
                >
                  <span className="absolute -inset-1.5" />
                  {load ? (
                    <Badge badgeContent={`${dataUser.tickets}`} color="primary">
                      <>
                        <TicketIcon
                          aria-hidden="true"
                          className="h-8 w-8 text-white transition-colors duration-300 ease-in-out hover:text-gray-400"
                        />
                      </>
                    </Badge>
                  ) : (
                    ""
                  )}
                </button>
              </Link>

              <I18nextProvider i18n={i18n}>
                <MenuLanguages />
              </I18nextProvider>

              <Menu as="div" className="relative ml-3 hidden md:inline">
                <div>
                  <MenuButton className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 avatar-new">
                    <span className="absolute -inset-1.5" />
                    {load ? (
                      <div className="h-12 w-12 rounded-full text-4xl flex items-center justify-center text-blue-600"></div>
                    ) : (
                      ""
                    )}
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in submenu-x"
                >
                  <MenuItem>
                    <Link
                      href={`/personal`}
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 flex items-center"
                    >
                      <WalletIcon
                        aria-hidden="true"
                        className="h-6 w-6 text-white transition-colors duration-300 ease-in-out mr-2"
                      />

                      {t("My wallet")}
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      href={`/fortune`}
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 flex items-center"
                    >
                      <TicketIcon
                        aria-hidden="true"
                        className="h-6 w-6 text-white transition-colors duration-300 ease-in-out mr-2"
                      />
                      {load ? (
                        <div className="">
                          {t("Fortune wheel")} <span>{user.tickets}</span>
                        </div>
                      ) : (
                        <div className="">{t("Fortune wheel")}</div>
                      )}
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      href={`/shop`}
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 flex items-center "
                    >
                      <ShoppingBagIcon
                        aria-hidden="true"
                        className="h-6 w-6 text-white transition-colors duration-300 ease-in-out mr-2"
                      />

                      {t("Cards shop")}
                    </Link>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </nav>
          <Dialog
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
            className="lg:hidden"
          >
            <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-indigo-600 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 mobmen">
              <div className="flex items-center justify-between">
                <Link href="/">
                  <Image src={Img} alt="logo" width={150} loading="lazy" />
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 text-white"
                >
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {items.map((item) => (
                      <Disclosure as="div" className="-mx-3" key={item.label}>
                        <DisclosureButton className="group flex w-full items-center rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-white">
                          <div className="flex mr-2 h-10 w-10 flex-shrink-0 items-center justify-center rounded-md text-white sm:h-12 sm:w-12 bg-or">
                            {item.icon}
                          </div>
                          {item.label}
                          <ChevronDownIcon
                            aria-hidden="true"
                            className="ml-2 h-5 w-5 flex-none group-data-[open]:rotate-180"
                          />
                        </DisclosureButton>

                        <DisclosurePanel className="mt-2 space-y-2 menuItems">
                          {item.subMenu.map((tab) => (
                            <DisclosureButton
                              key={tab.label}
                              as="a"
                              href={tab.href}
                              className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-white "
                            >
                              {tab.label}
                            </DisclosureButton>
                          ))}
                        </DisclosurePanel>
                      </Disclosure>
                    ))}
                  </div>
                  <div className="py-6 border-t border-gray-200 pb-3 pt-4">
                    <Disclosure as="div" className="-mx-3">
                      {userNavigation.map((item) => (
                        <DisclosureButton
                          key={item.name}
                          as="a"
                          href={item.href}
                          className="group flex w-full items-center rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-white "
                        >
                          <div className="flex mr-2 h-10 w-10 flex-shrink-0 items-center justify-center rounded-md  text-white sm:h-12 sm:w-12 bg-bl">
                            {item.icon}
                          </div>
                          {item.name}
                        </DisclosureButton>
                      ))}
                    </Disclosure>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </Dialog>
        </div>
      </header>
      {load && dataUser && <Mobile_tabs_navigation dataUser={dataUser} />}
    </>
  );
};

export { Header_tailwind };
