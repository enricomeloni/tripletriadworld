<?php
    $db = new mysqli("localhost","root","","tripletriadworld");    

 

    function executeQuery($query)
    {   
        global $db;
        return $db->query($query);
    }

?>