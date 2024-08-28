import { useEffect, useState } from "react";

export type Coins = {
  selectedCurrencies: string[];
};

const apiKey = "MG5SRC6-HFBMACK-MMSR9QW-1EST6QC";

export const useQueryCoins = () => {
  const [data, setData] = useState<Coins["selectedCurrencies"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getData = async () => {
    setLoading(true);
    setError(false);
    setErrorMessage(null);

    try {
      const response = await fetch(
        "https://api.nowpayments.io/v1/merchant/coins",
        {
          headers: {
            "x-api-key": apiKey,
          },
        }
      );
      if (!response.ok) throw new Error();
      const data: Coins = await response.json();
      setData(data.selectedCurrencies);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(true);
      setErrorMessage("Unexpected error, try again!");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    data,
    loading,
    error,
    errorMessage,
    refetch: getData,
  };
};
