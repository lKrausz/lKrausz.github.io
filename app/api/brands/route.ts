import { NextResponse } from "next/server";

export async function GET(req: Request) {
    // URL API, откуда будут получаться данные
    const apiUrl = "https://bonusnumber1.com/api/brandsNew4/read.php";

    try {
        // Выполнение запроса к API
        const response = await fetch(apiUrl);

        // Проверка, успешно ли выполнен запрос
        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }

        // Преобразование ответа в JSON
        const currentBrands = await response.json();

        // Возврат данных в формате JSON через NextResponse
        return NextResponse.json(currentBrands);
    } catch (error) {
        // Обработка ошибок и возврат ошибки в ответе
        return NextResponse.json({ error });
    }
}
