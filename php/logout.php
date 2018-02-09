<?php

    session_start();
    if(!isset($_SESSION['IDUtente']))
    {
        $err = 'nologin';
        $str = '../';
        include('errorPage.php');
        die();
    }
    $_SESSION = array(); //elimina la sessione

?>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Arrivederci!</title>
	<meta charset="utf-8" />
    <link rel="stylesheet" type="text/css" href="../css/logout.css">
</head>
<body>
<main>
    <h1>Logout!</h1>
    <p>Grazie per aver giocato con noi!</p>
    <a href="../index.php">Torna alla homepage</a>
</main>
</body>
</html>
