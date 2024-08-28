import { Box, Button, Dialog } from "@mui/material";
import { styled } from "@mui/system";
import { MuiTelInput, MuiTelInputCountry } from "mui-tel-input";
import { useState } from "react";

import Loader from "@/components/Loader";
import type { User } from "@/interfaces/user";
import {
  useMutationSaveUserPhoneNumber,
  useMutationSendUserPhoneNumber,
} from "@/queries";
import { OTP } from "../OTP";
import { useTranslation } from "react-i18next";

type PhoneNumberStepProps = {
  user: User;
  step: number;
  phoneNumber: string;
  onChangeStep: (nextStep: number) => void;
  onChangePhoneNumber: (nextPhoneNumber: string) => void;
};

const DEFAULT_OTP_LENGTH = 5;
const DEFAULT_PHONE_NUMBER_LENGTH = 6;

type Status = {
  status: "EXPIRED" | "APPROVED";
};

type Message = {
  message: string;
};

type ConfirmOtpResponse = Status | Message;

const hasConfirmOtpResponseStatus = (
  response: ConfirmOtpResponse
): response is Status => "status" in response;

export const PhoneNumberStep = ({
  user,
  step,
  phoneNumber,
  onChangeStep,
  onChangePhoneNumber,
}: PhoneNumberStepProps) => {
  const { t } = useTranslation();

  const defaultCountry = (localStorage.getItem("country_phone") ??
    undefined) as MuiTelInputCountry | undefined;

  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpMessage, setOtpMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpen2, setIsDialogOpen2] = useState(false);

  const [
    saveUserPhoneNumber,
    {
      loading: isSaveUserPhoneNumberLoading,
      error: isEaveUserPhoneNumberError,
    },
  ] = useMutationSaveUserPhoneNumber();

  const [
    sendUserPhoneNumber,
    {
      data: sendUserPhoneNumberData,
      loading: isSendUserPhoneNumberLoading,
      error: isSendUserPhoneNumberError,
      message: sendUserPhoneNumberMessage,
    },
  ] = useMutationSendUserPhoneNumber();

  const onSendUserPhoneNumber = async (phoneNumber: string) => {
    setOtp("");
    setOtpMessage("");
    setIsDialogOpen(false);
    await sendUserPhoneNumber({ phoneNumber });
    setIsDialogOpen(true);
  };

  const onConfirmOtp = async () => {
    if (!sendUserPhoneNumberData) return;
    setIsLoading(true);
    setOtpMessage("");
    try {
      const response = await fetch(
        "https://bonusnumber1.com/api/user/send_code.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            otp_id: sendUserPhoneNumberData,
            otp_code: otp,
          }),
        }
      );

      const data: ConfirmOtpResponse = await response.json();

      if (hasConfirmOtpResponseStatus(data) && data.status === "APPROVED") {
        await saveUserPhoneNumber({ userId: user.id, phoneNumber });
        onCloseDialog();
        setIsLoading(false);
        setIsDialogOpen2(true);
        // onChangeStep(step + 1);
        return;
      }

      if (hasConfirmOtpResponseStatus(data) && data.status === "EXPIRED") {
        setOtpMessage(t("Your OTP expired"));
        setIsLoading(false);
        return;
      }

      if (!hasConfirmOtpResponseStatus(data)) {
        setOtpMessage(data.message);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
    } catch (e) {
      setOtpMessage(t("Something wrong, try again!"));
      setIsLoading(false);
    }
  };

  const onConfDial = async () => {
    setIsDialogOpen2(false);
    onChangeStep(step + 1);
  };

  const onCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const isButtonContinueDisabled = otp.length < DEFAULT_OTP_LENGTH;
  const isLoaderShown =
    isSendUserPhoneNumberLoading || isLoading || isSaveUserPhoneNumberLoading;
  const isButtonSendCodeDisabled =
    phoneNumber.length < DEFAULT_PHONE_NUMBER_LENGTH;

  return (


    <StyledDiv>
      <StyledBoxTel className="relative">
        <MuiTelInput
          className="input_phone"
          value={phoneNumber}
          onChange={onChangePhoneNumber}
          defaultCountry={defaultCountry}
          fullWidth
          helperText={sendUserPhoneNumberMessage}
          error={isSendUserPhoneNumberError}
        />
        <div>
          <button
            onClick={() => {
              !isButtonSendCodeDisabled
                ? onSendUserPhoneNumber(phoneNumber)
                : undefined;
            }}
            className={`btn-st${
              isButtonSendCodeDisabled
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer hover:bg-or-hover "
            } rounded-md bg-or px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm`}
          >
            {t("Send code")}
          </button>
        </div>
      </StyledBoxTel>

      <Dialog
        open={isDialogOpen && !isSendUserPhoneNumberError}
        onClose={onCloseDialog}
      >
        <StyledBox>
          <OTP
            length={DEFAULT_OTP_LENGTH}
            value={otp}
            onChange={setOtp}
            separator=""
          />
        </StyledBox>
        {otpMessage && <div>{otpMessage}</div>}
        <div>
          <button
            onClick={!isButtonContinueDisabled ? onConfirmOtp : undefined}
            className={`btn-st${
              isButtonContinueDisabled
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer hover:bg-indigo-100 "
            } rounded-md bg-or px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm`}
          >
            {t("Continue")}
          </button>
        </div>
      </Dialog>
      <Dialog open={isDialogOpen2} onClose={onConfDial} className="p-3">
        <div className="p-3">
          {t(
            "Thank you for verifying your phone number! Your VIP manager will call you within 10 minutes to share our exclusive offers. Stay tuned!"
          )}
        </div>
        <div className="p-3">
          <Button
            className="btn-primary"
            variant="contained"
            onClick={onConfDial}
          >
            {t("Continue")}
          </Button>
        </div>
      </Dialog>
      <div className="flex items-center">
        <button
          onClick={() => {
            onChangeStep(step - 1);
          }}
          className={`mr-10 cursor-pointer hover:bg-or-hover rounded-md bg-or px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm`}
        >
          {t("Prev step")}
        </button>
        <button
          onClick={() => {
            onChangeStep(step + 1);
          }}
          className={`mr-10 cursor-pointer hover:bg-or-hover rounded-md bg-or px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm`}
        >
          {t("Skip")}
        </button>
      </div>
      {isLoaderShown && <Loader />}
    </StyledDiv>
  );
};

const StyledDiv = styled("div")(
  () => `
    display: flex;
    flex-direction: column;
    gap: 16px;
  `
);

const StyledBoxTel = styled(Box)(
  () => `
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  `
);

const StyledButton = styled(Button)(
  () => `
    text-wrap: nowrap;
  `
);

const StyledBox = styled(Box)(
  () => `
    display: flex;
    justify-content: center;
    padding: 16px;
  `
);
