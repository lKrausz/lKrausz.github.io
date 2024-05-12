
<?php

$name = $_POST["name"];
$email = $_POST["email"];
$company = $_POST["company"];
$whatsapp = $_POST["whatsapp"];

$subject = "Отправка формы - Контакт с сайта";

$mailHeaders = "From: Website Contact Form <your_website_email@example.com>\r\n";
$mailHeaders .= "Reply-To: $email\r\n"; 
$mailHeaders .= "Content-Type: text/plain; charset=UTF-8\r\n";


$message = "Имя: $name\n";
$message .= "Email: $email\n";
$message .= "Компания: $company\n";
$message .= "WhatsApp: $whatsapp\n";

if (mail($toEmail, $subject, $message, $mailHeaders)) {
  echo "Email sent successfully!";
} else {
  echo "Error sending email.";
}

?>