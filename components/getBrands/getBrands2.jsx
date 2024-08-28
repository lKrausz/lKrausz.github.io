import {availableLanguages1039, availableLanguages1043, availableLanguages1044, availableLanguagesCLD_VIP, availableLanguages} from "./languages";


export const getBrands = async (lng) => {
  const apiAll = "https://bonusnumber1.com/api/brandsNew/read.php";
  const api1039 = "https://bonusnumber1.com/api/brandsNew2/read.php";
  const api1043 = "https://bonusnumber1.com/api/brandsNew3/read.php";
  const api1044 = "https://bonusnumber1.com/api/brandsNew4/read.php";
  const apiCLD_VIP = "https://bonusnumber1.com/api/brandsNew5/read.php";


  const partners = {
    partner1039: { url: api1039, languages: availableLanguages1039 },
    partner1043: { url: api1043, languages: availableLanguages1043 },
    partner1044: { url: api1044, languages: availableLanguages1044 },
    CLD_VIP: { url: apiCLD_VIP, languages: availableLanguagesCLD_VIP },
    default: { url: apiAll, languages: availableLanguages },
  };

  const source = localStorage.getItem("source") || "default";
  const { url, languages } = partners[source];

  // Проверяем, поддерживается ли переданный язык
  let supportedLanguage = languages.find(
    (language) => language.code.toUpperCase() === lng.toUpperCase()
  );

  // Если язык не поддерживается, используем "all"
  if (!supportedLanguage) {
    supportedLanguage = { code: "all" };
  }

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error("Failed to fetch data:", res.status);
      return [];
    }

    const responseData = await res.json();
    const filteredData = responseData.brandsNew.filter(
      (rowData) =>
        (rowData.GEO === supportedLanguage.code.toUpperCase() ||
          supportedLanguage.code === "ALL") &&
        rowData["CurrentStatus"] === "Ongoing" &&
        !["Mirax (FS)", "Katsubet (FS)", "7Bit (FS)"].includes(
          rowData["CasinoBrand"]
        ) 
    );

    return filteredData;
  } catch (error) {
    console.error("An error occurred:", error);
    return [];
  }
};
