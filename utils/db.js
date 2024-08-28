// utils/db.js
import mysql from 'mysql2/promise';

const connection = mysql.createPool({
  host: 'ny509616.mysql.tools', // Адрес сервера базы данных
  user: 'ny509616_test', // Имя пользователя
  password: 'gN@M6;h7z7', // Пароль
  database: 'ny509616_test' // Имя базы данных
});

export default connection;
