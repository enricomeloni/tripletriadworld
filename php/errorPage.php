<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Errore!</title>
	<meta charset="utf-8" />
    <link rel="stylesheet" type="text/css" href="<?=$str?>css/errorPage.css">
</head>
<body>
    <main>
        <h1> C'è stato un errore! </h1>

        <p>
            <?php
            if($err == 'nologin')
                echo "Probabilmente non hai ancora effettuato il login! Effettua il login nella pagina iniziale per visualizzare
                correttamente questa pagina!";
            else
                echo "Non hai le autorizzazioni per visualizzare questa pagina! Segui le istruzioni sulle altre pagine per accedere";

            ?>
        </p>
        <a href="index.php">Torna indietro!</a>
    </main>
</body>
</html>
