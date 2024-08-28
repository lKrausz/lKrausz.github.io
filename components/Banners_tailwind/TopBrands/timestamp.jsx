"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import banner1 from "@/public/newimages/wheelbanner.png";

export default function Timestamp() {
  const [newUrl, setNewUrl] = useState("");
  const { t } = useTranslation();
  const [source, setSource] = useState("");

  const ONE_DAY_IN_MS = 1 * 24 * 60 * 60 * 1000; // Константа для двух суток
  const ONE_MINUTE_IN_MS = 60 * 1000; // Константа для одной минуты
  const [redirectUrl, setRedirectUrl] = useState(""); // Состояние для URL перенаправления
  // Инициализация состояний
  const [stage, setStage] = useState(() => {
    // Ensure code runs only on client-side
    if (typeof window !== "undefined") {
      // Получаем текущее значение 'stage' из localStorage при первой загрузке
      return localStorage.getItem("stage") || "first-stage";
    }
    return "first-stage"; // Default to 'first-stage' for SSR
  });

  const [timestamp, setTimestamp] = useState(() => {
    // Ensure code runs only on client-side
    if (typeof window !== "undefined") {
      // Получаем текущее значение 'timestamp' из localStorage при первой загрузке
      return localStorage.getItem("timestamp") || null;
    }
    return null;
  });

  const [remainingTime, setRemainingTime] = useState(ONE_MINUTE_IN_MS); //

  // useEffect для инициализации состояния на клиенте
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedStage = localStorage.getItem("stage") || "first-stage";

      const storedTimestamp = localStorage.getItem("timestamp");

      setStage(storedStage);

      if (storedTimestamp) {
        const timeElapsed = Date.now() - parseInt(storedTimestamp, 10);
        setRemainingTime(ONE_MINUTE_IN_MS - timeElapsed);
        setTimestamp(parseInt(storedTimestamp, 10));
      } else {
        const newTimestamp = Date.now();
        localStorage.setItem("timestamp", newTimestamp.toString());
        setTimestamp(newTimestamp);
      }
    }
  }, []);

  // useEffect для установки URL перенаправления на основе source
  useEffect(() => {
    if (typeof window !== "undefined") {
      let url = "";
      switch (source) {
        case "partner1039":
          url = `https://info.topbon.us/partner_aurnd/${newUrl}&creative_id=XXL_JIN`;
          break;
        case "partner1043":
          url = `https://info.topbon.us/rnd1043/${newUrl}&creative_id=XXL_JIN`;
          break;
        case "partner1044":
          url = `https://info.topbon.us/rnd1044/${newUrl}&creative_id=XXL_JIN`;
          break;
        case "CLD_VIP":
          url = `https://link.bo-nus.com/rnd_cld/${newUrl}&creative_id=XXL_JIN`;
          break;
        case "partner1045_b1":
          url = `https://link.bo-nus.com/rnd_cld/${newUrl}&creative_id=XXL_JIN`;
          break;
        default:
          url = `https://info.topbon.us/aurnd/${newUrl}&creative_id=XXL_JIN`;
      }
      setRedirectUrl(url); // Сохраняем URL в состояние
    }
  }, [source]);
  console.log("RED", redirectUrl, source);

  // useEffect для синхронизации stage с localStorage
  useEffect(() => {
    if (typeof window !== "undefined" && stage) {
      localStorage.setItem("stage", stage);
      console.log("STAGE", stage);
    }
  }, [stage]);

  // useEffect для обновления оставшегося времени и перехода на третий этап
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      stage === "second-stage" &&
      timestamp
    ) {
      const intervalId = setInterval(() => {
        const timeElapsed = Date.now() - timestamp;
        const newRemainingTime = ONE_MINUTE_IN_MS - timeElapsed;
        setRemainingTime(newRemainingTime);

        if (newRemainingTime <= 0) {
          setStage("third-stage");
          localStorage.setItem("stage", "third-stage");
          clearInterval(intervalId);
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [stage, timestamp]);

  ///////////////////////////////////////////////
  const [customer, setCustomer] = useState();
  const [user, setUser] = useState();
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Извлечение строки из localStorage
      const userData = localStorage.getItem("userData");

      // Проверка, что данные существуют
      if (userData) {
        // Преобразование строки в объект JSON
        const userObject = JSON.parse(userData);

        // Извлечение значения поля 'customer' и 'id'
        const customerValue = userObject.customer;
        const idValue = userObject.id;

        // Установка состояний пользователя и клиента
        setUser(idValue);
        setCustomer(customerValue);

        // Вывод значения поля 'customer'
        console.log("Значение поля customer:", customerValue);
      } else {
        console.log("Данные userData отсутствуют в localStorage.");
      }
    }
  }, []);
  const sendUserData = async (userId, customerType, nameEvent) => {
    try {
      const response = await fetch(
        "https://bonusnumber1.com/api/jin/jin1.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            customerId: userId,
            customer: customerType,
            event: nameEvent,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log("Данные успешно отправлены:", result);
      } else {
        console.error("Ошибка при отправке данных:", result);
      }
    } catch (error) {
      console.error("Ошибка сети:", error);
    }
  };
  ///////////////////////////////////////////////
  // Функция для перехода на второй этап
  const scndstage = () => {
    setStage("second-stage");
    const newTimestamp = Date.now();
    setTimestamp(newTimestamp);
    localStorage.setItem("timestamp", newTimestamp.toString());

    // Отправка данных на сервер
    if (user && customer) {
      sendUserData(user, customer, "FIRST EVENT");
    }
  };

  // Функция для сброса состояния на первый этап и открытия новой вкладки
  const resetToFirstStage = () => {
    setStage("first-stage");
    localStorage.setItem("stage", "first-stage");
    localStorage.removeItem("timestamp"); // Удаляем таймстамп из localStorage

    if (redirectUrl) {
      // Открываем новую вкладку с URL из состояния
      window.open(redirectUrl, "_blank");
      console.log("REDIRECT", redirectUrl);
    }
    // Отправка данных на сервер
    if (user && customer) {
      sendUserData(user, customer, "SECOND EVENT");
    }
  };

  // Форматирование оставшегося времени
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <>
      {stage != null && (
        <div className="flex items-center justify-end jins w-full">
          {stage === "first-stage" && (
            <div className="frstjin">
              <h5 className="h5">
                {t("Click Here to Unleash Your Magic Bonus!")}
              </h5>
              <p className="p">{t("Get a bonus just for you tomorrow!")}</p>
              {/* <Image loading="lazy" src={banner1} alt="banner1" /> */}
              <div className="wrap-button">
                <button className="btn btn-mini" onClick={scndstage}>
                  <p>{t("Get Bonus")}</p>
                </button>
              </div>
            </div>
          )}
          {stage === "second-stage" && (
            <div className="scnjin">
              <h5 className="h5">
                {t("Thank you! Your Bonus Will Be Here Soon")}
              </h5>
              <p className="p">
                {t("Come back after")}{" "}
                <span className="goldie">{formatTime(remainingTime)}</span>{" "}
                {t("to collect it!")}
              </p>
         
            </div>
          )}
          {stage === "third-stage" && (
            <div className="thrdjin">
              <h5 className="h5">{t("Your Bonus is Ready!")}</h5>
              <p className="p">{t("Click below to claim your magical reward!")}</p>

      

              <button className="btn btn-new" onClick={resetToFirstStage}>
                <p> {t("Bonus Ready!")}</p>
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
