"use client";

import { Fetcher } from "@/components/Fetcher";
import Loader from "@/components/Loader";
import { FinallyStep } from "@/components/personal/FinallyStep";
import { PaymentHistory } from "@/components/personal/PaymentHistory";
import { PaymentMethodStep } from "@/components/personal/PaymentMethodStep";
import { PhoneNumberStep } from "@/components/personal/PhoneNumberStep";
import { Tabs } from "@/components/personal/Tabs";
import { WalletAddressStep } from "@/components/personal/WalletAddressStep";
import Cards from "@/components/products/Cards";
import UserBrands from "@/components/UserBrands/UserBrands";
import type { User } from "@/interfaces/user";
import { CheckIcon } from "@heroicons/react/20/solid";
import {
  Coins,
  useQueryCoins,
  useQueryEstimated,
  useQueryFee,
  useQueryUser,
} from "@/queries";

import { ChangeEvent, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/components/switcher/LanguageContext";
import { getBrands } from "@/components/getBrands/getBrands";

export type Brand = {
  id_brand: string;
  CasinoBrand: string;
  GoBig: string;
  OurOfferContent: string;
};

const DEFAULT_COIN = "USDTTRC20";
const DEFAULT_STEP = 0;
const BRAND_CATEGORIES = { key1: "Segment2", key2: "Premium" };

export default function Personal() {
  const { t } = useTranslation();
  const { language } = useLanguage();

  const [currentTab, setCurrentTab] = useState(2);
  const {
    data: user,
    loading: userLoading,
    error: userError,
    errorMessage: userErrorMessage,
    refetch: refetchUser,
  } = useQueryUser();

  const {
    data: coins,
    loading: coinsLoading,
    error: coinsError,
    errorMessage: coinsErrorMessage,
    refetch: refetchCoins,
  } = useQueryCoins();

  const [tab, setTab] = useState(2);
  
  const [step, setStep] = useState(DEFAULT_STEP);
  const [coin, setCoin] = useState(DEFAULT_COIN);
  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [brands, setBrands] = useState<Brand[]>([]);

  const fetchBrands = async () => {
    const brandsData: Brand[] = await getBrands(BRAND_CATEGORIES, language);
    setBrands(brandsData);
  };

  const onChangeStep = (nextStep: number) => {
    setStep(nextStep);
  };

  const onChangeCoin = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextCoin = e.target.value;
    setCoin(nextCoin);
  };

  const onChangeAmount = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const nextAmount = e.target.value;
    setAmount(nextAmount);
  };

  const onChangeWalletAddress = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const nextWalletAddress = e.target.value;
    setWalletAddress(nextWalletAddress);
  };

  const onChangePhoneNumber = (nextPhoneNumber: string) => {
    setPhoneNumber(nextPhoneNumber);
  };

  const {
    data: fee,
    loading: feeLoading,
    error: feeError,
    errorMessage: feeErrorMessage,
    refetch: refetchFee,
    reset: resetFee,
  } = useQueryFee(coin, amount);

  const {
    data: estimatedAmount,
    loading: estimatedAmountLoading,
    error: estimatedAmountError,
    errorMessage: estimatedAmountErrorMessage,
    refetch: refetchEstimatedAmount,
    reset: resetEstimatedAmount,
  } = useQueryEstimated(coin, amount);

  const getFeeAndEstimatedAmount = async () => {
    await refetchFee();
    await refetchEstimatedAmount();
  };

  const onFinish = async () => {
    await refetchUser();
    setStep(DEFAULT_STEP);
    setCoin(DEFAULT_COIN);
    setAmount("");
    setWalletAddress("");
    setPhoneNumber("");
    resetFee();
    resetEstimatedAmount();
  };

  const getWalletAddressStepDescription = () => {
    const isPayPal = coin === "PayPal";

    if (!fee || !estimatedAmount || isPayPal) return;

    const receive = Number(estimatedAmount) - fee;

    return `${t("Fee:")} ${fee} ${coin}, ${t(
      "You will receive on balance:"
    )} ${receive} ${coin}`;
  };

  const getSteps = (user: User, coins: Coins["selectedCurrencies"]) => {
    const initialSteps = [
      {
        label: t("Payment Method"),
        description: t(
          "Select one of the withdrawal methods and enter the withdrawal amount"
        ),
        content: (
          <PaymentMethodStep
            user={user}
            coins={coins}
            step={step}
            coin={coin}
            amount={amount}
            onChangeStep={onChangeStep}
            onChangeCoin={onChangeCoin}
            onChangeAmount={onChangeAmount}
            getFeeAndEstimatedAmount={getFeeAndEstimatedAmount}
          />
        ),
      },
      {
        label:
          coin === "PayPal"
            ? `${t("Email")} ${t("Address")}`
            : t("Wallet address"),
        description: getWalletAddressStepDescription(),
        content: (
          <WalletAddressStep
            user={user}
            step={step}
            coin={coin}
            walletAddress={walletAddress}
            amount={amount}
            estimatedAmount={estimatedAmount}
            onChangeStep={onChangeStep}
            onChangeWalletAddress={onChangeWalletAddress}
            fetchBrands={fetchBrands}
            onFinish={onFinish}
          />
        ),
      },
      {
        label: t("Final Step"),
        description: t(
          "Congratulations, you have successfully requested a withdrawal, in order for them to be credited to your wallet you will need to make a deposit with one of our brands"
        ),
        content: <FinallyStep brands={brands} />,
      },
    ];

    if (!user.phone_number) {
      initialSteps.splice(1, 0, {
        label: t("Phone Number"),
        description: t(
          "To create a transfer, we need to verify your phone number"
        ),
        content: (
          <PhoneNumberStep
            user={user}
            step={step}
            phoneNumber={phoneNumber}
            onChangeStep={onChangeStep}
            onChangePhoneNumber={onChangePhoneNumber}
          />
        ),
      });
    }

    return initialSteps;
  };

  function renderStepper() {
    if (!user || !coins) {
      return <Loader />;
    }

    const steps = getSteps(user, coins);

    return (

      <nav aria-label="Progress" className="flex flex-col space-y-4 py-5">
        <ol role="list" className="overflow-hidden">
          {steps.map((item, index) => (
            <li
              key={index}
              className={`relative ${
                index !== steps.length - 1 ? "pb-10" : ""
              }`}
            >
              {index < step ? (
                // Завершенные шаги
                <>
                  {index !== steps.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 "
                    />
                  )}
                  <div className="group relative flex items-center">
                    <span className="flex h-9 items-center">
                      <span className="relative flex h-8 w-8 items-center justify-center rounded-full ">
                        <CheckIcon
                          aria-hidden="true"
                          className="h-5 w-5 text-white"
                        />
                      </span>
                    </span>
                    <span className="ml-4 flex min-w-0 flex-col">
                      <span className="text-sm font-medium">{item.label}</span>
                    </span>
                  </div>
                </>
              ) : index === step ? (
                // Текущий шаг
                <>
                  {index !== steps.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300"
                    />
                  )}
                  <div className="group relative flex items-start">
                    <span className="flex h-9 items-center">
                      <span className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-solid border-or bg-white">
                        <span className="h-2.5 w-2.5 rounded-full bg-or" />
                      </span>
                    </span>
                    <span className="ml-4 flex min-w-0 flex-col">
                      <span className="text-sm font-medium text-or">
                        {item.label}
                      </span>
                      <span className="text-sm text-gray-500">
                        {item.description}
                      </span>
                    </span>
                  </div>
                  <div className="mt-4 px-10">{item.content}</div>
                </>
              ) : (
                // Будущие шаги
                <>
                  {index !== steps.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300"
                    />
                  )}
                  <div className="group relative flex items-center">
                    <span className="flex h-9 items-center">
                      <span className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-solid border-gray-300 bg-white">
                        <span className="h-2.5 w-2.5 rounded-full bg-transparent " />
                      </span>
                    </span>
                    <span className="ml-4 flex min-w-0 flex-col">
                      <span className="text-sm font-medium text-gray-500">
                        {item.label}
                      </span>
                    </span>
                  </div>
                </>
              )}
            </li>
          ))}
        </ol>
      </nav>
    );
  }

  const tabs = [
    { name: t("Withdrawal Request"), content: renderStepper() },
    {
      name: t("Withdrawal History"),
      content: (
        <PaymentHistory
          key="withdrawalHistory"
          statusPayment={user ? user.status_payment : "null"}
        />
      ),
    },
    {
      name: t("Cards Shop"),
      content: <Cards key="cardShop" user={user} onFinish={onFinish} />,
    },
  ];


  return (
    <div className="page-personal main__container pb-10 !my-10">
      <Fetcher
        payload={[user, coins]}
        loading={userLoading || coinsLoading}
        loader={<Loader />}
        error={userError || coinsError}
        onReload={() => {
          refetchUser();
          refetchCoins();
        }}
        // render={([user, coins]) => {
        //   const steps = getSteps(user, coins);

        //   return (
        //     <div className="tabsstep">
        //       <h2 className="title-balance">
        //         {t("Your balance:")} {user.balance}$
        //       </h2>
        //       <Box
        //         className="tab_field"
        //         sx={{
        //           flexGrow: 1,
        //           bgcolor: "background.paper",
        //           display: "flex",
        //           height: "100%",
        //         }}
        //       >
        //         <Tabs
        //           value={tab}
        //           onChange={onChangeTab}
        //           tabs={{
        //             labels: [
        //               t("Withdrawal Request"),
        //               t("Withdrawal History"),
        //               t("Cards Shop"),
        //               // t("Get $20"),
        //             ],
        //             content: [
        //               <Stepper
        //                 key="withdrawalRequest"
        //                 activeStep={step}
        //                 orientation="vertical"
        //                 sx={{ width: "100%" }}
        //                 className="stepper"
        //               >
        //                 {steps.map((step) => (
        //                   <Step key={step.label}>
        //                     <StepLabel>{step.label}</StepLabel>
        //                     <StepContent>
        //                       <Typography>{step.description}</Typography>
        //                       {step.content}
        //                     </StepContent>
        //                   </Step>
        //                 ))}
        //               </Stepper>,
        //               <PaymentHistory
        //                 key="withdrawalHistory"
        //                 statusPayment={user.status_payment}
        //               />,
        //               <Cards key="cardsShop" user={user} onFinish={onFinish} />,
        //               <UserBrands key="brands" />,
        //             ],
        //           }}
        //         />
        //       </Box>
        //     </div>
        //   );
        // }}
        render={([user, coins]) => {
          return (
            <div className="overflow-hidden">
              <div className="flex flex-col sm:flex-row">
                <div className="basis-1/4 tab-pers">
                 
                  <div className="">
                    <nav
                      aria-label="Tabs"
                      className="isolate flex sm:flex-col divide-x tab-persmini"
                    >
                      {tabs.map((tab, tabIdx) => (
                        <button
                          key={tab.name}
                          onClick={() => setCurrentTab(tabIdx)}
                          className={`py-2 border-b-4 transition-colors duration-300 text-left px-4 text-white ${
                            tabIdx === currentTab
                              ? "active-bg font-bold "
                              : "border-transparent hover:border-gray-200"
                          }`}
                        >
                          <span>{tab.name}</span>
                        </button>
                      ))}
                    </nav>
                  </div>
                  <div className="px-4 py-2 text-white pers-balance">
                    {t("Your balance:")} <span>{user.balance}$</span>
                  </div>
                </div>
                <div className="basis-3/4 sm:ml-5 rounded-lg bg-white shadow content-pers">
                  {/* Show active tab content. */}
                  <div className=" mx-5">
                    <h4 className="mt-5">{tabs[currentTab].name}</h4>
                    {tabs[currentTab].content}
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}
