// hooks/usePayment.js
import { useState } from 'react';

export const usePayment = (apiKey, user) => {
  const [errorWallet, setErrorWallet] = useState(false);
  const [loading, setLoading] = useState(false);
  const [minFee, setMinFee] = useState("");

  const validateAddress = async (selectedPaymentMethod, addressPayment) => {
    setLoading(true);
    try {
      const url = "https://api.nowpayments.io/v1/payout/validate-address";
      const myHeaders = new Headers();
      myHeaders.append("x-api-key", apiKey);
      myHeaders.append("Content-Type", "application/json");

      const data = {
        address: addressPayment,
        currency: selectedPaymentMethod,
      };

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(data),
        redirect: "follow",
      };

      const response = await fetch(url, requestOptions);
      setLoading(false);
      if (!response.ok) {
        setErrorWallet(true);
        return false; // Неудачная валидация
      }
      console.log("Adress validate")
      setErrorWallet(false);
      return true; // Удачная валидация
    } catch (error) {
      console.error("An error occurred during address validation:", error);
      setLoading(false);
      setErrorWallet(true);
      return false; // В случае ошибки
    }
  };



  const fetchFee = async (selectedPaymentMethod, withdrawalRequestValue) => {
    setLoading(true);
    try {
      if (withdrawalRequestValue !== undefined) {
        const myHeaders = new Headers();
        myHeaders.append("x-api-key", apiKey);

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        const response = await fetch(
          `https://api.nowpayments.io/v1/payout/fee?currency=${selectedPaymentMethod}&amount=${withdrawalRequestValue}`,
          requestOptions
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setMinFee(result);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { validateAddress, errorWallet, loading, minFee, fetchFee };
};


