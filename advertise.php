<?php
session_start();
require_once('php/databaseManager.php');
$userID = $_SESSION['IDUtente'];

$query = "SELECT UltimoClickAd = CURRENT_DATE() FROM Utente WHERE IDUtente = '{$userID}'";
$flag = executeQuery($query)->fetch_array()[0];

if($flag)
{
    $string = "Hai già ricevuto il denaro per oggi! ";
}
else
{
    $string = "Hai ottenuto 10 unità di denaro! ";
    $query = "UPDATE Utente SET Denaro = Denaro + 10, UltimoClickAd = CURRENT_DATE() WHERE IDUtente = '{$userID}'";
    executeQuery($query);
}
    

    $string .= "Torna domani per altro denaro!"
?>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Pubblicità</title>
	<meta charset="utf-8" />
    
    <link rel="stylesheet" type="text/css" href="css/advertise.css">
</head>
<body>
    <main>
    <img src="img/unipi.png" alt="Logo Università di Pisa">

    <p>Grazie per aver visitato la pagina dedicata allo sponsor <a onclick="window.close()" href="http://www.unipi.it" target="_blank">UniPi</a>!</p>
    <br>
    <br>
    <hr>
    <br>
    <div>
        <?=$string?>
    </div>
    <br>
    <a class="close" onclick="window.close()" href=""> Chiudi! </a>
    </main>
</body>
</html>
