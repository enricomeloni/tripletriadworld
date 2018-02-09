<?php

require_once('databaseManager.php');

$user = $db->real_escape_string($_POST['user']);
$pass = $db->real_escape_string($_POST['pass']);
$email = $db->real_escape_string($_POST['email']);

$query = "SELECT Username, Email FROM Utente WHERE Username = '{$user}' OR Email = '{$email}'";
$res = executeQuery($query);

if($res->num_rows != 0)
{
    $val = $res->fetch_array();
    if($val[0] == $user)
    {
        echo "username";
    }
    else
    {
        echo "email";
    }
}
else
{
    $query = "INSERT INTO Utente (Username,Password,Email) VALUES ('{$user}','{$pass}','{$email}')";
    executeQuery($query);
    echo "OK";
}

?>