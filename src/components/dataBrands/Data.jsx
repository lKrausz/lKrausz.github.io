import { useEffect, useState } from "react";

import OtherBrands from "../otherBrands/otherBrands";
import TopBrands from "../topBrands/topBrands";
import NewBrands from "../NewBrands/NewBrands";
import AnotherBrands from "../AnotherBrands/AnotherBrands";

import ModalWindow from "../modalWindow/ModalWindow";
import { useTranslation } from "react-i18next";
import twemoji from "twemoji";
import TopBrandsOfYear from "../TopBrandsOfYear/TopBrandsOfYear";
import DoubleBrands from "../DoubleBrands/DoubleBrands";
import DoubleBrands2 from "../DoubleBrands2/DoubleBrands2";
import CountryBanner from "../CountryBanner/CountryBanner";

import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function ChildComponent() {
  const [ipData, setIpData] = useState(null);
  const [ipDataCode, setIpDataCode] = useState(null);
  const [newUrl, setNewUrl] = useState("");
  const [source, setSource] = useState("");

  const [selectedCountry, setSelectedCountry] = useState("");

  const { t, i18n } = useTranslation();

  const countryOptions = [
    { code: "au", name: "Australia", flag: "🇦🇺" },
    { code: "at", name: "Austria", flag: "🇦🇹" },
    { code: "be", name: "Belgium", flag: "🇧🇪" },
    { code: "bg", name: "Bulgaria", flag: "🇧🇬" },
    { code: "ca", name: "Canada", flag: "🇨🇦" },
    { code: "cz", name: "Czech", flag: "🇨🇿" },
    { code: "dk", name: "Denmark", flag: "🇩🇰" },
    { code: "fi", name: "Finland", flag: "🇫🇮" },
    { code: "fr", name: "France", flag: "🇫🇷" },
    { code: "de", name: "Germany", flag: "🇩🇪" },
    { code: "gr", name: "Greece", flag: "🇬🇷" },
    { code: "hu", name: "Hungary", flag: "🇭🇺" },
    { code: "ie", name: "Ireland", flag: "🇮🇪" },
    { code: "it", name: "Italy", flag: "🇮🇹" },
    { code: "nl", name: "Netherlands", flag: "🇳🇱" },
    { code: "nz", name: "New Zealand", flag: "🇳🇿" },
    { code: "no", name: "Norway", flag: "🇳🇴" },
    { code: "pl", name: "Poland", flag: "🇵🇱" },
    { code: "pt", name: "Portugal", flag: "🇵🇹" },
    { code: "sk", name: "Slovakia", flag: "🇸🇰" },
    { code: "es", name: "Spain", flag: "🇪🇸" },
    { code: "se", name: "Sweden", flag: "🇸🇪" },
    { code: "ch", name: "Switzerland", flag: "🇨🇭" },
    { code: "tr", name: "Turkey", flag: "🇹🇷" },
    { code: "gb", name: "United Kingdom", flag: "🇬🇧" },
    { code: "all", name: "World", flag: "🌍" },
  ];
  const countryOptions1043 = [
    { code: "all", name: "World", flag: "🌍" },
    { code: "ca", name: "Canada", flag: "🇨🇦" },
    { code: "us", name: "United States", flag: "🇺🇸" },
  ];
  const countryOptions1044 = [
    { code: "all", name: "World", flag: "🌍" },
    { code: "se", name: "Sweden", flag: "🇸🇪" },
    { code: "fi", name: "Finland", flag: "🇫🇮" },
  ];


  useEffect(() => {
    // Запрос к API с использованием fetch
    fetch(
      "https://ipapi.co/json/?key=YD0x5VtXrPJkOcFQMjEyQgqjfM6jUcwS4J54b3DI8ztyrFpHzW"
    )
      .then((response) => response.json())
      .then((data) => {
        setIpData(data.country_name);
        setIpDataCode(data.country);
        setSelectedCountry(data.country.toLowerCase());
      })
      .catch((error) => {
        console.error("Ошибка при запросе к API:", error);
      });
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    // Удаляем параметр 'brand', если он есть
    searchParams.delete("brand");

    // Получаем параметр 'keyword'
    const currentSource = searchParams.get("keyword");
    let sourceValue = "0"; // Значение по умолчанию для 'source'

    // Проверяем, содержит ли 'keyword' идентификатор партнера
    if (currentSource) {
      const match = currentSource.match(/partner(_)?\d+/);
      if (match) {
        sourceValue = match[0]; // Извлекаем идентификатор партнера
        setSource(sourceValue); // Обновляем состояние 'source' с найденным значением
      } else {
        setSource("0"); // Обновляем состояние 'source', если идентификатор партнера не найден
      }
    } else {
      setSource("0"); // Обновляем состояние 'source', если параметр 'keyword' отсутствует
    }

    // На этом этапе 'sourceValue' уже содержит корректное значение, поэтому устанавливаем его в параметры
    searchParams.set("source", sourceValue);

    // Устанавливаем параметр 'creative_id' с пустым значением
    searchParams.set("creative_id", "");

    // Формируем строку запроса
    const queryString = `?${searchParams.toString()}`;

    // Обновляем URL с новой строкой запроса
    setNewUrl(queryString);
  }, []);

  // Добавьте обработчик изменения selectedCountry
  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    // Сохранить в localStorage
    localStorage.setItem("selectedCountry", country);
  };

  return (
    <div>
      <AnotherBrands
        newUrl={newUrl}
        ipDataCode={ipDataCode}
        currentLanguage={i18n.language}
        source={source}
        selectedCountry={selectedCountry}
      />
      {source === "partner1043" && (
        <div className="select-brand container ">
          <p>{t("select")}</p>
          <select
            id="countrySelect"
            value={selectedCountry}
            // onChange={(e) => setSelectedCountry(e.target.value)}
            onChange={(e) => handleCountryChange(e.target.value)}
          >
            {countryOptions1043.map((country, index) => (
              <option
                key={index}
                value={country.code}
                selected={country.code === ipDataCode}
                class={country.code}
              >
                {country.flag} {country.name}
              </option>
            ))}
          </select>
        </div>
      )}
      {source === "partner1044" && (
        <div className="select-brand container">
          <p>{t("select")}</p>
          <select
            id="countrySelect"
            value={selectedCountry}
            // onChange={(e) => setSelectedCountry(e.target.value)}
            onChange={(e) => handleCountryChange(e.target.value)}
          >
            {countryOptions1044.map((country, index) => (
              <option
                key={index}
                value={country.code}
                selected={country.code === ipDataCode}
                class={country.code}
              >
                {country.flag} {country.name}
              </option>
            ))}
          </select>
        </div>
      )}
      {source !== "partner1044" && source !== "partner1043" && (
        // <div className="select-brand container">
        //   <p>{t("select")}</p>
        //   <select
        //     id="countrySelect"
        //     value={selectedCountry}
        //     // onChange={(e) => setSelectedCountry(e.target.value)}
        //     onChange={(e) => handleCountryChange(e.target.value)}
        //   >
        //     {countryOptions.map((country, index) => (
        //       <option
        //         key={index}
        //         value={country.code}
        //         selected={country.code === ipDataCode}
        //       >
        //         <div class={country.code}></div>
        //         {country.name}
        //       </option>
        //     ))}
        //   </select>
        // </div>

        <div className="select-brand container">
          <Box sx={{
            m: 1,
            minWidth: 300
          }}>
            <FormControl fullWidth>
              <InputLabel>{t("select")}</InputLabel>
              <Select
                id="countrySelect"
                value={selectedCountry}
                label={t("select")}
                onChange={(e) => handleCountryChange(e.target.value)}
              >
                {countryOptions.map((country, index) => (
                  <MenuItem
                    key={index}
                    value={country.code}
                    selected={country.code === ipDataCode}
                  >
                    <div class={country.code}></div>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div>
      )}



      <TopBrands
        newUrl={newUrl}
        ipDataCode={ipDataCode}
        currentLanguage={i18n.language}
        source={source}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />

      <OtherBrands
        newUrl={newUrl}
        ipData={ipData}
        ipDataCode={ipDataCode}
        currentLanguage={i18n.language}
        source={source}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />

      {/* 
   
      <NewBrands
        newUrl={newUrl}
        ipDataCode={ipDataCode}
        currentLanguage={i18n.language}
        source={source}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />

      */}
    </div>
  );
}

export default ChildComponent;
