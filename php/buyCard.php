<?php
session_start();
$userID = $_SESSION['IDUtente'];
require_once('databaseManager.php');

$prezzo = $_GET['lvl']*2;

$query = "SELECT Denaro FROM Utente WHERE IDUtente = '{$userID}'";
$denaro = executeQuery($query)->fetch_array()[0];
$denaro -= $prezzo;

if($denaro < 0)
    $ret =  array("no",$denaro + $prezzo);
else
{

    $query = "SELECT IDCarta, Nome FROM Carta WHERE Livello = {$_GET['lvl']}";
    $res = executeQuery($query);

    $rand = rand(0,$res->num_rows-1);

    $i = 0;
    while(($arr = $res->fetch_assoc()) && $i++ != $rand);
    $query = "SELECT * FROM Deck WHERE IDUtente = '{$userID}' AND IDCarta = '{$arr['IDCarta']}'";
    $res = executeQuery($query);
    if($res->num_rows != 0)
    {
        $query = "UPDATE Deck SET Quantita = Quantita + 1 WHERE IDUtente = '{$userID}' AND IDCarta = {$arr['IDCarta']}";
    }
    else
    {
        $query = "INSERT INTO Deck VALUES ('{$userID}',{$arr['IDCarta']},'1')";
    }
    executeQuery($query);

    $query = "UPDATE Utente SET Denaro = '{$denaro}' WHERE IDUtente = '{$userID}'";
    executeQuery($query);


    $ret = array ($arr['Nome'],$denaro);
}





echo json_encode($ret);
?>