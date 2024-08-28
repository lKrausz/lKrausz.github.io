import { useState, useEffect } from "react";
import { getProducts } from "@/components/products/apiProducts";
import MediaCard from "@/components/products/Card";
import { useTranslation } from "react-i18next";


const Cards = ({ user, onFinish }) => {
  const [productsData, setProductsData] = useState([]);
  const { i18n, t } = useTranslation();
  const lang = i18n.language;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProductsData(data.products);
      } catch (error) {
        console.error("Ошибка при получении товаров:", error);
      }
    };

    fetchData();
  }, [lang]);


  return (
    <div className="flex flex-wrap mt-4 cards">
      {productsData.map((item) => (
        <MediaCard
          lang={lang}
          item={item}
          onFinish={onFinish}
          key={item.product_id}
        />
      ))}
      <div className="flex justify-end w-full mb-2">
        <span className="inline-flex items-center rounded-full bg-or px-1.5 py-0.5 text-md font-medium text-white ring-1 ring-inset ring-gray-500/10">
          {t("Card availability varies by region.")}
        </span>
      </div>
    </div>
  );
};

export default Cards;
