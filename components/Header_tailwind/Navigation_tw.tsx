"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Loader from "../Loader";
import Image from "next/image";
import Img from "@/public/menuBonuses2.png";
import { useTranslation } from "react-i18next";
import { CaretDown } from "@phosphor-icons/react";

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  PopoverBackdrop,
} from "@headlessui/react";

type NavLink = {
  class: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  subMenu?: NavLink[];
};

type Props = {
  navLinks: NavLink[];
  onLinkClick: () => void;
};

const Navigation = ({ navLinks, onLinkClick }: Props) => {
  // Получите функцию перевода
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const [source, setSource] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [newUrl, setNewUrl] = useState("");

  useEffect(() => {
    // Теперь можно безопасно использовать window
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const pathname = usePathname();

  
  useEffect(() => {
    let url = "";
    switch (source) {
      case "partner1039":
        url = "https://link.reg2dep.business/topbonus_rnd39";
        break;
      case "partner1043":
        url = "https://link.reg2dep.business/topbonus_rnd43";
        break;
      case "partner1044":
        url = "https://link.reg2dep.business/topbonus_rnd44";
        break;
      case "CLD_VIP":
        url = "https://link.reg2dep.business/topbonus_rndcld";
        break;
      default:
        url = "https://link.reg2dep.business/topbonus_rnd";
    }
    setRedirectUrl(url);
    const savedUrl = localStorage.getItem("savedUrl");
    if (savedUrl) {
        setNewUrl(savedUrl);
    }
  }, [source]);


  return (
    <>
      {navLinks.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Popover className="relative z-[9999]" key={link.label}>
            <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 text-white w-full">
              <span>{link.label}</span>
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute left-1/2 z-50 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in "
            >
              <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl text-sm shadow-lg lg:max-w-3xl submenu-all">
                <div className="grid grid-cols-1 gap-x-1 pt-4 lg:grid-cols-2">
                  {link.subMenu &&
                    link.subMenu.map((subLink) => (
                      <div
                        key={subLink.label}
                        className="group relative flex gap-x-2 rounded-lg px-4 group-menu-item py-2 flex items-center "
                      >
                        <div className="mt-1 flex h-8 w-8 flex-none items-center justify-center rounded-lg menu-icon-background-color">
                          {subLink.icon}
                        </div>
                        <div>
                          <Link
                            href={subLink.href}
                            className="font-semibold text-gray-900"
                          >
                            {subLink.label}
                            <span className="absolute inset-0" />
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="flex justify-between items-center bg-my px-8 py-2">
                  <div className="">
                    <div className="flex items-center gap-x-2">
                      <h3 className="text-sm font-semibold leading-6 text-orange">
                        {t("Try Your Luck!")}
                      </h3>
                      {/* <p className="rounded-full bg-orange text-xs font-semibold text-white">
                        Good Luck!
                      </p> */}
                    </div>
                    <p className="mt-1 text-sm leading-6 text-white">
                      {t("Feeling lucky? Discover random casino brands and test your fortune!")}
                    </p>
                  </div>
                  <div className="flex ml-auto sm:mt-0">
                  <Link
                        href={`${redirectUrl}/${newUrl}&creative_id=XXL_Try_Your_Luck`}
                        target="_blank"
                      >
                        <div className="relative px-4 py-3 text-white rounded-lg lucky-btn btn-blick overflow-hidden flex items-center">
                          <p className="!mb-0">{t("Take a Chance!")}</p>
                        </div>
                      </Link>
                  </div>
                </div>
              </div>
            </PopoverPanel>
            <PopoverBackdrop className="fixed inset-0 w-screen h-screen z-10 -top-20 -left-32" />
          </Popover>
        );
      })}
    </>
  );
};

export { Navigation };
