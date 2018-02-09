<?php
session_start();
if(!isset($_SESSION['IDUtente']))
{
    $err = 'nologin';
    $str = '';
    include('php/errorPage.php');
    die();
}
require_once('php/databaseManager.php');

$userID = $_SESSION['IDUtente'];

$query = "SELECT * FROM Utente WHERE IDUtente = '{$userID}'";
$res = executeQuery($query);
$utente = $res->fetch_assoc();


?>

<!DOCTYPE html>
<html>

<head>
<title>Triple Triad World - Home </title>
<link rel="stylesheet" type="text/css" href="css/home.css">
<script src="js/home.js"></script>
<script src="js/Card.js"></script>
<script src="js/DeckSelection.js"></script>
<script src="js/ajax.js"></script>
</head>

<body>

	<div id="rightBar">
		<section id="menu">
            <h2>Menu Utente</h2>
            <ul>
                <li id="play">Gioca</li>
                <li id="cards">Carte</li>
                <li id="shop">Negozio</li>
                <li id="ad">Ottieni denaro</li>
                <li id="logout">Logout</li>
            </ul>
        </section>
		<section id="statInfo"> 
        <div>
            <h2> Info </h2> 
            <p>Ciao <?=$utente['Username']?></p>
            <p>Denaro: <?=$utente['Denaro']?></p>
            <p>Partite: <?=$utente['Vinte']?> vinte su <?=$utente['Giocate']?> giocate</p>
        </div>  
        </section>
	</div>

	<div id="helpBar"> HomePage </div>
	<main id="center">
        <section id="confirmPlay" class="">
            <h2>Inizia a giocare!</h2>
            <p>La partita inizierà in una nuova finestra. Premi PLAY per proseguire.</p>
            <span class="play">PLAY</span>

            <p class="hidden">Non hai abbastanza carte! Comprale al negozio! </p>
        </section>

        <section id="cardView" class="hidden">
            <h2> Elenco Carte Possedute </h2>
        </section>
        
        <section id="shopView" class="hidden">
            <h2> Negozio </h2>
            <p> Compra una carta! Scegli il livello desiderato e otterrai una carta casuale di quel livello! </p>
            <p> (Puoi usare anche i tasti direzionali per scegliere e il tasto invio per comprare) </p>

            <div id="shopCard" class="scrollLeftBegin">
                <img src ="img/cards/back.png" alt="Carta casuale!">
                <p>
                    <span id="lvl">LVL 1 -</span>
                    <span id="price">Prezzo: 2</span>
                </p>
            </div>

            <button id="buy">Compra!</button>

            <img class="arrow" id="leftScroll" src="img/shopArrow.png" alt="Scorri a sinistra">
            <img class="arrow" id="rightScroll" src="img/shopArrow.png" alt="Scorri a destra">

            <div id="dispWin" class="hidden">
                <p></p>
                <img src="img/text/blank.png" alt="Carta vinta">
                <span>X</span>
            </div>
        </section>    
    </main>
</body>

</html>