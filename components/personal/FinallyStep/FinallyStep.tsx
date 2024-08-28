import { Box } from "@mui/material";
import { styled } from "@mui/system";
import Link from "next/link";
import Image from "next/image";

import { Brand } from "@/app/personal/page";
import UserBrands_tw from "@/components/UserBrands/UserBrands_tw";

type FinallyStepProps = {
  brands: Brand[];
};

export const FinallyStep = ({ brands }: FinallyStepProps) => {
  const savedUrl = localStorage.getItem("savedUrl");

  return (
    <StyledDiv>
      <Box>
        <div className="flex flex-wrap px-0 py-6">
          <UserBrands_tw />

        </div>
      </Box>
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
