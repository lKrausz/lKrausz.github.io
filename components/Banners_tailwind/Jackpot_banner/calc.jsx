import React, { useState, useEffect } from "react";

const Counter = () => {
  const startAmount = 250000;
  const maxAmount = 375000;

  // Фиксированное время старта (например, сейчас)
  const fixedStartTime = Date.UTC(2024, 7, 4, 0, 0, 0);

  // Функция для генерации случайного числа от 5 до 25
  const getRandomIncrement = () => Math.floor(Math.random() * 21) + 5;

  // Функция для вычисления текущей суммы
  const calculateInitialAmount = () => {
    const now = Date.now();
    const differenceInMs = now - fixedStartTime;
    const differenceInSeconds = Math.floor(differenceInMs / 1000);

    let currentAmount = startAmount;

    // Генерация случайных приростов для каждой секунды
    for (let i = 0; i < differenceInSeconds; i++) {
      currentAmount += getRandomIncrement();
      if (currentAmount >= maxAmount) {
        currentAmount = startAmount;
      }
    }

    return currentAmount;
  };

  const [amount, setAmount] = useState(calculateInitialAmount());
  const [displayAmount, setDisplayAmount] = useState(amount);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAmount((prevAmount) => {
        let newAmount = prevAmount + getRandomIncrement();
        if (newAmount >= maxAmount) {
          newAmount = startAmount;
        }
        return newAmount;
      });
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setDisplayAmount((prevDisplayAmount) => {
        const step = (amount - prevDisplayAmount) / 10;
        let newDisplayAmount = prevDisplayAmount + step;
        if (
          (step > 0 && newDisplayAmount >= amount) ||
          (step < 0 && newDisplayAmount <= amount)
        ) {
          newDisplayAmount = amount;
          clearInterval(animationInterval);
        }
        return newDisplayAmount;
      });
    }, 50);

    return () => clearInterval(animationInterval);
  }, [amount]);

  return (
    <div>
      <h3>${Math.floor(displayAmount).toLocaleString()}</h3>
    </div>
  );
};

export default Counter;
