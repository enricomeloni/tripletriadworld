<?php
    session_start();
    $userID = $_SESSION['IDUtente'];
    require_once('databaseManager.php');

    $card = $_GET['card'];
    $player = $_GET['player'];

    //bisogna prima controllare se la carta sia già nel deck del giocatore;

    $query = "SELECT IDCarta FROM Carta WHERE Nome = '{$card}'";

    $res = executeQuery($query);
    $idCarta = $res->fetch_array()[0];

    $query = "SELECT Quantita FROM Deck WHERE IDCarta = '{$idCarta}' AND IDUtente = '{$userID}'";
    $res = executeQuery($query);

    if($res->num_rows != 0)
    {
        $qt = $res->fetch_array()[0];
        $qt += ($player == 'left')?(+1):(-1);
        if($qt != 0)
            $query = "UPDATE Deck SET Quantita = '{$qt}' WHERE IDCarta = '{$idCarta}' AND IDUtente = '{$userID}'";
        else
            $query = "DELETE FROM Deck WHERE IDCarta = '{$idCarta}' AND IDUtente     = '{$userID}'";
    }
    else //si può finire in questo blocco solo se non si ha la carta, e quindi la si sta vincendo
    {
        $query = "INSERT INTO Deck VALUES ('{$userID}','{$idCarta}','1')";
    }

    executeQuery($query);


    //aggiunta denaro: per ogni carta vinta +1 denaro, per ogni persa -1 denaro

    $query = "SELECT Denaro FROM Utente WHERE IDUtente = '{$userID}'";
    $res = executeQuery($query);

    $denaro = $res->fetch_array()[0];
    $toAdd = ($player == 'left')?(+1):(-1);
    $denaro += $toAdd;
    if($denaro < 0)
    {
        $denaro = 0;
        $toAdd = 0;
    }
        

    $query = "UPDATE Utente SET Denaro = '{$denaro}' WHERE IDUtente = '{$userID}'";
    executeQuery($query);

    echo $toAdd;
?>