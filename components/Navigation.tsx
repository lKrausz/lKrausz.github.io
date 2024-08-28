"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Loader from "./Loader";
import Image from "next/image";
import Img from "@/public/menuBonuses2.png";
import { useTranslation } from "react-i18next";
import { CaretDown } from "@phosphor-icons/react";

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

  const handleLinkClick = () => {
    setIsLoading(true);
    setOpenSubMenu(null);
    // Simulate some delay to show the loader (remove this in actual usage)
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const toggleSubMenu = (label: string) => {
    if (openSubMenu === label) {
      setOpenSubMenu(null);
    } else {
      setOpenSubMenu(label);
    }
  };
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

  return (
    <>
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        const hasSubMenu = link.subMenu && link.subMenu.length > 0;

        return (
          <div key={link.label} className="navigation-item">
            <Link
              href={link.href}
              className={isActive ? "active" : ""}
              onClick={() => {
                handleLinkClick();
                setOpenSubMenu(null);
              }}
            >
              <div className="flex items-center justify-center">
                {isLoading ? (
                  <Loader />
                ) : (
                  <>
                    {link.icon}
                    <span>{link.label}</span>
                  </>
                )}
              </div>
            </Link>
            {hasSubMenu && (
              <div className="op-menu">
                <button onClick={() => toggleSubMenu(link.label)}>
                  <CaretDown color="#fff" size={16} />
                </button>
              </div>
            )}

            {windowWidth !== null && windowWidth > 1259
              ? hasSubMenu && (
                  <div
                    className={`sub-menu flex justify-between ${link.class}`}
                  >
                    <div className="sub-menu-items">
                      {link.subMenu!.map((subLink) => (
                        <Link key={subLink.label} href={subLink.href}>
                          <div
                            className="sub-menu-item"
                            onClick={() => {
                              handleLinkClick();
                            }}
                          >
                            <div className="">
                              {isLoading ? (
                                <Loader />
                              ) : (
                                <span>{subLink.label}</span>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="sub-menu-image">
                      <Image
                        src={Img}
                        alt="bonuses"
                        width={280}
                        loading="lazy"
                      />
                    </div>
                  </div>
                )
              : hasSubMenu &&
                openSubMenu === link.label && (
                  <div
                    className={`sub-menu flex justify-between ${link.class}`}
                  >
                    <div className="sub-menu-items">
                      {link.subMenu!.map((subLink) => (
                        <Link key={subLink.label} href={subLink.href}>
                          <div
                            className="sub-menu-item"
                            onClick={() => {
                              handleLinkClick();
                              onLinkClick();
                              setOpenSubMenu(null);
                            }}
                          >
                            <div className="">
                              {isLoading ? (
                                <Loader />
                              ) : (
                                <span>{subLink.label}</span>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="sub-menu-image">
                      <Image
                        src={Img}
                        alt="bonuses"
                        width={280}
                        loading="lazy"
                      />
                    </div>
                  </div>
                )}
          </div>
        );
      })}
    </>
  );
};

export { Navigation };
