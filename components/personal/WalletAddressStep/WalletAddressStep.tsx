import Loader from "@/components/Loader";
import type { User } from "@/interfaces/user";
import {
  useMutationUpdatePayment,
  useMutationWalletAddressValidate,
} from "@/queries";
import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

type WalletAddressStepProps = {
  user: User;
  step: number;
  coin: string;
  walletAddress: string;
  amount: string;
  estimatedAmount: string | null;
  onChangeStep: (nextStep: number) => void;
  onChangeWalletAddress: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  fetchBrands: () => Promise<void>;
  onFinish: () => Promise<void>;
};

export const WalletAddressStep = ({
  user,
  step,
  coin,
  walletAddress,
  amount,
  estimatedAmount,
  onChangeStep,
  onChangeWalletAddress,
  fetchBrands,
  onFinish,
}: WalletAddressStepProps) => {
  const { t } = useTranslation();

  const [
    walletAddressValidate,
    {
      data: isWalletAddressValid,
      loading: isWalletAddressValidateLoading,
      error: isWalletAddressValidateError,
      message: walletAddressValidateMessage,
    },
  ] = useMutationWalletAddressValidate(coin, walletAddress);

  const [
    updatePayment,
    {
      loading: isUpdatePaymentLoading,
      error: isUpdatePaymentError,
      message: updatePaymentMessage,
    },
  ] = useMutationUpdatePayment(
    user.id,
    coin,
    estimatedAmount,
    walletAddress,
    amount
  );

  const updatePaymentWithValidate = async () => {
    const response = await walletAddressValidate();
    if (!response) return;
    const isUpdated = await updatePayment();
    if (!isUpdated) return;
    await onFinish();
    await fetchBrands();
    onChangeStep(step + 1);
  };

  const updatePaymentWithoutValidate = async () => {
    const isUpdated = await updatePayment();
    if (!isUpdated) return;
    await onFinish();
    await fetchBrands();
    onChangeStep(step + 1);
  };

  const isButtonNextStepDisabled = !walletAddress;
  const isError =
    (isWalletAddressValid !== null && !isWalletAddressValid) ||
    isWalletAddressValidateError ||
    isUpdatePaymentError;
  const isLoaderShown =
    isWalletAddressValidateLoading || isUpdatePaymentLoading;
  const isPayPal = coin === "PayPal";

  return (
    // <StyledDiv>
    //   <TextField
    //     className="input_address"
    //     value={walletAddress}
    //     onChange={onChangeWalletAddress}
    //     error={isError}
    //     helperText={walletAddressValidateMessage ?? updatePaymentMessage}
    //     fullWidth
    //   />
    //   {isPayPal && (
    //     <span className="paypalnote">
    //       {t(
    //         "Please note: PayPal withdrawals are processed every day from 7 AM to 8 PM CET"
    //       )}
    //     </span>
    //   )}
    //   <Box>
    //     <Button
    //       className="btn-primary w-48 !mr-2"
    //       variant="contained"
    //       onClick={() => {
    //         onChangeStep(step - 1);
    //       }}
    //     >
    //       {t("Prev step")}
    //     </Button>
    //     <Button
    //       className="btn-primary w-48"
    //       variant="contained"
    //       onClick={
    //         isPayPal ? updatePaymentWithoutValidate : updatePaymentWithValidate
    //       }
    //       disabled={isButtonNextStepDisabled}
    //     >
    //       {t("Next step")}
    //     </Button>
    //   </Box>

    //   {isLoaderShown && <Loader />}
    // </StyledDiv>

    <div>
      <div>
        <div className="mt-2">
          <input
            onChange={onChangeWalletAddress}
            type="text"
            value={walletAddress}
            className="mb-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {walletAddressValidateMessage ?? updatePaymentMessage}
        </div>
      </div>
      {isPayPal && (
        <span className="!text-gray-500 text-sm">
          {t(
            "Please note: PayPal withdrawals are processed every day from 7 AM to 8 PM CET"
          )}
        </span>
      )}
      <div>
        <button
          onClick={() => {
            onChangeStep(step - 1);
          }}
          className={`mr-10 mt-2 rounded-md bg-or px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm`}
        >
          {t("Prev step")}
        </button>
        <button
          onClick={
            !isButtonNextStepDisabled
              ? isPayPal
                ? updatePaymentWithoutValidate
                : updatePaymentWithValidate
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

      {isLoaderShown && <Loader />}
    </div>
  );
};
