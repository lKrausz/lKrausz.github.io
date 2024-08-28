const transferSpinsToTickets = async (userData) => {
  // Функция теперь принимает userData как аргумент
  if (!userData || !userData.id || userData.spins_waiting === undefined) return;

  try {
    const response = await fetch(
      "https://bonusnumber1.com/api/user/transfer_spins.php",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userData.id,
          tickets: userData.spins_waiting,
        }),
      }
    );

    if (!response.ok) throw new Error("Network response was not ok.");

    const result = await response.json();
    console.log(result.message); 
  } catch (error) {
    console.error("Ошибка при передаче spins_waiting в tickets:", error);
  }
};

export default transferSpinsToTickets;
