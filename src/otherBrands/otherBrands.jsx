import { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import { useTranslation } from "react-i18next";

import cmn1 from "../../public/cmn1.png";
import play from "../../public/play.png";
import image from "../../../src/card.png";

function OtherBrands({
  newUrl,
  ipData,
  ipDataCode,
  currentLanguage,
  country,
  source,
  selectedCountry,
  setSelectedCountry,
}) {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [otherData, setOtherData] = useState([]);
  const [visibleBrands, setVisibleBrands] = useState(8);

  const handleShowMore = () => {
    setVisibleBrands((prevVisibleBrands) => prevVisibleBrands + 8);
  };

  const apiOld = "https://pickbonus.myawardwallet.com/api/brands/read.php";
  const apiNew = "https://pickbonus.myawardwallet.com/api/brands/read2.php";
  const api1043 = "https://pickbonus.myawardwallet.com/api/brands/read3.php";
  const api1044 = "https://pickbonus.myawardwallet.com/api/brands/read4.php";

  function shuffleArray(array) {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  useEffect(() => {
    const geo = selectedCountry.toUpperCase();

    const fetchData = async () => {
      try {
        let url;
        switch (source) {
          case "partner1039":
            url = apiNew; // Для partner1039
            break;
          case "partner1043":
            url = api1043; // Для partner1043
            break;
          case "partner1044":
            url = api1044; // Для partner1044
            break;
          default:
            url = apiOld; // Для всех остальных случаев
        }

        const res = await fetch(url);
        if (res.ok) {
          const responseData = await res.json();
          // const dataArray = Object.values(responseData);
          let filteredDataOther = [];

          if (geo) {
            filteredDataOther = responseData.brands.filter(
              (rowData) =>
                rowData.GEO === geo &&
                rowData["CurrentStatus"] === "Ongoing" &&
                rowData["CasinoBrand"] !== "Mirax (FS)" &&
                rowData["CasinoBrand"] !== "Katsubet (FS)" &&
                rowData["CasinoBrand"] !== "7Bit (FS)" &&
                rowData["Trendsetting"] === "1"
            );
          } else {
            filteredDataOther = responseData.brands.filter(
              (rowData) =>
                rowData.GEO === ipDataCode &&
                rowData["CurrentStatus"] === "Ongoing" &&
                rowData["CasinoBrand"] !== "Mirax (FS)" &&
                rowData["CasinoBrand"] !== "Katsubet (FS)" &&
                rowData["CasinoBrand"] !== "7Bit (FS)" &&
                rowData["Trendsetting"] === "1"
            );
          }

          // Перемешиваем данные перед отображением
          setOtherData(shuffleArray(filteredDataOther));
          setLoading(false);

          // Если нет брендов, вызывать setSelectedCountry
          // if (filteredDataOther.length === 0) {
          //   setSelectedCountry("all");
          // }
        } else {
          console.error("Failed to fetch data:", res.status);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        setLoading(false);
      }
    };

    if ((ipDataCode && currentLanguage) || (geo && currentLanguage)) {
      fetchData();
    }
  }, [ipDataCode, currentLanguage, selectedCountry, source]);

  // ...

  return (
    <div>
      {otherData.length > 0 && (
           <section id="game pricing" class=" pricing-section game-section pt-95 pb-95">
           <div class="container">
             <div class="row">
             <div class="col-xl-4 col-lg-0">
                    <div class="pricing-content">
                        <div class="image">
                        <img src={`.${image}`} alt={`.${image}`} />
                        </div>
                        <div class="section-title">
                            <h1 class="mb-20 wow fadeInUp" data-wow-delay=".2s"><span class="common-gre-color">{t("Enchanted Offers")}</span></h1>
                            <p class="wow fadeInUp" data-wow-delay=".4s">A casino is a facility for certain types of gambling. Casinos are often built near or combined with hotels, resorts, restaurants, retail shopping, cruise ships, and other tourist attractions.</p>
                        </div>
                    </div>
                </div>
             <div class="row col-xl-8 col-lg-12">
               {otherData.length > 0 ? (
                 otherData.slice(0, 6).map((rowData, index) => (
                   <div class="col-xl-4 col-md-4" key={index}>
                     <div class="single-game box-inner-shadow">
                       <div className="game_thumb">
                         <img src={rowData["LinkImg"]} alt={rowData["LinkImg"]} />
   
                         <p class="mb-15">{rowData["OurOfferContent"]}</p>
   
                         <div className="game__overlay">
                           <a class="play-btn btn-hover" href={
                                     rowData["GoBig"] +
                                     newUrl +
                                     "L_enchanted-forest_2"
                                   }>
                             Play Now!
                           </a>
                         </div>
                       </div>
                     </div>
                   </div>
                 ))
               ) : (
                 <p className="ti">{t("No brands available for your country")}</p>
               )}
             </div>
             </div>
             <div class="view-all-btn text-center pt-30">
               <a
                 target="_blank"
                 href={`https://pickbonus.myawardwallet.com/${newUrl}L_enchanted-forest_2`}
                 className="main-btn btn-hover"
               >
                 <span>{t("Show all")}</span>
               </a>
             </div>
           </div>
         </section>
      )}
    </div>
  );
}

export default OtherBrands;
