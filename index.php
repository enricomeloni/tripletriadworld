<!DOCTYPE html> 
<html>
<head>
<title>
Triple Triad World
</title>
<link rel="stylesheet" type="text/css" href="css/index.css">
<script src="js/index.js"></script>
<script src="js/ajax.js"></script>
</head>
<body>
<div id="title">TRIPLE TRIAD WORLD</div>


<div id="selection">
<img src="img/info-text.png" id="info" alt="Info Text">
	<div id="register">
		<p><img alt="Registration Cursor" style="display:none;" src="css/FFVIIICursor01.cur"><span><a id="regText">NUOVO UTENTE</a></span></p>
	    <div id="regForm" class="hidden">
            <input type="text" id="regUser" required pattern="[A-Za-z0-9._]+" placeholder="Username">
            <input type="password" id="regPass" required placeholder="Password">
            <input type="password" id="confPass" required placeholder="Conferma Password">
            <input type="email" id="email" required pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}" placeholder="E-Mail">
            <input type="email" id="confEmail" required pattern="[A-Za-z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}" placeholder="Conferma E-Mail">
            <button id="confirmReg">Registrati!</button>    
        </div>
	</div>

    <div id="errorRegistration" class="hidden">
        <p></p>
    </div>

    <div id="confirmRegistration" class="hidden">
        <p>Registrazione completa!</p>
    </div>

	<div id="login">	
		<p><img alt="Login Cursor" style="display:none;" src="css/FFVIIICursor01.cur"><span><a id="loginText">LOGIN</a></span></p>	
	
        <div id="loginForm" class="hidden">
            <input type="text" required placeholder="Nome Utente" pattern="[A-Za-z0-9._]+" id="user">
            <input type="password" required placeholder="Password" id="pass">
            <button id="confirmLogin">Login!</button>
        </div>

        <div id="errorLogin" class="hidden">
            <p></p>
        </div>
    </div>
	
    <div id="documentation">
    <p><img alt="Documentation Cursor" style="display:none;" src="css/FFVIIICursor01.cur"><span><a href="doc/documentation.html" id="docText">DOCUMENTAZIONE</a></span></p>	
	</div>
</div>
</body>
</html>