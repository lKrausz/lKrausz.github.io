/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'http://localhost:3000', // Замените на URL вашего сайта
    changefreq: 'daily', // Частота обновления (например, daily, weekly)
    priority: 0.7, // Приоритет (от 0 до 1)
    sitemapSize: 5000, // Максимальное количество URL в одном файле sitemap (опционально)
    generateRobotsTxt: true, // Создание robots.txt (опционально)
    // ...другие настройки
  };
  