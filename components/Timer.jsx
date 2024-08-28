"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    // Check if there is a stored start date in Local Storage
    const storedStartDate = localStorage.getItem("startDate");
    let startDate;

    if (storedStartDate) {
      startDate = new Date(storedStartDate);
      const now = new Date();
      const timeDiff = now - startDate;

      // If 48 hours have passed, reset the start date
      if (timeDiff >= 48 * 60 * 60 * 1000) {
        startDate = new Date();
        localStorage.setItem("startDate", startDate);
      }
    } else {
      // If there is no stored start date, set a new one
      startDate = new Date();
      localStorage.setItem("startDate", startDate);
    }

    // Function to update the timer
    const updateTimer = () => {
      const now = new Date();
      const timeDiff = 48 * 60 * 60 * 1000 - (now - startDate);
      if (timeDiff <= 0) {
        setTimeLeft(null);
      } else {
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        setTimeLeft({
          hours: String(hours).padStart(2, "0"),
          minutes: String(minutes).padStart(2, "0"),
          seconds: String(seconds).padStart(2, "0"),
        });
      }
    };

    // Update the timer every second
    const timerInterval = setInterval(updateTimer, 1000);

    // Initial update of the timer
    updateTimer();

    // Cleanup interval on component unmount
    return () => clearInterval(timerInterval);
  }, []);

  if (timeLeft === null) {
    return <div>...</div>;
  }

  return (
    <div className="timer">
      <p>{t("Expires in:")}</p> {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
    </div>
  );
};

export default Timer;
