import { useState } from "react";

type Fee = {
  currency: string;
  fee: number;
};

const apiKey = "MG5SRC6-HFBMACK-MMSR9QW-1EST6QC";

export const useQueryFee = (coin: string, amount: string) => {
  const [data, setData] = useState<Fee["fee"] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getData = async () => {
    setLoading(true);
    setError(false);
    setErrorMessage(null);

    try {
      const response = await fetch(
        `https://api.nowpayments.io/v1/payout/fee?currency=${coin}&amount=${amount}`,
        {
          headers: {
            "x-api-key": apiKey,
          },
        }
      );
      if (!response.ok) throw new Error();
      const data: Fee = await response.json();
      setData(data.fee);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(true);
      setErrorMessage("Unexpected error, try again!");
    }
  };

  const reset = () => {
    setData(null);
  };

  return {
    data,
    loading,
    error,
    errorMessage,
    refetch: getData,
    reset,
  };
};
