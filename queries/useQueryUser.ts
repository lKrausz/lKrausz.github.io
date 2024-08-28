import type { User } from "@/interfaces/user";
import { useEffect, useState } from "react";

const api = "https://bonusnumber1.com/api";

const getUserId = () => {
  return (
    localStorage.getItem("user_id") ??
    new URLSearchParams(window.location.search).get("keyword")
  );
};

export const useQueryUser = () => {
  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getData = async () => {
    setLoading(true);
    setError(false);
    setErrorMessage(null);

    const userId = getUserId();

    if (!userId) throw new Error();

    try {
      const response = await fetch(`${api}/user/read_one.php?id=${userId}`);
      if (!response.ok) throw new Error();
      const data: User = await response.json();
      setData(data);
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
