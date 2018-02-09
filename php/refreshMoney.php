<?php
session_start();
require_once('databaseManager.php');

$query = "SELECT Denaro FROM Utente WHERE IDUtente = {$_SESSION['IDUtente']}";
$denaro = executeQuery($query)->fetch_array()[0];
echo $denaro;
?>