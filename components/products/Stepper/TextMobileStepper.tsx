import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { PhoneNumberStep } from "@/components/products/PhoneNumberStep";
import { useQueryUser } from "@/queries";

interface TextMobileStepperProps {
  onConfirm: () => Promise<void>;
  item: object;
  setEmail: (email: string) => void;
  t: Function;
}

export const TextMobileStepper: React.FC<TextMobileStepperProps> = ({
  onConfirm,
  item,
  setEmail,
  t
}) => {
  const {
    data: user,
    loading: userLoading,
    error: userError,
    errorMessage: userErrorMessage,
    refetch: refetchUser,
  } = useQueryUser();
  const defaultStep = 0;
  const [step, setStep] = useState(defaultStep);

  const onChangeStep = (nextStep: number) => {
    setStep(nextStep);
  };

  const steps = [
    {
      label: t("Verify your phone number"),
      content: (
        <PhoneNumberStep
          step={step}
          onChangeStep={onChangeStep}
          onConfirm={onConfirm}
          user={user}
          product={item}
          setEmail={setEmail}
          t={t}
        />
      ),
    },
  ];
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
      {/* <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 50,
          pl: 2,
          bgcolor: "background.default",
        }}
      >
        <Typography>{steps[activeStep].label}</Typography>
      </Paper> */}
      <Box>{steps[activeStep].content}</Box>

      {/* <MobileStepper
        variant="text"
        steps={maxSteps}
        // position="static"
        activeStep={activeStep}
        // nextButton={
        //   <Button
        //     size="small"
        //     onClick={handleNext}
        //     disabled={activeStep === maxSteps - 1}
        //   >
        //     Next
        //     {theme.direction === "rtl" ? (
        //       <KeyboardArrowLeft />
        //     ) : (
        //       <KeyboardArrowRight />
        //     )}
        //   </Button>
        // }
        // backButton={
        //   <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
        //     {theme.direction === "rtl" ? (
        //       <KeyboardArrowRight />
        //     ) : (
        //       <KeyboardArrowLeft />
        //     )}
        //     Back
        //   </Button>
        // }
      /> */}
    </Box>
  );
};
