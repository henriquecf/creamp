<?php

// define constants
define("RECIPIENT_NAME", "Your Name");
define("RECIPIENT_EMAIL", "youremail@domain.com");
define("EMAIL_SUBJECT", "Visitor Message");

// read form values
$send = false;
$name = isset($_POST['name']) ? preg_replace("/[^\.\-\' a-zA-Z0-9]/", "", $_POST['name']) : "";
$email = isset($_POST['email']) ? preg_replace("/[^\.\-\_\@a-zA-Z0-9]/", "", $_POST['email']) : "";
$message = isset($_POST['message']) ? preg_replace("/(From:|To:|BCC:|CC:|Subject:|Content-Type:)/", "", $_POST['message']) : "";

// check availability of values, then send mail
if ($name && $email && $message) {
	$recipient = RECIPIENT_NAME . " <" . RECIPIENT_EMAIL . ">";
	$headers = "From: " . $name . " <" . $email . ">";
	$send = mail($recipient, EMAIL_SUBJECT, $message, $headers);
}

// give responses to browser
if (isset($_GET["ajax"])) {
	echo $send ? "success" : "error";
} 

else {
// if js disabled, this will be shown
?>
<html>
	<head>
		<title>Message</title>
	</head>
	<body>
		<?php if ( $send ) echo "<p>Message has been successfully sent.</p>" ?>
		<?php if ( !$send ) echo "<p>There was an error in sending message. Please try again.</p>" ?>
		<p>Click your browser's Back button to return to the page.</p>
	</body>
</html>
<?php
}
?>

