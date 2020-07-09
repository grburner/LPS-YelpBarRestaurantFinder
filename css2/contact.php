<?php
$Name=$_Post['Name'];
$visitor_email=$_Post['Email'];
$PhoneNumber=$_Post['PhoneNumber'];
$message= $_POST['Message'];

$email_form='Supersonicsproject1@gmail.com';

$email_subject="Contact Us Submission";

$email_body="User Name": $name.\n".
"User Email: $visitor_email.\n".
"User Message: $message.\n";

$to = "Supersonicsproject1@gmail.com";

$headers= "From: $email_form \r\n";

$headers. ="Reply-To: $visitor_email\r\n";

mail($to, $email_subject, $email_body,$headers);

header ("location: contact.html"); 