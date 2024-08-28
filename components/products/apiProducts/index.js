export const getProducts = async () => {
    try {
      // Добавляем `userId` в URL запроса
      const res = await fetch(`https://bonusnumber1.com/api/products/read.php`);
  
      if (res.ok) {
        const responseData = await res.json();
     
        return responseData; // Возвращаем данные пользователя
      } else {
        console.error("Failed to fetch data:", res.status);
        return null; // Возвращаем null в случае ошибки
      }
    } catch (error) {
      console.error("An error occurred:", error);
      return null; // Возвращаем null в случае ошибки
    }
  };
  