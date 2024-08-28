export const updateUserStatusPayment = async (body: string) => {
  try {
    const res = await fetch(
      `https://bonusnumber1.com/api/user/update_payment.php`,
      {
        method: "POST", // Изменено на POST, убедитесь, что ваш PHP скрипт поддерживает этот метод
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }
    );

    if (res.ok) {
      const responseData = await res.json();
      console.log("Статус оплаты успешно обновлен:", responseData);
      return responseData; // Возвращаем обновленные данные пользователя
    } else {
      console.error("Не удалось обновить статус оплаты:", res.status);
      return null; // Возвращаем null в случае ошибки
    }
  } catch (error) {
    console.error("Произошла ошибка при обновлении статуса оплаты:", error);
    return null; // Возвращаем null в случае ошибки
  }
};
