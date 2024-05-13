<?php

$name = $_POST["name"];
$email = $_POST["email"];
$company = $_POST["company"];
$whatsapp = $_POST["whatsapp"];
$role = $_POST["role"];

$subject = "Отправка формы - Контакт с сайта";
$toEmail = "krausz.st@gmail.com";


$mailHeaders = "From: Website Contact Form \r\n";
$mailHeaders .= "Reply-To: $email\r\n"; 
$mailHeaders .= "Content-Type: text/plain; charset=UTF-8\r\n";


$message = "Имя: $name\n";
$message .= "Role: $role\n";
$message .= "Email: $email\n";
$message .= "Компания: $company\n";
$message .= "WhatsApp: $whatsapp\n";


if (mail($toEmail, $subject, $message, $mailHeaders)) {
  echo "Email sent successfully!";
} else {
  $error = error_get_last();
  echo "Error sending email: " . $error['message'];
}

?>