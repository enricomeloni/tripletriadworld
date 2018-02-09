<?php
session_start();

require_once('databaseManager.php');

$user = $db->real_escape_string($_POST['user']);
$pass = $db->real_escape_string($_POST['pass']);
$query = "SELECT IDUtente FROM Utente WHERE Username = '{$user}' AND Password = '{$pass}'";

$res = executeQuery($query);

if($res->num_rows != 0)
{
    echo "OK";
    $_SESSION['IDUtente'] = $res->fetch_array()[0];
    $_SESSION['Username'] = $user;
}
else
{
    echo "NO";
    session_destroy();
}

