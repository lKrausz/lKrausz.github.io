"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import img from "@/public/newimages/facmob.png";
import { useTranslation } from "react-i18next";




export default function Banner_small() {
  const [newUrl, setNewUrl] = useState("");
  const [source, setSource] = useState("");

  const [redirectUrl, setRedirectUrl] = useState("");

  const { t } = useTranslation();

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
  }, [source]);

  return (
    <>
      <div className="emojis">
        <div className="main__container">
          <div className="flex justify-between items-center face-mob">
            <h3 className="text-lg leading-6 ">
              {t("What is your choise")}<span>{t(" for today?")}</span>
            </h3>
            <div className="mob-none">
              <Image src={img} alt={img} width={400} height={150} />
            </div>
            <div className="flex items-center justify-start btns-ch">
              <div className="h-20 w-20 btn-choose">
                <Link href={`${redirectUrl}/${newUrl}&creative_id=XXL_Try_Your_Luck`}
                  target="_blank">
                  {t("Choose")}
                </Link>
              </div>
              <div className="h-20 w-20 btn-choose">
                <Link href={`${redirectUrl}/${newUrl}&creative_id=XXL_Try_Your_Luck`}
                  target="_blank">
                  {t("Choose")}
                </Link>
              </div>
              <div className="h-20 w-20 btn-choose">
                <Link href={`${redirectUrl}/${newUrl}&creative_id=XXL_Try_Your_Luck`}
                  target="_blank">
                  {t("Choose")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
