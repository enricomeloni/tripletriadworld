<?php
session_start();

if(!isset($_SESSION['IDUtente']))
{
    $err = 'nologin';
    $str = '';
    include('php/errorPage.php');
    die();
}

if(!isset($_GET['auth']))
{
    $err = 'noauth';
    $str = '';
    include('php/errorPage.php');
    die();
}

?>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Triple Triad World - Play</title>
	<meta charset="utf-8" />
	<link rel="stylesheet" type="text/css" href="css/play.css">
	<script src="js/play.js"></script>
	<script src="js/Card.js"></script>
    <script src="js/Hand.js"></script>
    <script src="js/Playground.js"></script>
    <script src="js/Player.js"></script>
    <script src="js/Animation.js"></script>
    <script src="js/DeckSelection.js"></script>
    <script src="js/Exchange.js"></script>
    <script src="js/ajax.js"></script>
</head>
<body>
	<div id="rightBar">
        <h2> Menu utente </h2>
        <ul>
            <li> Musica - OFF </li>
            <li>
                <audio loop>
                    <source src="music.mp3" type="audio/mpeg">
                    Your browser does not support the audio elment.
                </audio>
                <span>&#9658; Play </span>
                <span>&#9632; Stop </span>
            </li>
            <li> <span>Esci!</span> </li>
        </ul>
    </div>
	<div id="barButton"></div>
    <div id="ruleSelection">
        <h1>Regole</h1>
        <div id="checkboxes">
        <input type="checkbox" name="rules" value="1"> Plus </input><br>
        <input type="checkbox" name="rules" value="2"> Same </input><br>
        <input type="checkbox" name="rules" value="4"> Samewall </input><br>
        <input type="checkbox" name="rules" value="8"> Elemental </input><br>
        <input type="checkbox" name="rules" value="16"> Open </input><br>
        <input type="checkbox" name="rules" value="1024"> Random </input> <br>
        </div>
        <h2>Scambio</h2>
        <div id="radios">
        <input type="radio" name="exchange" value="32" checked> One</input><br>
        <input type="radio" name="exchange" value="64"> All </input><br>
        <input type="radio" name="exchange" value="128"> Direct </input><br>
        <input type="radio" name="exchange" value="256"> Difference </input><br>
        </div>
        <br>
        <button id="startGame"> Start! </button>
    </div>

    <div id="cardSelection">
        <div id="cardList"><h2>Seleziona 5 Carte</h2><hr></div>
        <div id="cardPreview"><img id="confirm" src="img/check.png" alt="Confirm"></div>
    </div>

	<main id="playZone">
		<aside class="hand" id="leftHand"></aside>
		<aside class="hand" id="rightHand"></aside>
        <img id="leftPoints" class="points" alt="Points for left player" src="img/text/blank.png">
        <img id="rightPoints" class="points" alt="Points for right player" src="img/text/blank.png">
		<div id="playground"></div>
        <div id="broadcast"><img id="broad-pic" alt='info text' src="img/text/blank.png"></div>
        <img id="turnPointer" alt="Indicatore Turno" class="begin" src="img/arrow-icon.png">
    </main>
    <div id="gameFinish">
        <div id="cardSelector"></div>
        <div id="gameRecap"></div>
    </div>
</body>
</html>
