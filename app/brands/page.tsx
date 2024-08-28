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
import {
  Coins,
  useQueryCoins,
  useQueryEstimated,
  useQueryFee,
  useQueryUser,
} from "@/queries";
import {
  Box,
  SelectChangeEvent,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
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

  const [tab, setTab] = useState(3);






  
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

  const onChangeTab = (_e: React.SyntheticEvent, newTabIndex: number) => {
    setTab(newTabIndex);
  };

  const onChangeStep = (nextStep: number) => {
    setStep(nextStep);
  };

  const onChangeCoin = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextCoin = e.target.value;
    setCoin(nextCoin);
  };

  const onChangeAmount = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const nextAmount = e.target.value;
    setAmount(nextAmount);
  };

  const onChangeWalletAddress = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

  return (
    <div className="page-personal main__container pb-10">
      <Fetcher
        payload={[user, coins]}
        loading={userLoading || coinsLoading}
        loader={<Loader />}
        error={userError || coinsError}
        onReload={() => {
          refetchUser();
          refetchCoins();
        }}
        render={([user, coins]) => {
          const steps = getSteps(user, coins);

          return (
            <div className="tabsstep">
              <h2 className="title-balance">
                {t("Your balance:")} {user.balance}$
              </h2>
              <Box
                className="tab_field"
                sx={{
                  flexGrow: 1,
                  bgcolor: "background.paper",
                  display: "flex",
                  height: "100%",
                }}
              >
                <Tabs
                  value={tab}
                  onChange={onChangeTab}
                  tabs={{
                    labels: [
                      t("Withdrawal Request"),
                      t("Withdrawal History"),
                      t("Cards Shop"),
                      // t("Get $20"),
                    ],
                    content: [
                      <Stepper
                        key="withdrawalRequest"
                        activeStep={step}
                        orientation="vertical"
                        sx={{ width: "100%" }}
                        className="stepper"
                      >
                        {steps.map((step) => (
                          <Step key={step.label}>
                            <StepLabel>{step.label}</StepLabel>
                            <StepContent>
                              <Typography>{step.description}</Typography>
                              {step.content}
                            </StepContent>
                          </Step>
                        ))}
                      </Stepper>,
                      <PaymentHistory
                        key="withdrawalHistory"
                        statusPayment={user.status_payment}
                      />,
                      <Cards key="cardsShop" user={user} onFinish={onFinish} />,
                      <UserBrands key="brands" />,
                    ],
                  }}
                />
              </Box>
            </div>
          );
        }}
      />
    </div>
  );
}
