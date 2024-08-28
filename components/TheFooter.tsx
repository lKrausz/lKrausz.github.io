"use client";
import Image from "next/image";
import Img from "@/public/logo3.png";
import { useTranslation } from "react-i18next";
import { Link } from "phosphor-react";

const TheFooter = () => {

  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="flex  text-white flex-col">
        <div className="footer-top ">
          <div className="main__container flex justify-between items-center pb-3 pt-5">
            <div className="logo">
              <Image src={Img} alt="logo" width={150} loading="lazy" />
            </div>
            <div className="solution-contacts flex">
              <div>
                <p className="mb-1">{t("Our Contacts:")}</p>
                <a
                  className="underline flex items-center"
                  href="mailto:support@myawardwallet.com"
                >
                  support@myawardwallet.com
                </a>
              </div>
              <div className="flex flex-col">
                <a
                  className="underline ml-5 flex items-end mb-1"
                  href="/responsible-gaming"
                >
                  {t("Responsible Gaming")}
                </a>
                <a
                  className="underline ml-5 flex items-end mb-1"
                  href="/privacy-policy"
                >
                  {t("Privacy Policy")}
                </a>
                <a
                  className="underline ml-5 flex items-end "
                  href="/terms-and-conditions"
                >
                  {t("Terms and Conditions")}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-end">
          <div className="main__container pt-3 pb-3 flex justify-center">
            <span>Copyright © 2024, topbon.us All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { TheFooter };
