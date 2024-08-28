export async function sendData(withdrawalData) {
    try {
      const response = await fetch('https://bonusnumber1.com/api/user/pickbonus.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(withdrawalData),
      });
  
      if (!response.ok) throw new Error('Network response was not ok.');
  
      const responseData = await response.json();
      console.log(responseData);
      // Обработка данных ответа
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  }
  