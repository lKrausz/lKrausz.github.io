import { useState } from "react";

type Estimated = {
  amount_from: number;
  currency_from: string;
  currency_to: string;
  estimated_amount: string;
};

export const useQueryEstimated = (coin: string, amount: string) => {
  const [data, setData] = useState<Estimated["estimated_amount"] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getData = async () => {
    setLoading(true);
    setError(false);
    setErrorMessage(null);

    try {
      const response = await fetch(
        `https://bonusnumber1.com/api/payment/estimated.php?amount=${amount}&currency_from=usd&currency_to=${coin}`
      );
      if (!response.ok) throw new Error();
      const data: Estimated = await response.json();
      setData(data.estimated_amount);
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
