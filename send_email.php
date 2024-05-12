<?php
if(!empty($_POST["send"])) {
	$name = $_POST["name"];
    $email = $_POST["email"];
    $company = $_POST["company"];
    $whatsapp = $_POST["whatsapp"];
	
    $toEmail = "krausz.st@gmail.com";
  
    $mailHeaders = "Name: " . $name .
	"\r\n Email: ". $email  . 
	"\r\n Company: ". $company  . 
	"\r\n WhatsApp: " . $whatsapp . "\r\n";


	mail($toEmail, $userName, $mailHeaders);

    echo"Message sent!"
}
?>