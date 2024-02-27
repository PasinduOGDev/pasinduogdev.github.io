<?php

require "SMTP.php";
require "PHPMailer.php";
require "Exception.php";

use PHPMailer\PHPMailer\PHPMailer;

$name = $_POST["n"];
$mobile = $_POST["m"];
$email = $_POST["e"];
$subject = $_POST["s"];
$message = $_POST["msg"];

if (empty($name)) {
    echo "Name is required";
} else if (empty($mobile)) {
    echo "Mobile Number is required";
} else if (!preg_match("/07[0,1,2,4,5,6,7,8][0-9]/", $mobile)) {
    echo "Invalid Mobile Number";
} else if (empty($email)) {
    echo "Email is required";
} else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Invalid Email";
} else if (!preg_match("/[a-z,0-9]@gmail.com/", $email)) {
    echo "Invalid Email";
} else if (empty($subject)) {
    echo "Subject is required";
} else {

    $mail = new PHPMailer;
    $mail->IsSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'pasinduogdev@gmail.com';
    $mail->Password = 'dyeaajukxjpqrszc';
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;
    $mail->setFrom($email, $name);
    $mail->addReplyTo($email, $name);
    $mail->addAddress('pasinduogdev@gmail.com');
    $mail->isHTML(true);
    $mail->Subject = $subject;
    $bodyContent = "<h2>Subject: <b>$subject</b></h2>

    <p>Hi, I am Pasindu OG and This is 'pasinduog.dev'. I am writing to let you know that this website is now live.</p>

    <p><b>You have received an email from a customer at this point. Its contents are as follows:</b></p><br/>

    <span>Name: $name</span><br/>
    <span>Mobile: $mobile</span><br/>
    <span>Email: <b>$email</b></span>

    <p><h3>$message</h3></p>";

    $mail->Body    = $bodyContent;

    if ($mail->send()) {
        echo "success";
    } else {
        echo "Sending Failed";
    }

}

?>