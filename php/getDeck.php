<?xml version="1.0"?>

<deck>
<?php
    session_start();
    $userID = $_SESSION['IDUtente'];
    header('Content-type: application/xml');
    require_once('databaseManager.php');

    function specialInsert(&$array,$item)
    {
        foreach($array as $value)
        {
            if($value == $item)
                return false;
        }
        array_push($array,$item);
        return true;
    }

    $toReturn = array();

    if($_GET['req'] == 'ai')
    {
        $intervals = array("1 AND 5","6 AND 8","9 AND 10");
        $quants = array(3,1,1);
        foreach($intervals as $key => $val)
        {
            $toChoose = array();
            $res = executeQuery('SELECT * FROM Carta WHERE Livello BETWEEN '.$val);
            echo $db->error;
            while($rs = $res->fetch_assoc())
            {
                array_push($toChoose,$rs);
            }

            $rands = array();
            $i = 0;
            while($i < $quants[$key])
            {
                $toAdd = rand(0,count($toChoose)-1);
                if(specialInsert($rands,$toAdd))
                    ++$i;
            }
            //var_dump($rands);
            foreach($rands as $value)
            {
                //echo $value."=>".$toChoose[$value]['Nome'];
                $toChoose[$value]['Quantita'] = 1;
                array_push($toReturn,$toChoose[$value]);
            }
        }
    }
    elseif($_GET['req'] == 'human')
    {
        $res = executeQuery("SELECT * FROM Deck NATURAL JOIN Carta WHERE IDUtente = '{$userID}' ORDER BY Livello,Nome");
        while($rs = $res->fetch_assoc())
        {
            array_push($toReturn,$rs);
        }
    }

    foreach($toReturn as $arr)
    {
        echo '<card>';
        echo '<name>'.$arr['Nome'].'</name>';
        echo '<values>';
        echo '<top>'.$arr['Top'].'</top>';
        echo '<right>'.$arr['Destra'].'</right>';
        echo '<bot>'.$arr['Bot'].'</bot>';
        echo '<left>'.$arr['Sinistra'].'</left>';
        echo '</values>';
        echo '<element>'.$arr['Elemento'].'</element>';
        echo '<quantity>'.$arr['Quantita'].'</quantity>';
        echo '<level>'.$arr['Livello'].'</level>';
        echo '</card>';
    }

?>
</deck>