// Это больше не компонент React, а асинхронная функция для получения данных брендов.
export const getBrandsFiltered = async (filtered, lng) => {
  const apiAll = "https://bonusnumber1.com/api/brandsNew/read.php";
  const api1039 = "https://bonusnumber1.com/api/brandsNew2/read.php";
  const api1043 = "https://bonusnumber1.com/api/brandsNew3/read.php";
  const api1044 = "https://bonusnumber1.com/api/brandsNew4/read.php";
  const apiCLD_VIP = "https://bonusnumber1.com/api/brandsNew5/read.php";

  const source = localStorage.getItem("source");
  // const geo = localStorage.getItem("country");



  try {
    let url;
    if (source === "partner1039") {
      url = api1039;
    } else if (source === "partner1043") {
      url = api1043;
    } else if (source === "partner1044") {
      url = api1044;
    } else if (source === "CLD_VIP") {
      url = apiCLD_VIP;
    } else {
      url = apiAll;
    }
    const res = await fetch(url);


   
    if (res.ok) {
      const responseData = await res.json();
      let filteredData = [];

      if (lng) {
        const geoLng = lng.toUpperCase();
     

        filteredData = responseData.brandsNew.filter((rowData) => {
          const categoriesArray = rowData["categories"] ? 
            rowData["categories"].split(",").map((category) => category.trim()) : [];
          return (
            rowData.GEO === geoLng &&
            rowData["CurrentStatus"] === "Ongoing" &&
            !["Mirax (FS)", "Katsubet (FS)", "7Bit (FS)"].includes(
              rowData["CasinoBrand"]
            ) &&
            categoriesArray.includes(filtered)
          );
        });
        
      }

      return filteredData; // Возвращаем отфильтрованные данные
    } else {
      console.error("Failed to fetch data:", res.status);
      return []; // Возвращаем пустой массив в случае ошибки
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return []; // Возвращаем пустой массив в случае ошибки
  }
};


