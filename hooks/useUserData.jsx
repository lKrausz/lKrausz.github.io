// hooks/useUserData.js
import { useState, useEffect } from "react";

export const useUserData = (api, apiKey) => {
  const [user, setUser] = useState([]);
  const [coins, setCoins] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const idUserParam = urlParams.get("keyword");
        const res = await fetch(`${api}/user/read_one.php?id=${idUserParam}`);
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
        } else {
          console.error("Failed to fetch user data:", res.status);
        }
      } catch (error) {
        console.error("An error occurred while fetching user data:", error);
      }
    };

    const fetchCoins = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("x-api-key", apiKey);

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        const response = await fetch(
          "https://api.nowpayments.io/v1/merchant/coins",
          requestOptions
        );

        if (response.ok) {
          const result = await response.json();
          setCoins(result);
        } else {
          console.error("Failed to fetch coins data:", response.status);

          // setError(true);
        }
      } catch (error) {
        console.error("An error occurred while fetching coins data:", error);
        // setError(true);
      }
    };

    fetchUser();
    fetchCoins();
  }, [api, apiKey]);

  return { user, coins };
};
