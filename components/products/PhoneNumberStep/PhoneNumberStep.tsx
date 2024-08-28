import { Box, Button } from "@mui/material";
import { MuiTelInput, MuiTelInputCountry } from "mui-tel-input";
import { useState, useEffect } from "react";
import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";
import { OutlinedInput } from "@mui/material";

import { OTP } from "../OTP";
import type { User } from "@/interfaces/user";
import {
  useMutationSaveUserPhoneNumber,
  useMutationSendUserPhoneNumber,
} from "@/queries";
import Image from "next/image";
import { GiftIcon } from "@heroicons/react/20/solid";

type PhoneNumberStepProps = {
  step: number;
  onChangeStep: (nextStep: number) => void;
  onConfirm: () => Promise<void>;
  user: User | null;
  product: object;
  setEmail: (email: string) => void;
  t: Function;
};

const DEFAULT_OTP_LENGTH = 5;

type ConfirmOtpResponse = {
  status: "EXPIRED" | "APPROVED";
};

export const PhoneNumberStep = ({
  step,
  onChangeStep,
  onConfirm,
  user,
  product,
  setEmail,
  t,
}: PhoneNumberStepProps) => {
  const defaultCountry = (localStorage.getItem("country") ?? undefined) as
    | MuiTelInputCountry
    | undefined;

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [userData, setUserData] = useState(user);

  const onChangePhoneNumber = (nextPhoneNumber: string) => {
    setPhoneNumber(nextPhoneNumber);
  };

  const [
    saveUserPhoneNumber,
    { loading: saveUserPhoneNumberLoading, error: saveUserPhoneNumberError },
  ] = useMutationSaveUserPhoneNumber();

  const [
    sendUserPhoneNumber,
    {
      data: sendUserPhoneNumberData,

      loading: sendUserPhoneNumberLoading,
      error: sendUserPhoneNumberError,
    },
  ] = useMutationSendUserPhoneNumber();
  const isButtonContinueDisabled = otp.length < DEFAULT_OTP_LENGTH;
  const [showOtp, setShowOtp] = useState(true);
  const [showProduct, setShowProduct] = useState(true);
  const [showPhone, setShowPhone] = useState(false);
  const [otherContent, setOtherContent] = useState(false);
  const onConfirmOtp = async () => {
    if (!sendUserPhoneNumberData) return;
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
      // throw new Error("");
      if (user !== null) {
        const id = user.id;

        if (response.ok && data.status === "APPROVED") {
          await saveUserPhoneNumber({ userId: id, phoneNumber });
          setShowProduct(true);
          setShowPhone(false);
          // другой код
        } else {
          console.log("!!!!!!!!!!!!!!!!!!!!!!!", showProduct);
        }
      }
    } catch (e) {
      console.error("ERROR - onConfirmOtp:", e);
    }
  };

  const onReload = async () => {
    window.location.reload();
  };
  return (
    // <StyledDiv>
    //   {showProduct && (
    //     <Box className="flex flex-col items-center modal-final">
    //       {!otherContent ? (
    //         <>
    //           <Typography
    //             className="text-center mb-2"
    //             id="modal-modal-title"
    //             variant="h6"
    //             component="h2"
    //           >
    //             {t("Indicate the email address to which to send the card")}
    //           </Typography>

    //           <OutlinedInput
    //             placeholder={t("Email")}
    //             onChange={(e) => setEmail(e.target.value)}
    //           />

    //           <Button
    //             className="btn btn-primary mt-4"
    //             onClick={async () => {
    //               if (user !== null) {
    //                 await onConfirm();
    //                 setOtherContent(true);
    //               } else {
    //                 console.error("User is null");
    //               }
    //             }}
    //             variant="contained"
    //           >
    //             {t("Confirm")}
    //           </Button>

    //         </>
    //       ) : (
    //         <>
    //           <Typography
    //             className="text-center mb-2"
    //             id="modal-modal-title"
    //             variant="h6"
    //             component="h2"
    //           >
    //             {t("Your prepaid card request has been received. Our support team will contact you soon to finalize details. Check your inbox.")}
    //           </Typography>
    //           <Button
    //             className="btn btn-primary mt-4"
    //             onClick={async () => {
    //               onReload();
    //             }}
    //             variant="contained"
    //           >
    //             {t("Confirm")}
    //           </Button>
    //         </>
    //       )}
    //     </Box>
    //   )}

    // </StyledDiv>

    <div>
      {showProduct && (
        <Box className="flex flex-col items-center modal-final">
          {!otherContent ? (
            <>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-2">
                <GiftIcon
                  aria-hidden="true"
                  className="h-6 w-6 text-green-600"
                />
              </div>
              <label
                htmlFor="email"
                className="block text-lg text-center font-normal"
              >
                {t("Indicate the email address to which to send the card")}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder={t("Email")}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />

              <button
                type="button"
                onClick={async () => {
                  if (user !== null) {
                    await onConfirm();
                    setOtherContent(true);
                  } else {
                    console.error("User is null");
                  }
                }}
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {t("Confirm")}
              </button>
            </>
          ) : (
            <>
              <Typography
                className="text-center mb-2"
                id="modal-modal-title"
                variant="h6"
                component="h2"
              >
                {t(
                  "Your prepaid card request has been received. Our support team will contact you soon to finalize details. Check your inbox."
                )}
              </Typography>
              <button
                type="button"
                onClick={async () => {
                  onReload();
                }}
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {t("Confirm")}
              </button>
            </>
          )}
        </Box>
      )}
    </div>
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
  `
);
