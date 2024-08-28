export const updateGeo = async (userId, country) => {
    const url = 'https://bonusnumber1.com/api/user/update_geo.php'; // Замените URL на ваш реальный эндпоинт
    const data = { id: userId, country: country };

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }


        const responseData = await response.json();
        console.log('ГЕО успешно обновлено:', responseData);
        
    } catch (error) {
        console.error('Ошибка при обновлении ГЕО:', error);
    }
}
