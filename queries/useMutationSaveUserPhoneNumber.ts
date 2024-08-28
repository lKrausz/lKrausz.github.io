import { useState } from "react";

import type { User } from "@/interfaces/user";

export const useMutationSaveUserPhoneNumber = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const mutation = async ({
    userId,
    phoneNumber,
  }: {
    userId: User["id"];
    phoneNumber: string;
  }) => {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch(
        `https://bonusnumber1.com/api/user/update_phone.php`,
        {
          method: "POST",
          body: JSON.stringify({
            id: userId,
            phone_number: phoneNumber,
          }),
        }
      );
      if (!response.ok) throw new Error();
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  };

  return [
    mutation,
    {
      loading,
      error,
    },
  ] as const;
};
