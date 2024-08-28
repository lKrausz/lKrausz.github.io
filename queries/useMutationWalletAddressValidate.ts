import { useState } from "react";

type WalletAddressValidate = {
  code: string;
  message: string;
  status: boolean;
  statusCode: number;
};

const apiKey = "MG5SRC6-HFBMACK-MMSR9QW-1EST6QC";
const url = "https://api.nowpayments.io/v1/payout/validate-address";

export const useMutationWalletAddressValidate = (
  coin: string,
  walletAddress: string
) => {
  const [data, setData] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const mutation = async () => {
    setLoading(true);
    setError(false);
    setMessage("");

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: walletAddress,
          currency: coin,
        }),
      });

      if (response.ok) {
        setData(true);
        setLoading(false);
        return true;
      }

      const data: WalletAddressValidate = await response.json();

      setData(data.status);
      setLoading(false);
      setMessage("Invalid payout address, try again!");
      return data.status;
    } catch (error) {
      setData(null);
      setLoading(false);
      setError(true);
      setMessage("Something wrong, try again!");
      return false;
    }
  };

  return [
    mutation,
    {
      data,
      loading,
      error,
      message,
    },
  ] as const;
};
