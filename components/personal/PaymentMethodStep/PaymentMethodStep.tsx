import { ChangeEvent, useState } from "react";

import Loader from "@/components/Loader";
import type { User } from "@/interfaces/user";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";

type PaymentMethodStepProps = {
  user: User;
  coins: string[];
  step: number;
  coin: string;
  amount: string;
  onChangeStep: (nextStep: number) => void;
  onChangeCoin: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeAmount: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  getFeeAndEstimatedAmount: () => Promise<void>;
};

const MIN_AMOUNT = 4;

const getHelperText = (
  amount: PaymentMethodStepProps["amount"],
  isLessThanFour: boolean,
  isMoreThanUserBalance: boolean,
  isError: boolean,
  t: TFunction
) => {
  if (!!amount && isLessThanFour)
    return t("Withdrawal rejected: Minimum withdrawal amount is 4 USD.");
  if (!!amount && isMoreThanUserBalance)
    return t("Not enough funds in the account.");
  if (isError) return t("Something wrong, try again!");
  return undefined;
};

export const PaymentMethodStep = ({
  user,
  coins,
  step,
  coin,
  amount,
  onChangeStep,
  onChangeCoin,
  onChangeAmount,
  getFeeAndEstimatedAmount,
}: PaymentMethodStepProps) => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const isLessThanFour = Number(amount) < MIN_AMOUNT;
  const isMoreThanUserBalance = Number(amount) > Number(user.balance);

  const isButtonNextStepDisabled =
    !amount || isLessThanFour || isMoreThanUserBalance;
  const error =
    (!!amount && (isLessThanFour || isMoreThanUserBalance)) || isError;
  const helperText = getHelperText(
    amount,
    isLessThanFour,
    isMoreThanUserBalance,
    isError,
    t
  );

  const isPayPal = coin === "PayPal";

  const getFeeAndEstimatedAmountAndThanGoToWalletAddressStep = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      if (!isPayPal) {
        await getFeeAndEstimatedAmount();
      }
      onChangeStep(step + 1);
      setIsLoading(false);
    } catch (e) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  return (


    <div>
      <div>
        <select
          value={coin}
          onChange={onChangeCoin}
          className={`mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6`}
        >
          {coins.map((coin) => (
            <option className={`${coin}`} key={coin} value={coin}>
              {coin}
            </option>
          ))}
          <option className="PayPal" key="paypal" value="PayPal">
            PayPal
          </option>
        </select>
      </div>
      <div>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            value={amount}
            type="number"
            placeholder={t("Sum")}
            aria-invalid="true"
            onChange={(e) => {
              setIsError(false);
              onChangeAmount(e);
            }}
            className={`${
              isError
                ? "text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-red-500 focus:ring-2 focus:ring-inset "
                : "text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-indigo-600 focus:ring-2 focus:ring-inset "
            } block w-full rounded-md border-0 py-1.5 pr-10 sm:text-sm sm:leading-6 `}
          />
        </div>
        <p id="number-error" className="mt-2 text-sm text-red-600">
          {error}
          {helperText}
        </p>
      </div>

      <div>
        <button
          onClick={
            !isButtonNextStepDisabled
              ? getFeeAndEstimatedAmountAndThanGoToWalletAddressStep
              : undefined
          }
          className={`btn-st${
            isButtonNextStepDisabled
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer hover:bg-or-hover "
          } rounded-md bg-or px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm`}
        >
          {t("Next step")}
        </button>
      </div>
      {isLoading && <Loader />}
    </div>
  );
};
