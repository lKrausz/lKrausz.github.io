"use client";
import React, { useState, useEffect } from "react";

import { useUserData } from "@/hooks/useUserData";
import { usePayment } from "@/hooks/usePayment";
import { getUserData } from "@/components/getUser/getUser";
import { updateUserStatusPayment } from "@/components/getUser/pushPayment";

import PaymentMethodSelect from "@/components/Withdrawal/PaymentMethodSelect";
import ConfirmPayoutModal from "@/components/Withdrawal/ConfirmPayoutModal";
import Phone from "@/components/phone/Phone";
import { useTranslation } from "react-i18next";

export default function Withdrawal() {
  const api = "https://bonusnumber1.com/api";
  const apiKey = "MG5SRC6-HFBMACK-MMSR9QW-1EST6QC";
  const { user, coins } = useUserData(api, apiKey);

  const { validateAddress, errorWallet, loading, minFee, fetchFee } =
    usePayment(apiKey, user);

  const [paymentData, setPaymentData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem("user_id");
      if (!userId) {
        console.log("User ID not found in localStorage", userId);
        return;
      }

      try {
        const user = await getUserData(userId);
        if (!user) {
          console.log("User data not found for ID:", userId);
        } else {
          setPaymentData(user);
          console.log("USERUSER", user);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  console.log("DAtA", paymentData);

  const { t } = useTranslation();

  const [addressPayment, setAddressPayment] = useState("");

  const handleMenuItemClick = async (menuItem) => {
    setLoading(true);
    setSelectedMenuItem(menuItem);
    await new Promise((resolve) => setTimeout(resolve, 500)); // Ждем 500 миллисекунд
    setLoading(false);
  };

  const [withdrawalRequestValue, setWithdrawalRequestValue] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("USDTTRC20");
  const [minimumAmount, setMinimumAmount] = useState();

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
    // setErrorWallet(false);
  };

  useEffect(() => {
    handleEstimatedRequest(withdrawalRequestValue); // Используйте текущее значение withdrawalRequestValue
  }, [selectedPaymentMethod, withdrawalRequestValue]);

  const [estimated, setEstimated] = useState([]);

  ///////////////////////КОНВЕРТАЦИЯ//////////////////////
  const handleEstimatedRequest = async () => {
    try {
      // Значения переменных
      const currency_from = "usd"; // Замените на соответствующую валюту отправления
      const currency_to = selectedPaymentMethod; // Замените на соответствующую валюту получения
      const amount = withdrawalRequestValue; // Используем актуальное значение withdrawalRequestValue

      // Формируем URL с параметрами
      const url = `https://bonusnumber1.com/api/payment/estimated.php?amount=${amount}&currency_from=${currency_from}&currency_to=${currency_to}`;

      const response = await fetch(url);

      if (response.ok) {
        const result = await response.json();
        // Обработка успешного ответа
        console.log(result);
        setEstimated(result);
      } else {
        // Обработка ошибки
        console.error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      // Обработка ошибок в случае неудачи запроса
      console.error("An error occurred during the request:", error);
    }
  };
  //////////////////////////////////////////////

  //МИНИМАЛЬНЫЙ ВЫВОД //
  useEffect(() => {
    const getMinAmount = async () => {
      try {
        const response = await fetch(
          `https://bonusnumber1.com/api/payment/minamount.php?currency=${selectedPaymentMethod}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setMinimumAmount(result);
        console.log("======", result);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    getMinAmount();
  }, [selectedPaymentMethod]);

  ////////////////////////////////////

  const [modalPayout, setModalPayout] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [errorMin, setErrorMin] = useState(true);

  const modalPay = async () => {
    handleEstimatedRequest();
    await fetchFee(selectedPaymentMethod, withdrawalRequestValue);
    setModalPayout(!modalPayout);
  };

  const [errorMessage, setErrorMessage] = useState("");

  const handleAmountChange = (e) => {
    const enteredValue = parseFloat(e.target.value.trim()); // Убираем пробелы в начале и в конце

    setWithdrawalRequestValue(e.target.value);

    if (isNaN(enteredValue) || enteredValue < 1) {
      setErrorMin(true);
      setErrorMessage(
        t("Withdrawal rejected: Minimum withdrawal amount is 1 USD.")
      );
    } else if (enteredValue > user.balance) {
      setErrorMin(true);
      setErrorMessage(t("Not enough funds in the account."));
    } else {
      setErrorMin(false);
      setErrorMessage("");
    }
  };

  const onConfirmPayout = async () => {
    const isValidAddress = await validateAddress(
      selectedPaymentMethod,
      addressPayment
    );
    if (!isValidAddress) {
      console.error("Address validation failed.");
      // Тут можно обновить состояние, чтобы показать ошибку валидации пользователю
      return;
    }

    const userId = paymentData.id;
    console.log("user", user);

    const timestamp = new Date().toISOString();

    // Добавляем временную метку к статусу оплаты
    const newStatusPaymentObject = {
      status: "Waiting",
      timestamp,
      paymentMethod: selectedPaymentMethod,
      paymentSumIn: estimated.estimated_amount,
      paymentAddress: addressPayment,
      USD: withdrawalRequestValue,
    };

    const newStatusPayment = JSON.stringify(newStatusPaymentObject);

    try {
      const updateResult = await updateUserStatusPayment(
        userId,
        newStatusPayment,
        withdrawalRequestValue
      );
      if (!updateResult) {
        console.error("Failed to update payment status.");

        return;
      } else {
        console.log("PAYMENT STATUS UPDATED");
      }

      setModalPayout(false);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const [otpId, setOtpId] = useState();
  const [status, setStauts] = useState()
  const sendSms = () => {
    fetch("https://api.d7networks.com/verify/v1/otp/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoLWJhY2tlbmQ6YXBwIiwic3ViIjoiMTYwZmQ2NWYtYTJlNC00YjdjLWE0ZTMtOWVhMTc0OTAxNzIxIn0.xtUqJP6RYJpg7zZ68EY2TKyz4JVkgqoP7w3TRR444qc",
      },
      body: JSON.stringify({
        originator: "YourSenderName",
        recipient: "+48889589420",
        content: "Your OTP code is: {}",
        expiry: 300,
        data_coding: "auto",
        retry_delay: 60,
        retry_count: 3,
        otp_code_length: 5,
        otp_type: "numeric",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOtpId(data.otp_id); // Сохраняем otp_id из ответа в состояние
      })
      .catch((error) => console.error("Error:", error));
  };
  const verifyOtp = (otpId, otpCode) => {
    fetch("https://api.d7networks.com/verify/v1/otp/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoLWJhY2tlbmQ6YXBwIiwic3ViIjoiMTYwZmQ2NWYtYTJlNC00YjdjLWE0ZTMtOWVhMTc0OTAxNzIxIn0.xtUqJP6RYJpg7zZ68EY2TKyz4JVkgqoP7w3TRR444qc",
      },
      body: JSON.stringify({
        otp_id: otpId,
        otp_code: "07747",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setStauts(data); // Сохраняем otp_id из ответа в состояние
      })
      .catch((error) => console.error("Verification Error:", error));
  };
  const [userOtp, setUserOtp] = useState("");

  const handleOtpChange = (e) => {
    setUserOtp(e.target.value);
  };

  return (
    <div className="withdrawal">
      <div className="top-block">
        <h2>{"Withdrawal"}</h2>
      </div>
      
      <button onClick={sendSms}>SMS</button>
      <input type="text" value={userOtp} onChange={handleOtpChange} />

      <button onClick={() => verifyOtp(otpId, userOtp)}>Verify OTP</button>
      <input type="text" />
      <div className="ui-methods">
        <div className="container flex">
          <div className="menu">
            <div
              className={`menu-item active`}
              onClick={() => handleMenuItemClick("withdrawal/")}
            >
              {"Withdrawal Request"}
            </div>
          </div>
          <div className="menu-info">
            <div className="flex menu-content">
              <h4>{"Withdrawal Requests"}</h4>
              <div className="all-balance">
                <p>
                  <span>{user.login}</span> {"your current balance is:"}
                </p>
                {Object.keys(user).length > 0 && (
                  <div className="balance">
                    <span>{user.balance} USD</span>
                  </div>
                )}
              </div>
              <div className="withdrawal-form">
                <div className="column">
                  <label htmlFor="method">{"Select Payment Method"}</label>

                  {coins && (
                    <PaymentMethodSelect
                      coins={coins}
                      selectedPaymentMethod={selectedPaymentMethod}
                      handlePaymentMethodChange={handlePaymentMethodChange}
                    />
                  )}
                </div>
                {selectedPaymentMethod && (
                  <div className="column">
                    <label htmlFor="amount">{"Amount"} USD</label>
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      placeholder="0"
                      required=""
                      value={withdrawalRequestValue}
                      onChange={(e) => {
                        handleAmountChange(e);
                      }}
                      className={errorMin ? "error" : ""}
                    />
                    {errorMin && (
                      <span className="mesSpan error-span">{errorMessage}</span>
                    )}
                  </div>
                )}

                <button
                  className="btn btn-primary"
                  onClick={modalPay}
                  disabled={errorMin}
                >
                  {"Payout"}
                </button>

                {modalPayout && (
                  <div className="overflow">
                    <ConfirmPayoutModal
                      isOpen={modalPayout}
                      onClose={() => setModalPayout(false)}
                      onConfirm={onConfirmPayout}
                      minFee={minFee}
                      estimated={estimated}
                      t={t}
                      selectedPaymentMethod={selectedPaymentMethod}
                      errorWallet={errorWallet}
                      addressPayment={addressPayment}
                      onAddressChange={setAddressPayment}
                    />
                  </div>
                )}
                {modalError && (
                  <div className="overflow">
                    <div className="modal modal-success">
                      {/* {loading && <LoaderMini />} */}
                      <h3>{errorMin}</h3>
                      <button
                        className="btn btn-primary"
                        onClick={() => setModalError(!modalError)}
                      >
                        OK
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
