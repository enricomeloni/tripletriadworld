<?php
session_start();
$userID = $_SESSION['IDUtente'];
require_once('databaseManager.php');

$win = $_GET['win'];

$query = "UPDATE Utente SET Giocate = Giocate + 1 WHERE IDUtente = '{$userID}'";
executeQuery($query);
if($win == 'win')
{
    $query = "UPDATE Utente SET Vinte = Vinte+1 WHERE IDUtente = '{$userID}'";
    executeQuery($query);
}
?>
