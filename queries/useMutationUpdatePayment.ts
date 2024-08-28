import { useState } from "react";

import type { User } from "@/interfaces/user";

type Response = {
  message: string;
};

export const useMutationUpdatePayment = (
  userId: User["id"],
  coin: string,
  estimatedAmount: string | null,
  walletAddress: string,
  amount: string
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const mutation = async () => {
    setLoading(true);
    setError(false);
    setMessage("");

    const body = JSON.stringify({
      id: userId,
      status_payment: JSON.stringify({
        status: "Waiting",
        timestamp: new Date().toISOString(),
        paymentMethod: coin,
        paymentSumIn: estimatedAmount,
        paymentAddress: walletAddress,
        USD: amount,
      }),
      sumMinus: amount,
    });

    try {
      const response = await fetch(
        `https://bonusnumber1.com/api/user/update_payment.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body,
        }
      );

      if (!response.ok) {
        const data: Response = await response.json();
        setLoading(false);
        setError(true);
        setMessage(data.message);
        return false;
      }

      setLoading(false);
      return true;
    } catch (e) {
      setLoading(false);
      setError(true);
      setMessage("Something wrong, try again!");
      return false;
    }
  };

  return [
    mutation,
    {
      loading,
      error,
      message,
    },
  ] as const;
};
