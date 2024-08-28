import { useState } from "react";

type Response = {
  expiry: number;
  otp_id: string;
  status: string;
};

export const useMutationSendUserPhoneNumber = () => {
  const [data, setData] = useState<Response["otp_id"] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const mutation = async ({ phoneNumber }: { phoneNumber: string }) => {
    setData(null);
    setLoading(true);
    setError(false);
    setMessage("");

    try {
      const response = await fetch(
        "https://bonusnumber1.com/api/user/get_token.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            phoneNumber,
          }),
        }
      );
      if (!response.ok) throw new Error();
      const data: Response = await response.json();
      setData(data.otp_id);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(true);
      setMessage("Something wrong, try again!");
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
